import { useEvent } from "~/hooks/use-event";
import { useAnimationStage } from "../AnimationStage";
import { Box, Button, Dialog, Flex, Grid, Heading, IconButton, RadioCards, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { Img, applyStyle } from "./styles.module.css";
import { GameEvent, Lost } from "~/store/event";
import { useLocation } from "~/store/location";
import { capitalize } from "~/utils";
import { useShip } from "~/store/ship";
import { Product, products } from "~/store/product";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

function Events() {
  const stage = useAnimationStage();
  const event = useEvent();

  return (
    <Dialog.Root open={!!event && stage.current === 'event'}>
      <Dialog.Content asChild>
        {
          event ? (
            <CustomCard style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
              {
                event.type === 'storm'
                  ? <StormsEvent event={event} />
                  : event.type === 'abandonedShip'
                    ? <AbandonedShipEvent event={event} />
                    : event.type === 'pirates'
                      ? <PiratesEvent event={event} />
                      : null
              }
            </CustomCard>
          ) : null
        }
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default React.memo(Events);

const CustomCard = applyStyle('with_border_image', Box);

function StormsEvent({ event }: { event: GameEvent & { type: 'storm' } }) {
  const location = useLocation();

  return (
    <Flex direction='column' align='center' gap='2' px='5'>
      <Heading size='8' style={{ fontFamily: 'Pirata One', letterSpacing: 2 }}>A storm hits!</Heading>
      <Text size='4' weight='medium'>
        {
          event.newLocation === location.currentLocation
          ? 'Unfortunately, you had to return back to shore.'
          : `The storm had changed your sailing course, and you arrived to ${capitalize(event.newLocation)} instead.`
        }
      </Text>
      <Dialog.Close>
        <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
      </Dialog.Close>
    </Flex>
  )
}
function AbandonedShipEvent({ event }: { event: GameEvent & { type: 'abandonedShip' }}) {
  return (
    <Flex direction='column' align='center' gap='2' px='5'>
      <Heading size='8' style={{ fontFamily: 'Pirata One', letterSpacing: 2 }}>You found an abandoned ship</Heading>
      <Text size='4' weight='medium'>
        {
          event.found.type === 'capacity'
          ? `On the ship you find an empty container.\nYour ship's capacity has increased by ${event.found.amount} tons.`
          : `On the ship you find ${event.found.amount} tons of ${event.found.type}.`
        }
      </Text>
      <Dialog.Close>
        <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
      </Dialog.Close>
    </Flex>
  )
}
function PiratesEvent({ event }: { event: GameEvent & { type: 'pirates' } }) {
  const { guardShips, goods } = useShip();
  const canFight = guardShips > 0;
  const canOffer = Object.values(goods).some(value => value > 0);
  const [action, setAction] = useState<'fight'|'escape'|'offer_request'|'offer_made'>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(0);

  return (
    <Flex direction='column' align='center' gap='2' px='5'>
      {!action ? <><Heading size='8' style={{ fontFamily: 'Pirata One', letterSpacing: 2 }}>Pirates attack!</Heading>
      <Text size='4' weight='medium'>
        Pirates attack you. {guardShips > 0 ? `You have ${guardShips} guard ships.` : "You don't have any guard ships."}
      </Text>
      <Text size='4' weight='medium'>Choose what you want to do:</Text>
      <Grid columns='3' gap='3' mt='3'>
        <Button 
          variant='soft' 
          color='gray' 
          highContrast
          disabled={!canFight}
          onClick={() => {
            setAction('fight');
            if (!event.onFight()) {
              event.onLost();
            }
          }}>Attack them</Button>
        <Button 
          variant='soft' 
          color='gray' 
          highContrast
          onClick={() => {
            setAction('escape');
            if (!event.onFight()) {
              event.onLost();
            }
          }}>Try to escape</Button>
        <Button 
          variant='soft' 
          color='gray' 
          highContrast
          disabled={!canOffer}
          onClick={() => setAction('offer_request')}>Offer them goods</Button>
      </Grid></> : (
        action === 'fight'
          ? event.status === 'won' ? (
            <>
              <Heading>You won!</Heading>
              <Text>Your attack was successfull and you defeated the pirates.</Text>
              <Dialog.Close>
                <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
              </Dialog.Close>
            </>
          ) : (
            <>
              <Heading>You lost..</Heading>
              <Text>The pirates' attack was stronger, {!event.lost || event.lost.type === 'nothing'
                ? 'but you managed to protect your goods.'
                : event.lost.type === 'money' ? `and you lost $${event.lost.amount}.` : `and you lost ${event.lost.amount} tons of ${event.lost.type}.`}
              </Text>
              {event.lost?.damage ? <Text>Your ship has suffered {event.lost.damage} damage.</Text> : null}
              <Dialog.Close>
                <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
              </Dialog.Close>
            </>
          )
          : action === 'escape'
            ? event.status === 'won'
              ? (
                <>
                  <Heading>Escaped successfully!</Heading>
                  <Text>The pirates have tried to chase you down, but you managed to escape them.</Text>
                  <Dialog.Close>
                    <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
                  </Dialog.Close>
                </>
              )
              : (
                <>
                  <Heading>Captured..</Heading>
                  <Text>The pirates have captured you, {!event.lost || event.lost.type === 'nothing'
                    ? 'but luckily they didn\'t take any of your goods.'
                    : event.lost.type === 'money' ? `and took $${event.lost.amount} before releasing you.` : `and took ${event.lost.amount} tons of ${event.lost.type} before releasing you.`}
                  </Text>
                  {event.lost?.damage ? <Text>Your ship has suffered {event.lost.damage} damage.</Text> : null}
                  <Dialog.Close>
                    <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
                  </Dialog.Close>
                </>
              )
            : action === 'offer_request' ? (
              <>
                <Heading size='7'>Make an Offer</Heading>
                <Flex direction='column' align='center' gap='3'>
                  <Text>What would you like to offer?</Text>
                  <RadioCards.Root 
                    size='2' 
                    columns='3' 
                    color='gray' 
                    highContrast
                    value={product}
                    // @ts-ignore
                    onValueChange={setProduct}>
                    {products.map((product) => (
                      <RadioCards.Item value={product} key={product} disabled={!goods[product]}>
                        <Img src={`/${product}.svg`} alt={product} />
                        <Text>{capitalize(product)}</Text>
                      </RadioCards.Item>
                    ))}
                  </RadioCards.Root>
                  {product ? <><Text>How much {product} do you want to offer?</Text>
                  <TextField.Root type='number' value={quantity} onChange={(e) => setQuantity(+e.target.value)} style={{ textAlign: 'center' }}>
                    <TextField.Slot side='left'>
                      <IconButton variant='ghost' color='gray' onClick={() => setQuantity(q => Math.max(0, q - 1))}>
                        <MinusIcon />
                      </IconButton>
                    </TextField.Slot>
                    <TextField.Slot side='right'>
                      <IconButton variant='ghost' color='gray' onClick={() => setQuantity(q => Math.max(0, q + 1))}>
                        <PlusIcon />
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                  <Button color='gray' highContrast onClick={() => {
                    if (!event.onOffer(product, quantity)) {
                      event.onLost();
                    }
                  }}>Continue</Button></> : null}
                </Flex>
              </>
            ) : event.status === 'won' ? (
              <>
                <Heading>Offer accepted!</Heading>
                <Text>The pirates have decided to accept your offer.</Text>
                <Dialog.Close>
                  <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
                </Dialog.Close>
              </>
            ) : (
              <>
                <Heading>Offer declined..</Heading>
                <Text>The pirates have declined your offer, {!event.lost || event.lost.type === 'nothing'
                  ? 'but another ship came to your aid and chased the pirates away before they could rob you.'
                  : event.lost.type === 'money' ? `and instead, robbed you of $${event.lost.amount}.` : `and instead, took ${event.lost.amount} tons of ${event.lost.type}.`}
                </Text>
                {event.lost?.damage ? <Text>Your ship has suffered {event.lost.damage} damage.</Text> : null}
                <Dialog.Close>
                  <Button color='gray' highContrast mt='3' onClick={event.onEventResolved}>Continue</Button>
                </Dialog.Close>
              </>
            )
      )}
    </Flex>
  )
}
