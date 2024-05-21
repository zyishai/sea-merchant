import { useLocation } from "~/store/location"
import { AnimatePresence } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import { AnimatedMap } from "../Map/AnimatedMap";

export default function CurrentLocation() {
  const location = useLocation();

  return (
    <Flex justify='center' align='center' height="100%">
      <AnimatePresence mode="wait">
        <AnimatedMap location={location.current} key={location.currentLocation} />
      </AnimatePresence>
    </Flex>
  )
}
