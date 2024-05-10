import { Computed, computed, createState, on } from "@holycow/state";
import { Product } from "./product";
import random from "random";
import { useClock } from "./clock";
import {gameStarted, locationChanged } from "./signals";

type ShipState = {
  capacity: number;
  volume: Computed<ShipState, number>;
  goods: Record<Product, number>;
  damage: number;
  canSail: Computed<ShipState, boolean>;
  guardShips: number;
  pricePerGuardShip: Computed<ShipState, number>;
}
export const useShip = createState<ShipState>({
  capacity: 20,
  volume: computed((state) => Object.values(state.goods).reduce((sum, tons) => sum + tons)),
  goods: {
    copper: 0,
    wheat: 0,
    olive: 0
  },
  damage: 0,
  canSail: computed((state) => state.damage < 100),
  guardShips: 0,
  pricePerGuardShip: computed(() => Math.floor(210 * (useClock.time / 24)))
});

on(locationChanged, () => {
  useShip.set('guardShips', 0);
});
on(gameStarted, () => {
  useShip.set({
    capacity: 20,
    goods: {
      copper: 0,
      wheat: 0,
      olive: 0
    },
    damage: 0,
    guardShips: 0
  });
});
