import { useMemo, useReducer } from "react";
import { BuyCommand, SellCommand } from "~/store/command";
import { useLocation } from "~/store/location";
import { Product } from "~/store/product";
import { processCommand } from "~/store/signals";
import { useWallet } from "~/store/wallet";

type LocalMarketAction = 
  | { type: 'set_basket', product: Product, quantity: number }
  | { type: 'reset_basket', product?: Product };
export function useLocalMarket() {
  const wallet = useWallet();
  const location = useLocation();

  const [basket, dispatch] = useReducer((
    state: Partial<Record<Product, number>>, 
    action: LocalMarketAction) => {
      switch(action.type) {
        case 'set_basket': {
          return { ...state, [action.product]: action.quantity };
        }
        case 'reset_basket': {
          if (!!action.product) {
            const newState = { ...state };
            delete newState[action.product];
            return newState;
          } else {
            return {};
          }
        }
        default: {
          return state;
        }
      }
    }, {});
    const available: Record<Product, number> = useMemo(() => ({ 
      copper: Math.floor(wallet.cash/location.current.prices.copper),
      wheat: Math.floor(wallet.cash/location.current.prices.wheat),
      olive: Math.floor(wallet.cash/location.current.prices.olive),
    }), [wallet.cash, location.current]);
    const estimatedCostTotal = useMemo(() => (Object.entries(basket) as [Product, number][]).reduce((sum, [product, quantity]) => sum + location.current.prices[product] * quantity, 0), [basket, location.current]);
    const estimatedCostPerProduct = useMemo(() => (Object.entries(basket) as [Product, number][]).reduce((acc, [product, quantity]) => ({ ...acc, [product]: quantity * location.current.prices[product] }), {} as Partial<Record<Product, number>>), [basket]);

    return useMemo(() => ({ 
      basket,
      products: Object.keys(basket).length,
      available, 
      cost: { ...estimatedCostPerProduct, total: estimatedCostTotal },
      set: (product: Product, quantity: number) => dispatch({ type: 'set_basket', product, quantity }),
      clearBasket: (product?: Product) => dispatch({ type: 'reset_basket', product }),
      makePurchase: () => processCommand(new BuyCommand(basket)),
      sellProducts: () => processCommand(new SellCommand(basket))
    }), [basket, available]);
}
