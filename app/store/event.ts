import { createSignal } from "@holycow/state";
import { Product } from "./product";
import { GameLocation } from "./location";

export type Lost = { damage?: number } & ({ type: 'money'|Product; amount: number }|{ type: 'nothing' });
export type Found = { type: 'capacity'|Product; amount: number };
type Resolved = void & { __brand: 'eventResolved' };
export type GameEvent = 
  | { type: 'storm', newLocation: GameLocation, onEventResolved: () => Resolved }
  | { 
    type: 'pirates', 
    onFight: () => boolean; 
    onOffer: (product: Product, amount: number) => boolean; 
    onEscape: () => boolean; 
    onLost: () => Lost;
    status?: 'won' | 'lost',
    lost?: Lost,
    onEventResolved: () => Resolved
  }
  | { type: 'abandonedShip', found: Found, onEventResolved: () => Resolved }
  | { type: 'nothing', onEventResolved: () => Resolved };

export const eventOccurred = createSignal<(event: GameEvent) => void>();
export const eventResolved = createSignal<() => Resolved>();
