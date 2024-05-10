import { createSignal } from "@holycow/state";
import { GameLocation } from "./location";
import { Command } from "./command";

// clock.ts
export const timeUpdated = createSignal();
export const dayChanged = createSignal();
export const weekEnded = createSignal();

// command.ts
export const guardShipsWarning = createSignal<(message: string, options?: {error?: boolean}) => void>();
export const sailWarning = createSignal<(message: string, options?: {error?: boolean}) => void>();
export const buyWarning = createSignal<(message: string, options?: {error?: boolean}) => void>();
export const sellWarning = createSignal<(message: string, options?: {error?: boolean}) => void>();
export const repairWarning = createSignal<(message: string, options?: {error?: boolean}) => void>();

// game.ts
export const gameStarted = createSignal();
export const processCommand = createSignal<(command: Command) => void>();

// location.ts
export const locationChanged = createSignal<(location: GameLocation) => void>();
