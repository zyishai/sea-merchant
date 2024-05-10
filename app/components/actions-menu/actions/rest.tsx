import { useClock } from "~/store/game";
import { ActionButton } from "../styles.module.css";

export function RestAction() {
  const rest = useClock('rest');
  return (
    <ActionButton onClick={rest}>Rest</ActionButton>
  )
}
