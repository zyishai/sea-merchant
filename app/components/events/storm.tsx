import { capitalize, url } from "~/utils";
import { PopupPanelRenderer } from "../Layout/popup-panel-row";
import { FloatingPanel } from "../Layout/styles.module.css";
import { BackgroundImage, Button, Container, Text, Title } from "./styles.module.css";
import { Location, useLocation } from "~/store/game";

type Props = {
  plannedDestination: Location;
  onEventResolved: (newDestination: Location) => void;
}
export function StormEvent({ plannedDestination, onEventResolved }: Props) {
  const location = useLocation();
  const newLocation: Location = (['israel', 'egypt', 'turkey'] as Location[]).filter((l) => l !== plannedDestination)[Math.floor(Math.random() / 0.5)];

  return (
    <PopupPanelRenderer>
      <FloatingPanel rounded="medium">
        <Container>
          <BackgroundImage src={url('/storm-bg.jpeg')} />
          <Title>Storm Hits!</Title>
          <Text>A storm hits your ship, {newLocation === location.currentLocation 
            ? 'you had to go back to shore.' 
            : `you arrived to ${capitalize(newLocation)} instead.`
          }</Text>
          <Button onClick={() => onEventResolved(newLocation)}>Okay</Button>
        </Container>
      </FloatingPanel>
    </PopupPanelRenderer>
  )
}
