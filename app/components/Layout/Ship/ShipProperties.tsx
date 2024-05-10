import { AnimatePresence, motion } from "framer-motion";
import { CenteredColumn, FlexRow, ImageIcon } from "~/components/primitives/styles.module.css";
import { useShip } from "~/store/ship";
import { px } from "~/utils";

export default function ShipProperties() {
  const { capacity, volume, damage, guardShips } = useShip();

  return (
    <AnimatePresence>
      <CenteredColumn inline='start' gap={px(10)}>
        <FlexRow inline='center'>
          <ImageIcon src='/container.svg' alt="Capacity" size={px(32)} />
          <span>{volume} / {capacity} T</span>
        </FlexRow>
        {damage > 0 ? <motion.div key="damage" initial={{ scale: 0 }} animate={{ scale: 1, transition: { ease: 'anticipate' } }} exit={{ scale: 0 }}>
          <FlexRow inline='center'>
            <ImageIcon src='/damage.svg' alt="Damage" size={px(32)} />
            <span>{damage}</span>
          </FlexRow>
        </motion.div> : null}
        {guardShips > 0 ? <motion.div key="guardShips" initial={{ scale: 0 }} animate={{ scale: 1, transition: { ease: 'anticipate' } }} exit={{ scale: 0 }}>
          <FlexRow inline='center'>
            <ImageIcon src='/ship.svg' alt="Guard ship" size={px(32)} />
            <span>{guardShips}</span>
          </FlexRow>
        </motion.div> : null}
      </CenteredColumn>
    </AnimatePresence>
  )
}
