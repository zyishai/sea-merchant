import { GameLocation, useLocation } from "~/store/location";
import { Button, CenteredColumn, Separator } from "../primitives/styles.module.css";
import { px, rem } from "~/utils";
import { Tabs } from "../Tabs";
import { useStage } from "~/hooks/use-stage";
import { ProductSelector } from "../ProductSelector";
import { useEffect, useMemo, useState } from "react";
import { Product } from "~/store/product";
import { CenteredText } from "./styles.module.css";
import { useShip } from "~/store/ship";
import { useWallet } from "~/store/wallet";
import { QuantitySelector } from "../QuantitySelector";
import { processCommand } from "~/store/signals";
import { BuyCommand, SellCommand } from "~/store/command";
import { Modal } from "../Modal";

export function Market({ locationName }: { locationName: GameLocation }) {
  const location = useLocation(`locations.${locationName}`);

  return (
    <CenteredColumn padding="10px 15px">
      <h1 style={{fontSize: rem(1.5)}}>Welcome to {location.displayName}'s market!</h1>
      <Separator width="100%" margin={px(10)} />
      <Tabs defaultValue="buy">
        <Tabs.Tab
          value='buy'
          trigger="Buy">
            <BuyScreen />
        </Tabs.Tab>
        <Tabs.Tab
          value='sell'
          trigger="Sell">
            <SellScreen />
        </Tabs.Tab>
      </Tabs>
    </CenteredColumn>
  )
}

function BuyScreen() {
  const stage = useStage({ stages: ['product', 'quantity'] });
  const [product, setProduct] = useState<Product|undefined>();
  const [quantity, setQuantity] = useState(1);
  const ship = useShip();
  const location = useLocation();
  const wallet = useWallet();
  const canBuy = useMemo(() => product ? Math.min(ship.capacity - ship.volume, Math.floor(wallet.cash / location.current.prices[product])) : 0, [product]);
  const onPurchase = () => {
    if (!product || !quantity) return; // TODO - alert user
    processCommand(new BuyCommand(product, quantity));
  }

  useEffect(() => {
    setQuantity(1);
    if (product) {
      stage.set('quantity');
    } else {
      stage.set('product');
    }
  }, [product]);

  return (
    <CenteredColumn gap={px(15)}>
      <strong>What do you want to buy?</strong>
      <ProductSelector value={product} onChange={setProduct} />
      {stage.current === 'quantity'
        ? <>
          <CenteredText>
            You've selected <em>{product}</em>.<br />
            You can buy <strong>{canBuy}</strong> of this product.<br />
            How much would you like to buy?
          </CenteredText>
          <QuantitySelector 
            min={1} 
            max={canBuy}
            value={quantity}
            onChange={setQuantity} />
        </>
        : null
      }
      <Modal.CloseButton asChild>
        <Button
          variant='primary' 
          color='jade'
          onClick={onPurchase}>Purchase</Button>
      </Modal.CloseButton>
    </CenteredColumn>
  )
}

function SellScreen() {
  const stage = useStage({ stages: ['product', 'quantity'] });
  const [product, setProduct] = useState<Product|undefined>();
  const [quantity, setQuantity] = useState(1);
  const ship = useShip();
  const canSell = useMemo(() => product ? ship.goods[product] : 0, [product]);
  const onSell = () => {
    if (!product || !quantity) return; // TODO - alert user
    processCommand(new SellCommand(product, quantity));
  }

  useEffect(() => {
    setQuantity(1);
    if (product) {
      stage.set('quantity');
    } else {
      stage.set('product');
    }
  }, [product]);

  return (
    <CenteredColumn gap={px(15)}>
      <strong>What do you want to sell?</strong>
      <ProductSelector value={product} onChange={setProduct} />
      {stage.current === 'quantity'
        ? <>
          <CenteredText>
            You've selected <em>{product}</em>.<br />
            You can sell <strong>{canSell}</strong> of this product.<br />
            How much would you like to sell?
          </CenteredText>
          <QuantitySelector 
            min={1} 
            max={canSell}
            value={quantity}
            onChange={setQuantity} />
        </>
        : null
      }
      <Modal.CloseButton asChild>
        <Button
          variant='primary' 
          color='jade'
          onClick={onSell}>Sell</Button>
      </Modal.CloseButton>
    </CenteredColumn>
  )
}
