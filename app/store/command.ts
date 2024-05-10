import { useClock } from './clock';
import { Lost, eventOccurred, eventResolved } from './event';
import random from 'random';
import { GameLocation, useLocation } from './location';
import { useWallet } from './wallet';
import { useShip } from './ship';
import { Product, products } from './product';
import { guardShipsWarning, sailWarning, buyWarning, sellWarning, repairWarning, locationChanged } from './signals';

export interface Command {
  readonly time: number;
  execute(): void;
}

export class BuyGuardShipsCommand implements Command {
  time = 0;

  constructor(private readonly count: number) {}
  static new(count: number) {
    return new BuyGuardShipsCommand(count);
  }

  execute(): void {
    const cost = useShip.pricePerGuardShip * this.count;
    if (useWallet.cash < cost) {
      guardShipsWarning('You don\'t have enough cash to pay for guard ships.');
      return;
    }

    useWallet.set('cash', cash => cash - cost);
    useShip.set('guardShips', ships => ships + this.count);
  }
}

export class SailCommand implements Command {
  static time = 4;
  time = 4;
  private static allowed?: boolean = undefined;

  constructor(private readonly destination: GameLocation) {
    SailCommand.allowed = undefined;
  }
  static new(destination: GameLocation) {
    return new SailCommand(destination);
  }

  static canSail(options?: { disableWarnings?: boolean }) {
    if (typeof this.allowed !== 'undefined') {
      return this.allowed;
    }

    const { time } = useClock;
    if (time + this.time >= 24) {
      !options?.disableWarnings && sailWarning("It's too late to sail. Rest until tomorrow.", { error: true });
      this.allowed = false;
    } else if (time >= 16) {
      !options?.disableWarnings && sailWarning('You\'re about to sail in the evening. Be careful of pirates 🏴‍☠️');
      this.allowed = true;
    } else {
      this.allowed = true;
    }

    return this.allowed;
  }

  execute(): void|boolean {
    if (SailCommand.canSail()) {
      const dest = this.destination;
      const travelTime = this.time;
      useClock.advance(travelTime / 2);

      const choice = random.choice(([
        'pirates', 
        /* Is late? */ useClock.time >= 16 ? 'pirates' : undefined , 
        /* Is late? */ useClock.time >= 16 ? 'pirates' : undefined , 
        'storm',
        /* Is stormy in current location? */ useLocation.current.weather === 'storm' ? 'storm' : undefined,
        /* Is stormy in current location? */ useLocation.current.weather === 'storm' ? 'storm' : undefined,
        'abandonedShip',
        'nothing',
        'nothing',
        'nothing',
        'nothing'
      ] as const).filter(Boolean));
      switch(choice) {
        case 'pirates': {
          let offeredProduct: Product|undefined = undefined;
          let offeredAmount: number|undefined = undefined;

          eventOccurred({
            type: 'pirates',
            onFight() {
              const { guardShips } = useShip;
              const piratesPower = random.int(6, 20);
              return guardShips*2+1 >= piratesPower; // at least 3 to win
            },
            onEscape() {
              const { guardShips } = useShip;
              const piratesPower = random.int(0, 15);
              return guardShips+3 >= piratesPower; // no minimum to win
            },
            onOffer(product, amount) {
              offeredProduct = product;
              offeredAmount = amount;
              const hasEnough = useShip.goods[product] >= amount;
              return hasEnough && random.boolean();
            },
            onLost() {
              const availableProducts = products.filter((product) => (
                offeredProduct && product === offeredProduct
                  ? useShip.goods[product] > (offeredAmount ?? 0)
                  : useShip.goods[product] > 0
              ));
              const type: Lost['type'] = random.choice((['nothing', useWallet.cash > 50 ? 'money' : null, ...availableProducts] as const).filter(Boolean)) ?? 'nothing';
              const amount = type === 'nothing'
                ? undefined
                : type === 'money'
                  ? random.int(50, Math.floor(useWallet.cash*0.2))
                  : random.int(1, useShip.goods[type]);
              const damage = random.bool() ? random.int(0, 30) : undefined;

              return {
                type,
                amount,
                damage
              } as Lost;
            },
            onEventResolved(lost) {
              if (lost) {
                const { type, damage } = lost;
                if (type === 'money') {
                  useWallet.set('cash', cash => cash - lost.amount);
                } else if (type !== 'nothing') {
                  useShip.set(`goods.${type}`, tons => tons - lost.amount);
                }
                if (typeof damage === 'number' && damage > 0) {
                  useShip.set('damage', d => d + damage);
                }
              }

              useClock.advance(travelTime / 2);
              useLocation.set('currentLocation', dest);
              return eventResolved();
            },
          });
          break;
        }
        case 'storm': {
          const newLocation = random.choice(
            (Object.keys(useLocation.locations) as GameLocation[]).filter((location) => location !== dest)
          ) ?? (Object.keys(useLocation.locations) as GameLocation[]).filter((location) => location !== dest)[0];
          eventOccurred({
            type: 'storm',
            newLocation,
            onEventResolved() {
              useClock.advance(newLocation === useLocation.currentLocation ? 1 : travelTime / 2);
              useLocation.set('currentLocation', newLocation);

              return eventResolved();
            },
          });
          break;
        }
        case 'abandonedShip': {
          const type = random.choice(['capacity', ...products] as const) ?? 'capacity';
          const amount = random.uniformInt(type === 'capacity' ? 3 : 10, 25)();
          eventOccurred({
            type: 'abandonedShip',
            found: { type, amount },
            onEventResolved() {
              if (type === 'capacity') {
                useShip.set('capacity', capacity => capacity + amount);
              } else {
                useShip.set(`goods.${type}`, tons => tons + amount);
              }

              useClock.advance(travelTime / 2);
              useLocation.set('currentLocation', dest);
              return eventResolved();
            },
          });
          break;
        }
        case 'nothing':
        default: {
          useClock.advance(travelTime / 2);
          eventOccurred({
            type: 'nothing',
            onEventResolved() {
              useLocation.set('currentLocation', dest);
              return eventResolved();
            },
          })
          break;
        }
      }
    }  
  }
}

export class BuyCommand implements Command {
  time = 0;

  constructor(private readonly product: Product, private readonly quantity: number) {}
  static new(product: Product, quantity: number) {
    return new BuyCommand(product, quantity);
  }

  execute(): void {
    const cost = useLocation.current.prices[this.product] * this.quantity;
    if (useWallet.cash < cost) {
      buyWarning('You don\'t have enough cash to make this purchase.');
      return;
    }
    if (useShip.volume + this.quantity > useShip.capacity) {
      buyWarning('You don\'t have enough free space on your ship.');
      return;
    }

    useShip.set(`goods.${this.product}`, tons => tons + this.quantity);
    useWallet.set('cash', cash => cash - cost);
  }
}

export class SellCommand implements Command {
  time = 0;

  constructor(private readonly product: Product, private readonly quantity: number) {}
  static new(product: Product, quantity: number) {
    return new SellCommand(product, quantity);
  }

  execute(): void {
    if (useShip.goods[this.product] < this.quantity) {
      sellWarning(`You don\'t have enough ${this.product}.`);
      return;
    }

    const profit = useLocation.current.prices[this.product] * this.quantity;
    useShip.set(`goods.${this.product}`, tons => tons - this.quantity);
    useWallet.set('cash', cash => cash + profit);
  }
}

export class RestCommand implements Command {
  time = 0;

  static new() {
    return new RestCommand();
  }

  execute(): void {
    const { time } = useClock;
    useClock.advance(24 - time + 8);
  }
}

export class RepairDamage implements Command {
  time = 0;

  constructor(private readonly amount: number) {}
  static new(amount: number) {
    return new RepairDamage(amount);
  }

  execute(): void {
    const cost = this.amount * 50; // 50 is the cost per unit of damage
    if (useWallet.cash < cost) {
      repairWarning('You don\'t have enough cash to pay for the repair.');
      return;
    }

    useWallet.set('cash', cash => cash - cost);
    useShip.set('damage', damage => damage - this.amount);
  }
}
