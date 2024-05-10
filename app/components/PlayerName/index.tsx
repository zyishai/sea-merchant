import { useGame } from "~/store/game";
import { Name } from "./styles.module.css";

export function PlayerName() {
  const playerName = useGame('playerName');
  return (
    <Name>{playerName}</Name>
  )
}
