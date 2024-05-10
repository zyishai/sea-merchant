import { Action, Computed, action, computed, createState, on } from "@holycow/state";
import { dayChanged, gameStarted, timeUpdated, weekEnded } from "./signals";

type ClockState = {
  total: number;
  day: Computed<ClockState, number>;
  time: Computed<ClockState, number>;
  advance: Action<ClockState, [number]>;
}
export const useClock = createState<ClockState>({
  total: 8,
  day: computed((state) => Math.min(Math.floor(state.total / 24), 6)),
  time: computed((state) => state.total % 24),
  advance: action((state) => (value) => {
    state.set('total', total => total + value);
    timeUpdated();
  })
});

useClock.subscribe('day', dayChanged);
useClock.subscribe((state) => {
  if (state.total >= 24 * 7) {
    weekEnded();
    return;
  }
});

on(gameStarted, () => {
  useClock.set('total', 8);
});
