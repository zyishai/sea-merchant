import { useEvent } from "~/hooks/use-event";
import { Modal } from "../Modal";
import { BorderedCard, Button, CenteredColumn } from "../primitives/styles.module.css";
import { px, url } from "~/utils";
import { Paragraph, Title } from "./styles.module.css";
import { useEffect, useState } from "react";
import { Lost } from "~/store/event";
import { useShip } from "~/store/ship";
import { motion } from "framer-motion";
import { ProductSelector } from "../ProductSelector";
import { Product } from "~/store/product";
import { QuantitySelector } from "../QuantitySelector";

export function PiratesEvent() {
  const event = useEvent();
  const isOpen = !!event && event.type === 'pirates';
  const { guardShips, goods } = useShip();
  const canFight = guardShips > 0;
  const canOffer = Object.values(goods).some(v => v > 0);
  const [action, setAction] = useState<'fight'|'escape'|'offer'|undefined>();
  const [lost, setLost] = useState<Lost|undefined>();

  useEffect(() => {
    if (!event || event.type !== 'pirates') {
      setAction(undefined);
      setLost(undefined);
    }
  }, [event]);

  return (
    <Modal open={isOpen} contentCard={(props) => <BorderedCard {...props} image={url('/pirates-flag.svg')} padding="40px 60px" />}>
      {isOpen
        ? (
          <div style={{color: '#fff'}}>
            <CenteredColumn gap={px(0)}>
              {typeof action === 'undefined'
                ? (
                  <>
                    <Title>Pirates attack!</Title>
                    <Paragraph>
                      Pirates attack you.
                      {guardShips > 0 ? `You have ${guardShips} guard ships.` : "You don't have any guard ships."}<br />
                      What do you do?
                    </Paragraph>
                    <div style={{display:'flex', gap:10, marginTop: 20}}>
                      <AnimatedButton 
                        variant='primary' 
                        color='white'
                        size='small'
                        disabled={!canFight}
                        whileHover={canFight ? { scale: 1.05 } : undefined}
                        whileTap={canFight ? { scale: 0.9 } : undefined}
                        onClick={() => {
                          setAction('fight');
                          setLost(event.onFight() ? undefined : event.onLost());
                        }}>Attack them</AnimatedButton>
                      <AnimatedButton
                        variant='primary'
                        color='white'
                        size='small'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setAction('escape');
                          setLost(event.onEscape() ? undefined : event.onLost());
                        }}>Try to escape</AnimatedButton>
                      
                      <Modal 
                        trigger={<AnimatedButton 
                          variant='primary'
                          color='white'
                          size='small'
                          disabled={!canOffer}
                          whileHover={canOffer ? { scale: 1.05 } : undefined}
                          whileTap={canOffer ? { scale: 0.9 } : undefined}>Offer them goods</AnimatedButton>}>
                        <Offer onOffered={(product, amount) => {
                          setAction('offer');
                          setLost(event.onOffer(product, amount) ? undefined : event.onLost());
                        }} />
                      </Modal>
                    </div>
                  </>
                )
                : <>
                  {typeof lost === 'undefined'
                    ? (action === 'fight'
                        ? (
                          <>
                            <Title>You won!</Title>
                            <Paragraph>Your attack was successfull and you defeated the pirates.</Paragraph>
                          </>
                        )
                        : action === 'escape'
                          ? (
                            <>
                              <Title>Escaped successfully!</Title>
                              <Paragraph>The pirates have tried to chase you down, but you managed to escape them.</Paragraph>
                            </>
                          )
                          : (
                            <>
                              <Title>Offer accepted!</Title>
                              <Paragraph>The pirates have decided to accept your offer.</Paragraph>
                            </>
                          )
                    )
                    : (action === 'fight'
                      ? (
                        <>
                          <Title>You lost..</Title>
                          <Paragraph>
                            The pirates' attack was stronger, {
                              lost.type === 'nothing' 
                                ? 'but you managed to protect your goods.'
                                : lost.type === 'money'
                                  ? `and you lost $${lost.amount}.`
                                  : `and you lost ${lost.amount} tons of ${lost.type}.`
                            } <br />
                            {typeof lost.damage === 'number' && lost.damage > 0 ? `Your ship has suffered ${lost.damage} damage.` : null}
                          </Paragraph>
                        </>
                      )
                      : action === 'escape'
                        ? (
                          <>
                            <Title>Attempt failed..</Title>
                            <Paragraph>
                              The pirates have captured you, {
                                lost.type === 'nothing'
                                  ? 'but luckily they didn\'t take any of your goods.'
                                  : lost.type === 'money'
                                    ? `and took $${lost.amount} before releasing you.`
                                    : `and took ${lost.amount} tons of ${lost.type} before releasing you.`
                              } <br />
                              {typeof lost.damage === 'number' && lost.damage > 0 ? `Your ship has suffered ${lost.damage} damage.` : null}
                            </Paragraph>
                          </>
                        )
                        : (
                          <>
                            <Title>Offer declined..</Title>
                            <Paragraph>
                              The pirates have declined your offer, {
                                lost.type === 'nothing'
                                  ? 'but another ship came to your aid and chased the pirates away before they could rob you.'
                                  : lost.type === 'money'
                                    ? `and instead, robbed you of $${lost.amount}.`
                                    : `and instead, took ${lost.amount} tons of ${lost.type}.`
                              } <br />
                              {typeof lost.damage === 'number' && lost.damage > 0 ? `Your ship has suffered ${lost.damage} damage.` : null}
                            </Paragraph>
                          </>
                        )
                  )}
                  <Modal.CloseButton asChild style={{marginTop: 15}}>
                    <Button variant="primary" color='white' onClick={() => event.onEventResolved(lost)}>Continue</Button>
                  </Modal.CloseButton>
                  </>
              }
            </CenteredColumn>
          </div>
        )
        : null
      }
    </Modal>
  )
}

const AnimatedButton = motion(Button);

function Offer({ onOffered }: { onOffered: (product: Product, quantity: number) => void }) {
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(0);
  const ship = useShip();

  return (
    <CenteredColumn>
      <strong>What do you want to offer?</strong>
      <ProductSelector value={product} onChange={setProduct} />
      {product
        ? (
          <>
            <p>How many tons do you offer to the pirates?</p>
            <QuantitySelector min={0} max={ship.goods[product]} value={quantity} onChange={setQuantity} />
            <Button variant='primary' color='jade' onClick={() => onOffered(product, quantity)}>Set offer</Button>
          </>
        )
        : null
      }
    </CenteredColumn>
  )
}
