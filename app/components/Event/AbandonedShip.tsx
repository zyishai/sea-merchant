import { useEvent } from "~/hooks/use-event";
import { Modal } from "../Modal";
import { BorderedCard, Button, CenteredColumn } from "../primitives/styles.module.css";
import { Paragraph, Title } from "./styles.module.css";
import { px, url } from "~/utils";

export function AbandonedShipEvent() {
  const event = useEvent();
  const isOpen = !!event && event.type === 'abandonedShip';

  return (
    <Modal open={isOpen} contentCard={(props) => <BorderedCard {...props} image={url('/paper.svg')} padding="50px 60px" />}>
      {isOpen
        ? (
          <CenteredColumn padding={px(0)}>
            <Title>You found an abandoned ship</Title>
            {event.found.type === 'capacity'
              ? <Paragraph>On the ship you find an empty container.<br />Your ship's capacity has increased by <strong>{event.found.amount} tons.</strong></Paragraph>
              : <Paragraph>On the ship you find <strong>{event.found.amount} tons</strong> of {event.found.type}.</Paragraph>
            }
            <Modal.CloseButton asChild style={{marginTop: 15}} onClick={event.onEventResolved}>
              <Button variant='primary' color='jade'>Continue</Button>
            </Modal.CloseButton>
          </CenteredColumn>
        )
        : null
      }
    </Modal>
  )
}
