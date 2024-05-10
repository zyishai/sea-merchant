import { Product, products, useShip } from "~/store/game";
import { PopupPanelRenderer } from "../Layout/popup-panel-row";
import { FloatingPanel } from "../Layout/styles.module.css";
import { Button, Container, Title, Text } from "./styles.module.css";

type Props = {
  product: Product;
  quantity: number;
  onEventResolved: () => void;
}
export function GoodsEvent({ product, quantity, onEventResolved }: Props) {
  const ship = useShip();

  return (
    <PopupPanelRenderer>
      <FloatingPanel>
        <Container>
          <Title>You've found an abandoned ship</Title>
          <Text>On the ship you found {quantity}T of {product}.</Text>
          <Button variant='small' onClick={() => {
            ship.set(`goods.${products[product]}`, g => g + quantity);
            onEventResolved();
          }}>Continue</Button>
        </Container>
      </FloatingPanel>
    </PopupPanelRenderer>
  )
}
