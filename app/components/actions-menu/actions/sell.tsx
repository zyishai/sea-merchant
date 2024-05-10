import { 
  Container, 
  GoodsPicker, 
  Image, 
  Item, 
  TransactionContainer, 
  TransactionForm,
  Field } from './sell.module.css';
import { Product, products, useLocation, useShip, useWallet } from "~/store/game";
import { useState } from "react";
import { capitalize } from "~/utils";
import { compose, pick } from "@holycow/state";
import { Modal } from "~/components/Modal";
import { ActionButton } from "../styles.module.css";

export function SellAction() {
  return (
    <Modal
      trigger={<ActionButton>Sell</ActionButton>}>
      <SellPanel />
    </Modal>
  )
}

function SellPanel() {
  const sell = useWallet('sell');
  const goods = useShip('goods');
  const currentLocation = useLocation('currentLocation');
  const { prices } = useLocation(currentLocation);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [quantity, setQuantity] = useState(1);
  const onSetQuantity = compose(
    setQuantity,
    Number,
    pick('target.value')
  )

  return (
    <Container>
      <h1>What kind of goods would you like to sell?</h1>

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
          <h3>You can sell {goods[products[selectedProduct]]} Ton(s) of {selectedProduct}</h3>
          <p>How much would you like to buy?</p>
          <TransactionForm>
            <Field>
              <input type="number" value={quantity} onChange={onSetQuantity} min={1} max={goods[products[selectedProduct]]} />
              <small>Estimated price: ${quantity * prices[products[selectedProduct]]}</small>
            </Field>
            <Modal.CloseButton onClick={() => {
              try {
                sell(selectedProduct, quantity);
              } catch(error) {
                // TODO
                console.error(error);
              }
            }}>Sell</Modal.CloseButton>
          </TransactionForm>
        </TransactionContainer>)
        : null}
    </Container>
  )
}
