import { GameLocation, useLocation } from "~/store/location";
import { AnimatedMap } from "./AnimatedMap";
import { SailCommand } from "~/store/command";
import { processCommand } from "~/store/signals";
import { AbsoluteButton } from "../primitives/AbsoluteButton";
import { px } from "~/utils";
import { Modal } from "../Modal";
import { Market } from "../Market";
import { HireGuardShips } from "./HireGuardShips";

export function TurkeyMap() {
  const turkey = useLocation('locations.turkey');
  const goTo = (location: GameLocation) => () => processCommand(new SailCommand(location));

  return (
    <AnimatedMap location={turkey}>
      <HireGuardShips onClose={goTo('egypt')}>
        <AbsoluteButton
          variant="primary"
          color='red'
          bottom={px(60)}
          left={px(250)}>
            Go to Egypt
        </AbsoluteButton>
      </HireGuardShips>
      <HireGuardShips onClose={goTo('israel')}>
        <AbsoluteButton
          variant='primary'
          color='red'
          bottom={px(80)}
          right={px(170)}>
            Go to Israel
        </AbsoluteButton>
      </HireGuardShips>
      <Modal trigger={<AbsoluteButton
        variant="primary"
        color='jade'
        top={px(130)}
        left={px(270)}>
          Visit market
        </AbsoluteButton>}>
          <Market locationName={turkey.name} />
      </Modal>
    </AnimatedMap>
  )
}
