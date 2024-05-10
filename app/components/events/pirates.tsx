import { px, randInt, url } from "~/utils";
import { PopupPanelRenderer } from "../Layout/popup-panel-row";
import { FloatingPanel } from "../Layout/styles.module.css";
import { BackgroundImage, Container, Title, Text, Button } from "./styles.module.css";
import { Product, loseGoodsOrMoney, products, useShip, useWallet } from "~/store/game";
import { EngagementActions, EngagementContent, EngagementOption, EngagementsContainer, EvenlySpaced, Field, SmallButton } from "./pirates.module.css";
import { useEffect, useMemo, useState } from "react";
import { GoodsPicker } from "../goods-picker";
import { useLocalError } from "~/hooks/use-error";
import { useStage } from "~/hooks/use-stage";
import { compose, pick } from "@holycow/state";

type Props = {
  onEventResolved: () => void;
  piratesPower: number;
}
export function PiratesEvent({ piratesPower, onEventResolved }: Props) {
  const { guardShips, takeDamage, ...ship } = useShip();
  const wallet = useWallet();
  const hasGuardShips = guardShips > 0;
  const [engagementType, setEngagementType] = useState<'fight'|'escape'|'offer'|null>(null);
  const [engagementComponent, setEngagementComponent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    switch(engagementType) {
      case 'fight': {
        const won = guardShips >= piratesPower;
        const damage = !won
          ? piratesPower - guardShips
          : guardShips === piratesPower
            ? Math.floor((piratesPower - guardShips) / 2)
            : 0;
        const { type, quantity } = loseGoodsOrMoney();

        // @ts-ignore
        setEngagementComponent(<FightResult 
                                  won={won} 
                                  damage={damage}
                                  productLost={type} 
                                  quantityLost={quantity}
                                  onResolve={() => {
                                    if (damage > 0) {
                                      takeDamage(damage);
                                    }
                                    if (!won) {
                                      if (type === 'money') {
                                        wallet.set('cash', c => Math.max(0, c - quantity));
                                      } else {
                                        ship.set(`goods.${products[type]}`, g => Math.max(0, g - quantity));
                                      }
                                    }
                                    onEventResolved();
                                  }} />
                              );
        break;
      }
      case 'escape': {
        const succeed = guardShips >= piratesPower;
        const damage = !succeed
          ? piratesPower - guardShips
          : guardShips === piratesPower
            ? Math.floor((piratesPower - guardShips) / 2)
            : 0;
        const { type, quantity } = loseGoodsOrMoney();
        setEngagementComponent(<EscapeResult
                                  succeed={succeed}
                                  damage={damage}
                                  productLost={type}
                                  quantityLost={quantity}
                                  onResolve={() => {
                                    if (damage > 0) {
                                      takeDamage(damage);
                                    }
                                    if (!succeed) {
                                      if (type === 'money') {
                                        wallet.set('cash', c => Math.max(0, c - quantity));
                                      } else {
                                        ship.set(`goods.${products[type]}`, g => Math.max(0, g - quantity));
                                      }
                                    }
                                    onEventResolved()
                                  }} />
                              );
        break;
      }
      case 'offer': {
        setEngagementComponent(<OfferResult onResolve={(lost?: {type: Product|'money', quantity: number}) => {
          if (lost) {
            if (lost.type === 'money') {
              wallet.set('cash', c => Math.max(0, c - lost.quantity));
            } else {
              ship.set(`goods.${products[lost.type]}`, g => Math.max(0, g - lost.quantity));
            }
          }

          onEventResolved();
        }} />);
        break;
      }
    }
  }, [engagementType]);

  return (
    <PopupPanelRenderer>
      <FloatingPanel>
        <Container>
          <BackgroundImage src={url('/pirates-bg.jpeg')} />
          <Title noBlending>Pirates Attack!</Title>
          <Text noBlending>Pirates attack you; {hasGuardShips
            ? `You have ${guardShips} guard ships.`
            : 'You don\'t have any guard ships.'
          }</Text>
          <EngagementsContainer>
            <EngagementActions show={!engagementType}>
              {hasGuardShips ? <EngagementOption onClick={() => setEngagementType('fight')}>Fight them</EngagementOption> : null}
              <EngagementOption onClick={() => setEngagementType('escape')}>Attempt to escape</EngagementOption>
              <EngagementOption onClick={() => setEngagementType('offer')}>Offer them some goods</EngagementOption>
            </EngagementActions>
            {engagementType ? <EngagementContent>
              {engagementComponent}
            </EngagementContent> : null}
          </EngagementsContainer>
        </Container>
      </FloatingPanel>
    </PopupPanelRenderer>
  )
}

type FightProps = { won: boolean; damage: number; onResolve: () => void; } & ({ productLost: Product | 'money'; quantityLost: number; } | { productLost: undefined; quantityLost: undefined; });
function FightResult(props: FightProps) {
  const { won, damage, productLost, quantityLost, onResolve } = props;

  return (
    <Container>
      <Title>You have {won ? 'won!' : 'lost!'}</Title>
      {
        won
        ? <Text>You managed to win{damage
          ? ', but your ship has suffered some damage.'
          : ' without getting any damage.'}</Text>
        : <Text>Your ship has suffered damage{productLost
          ? `, and you lost ${productLost === 'money' ? `$${quantityLost}` : `${quantityLost} ${productLost}`}.`
          : '.'}</Text>
      }
      <Button onClick={onResolve}>Continue</Button>
    </Container>
  )
}

type EscapeProps = { succeed: boolean; damage: number; onResolve: () => void; } & ({ productLost: Product | 'money'; quantityLost: number; } | { productLost: undefined; quantityLost: undefined; });
function EscapeResult(props: EscapeProps) {
  const { succeed, damage, productLost, quantityLost, onResolve } = props;

  return (
    <Container>
      <Title>{succeed ? 'You escaped the pirates!' : 'Your escape fails!'}</Title>
      {
        succeed
        ? <Text>You managed to escape{damage
          ? ', but your ship has suffered some damage.'
          : ' without getting any damage.'}</Text>
        : <Text>Your ship has suffered damage{productLost
          ? `, and you lost ${productLost === 'money' ? `$${quantityLost}` : `${quantityLost} ${productLost}`}.`
          : '.'}</Text>
      }
      <Button onClick={onResolve}>Continue</Button>
    </Container>
  )
}

type OfferResult = {
  onResolve: (lost?: {type: Product|'money', quantity: number}) => void;
};
function OfferResult(props: OfferResult) {
  const { goods } = useShip();
  const stage = useStage({
    stages: ['offer', 'resolution'],
    initialStage: 'offer'
  });
  const error = useLocalError();
  const [product, setProduct] = useState<Product>();
  const onSetProduct = compose(
    error.clear,
    setProduct,
  );
  const [quantity, setQuantity] = useState<number>();
  const onSetQuantity = compose(
    error.clear,
    setQuantity,
    Number,
    pick('target.value')
  );
  const accepted = useMemo(() => !!quantity && !!product && quantity >= randInt(0, goods[products[product]]), [quantity, product]);
  const lost = useMemo(() => {
    let temp = loseGoodsOrMoney();

    if (!accepted) return temp;

    // @ts-ignore
    while (temp.type === product && temp.quantity <= quantity) {
      temp = loseGoodsOrMoney();
    }

    return temp;
  }, [accepted]);

  return (
    <Container>
      <Title style={{ marginBottom: 20 }}>Make an offer to the pirates</Title>
      {stage.current === 'offer'
        ? (
          <EvenlySpaced align='center' gap={px(15)}>
            <GoodsPicker onProductSelected={onSetProduct} />
            <Text>How much {product} do you offer to the pirates?</Text>
            <EvenlySpaced orientation="horizontal" align='center'>
              <Field>
                <input type="number" min={0} placeholder="0" onChange={onSetQuantity} />
              </Field>
              <strong><small>Tons</small></strong>
            </EvenlySpaced>
            <SmallButton onClick={() => {
              if (!product) {
                error.set('Please select a product.');
                return;
              }
              if (!quantity || isNaN(quantity)) {
                error.set('Invalid quantity. Please offer at least 1T of product.');
                return;
              }
              if (goods[products[product]] < quantity) {
                error.set(`You don't have enough ${product} on your ship.`);
                return;
              }

              error.clear();
              stage.next();
            }}>Make an offer</SmallButton>
            <small style={{ color: 'red' }}>{error.message}</small>
          </EvenlySpaced>
        )
        : <EvenlySpaced gap={px(20)}>
            {accepted
              ? <Text>The pirates have decided to accept your offer.</Text>
              : <EvenlySpaced align="center">
                <Text>The pirates have declined your offer!</Text>
                <Text>You lose {lost.type === 'money' ? `$${lost.quantity}` : `${lost.quantity} ${lost.type}`}.</Text>
              </EvenlySpaced>
            }
            <SmallButton onClick={() => props.onResolve(accepted&&product&&quantity ? ({ type: product, quantity }) : lost)}>Continue</SmallButton>
          </EvenlySpaced>
      }
    </Container>
  )
}
