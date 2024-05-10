import { createState, on } from "@holycow/state"
import { gameStarted } from "./signals";

type WalletState = {
  cash: number;
}
export const useWallet = createState<WalletState>({
  cash: 5000
});

on(gameStarted, () => {
  useWallet.set('cash', 5000);
});
