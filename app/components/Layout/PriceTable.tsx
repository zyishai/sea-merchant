import { useLocation } from "~/store/location";
import { Grid, Text } from "@radix-ui/themes";
import { Img } from "./styles.module.css";

export function PriceTable() {
  const { locations, currentLocation } = useLocation();

  return (
    <Grid columns='4' rows='4' gapX='5' gapY='4' px='6' pb='6' pt='3'>
      <div />
      <Img src='/copper.svg' alt='Copper' size='32px' />
      <Img src='/wheat.svg' alt='Wheat' size='32px' />
      <Img src='/olive.svg' alt='Olive' size='32px' />
      {Object.values(locations).map((location) => ([
        <Text 
          key={location.name + '--name'}
          color={location.name === currentLocation ? 'red' : undefined}
          weight='bold' 
          size='4'>{location.displayName}</Text>,
        <Text 
          key={location.name + '--copper'}
          color={location.name === currentLocation ? 'red' : undefined}
          weight='medium'
          size='4'>${location.prices.copper}</Text>,
        <Text 
          key={location.name + '--wheat'}
          color={location.name === currentLocation ? 'red' : undefined}
          weight='medium'
          size='4'>${location.prices.wheat}</Text>,
        <Text 
          key={location.name + '--olive'}
          color={location.name === currentLocation ? 'red' : undefined}
          weight='medium'
          size='4'>${location.prices.olive}</Text>
      ]))}
    </Grid>
  )
}
