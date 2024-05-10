import { Modal } from "../Modal";
import { useEvent } from "~/hooks/use-event";
import { capitalize, px, url } from "~/utils";
import { useLocation } from "~/store/location";
import { Paragraph, Title } from "./styles.module.css";
import { BorderedCard, Button, CenteredColumn } from "../primitives/styles.module.css";

export function StormEvent() {
  const event = useEvent();
  const isOpen = !!event && event.type === 'storm';
  const { currentLocation } = useLocation();

  return (
    <Modal open={isOpen} contentCard={(props) => <BorderedCard {...props} image={url('/map-paper.svg')} padding='30px 40px' mode='whiteCast' />}>
      {isOpen
        ? (
          <CenteredColumn padding={px(0)}>
            <Title>A storm hits!</Title>
            {event.newLocation === currentLocation
              ? <Paragraph>Unfortunately, you had to return back to shore.</Paragraph>
              : <Paragraph>The storm had changed your sailing course, and you arrived to {capitalize(event.newLocation)} instead.</Paragraph>
            }
            <Modal.CloseButton asChild style={{marginTop: 15}}>
              <Button variant='primary' color='black' onClick={event.onEventResolved}>
                Continue
              </Button>
            </Modal.CloseButton>
          </CenteredColumn>
        )
        : null
      }
    </Modal>
  )
}
