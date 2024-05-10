import { px } from "~/utils";
import { ImageIcon } from "../primitives/styles.module.css";
import { PriceTableGrid } from "./styles.module.css";
import { useLocation } from "~/store/location";

export function PriceTable({ style }: { style?: React.CSSProperties }) {
  const { locations, currentLocation } = useLocation();

  return (
    <PriceTableGrid style={style}>
      <div />
      <ImageIcon src='/copper.svg' alt='Copper' size={px(32)} />
      <ImageIcon src='/wheat.svg' alt='Wheat' size={px(32)} />
      <ImageIcon src='/olive.svg' alt='Olive' size={px(32)} />
      {Object.values(locations).map((location) => ([
        <strong 
          key={location.name + '--name'}
          style={{ color: location.name === currentLocation ? 'red' : 'unset' }}>{location.displayName}</strong>,
        <div 
          key={location.name + '--copper'}
          style={{ color: location.name === currentLocation ? 'red' : 'unset' }}>${location.prices.copper}</div>,
        <div 
          key={location.name + '--wheat'}
          style={{ color: location.name === currentLocation ? 'red' : 'unset' }}>${location.prices.wheat}</div>,
        <div 
          key={location.name + '--olive'}
          style={{ color: location.name === currentLocation ? 'red' : 'unset' }}>${location.prices.olive}</div>
      ]))}
    </PriceTableGrid>
  )
}
