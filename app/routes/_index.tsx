import type { MetaFunction } from "@remix-run/node";
import { GameScreen } from "~/components/Layout/GameScreen";
import { OpeningScreen } from "~/components/Layout/OpeningScreen";
import { ClosingScreen } from "~/components/Layout/ClosingScreen";
import { useGame } from "~/store/game";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const gameState = useGame('state');

  return ([
    gameState === 'unset' ? <OpeningScreen key="opening" /> : null,
    gameState === 'started' ? <GameScreen key="game" /> : null,
    gameState === 'ended' ? <ClosingScreen key="scoring" /> : null
  ]);
}
