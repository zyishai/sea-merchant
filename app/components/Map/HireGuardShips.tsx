import { useState } from "react";
import { QuantitySelector } from "../QuantitySelector";
import { Button, CenteredColumn, FlexRow } from "../primitives/styles.module.css";
import { useWallet } from "~/store/wallet";
import { useShip } from "~/store/ship";
import { Modal } from "../Modal";
import { processCommand } from "~/store/signals";
import { BuyGuardShipsCommand } from "~/store/command";
import { Paragraph } from "../Event/styles.module.css";
import { px } from "~/utils";

export function HireGuardShips({ onClose, children }: React.PropsWithChildren<{ onClose: () => void }>) {
  const [requested, setRequested] = useState(0);
  const { cash } = useWallet();
  const { pricePerGuardShip } = useShip();

  return (
    <Modal trigger={children}>
      <CenteredColumn gap={px(15)}>
        <h1>Hire guard ships?</h1>
        <Paragraph>
          You can buy <strong>{Math.floor(cash / pricePerGuardShip)}</strong> guard ships. <br />
          How many guard ships would you like to buy?
        </Paragraph>
        <QuantitySelector
          min={0}
          max={Math.floor(cash / pricePerGuardShip)}
          value={requested}
          onChange={setRequested} />
        <FlexRow>
          <Modal.CloseButton asChild onClick={() => {
            setRequested(0);
            onClose();
          }}>
            <Button
              variant='primary'
              color='blue'
              size='small'
              onClick={() => {
                if (requested === 0) return;
                processCommand(new BuyGuardShipsCommand(requested));
              }}>Purchase</Button>
          </Modal.CloseButton>
          <Modal.CloseButton asChild onClick={() => {
            setRequested(0);
            onClose();
          }}>
            <Button
              variant='secondary'
              size='small'>Continue alone</Button>
          </Modal.CloseButton>
        </FlexRow>
      </CenteredColumn>
    </Modal>
  )
}
