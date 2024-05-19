import { GameLocation, useLocation } from "~/store/location";
import { AnimatedMap } from "./AnimatedMap";
import { SailCommand } from "~/store/command";
import { processCommand } from "~/store/signals";
import { AbsoluteButton } from "../primitives/AbsoluteButton";
import { px } from "~/utils";
import { Modal } from "../Modal";
import { Market } from "../Market";
import { HireGuardShips } from "./HireGuardShips";

export function IsraelMap() {
  const israel = useLocation('locations.israel');
  const goTo = (location: GameLocation) => () => processCommand(new SailCommand(location));

  return (
    <AnimatedMap location={israel}>
      <HireGuardShips onClose={goTo('turkey')}>
        <AbsoluteButton
          variant='primary'
          color='blue'
          top={px(270)}>
            Go to Turkey
        </AbsoluteButton>
      </HireGuardShips>
      <HireGuardShips onClose={goTo('egypt')}>
        <AbsoluteButton
          variant='primary' 
          color='blue'
          bottom={px(270)}
          left={px(-30)}>
            Go to Egypt
        </AbsoluteButton>
      </HireGuardShips>
      <Modal trigger={<AbsoluteButton
        variant="primary"
        color='jade'
        top={px(350)}
        right={px(-10)}>
          Visit market
        </AbsoluteButton>}>
          <Market locationName={israel.name} />
      </Modal>
    </AnimatedMap>
  )
}
