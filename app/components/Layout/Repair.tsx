import { useShip } from "~/store/ship";
import { Modal } from "../Modal";
import { Button, CenteredColumn } from "../primitives/styles.module.css";
import { px } from "~/utils";
import { QuantitySelector } from "../QuantitySelector";
import { useEffect, useState } from "react";
import { processCommand } from "~/store/signals";
import { RepairDamage } from "~/store/command";

export function Repair() {
  // const { damage } = useShip();
  const { damage } = { damage: 9 };
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    setAmount(1);
  }, []);

  return damage > 0 ? (
    <Modal trigger={
      <Button 
        variant='primary' 
        color='red' 
        size='big'
        style={{ alignSelf: 'center' }}>Repair your ship</Button>
    }>
      <CenteredColumn gap={px(15)}>
        <h1>Repair damage</h1>
        <p>Your ship has suffered {damage} damage. <br />How much would you like to repair?</p>
        <QuantitySelector
          min={1}
          max={damage}
          value={amount}
          onChange={setAmount} />
        <Modal.CloseButton asChild>
          <Button 
            variant='primary' 
            color='red'
            onClick={() => processCommand(new RepairDamage(amount))}>Repair</Button>
        </Modal.CloseButton>
      </CenteredColumn>
    </Modal>
  ) : null
}
