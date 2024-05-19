import { Box, Grid } from "@radix-ui/themes";
import { useShip } from "~/store/ship";
import { IconLabel } from "../IconLabel";
import React from "react";

function ShipProperties() {
  const { capacity, volume, damage, guardShips } = useShip();

  return (
      <Grid columns='2' gapX='7' gapY='4'>
        <Box gridColumn='1 / span 2'>
          <IconLabel icon='/container.svg' alt='Capacity' tooltip="Capacity">{volume} / {capacity} T</IconLabel>
        </Box>
        {damage > 0 ? <IconLabel icon='/damage.svg' alt='Damage' tooltip="Damage">{damage}</IconLabel> : null}
        {guardShips > 0 ? <IconLabel icon='/ship.svg' alt='Guard ship' tooltip="Guard ship">{guardShips}</IconLabel> : null}
      </Grid>
  )
}

export default React.memo(ShipProperties);
