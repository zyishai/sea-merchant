import { GameLocation, useLocation } from "~/store/location";
import { AnimatedMap } from "./AnimatedMap";
import { SailCommand } from "~/store/command";
import { processCommand } from "~/store/signals";
import { AbsoluteButton } from "../primitives/AbsoluteButton";
import { px } from "~/utils";
import { Modal } from "../Modal";
import { Market } from "../Market";
import { HireGuardShips } from "./HireGuardShips";

export function EgyptMap() {
  const egypt = useLocation('locations.egypt');
  const goTo = (location: GameLocation) => () => processCommand(new SailCommand(location));

  return (
    <AnimatedMap location={egypt}>
      <HireGuardShips onClose={goTo('turkey')}>
        <AbsoluteButton
          variant="primary"
          color='gold'
          top={px(100)}
          left={px(70)}>
            Go to Turkey
        </AbsoluteButton>
      </HireGuardShips>
      <HireGuardShips onClose={goTo('israel')}>
        <AbsoluteButton
          variant='primary'
          color='gold'
          top={px(140)}
          right={px(70)}>
            Go to Israel
        </AbsoluteButton>
      </HireGuardShips> 
      <Modal trigger={<AbsoluteButton
        variant="primary"
        color='jade'
        top={px(250)}
        left={px(180)}>
          Visit market
        </AbsoluteButton>}>
          <Market locationName={egypt.name} />
      </Modal>
    </AnimatedMap>
  )
}
