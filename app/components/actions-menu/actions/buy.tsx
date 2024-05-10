import {
  Container, 
  GoodsPicker, 
  Image, 
  Item, 
  TransactionContainer, 
  TransactionForm,
  Field
} from './buy.module.css';
import { Product, products, useLocation, useWallet } from "~/store/game";
import { capitalize } from "~/utils";
import { useState } from "react";
import { compose, pick } from '@holycow/state';
import React from "react";
import { ActionButton } from "../styles.module.css";
import { Modal } from "~/components/Modal";

export function BuyAction() {
  return (
    <Modal
      trigger={<ActionButton>Buy</ActionButton>}>
      <BuyPanel />
    </Modal>
  )
}

const BuyPanel = React.forwardRef((props, ref: any) => {
  const [cash, buy] = useWallet('cash', 'buy');
  const currentLocation = useLocation('currentLocation');
  const { prices } = useLocation(currentLocation);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [quantity, setQuantity] = useState(1);
  const onSetQuantity = compose(
    setQuantity,
    Number,
    pick('target.value')
  );
  const availableForBuying = selectedProduct ? Math.floor(cash / prices[products[selectedProduct]]) : 0;

  return (
      <Container>
        <h1>What kind of goods would you like to buy?</h1>

        <GoodsPicker>
          {(Object.keys(products) as Product[]).map((product: Product) => (
            <Item key={product} selected={selectedProduct === product} onClick={() => setSelectedProduct(product)}>
              <h3>{capitalize(product)}</h3>
              <Image src={`public/${product}.svg`} />
            </Item>
          ))}
        </GoodsPicker>

        {!!selectedProduct
          ? (<TransactionContainer>
            <h3>You can buy {availableForBuying} Ton(s) of {selectedProduct}</h3>
            <p>How much would you like to buy?</p>
            <TransactionForm>
              <Field>
                <input type="number" value={quantity} onChange={onSetQuantity} min={1} max={availableForBuying} />
                <small>Estimated price: ${quantity * prices[products[selectedProduct]]}</small>
              </Field>
              <Modal.CloseButton onClick={() => {
                try {
                  buy(selectedProduct, quantity);
                } catch(error) {
                  // TODO
                  console.error(error);
                }
              }}>Buy</Modal.CloseButton>
            </TransactionForm>
          </TransactionContainer>)
          : null}
      </Container>
  )
});
