import { type Computed, computed, createSignal, createState, on } from "@holycow/state";
import type { Product } from "./product";
import random from 'random';
import { randInt } from "~/utils";
import { dayChanged, gameStarted, locationChanged } from "./signals";

export type GameLocation = 'israel' | 'egypt' | 'turkey';

type Weather = 'calm' | 'storm';
type LocationState = {
  locations: Record<GameLocation, { name: GameLocation; displayName: string; color: string; weather: Weather; prices: Record<Product, number> }>;
  current: Computed<LocationState, LocationState['locations'][GameLocation]>;
  currentLocation: GameLocation;
};
export const useLocation = createState<LocationState>({
  locations: {
    israel: {
      name: 'israel',
      displayName: 'Israel',
      color: '#005EB8',
      weather: 'calm',
      prices: {
        copper: 0,
        wheat: 0,
        olive: 0
      }
    },
    egypt: {
      name: 'egypt',
      displayName: 'Egypt',
      color: '#C09300',
      weather: 'calm',
      prices: {
        copper: 0,
        wheat: 0,
        olive: 0
      }
    },
    turkey: {
      name: 'turkey',
      displayName: 'Turkey',
      color: '#C8102E',
      weather: 'calm',
      prices: {
        copper: 0,
        wheat: 0,
        olive: 0
      }
    }
  },
  currentLocation: 'israel',
  current: computed((state) => state.locations[state.currentLocation]),
});

useLocation.subscribe('currentLocation', (newLocation) => {
  locationChanged(newLocation);
});

on(dayChanged, prepareNewDay);
on(gameStarted, prepareNewDay);

function prepareNewDay() {
  for (const locationName of Object.keys(useLocation.locations)) {
    const weather: Weather = random.choice(['calm', 'storm']) ?? 'calm';
    useLocation.set(`locations.${locationName}.weather`, weather);
    const newPrices = {
      copper: randInt(1200, 5000, 100),
      wheat: randInt(25, 100, 5),
      olive: randInt(250, 1000, 10)
    };
    useLocation.set(`locations.${locationName}.prices`, newPrices);
  }
}
