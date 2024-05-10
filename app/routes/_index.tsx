import type { MetaFunction } from "@remix-run/node";
import { useGame } from "~/store/game";
import { GameScreen } from "~/components/Layout/GameScreen";
import { useWallet } from "~/store/wallet";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [gameStarted, gameEnded] = useGame('started', 'ended');

  return gameEnded ? <ClosingScreen /> : gameStarted ? <GameScreen /> : <OpeningScreen />;
}

function OpeningScreen() {
  const startGame = useGame('startGame');

  return (
    <div style={{
      height: '100%',
      display: 'grid',
      placeContent: 'center',
    }}>
      <button onClick={() => {
        const playerName = prompt("Enter your name: ") || "Anonymous";
        startGame(playerName);
      }}>Start Game</button>
    </div>
  )
}

function ClosingScreen() {
  const pts = useWallet('cash');
  const startGame = useGame('startGame');

  return (
    <div style={{
      height: '100%',
      display: 'grid',
      placeContent: 'center'
    }}>
      <h1>Week Ended!</h1>
      <p>Well done! You've earned {pts} points!</p>
      <button onClick={() => {
        const playerName = prompt("Enter your name: ") || "Anonymous";
        startGame(playerName);
      }}>Wanna play again?</button>
    </div>
  )
}

function px(value: number) {
  return value + 'px';
}
