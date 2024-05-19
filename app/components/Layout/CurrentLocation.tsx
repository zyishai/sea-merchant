import { useLocation } from "~/store/location"
import { IsraelMap } from "../Map/IsraelMap";
import { EgyptMap } from "../Map/EgyptMap";
import { TurkeyMap } from "../Map/TurkeyMap";
import { AnimatePresence } from "framer-motion";
import { Flex } from "@radix-ui/themes";

export default function CurrentLocation() {
  const location = useLocation();

  return (
    <Flex justify='center' align='center' height="100%">
      <AnimatePresence mode="wait">
        {location.currentLocation === 'israel' ? <IsraelMap key="israel" /> : null}
        {location.currentLocation === 'egypt' ? <EgyptMap key="egypt" /> : null}
        {location.currentLocation === 'turkey' ? <TurkeyMap key="turkey" /> : null}
      </AnimatePresence>
    </Flex>
  )
}
