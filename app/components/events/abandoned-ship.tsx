import { useShip } from "~/store/game";
import { PopupPanelRenderer } from "../Layout/popup-panel-row";
import { FloatingPanel } from "../Layout/styles.module.css";
import { Button, Container, Text, Title } from "./styles.module.css";

type Props = {
  capacity: number;
  onEventResolved: () => void;
}
export function AbandonedShipEvent({ onEventResolved, capacity }: Props) {
  const ship = useShip();

  return (
    <PopupPanelRenderer>
      <FloatingPanel>
        <Container>
          <Title>You've found an abandoned ship</Title>
          <Text>Your capacity has increased by {capacity} tons!</Text>
          <Button variant='small' onClick={() => {
            ship.set('capacity', c => c + capacity);
            onEventResolved();
          }}>Continue</Button>
        </Container>
      </FloatingPanel>
    </PopupPanelRenderer>
  )
}
