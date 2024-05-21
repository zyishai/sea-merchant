import React, { useState } from "react";
import { Img, applyStyle } from "./styles.module.css";
import { Box, Button, Card, Dialog, Flex, Grid, Heading, IconButton, RadioCards, Separator, Tabs, Text, TextField, Tooltip } from "@radix-ui/themes";
import { GameLocation, useLocation } from "~/store/location";
import { ClockIcon, Cross1Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { compose, curry, pick } from "@holycow/state";
import { RestCommand, SailCommand } from "~/store/command";
import { processCommand } from "~/store/signals";
import { Product, products } from "~/store/product";
import { capitalize } from "~/utils";
import { useLocalMarket } from "~/hooks/use-local-market";
import { useWallet } from "~/store/wallet";
import { useBank } from "~/hooks/use-bank";

function ActionsPanel() {
  const location = useLocation();
  const { locations, currentLocation } = location;
  const [selected, setSelected] = useState<GameLocation|undefined>();
  const handleTravelCommand = compose(
    processCommand,
    () => new SailCommand(selected!)
  );
  const market = useLocalMarket();
  const setProduct = (product: Product) => compose(
    curry(market.set)(product),
    Number,
    pick('target.value')
  );
  const wallet = useWallet();
  const bank = useBank();
  const onUpdateAmount = compose(
    bank.updateRequested,
    Number,
    pick('target.value')
  )

  return (
    <CustomCard>
      <Flex direction='column' align='center' gap='5'>
        <Heading size='5'>Available Actions</Heading>
        <Grid columns='2' rows='2' gap='3'>
          <Dialog.Root onOpenChange={(open) => !open && setSelected(undefined)}>
            <Dialog.Trigger>
              <Button variant='soft' color='blue' size='3' highContrast>
                <Flex align='center' gap='2'>
                  <Img src='/ship.svg' alt='Ship' />
                  Travel
                </Flex>
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Travel</Dialog.Title>
              <Text color='gray' size='2' weight='medium'>Available locations</Text>
              {/* @ts-ignore */}
              <RadioCards.Root columns={{ initial: '1', sm: '2' }} color='blue' value={selected} onValueChange={setSelected} mt='3'>
                {Object.values(locations).map((location) => location.name !== currentLocation ? (
                  <RadioCards.Item key={location.name} value={location.name}>
                    <Flex direction='column' width='100%' height='100%' gap='3'>
                      <Flex gap='2'>
                        <Box flexBasis='0' asChild>
                          <Img src={`/flag-${location.name}.svg`} alt={location.displayName} />
                        </Box>
                        <Box flexGrow='1' asChild>
                          <Text weight='bold'>{location.displayName}</Text>
                        </Box>
                        {location.weather === 'storm' ? <Box flexBasis='0' asChild>
                          <Img src='/weather-storm.svg' alt='Storm' />
                        </Box> : null}
                      </Flex>
                      <Tooltip content='Travel time'>
                        <Flex align='center' gap='1'>
                          <ClockIcon />
                          <Text as='span' size='2' color='gray'>4 hours</Text>
                        </Flex>
                      </Tooltip>
                    </Flex>
                  </RadioCards.Item>
                ) : null)}
              </RadioCards.Root>
              <Separator size='4' my='4' />
              <Flex justify='end' align='center' gap='3'>
                <Dialog.Close>
                  <Button variant='surface' color='gray'>Cancel</Button>
                </Dialog.Close>
                <Dialog.Close disabled={!selected}>
                  <Button color='blue' onClick={handleTravelCommand}>
                    Go
                    <PaperPlaneIcon />
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
          <Button variant='soft' color='gray' size='3' highContrast onClick={() => processCommand(new RestCommand)}>
            <Flex align='center' gap='2'>
              <Img src='/sea.svg' alt='Sea' />
              Rest
            </Flex>
          </Button>
          <Dialog.Root onOpenChange={(open) => !open && market.clearBasket()}>
            <Dialog.Trigger>
              <Button variant='soft' color='green' size='3' highContrast>
                <Flex align='center' gap='2'>
                  <Img src='/shop.svg' alt='Shop' />
                  Visit Market
                </Flex>
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Goods Market</Dialog.Title>
              <Grid columns='3' gap='4' mt='5'>
                {products.map((product) => (
                  <Card key={product}>
                    <Flex gap='2' align='center'>
                      <Img src={`/${product}.svg`} alt={product} size='20px' />
                      <Text size='3' weight='medium'>{capitalize(product)}</Text>
                    </Flex>
                    <TextField.Root 
                      type='number' 
                      min={0}
                      value={market.basket[product] ?? 0}
                      onChange={setProduct(product)}
                      mt='3'>
                        <TextField.Slot side='right'>
                          <IconButton variant='ghost' onClick={() => market.clearBasket(product)}>
                            <Cross1Icon />
                          </IconButton>
                        </TextField.Slot>
                    </TextField.Root>
                    <Text as='div' size='1' color='gray' weight='medium' mt='1'>Cost: ${market.cost[product] ?? 0}</Text>
                  </Card>
                ))}
              </Grid>
              <Separator my='5' mx='auto' size='4' />
              <Flex gap='3' justify='center' mt='5'>
                <Button variant='solid' color='green' onClick={() => {
                  market.makePurchase();
                  market.clearBasket();
                }} disabled={!market.products}>Buy {market.products} product{market.products>1 ? 's' : null}</Button>
                <Button variant='solid' color='bronze' onClick={() => {
                  market.sellProducts();
                  market.clearBasket();
                }} disabled={!market.products}>Sell {market.products} product{market.products>1 ? 's' : null}</Button>
                <Dialog.Close>
                  <Button variant='outline'>Leave market</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
          <Dialog.Root onOpenChange={(open) => !open && bank.exit()}>
            <Dialog.Trigger>
              <Button variant='soft' color='gold' size='3' highContrast>
                <Flex align='center' gap='2'>
                  <Img src='/bank2.svg' alt='Bank' />
                  Visit Bank
                </Flex>
              </Button>
            </Dialog.Trigger>
            <Dialog.Content width='360px'>
              <Dialog.Title>Bank of {location.current.displayName}</Dialog.Title>
              {/* @ts-ignore */}
              <Tabs.Root value={bank.action} onValueChange={bank.changeAction}>
                <Tabs.List mb='4'>
                  <Tabs.Trigger value='deposit'>Deposit</Tabs.Trigger>
                  <Tabs.Trigger value='withdrawal'>Withdrawal</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value='deposit' asChild>
                  <Flex direction='column' gap='2'>
                    <Text size='2' weight='medium'>How much money would you like to deposit?</Text>
                    <TextField.Root type='number' value={bank.requested} onChange={onUpdateAmount} max={wallet.cash}>
                      <TextField.Slot side='left'>$</TextField.Slot>
                      <TextField.Slot side='right'> / ${wallet.cash}</TextField.Slot>
                    </TextField.Root>
                    <Dialog.Close>
                      <Button mt='3' onClick={() => {
                        bank.commit();
                        bank.exit();
                      }}>Make a deposit</Button>
                    </Dialog.Close>
                  </Flex>
                </Tabs.Content>
                <Tabs.Content value='withdrawal'>
                  <Flex direction='column' gap='2'>
                    <Text size='2' weight='medium'>How much money would you like to withdraw?</Text>
                    <TextField.Root type='number' value={bank.requested} onChange={onUpdateAmount} max={bank.balance}>
                      <TextField.Slot side='left'>$</TextField.Slot>
                      <TextField.Slot side='right'> / ${bank.balance}</TextField.Slot>
                    </TextField.Root>
                    <Dialog.Close>
                      <Button mt='3' onClick={() => {
                        bank.commit();
                        bank.exit();
                      }}>Withdraw money</Button>
                    </Dialog.Close>
                  </Flex>
                </Tabs.Content>
              </Tabs.Root>
            </Dialog.Content>
          </Dialog.Root>
        </Grid>
      </Flex>
    </CustomCard>
  )
}

const CustomCard = applyStyle('with_border_image', Box);

export default React.memo(ActionsPanel);
