import { useGame } from "~/store/game";
import { useWallet } from "~/store/wallet"
import { Button, CenteredColumn, FullHeightContainer } from "../primitives/styles.module.css";
import { px } from "~/utils";

export function ClosingScreen() {
  const wallet = useWallet();
  const startGame = useGame('startGame');
  const pts = wallet.cash;

  return (
    <FullHeightContainer>
      <CenteredColumn gap={px(10)}>
        <h1>Game Over!</h1>
        <p>You've earned <strong>{pts}</strong> points!</p>
        <p>Wanna play again?</p>
        <Button 
          variant="primary"
          size='big'
          color='blue'
          onClick={() => startGame('')}>Play again</Button>
      </CenteredColumn>
    </FullHeightContainer>
  )
}
