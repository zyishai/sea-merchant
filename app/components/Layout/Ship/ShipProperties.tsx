import { Box, Button, Flex, Grid, Heading, Popover, Text, TextField, Tooltip } from "@radix-ui/themes";
import { useShip } from "~/store/ship";
import { IconLabel } from "../IconLabel";
import React, { useMemo, useState } from "react";
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import { motion, useTime, useTransform, wrap } from 'framer-motion';
import { Img } from "../styles.module.css";
import { compose, pick } from "@holycow/state";
import { processCommand } from "~/store/signals";
import { BuyGuardShipsCommand, RepairDamageCommand } from "~/store/command";

const AnimatedTriangleLeftIcon = motion(TriangleLeftIcon);

function ShipProperties() {
  const { capacity, volume, guardShips, damage, canSail, pricePerGuardShip } = useShip();
  const translateX = useCycledTransform(2000, useMemo(() => [-2, 0, 2, 0, -2], []), { clamp: false });
  const [repair, setRepair] = useState(0);
  const handleSetRepair = compose(
    setRepair,
    Number,
    pick('target.value')
  );
  const handleRepairCommand = compose(
    () => setRepair(0),
    processCommand,
    () => new RepairDamageCommand(repair)
  );
  const [hired, setHired] = useState(0);
  const handleSetHired = compose(
    setHired,
    Number,
    pick('target.value')
  );
  const handleHireGuardShipsCommand = compose(
    () => setHired(0),
    processCommand,
    () => new BuyGuardShipsCommand(hired)
  );

  return (
      <Grid columns='2' gapX='3' gapY='5'>
        <Box gridColumn='1 / span 2'>
          <IconLabel icon='/container.svg' alt='Capacity' tooltip="Capacity">{volume} / {capacity} Tons</IconLabel>
        </Box>
        <IconLabel icon='/shield.svg' alt='Guard ship' tooltip="Guard ships">
          <Popover.Root>
            <Tooltip content='Click to hire more'>
              <Popover.Trigger>
                  <Button variant='ghost' color='blue' highContrast>
                    {guardShips}
                  </Button>
              </Popover.Trigger>
            </Tooltip>
            <Popover.Content>
              <Flex gap='3'>
                <Img src='/shield.svg' alt='Shield' size='26px' />
                <Box flexGrow='1'>
                  <Heading as='h1' size='5'>Hire Guard Ships</Heading>
                  <Text as='p' color='gray'>You currently have {guardShips} guard ships.</Text>
                  <Flex gap='2' width='360px' mt='4'>
                    <Box flexGrow='1'>
                      <TextField.Root
                        type='number'
                        min={0}
                        value={hired}
                        onChange={handleSetHired}></TextField.Root>
                    </Box>
                    <Popover.Close onClick={handleHireGuardShipsCommand}>
                      <Button variant='solid'>Hire ships</Button>
                    </Popover.Close>
                  </Flex>
                  <Text as='div' size='2' color='gray' mt='1'>Estimated cost: ${pricePerGuardShip * hired}</Text>
                </Box>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </IconLabel>
        {damage > 0 ? <IconLabel icon='/damage.svg' alt='Damage' tooltip="Damage">
          <Popover.Root>
            <Popover.Trigger>
              <Button variant='ghost' color='red'>
                <Tooltip content="Click to fix damage">
                  <Flex align='center' gap='1'>
                    {damage}
                    <AnimatedTriangleLeftIcon style={{ translateX }} />
                  </Flex>
                </Tooltip>
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Flex gap="3">
                <Img src='/damage.svg' alt="Damage" size='26px' />
                <Box flexGrow='1'>
                  <Heading as='h1' size='5'>Repair Damage</Heading>
                  <Text as='p' color='gray'>Your ship has suffered {damage} damage{!canSail ? ' and it can\'t sail.' : null}.</Text>
                  {damage > 1 ? <Flex gap='2' width='360px' mt='4'>
                    <Box flexGrow='1'>
                      <TextField.Root 
                        type='number' 
                        min={0}
                        max={damage} 
                        value={repair}
                        onChange={handleSetRepair}></TextField.Root>
                    </Box>
                    <Popover.Close onClick={handleRepairCommand}>
                      <Button variant="solid" color='red'>Repair damage</Button>
                    </Popover.Close>
                  </Flex> : <Popover.Close onClick={handleRepairCommand}>
                    <Button variant='solid' color='red' mt='4'>Repair 1 damage</Button>
                  </Popover.Close>}
                  <Text as='div' size='2' color='red' weight='medium' mt='1'>Estimated cost: ${repair * 50}</Text>
                </Box>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </IconLabel> : null}
      </Grid>
  )
}

export default React.memo(ShipProperties);

function useCycledTransform(duration: number, outputRange: number[], options?: { clamp?: boolean }) {
  const time = useTime();
  const cycle = useTransform(time, value => wrap(0 , duration, value));
  const inputRange = useMemo(() => {
    const step = duration / (outputRange.length-1);
    return outputRange.map((_, i) => i * step);
  }, [duration, outputRange]);
  return useTransform(cycle, inputRange, outputRange, { clamp: options?.clamp });
}
