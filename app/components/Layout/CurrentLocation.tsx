import { useLocation } from "~/store/location"
import { IsraelMap } from "../Map/IsraelMap";
import { EgyptMap } from "../Map/EgyptMap";
import { TurkeyMap } from "../Map/TurkeyMap";
import { AnimatePresence } from "framer-motion";

export default function CurrentLocation() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {location.currentLocation === 'israel' ? <IsraelMap key="israel" /> : null}
      {location.currentLocation === 'egypt' ? <EgyptMap key="egypt" /> : null}
      {location.currentLocation === 'turkey' ? <TurkeyMap key="turkey" /> : null}
    </AnimatePresence>
  )
}
