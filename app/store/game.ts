// import { Action, Computed, action, computed, createState, on } from "@holycow/state";
// import { dayChanged, eventOccurred, gameStarted, timeUpdated, weekEnded } from "./signals";
// import { randInt } from "~/utils";
// import random from "random";

import { Action, action, createState, on } from "@holycow/state";
import { gameStarted, processCommand, weekEnded } from "./signals";
import { Command } from "./command";

type GameState = {
  started: boolean;
  ended: boolean;
  playerName: string;
  startGame: Action<GameState, [string]>;
  run: Action<GameState, [Command]>;
};
export const useGame = createState<GameState>({
  started: false,
  ended: false,
  playerName: '',
  startGame: action(({ set }) => (playerName) => {
    set({
      started: true,
      ended: false,
      playerName
    });
    gameStarted();
  }),
  run: action(({}) => (command) => {
    command.execute()
  }),
});

on(weekEnded, () => {
  useGame.set('ended', true);
});
on(processCommand, (command) => {
  useGame.run(command);
})

// export const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
// export type Day = typeof days[number];
// export const locations = {
//   israel: 'israel',
//   egypt: 'egypt',
//   turkey: 'turkey'
// } as const;
// export type Location = keyof typeof locations;
// export const products = {
//   copper: 0,
//   wheat: 1,
//   olive: 2
// } as const;
// export type Product = keyof typeof products;
// type ProductIndex = typeof products[Product];
// export const Weather = {
//   calm: 'calm',
//   storm: 'storm'
// } as const;
// type Weather = keyof typeof Weather;
// export const GameEvent = {
//   storm: 'storm', // chance: 22% => 1-22
//   pirates: 'pirates', // chance: 18% => 23-41
//   abandonedShip: 'abandonedShip', // chance: 13% => 42-55
//   goods: 'goods' // chance: 20% => 56-76
// } as const;
// export type GameEvent = keyof typeof GameEvent;

// type WalletState = {
//   cash: number;
//   wealth: Computed<WalletState, number>;

//   // actions
//   buy: Action<WalletState, [Product, number]>;
//   sell: Action<WalletState, [Product, number]>;
// }
// type ClockState = {
//   time: number;
//   hours: Computed<ClockState, number>;
//   day: Computed<ClockState, Day>;

//   // actions
//   advanceClock: Action<ClockState, [number]>;
//   rest: Action<ClockState>;
// }
// type ShipState = {
//   capacity: number;
//   volume: Computed<ShipState, number>;
//   goods: [number, number, number];
//   damage: number;
//   repairCost: Computed<ShipState, number>;
//   guardShipPrice: Computed<ShipState, number>;
//   guardShips: number;

//   // Actions
//   takeDamage: Action<ShipState, [number]>;
//   repairDamage: Action<ShipState, [number]>;
//   rentGuardShips: Action<ShipState, [number]>;
// }
// type LocationState = {
//   currentLocation: Location;
  
//   // actions
//   calculatePrices: Action<LocationState>;
//   determineWeatherStability: Action<LocationState>;
//   changeLocation: Action<LocationState, [Location, number]>;
// } & { [L in Location]: { prices: Record<ProductIndex, number>; weatherStability: number }}

// export const useWallet = createState<WalletState>({
//   cash: 5000,
//   wealth: computed(({ cash }) => {
//     const { goods } = useShip;
//     const { currentLocation } = useLocation;
//     let fromAssets = 0;

//     for (const i of Object.values(products)) {
//       fromAssets += useLocation[currentLocation].prices[i] * goods[i];
//     }

//     return cash + fromAssets; // TODO: add balance in the bank
//   }),
//   buy: action(({ set }) => (product, quantity) => {
//     if (useGame.ended) {
//       return;
//     }

//     const { allowed, reason } = canBuy(product, quantity);
//     if (!allowed) {
//       return;
//     }

//     const price = useLocation[useLocation.currentLocation].prices[products[product]] * quantity;
//     const { goods } = useShip;

//     set('cash', c => c - price);
//     const newGoods = goods.slice() as typeof goods;
//     newGoods[products[product]] += quantity;
//     useShip.set('goods', newGoods);
//   }),
//   sell: action(({ set }) => (product, quantity) => {
//     if (useGame.ended) {
//       return;
//     }

//     const { allowed, reason } = canSell(product, quantity);
//     if (!allowed) {
//       return;
//     }

//     const { goods } = useShip;
//     const price = useLocation[useLocation.currentLocation].prices[products[product]] * quantity;

//     set('cash', c => c + price);
//     const newGoods = goods.slice() as typeof goods;
//     newGoods[products[product]] -= quantity;
//     useShip.set('goods', newGoods);
//   })
// });

// const START_HOUR = 8;
// export const useClock = createState<ClockState>({
//   time: 0,
//   hours: computed(({ time }) => time % 24 + START_HOUR),
//   day: computed(({ time }) => days[Math.min(Math.floor(time / (24 - START_HOUR)), 6)]),
//   advanceClock: action(({ time, hours, day, set }) => (units) => {
//     if (hours + units - START_HOUR > 24) {
//       return false;
//     }
    
//     const updatedTime = time + units;
//     set('time', updatedTime);
//     timeUpdated();

//     if (updatedTime % 24 === 0) {
//       if (day === 'saturday') {
//         weekEnded();
//       } else {
//         dayChanged();
//       }
//     }

//     return true;
//   }),
//   rest: action(({ time, hours, advanceClock }) => () => {
//     advanceClock(24 - hours + START_HOUR);
//   })
// });

// export const useShip = createState<ShipState>({
//   capacity: 50,
//   goods: [0, 0, 0],
//   volume: computed(({ goods }) => Object.values(goods).reduce((sum, value) => sum + value)),
//   damage: 0,
//   repairCost: computed(({ damage }) => damage * 51),
//   guardShipPrice: computed(() => Math.floor(12.5 * useClock.hours)),
//   guardShips: 0,
//   takeDamage: action(({ set }) => (amount) => {
//     set('damage', d => d + amount);
//   }),
//   repairDamage: action(({ set }) => (amount) => {
//     const { cash } = useWallet;
//     const cost = amount * 51;

//     if (cost > cash) {
//       // TODO: notify user doesn't have enough cash to pay for the repairs
//       return;
//     }

//     useWallet.set('cash', c => c - cost);
//     set('damage', d => d - amount);
//   }),
//   rentGuardShips: action(({ guardShipPrice, set }) => (ships) => {
//     const { cash } = useWallet;
//     if (cash < guardShipPrice * ships) {
//       return;
//     }

//     useWallet.set('cash', c => c - guardShipPrice*ships);
//     set('guardShips', ships);
//   })
// });

// export const useLocation = createState<LocationState>({
//   currentLocation: 'israel',
//   israel: {
//     prices: [0, 0, 0],
//     weatherStability: 100
//   },
//   egypt: {
//     prices: [0, 0, 0],
//     weatherStability: 100
//   },
//   turkey: {
//     prices: [0, 0, 0],
//     weatherStability: 100
//   },
//   calculatePrices: action(({ set }) => () => {
//     for (const l in locations) {
//       set(`${l}.prices`, [randInt(1500, 5000, 100), randInt(25, 100, 5), randInt(250, 1000, 10)] as any);
//     }
//   }),
//   determineWeatherStability: action(({ set }) => () => {
//     for (const l in locations) {
//       set(`${l}.weatherStability`, randInt(1, 100) as any);
//     }
//   }),
//   changeLocation: action(({ set, currentLocation }) => (destination, guardShips) => {
//     useShip.rentGuardShips(guardShips);

//     const travelTimeInHours = 4;
//     const { allowed, reason } = canTravel(travelTimeInHours);
//     if (allowed) {
//       if (useClock.hours >= 16) {
//         // TODO: warn about sailing in the night (i.e. greater danger)
//       }
      
//       useClock.advanceClock(travelTimeInHours / 2);

//       const chance = random.int(1, 100);
//       if (chance <= 22) {
//         if (determineWeather(currentLocation) === 'storm') {
//           eventOccurred({
//             evt: 'storm',
//             destination,
//             onEventResolved() {
//               useClock.advanceClock(travelTimeInHours / 2);
//               useShip.set('guardShips', 0);
//             },
//           });
//         } else {
//           useClock.advanceClock(travelTimeInHours / 2);
//           useShip.set('guardShips', 0);
//           useLocation.set('currentLocation', destination);
//         }
//       } else if (chance <= 41) {
//         eventOccurred({
//           evt: 'pirates',
//           piratesPower: randInt(0, guardShips * 2),
//           onEventResolved() {
//             useClock.advanceClock(travelTimeInHours / 2);
//             useShip.set('guardShips', 0);
//             useLocation.set('currentLocation', destination);
//           },
//         });
//       } else if (chance <= 55) {
//         eventOccurred({
//           evt: 'abandonedShip',
//           onEventResolved() {
//             useClock.advanceClock(travelTimeInHours / 2);
//             useShip.set('guardShips', 0);
//             useLocation.set('currentLocation', destination);
//           },
//         });
//       } else if (chance <= 76) {
//         eventOccurred({
//           evt: 'goods',
//           onEventResolved() {
//             useClock.advanceClock(travelTimeInHours / 2);
//             useShip.set('guardShips', 0);
//             useLocation.set('currentLocation', destination);
//           },
//         });
//       } else {
//         useClock.advanceClock(travelTimeInHours / 2);
//         useShip.set('guardShips', 0);
//         useLocation.set('currentLocation', destination);
//       }
//     }
//   })
// });

// function canTravel(timeSpan: number): { allowed: boolean; reason?: string } {
//   const { ended } = useGame;
//   const { hours } = useClock;
//   const { damage } = useShip;
//   let allowed = true;
//   let reason = undefined;

//   if (ended) {
//     allowed = false;
//   }

//   if (damage >= 100) {
//     allowed = false;
//     reason = "Your ship is too damaged and must be repaired before allowed to sail again.";
//   }

//   if (hours >= 20) {
//     allowed = false;
//     reason = "You can't travel after 8 PM. Too late.";
//   }

//   if (hours + timeSpan > 24) {
//     allowed = false;
//     reason = "No enough time to travel today.";
//   }

//   return { allowed, reason };
// }

// function canBuy(product: Product, quantity: number): { allowed: boolean; reason?: string } {
//   let allowed = true;
//   let reason = undefined;

//   const { prices } = useLocation[useLocation.currentLocation];

//   // CHECK: enough cash?
//   const { cash } = useWallet;
//   if (cash < prices[products[product]]*quantity) {
//     allowed = false;
//     reason = "You don't have enough cash to buy this amount.";
//   }

//   // CHECK: enough capacity left?
//   const { capacity, volume } = useShip;
//   if (volume + quantity > capacity) {
//     allowed = false;
//     reason = "You don't have enough storage capacity left.";
//   }

//   return { allowed, reason };
// }

// function canSell(product: Product, quantity: number): { allowed: boolean; reason?: string } {
//   let allowed = true;
//   let reason = undefined;

//   const { goods } = useShip;

//   if (quantity > goods[products[product]]) {
//     allowed = false;
//     reason = `You don't have enough ${product} to sell.`;
//   }

//   return { allowed, reason };
// }

// export function determineWeather(location: Location): Weather {
//   return useLocation[location].weatherStability >= 50 ? 'calm' : 'storm';
// }

// export function loseGoodsOrMoney(): { type: Product | 'money'; quantity: number } {
//   const { goods } = useShip;
//   const { cash } = useWallet;
//   let possibleProducts = Object.keys(products).sort(() => 0.5 - Math.random()) as Product[];
//   let type: Product | 'money' = 'money';
//   let quantity = randInt(Math.floor(cash / 10), Math.floor(cash / 3));
//   while (possibleProducts.length) {
//     const product = possibleProducts.shift()!;
//     if (goods[products[product]] !== 0) {
//       type = product;
//       quantity = randInt(1, goods[products[product]]);
//     }
//   }

//   return { type, quantity };
// }

// on(gameStarted, () => {
//   useWallet.set({
//     cash: 5000
//   });
//   useClock.set({
//     time: 0
//   });
//   useShip.set({
//     capacity: 50,
//     goods: [0, 0, 0]
//   });
//   useLocation.calculatePrices();
// });
// on(dayChanged, () => {
//   useLocation.calculatePrices();
//   useLocation.determineWeatherStability();
// });
