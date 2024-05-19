import { applyStyle } from "./styles.module.css";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { GameLocation, useLocation } from "~/store/location";
import { useAnimationStage } from "../AnimationStage";
import { useEffect } from "react";

const mapVariants: Variants = {
  hidden: {
    translateZ: -800,
    rotateX: 80,
  },
  visible: (custom: number) => ({
    translateZ: 0,
    rotateX: 45,
    transition: { duration: custom }
  }),
  exit: (custom: number) => ({
    translateZ: 1500,
    translateY: 70,
    rotateX: 90,
    transition: { duration: custom - 0.2, delay: 0.2 }
  })
};
const flagVariants: Variants = {
  hidden: {
    scale: 0,
    translateY: 0
  },
  visible: (custom: number) => ({
    scale: 1,
    translateY: -300,
    transition: { duration: custom - 0.5, delay: 0.5 }
  }),
  exit: (custom: number) => ({
    scale: 0,
    translateY: 0,
    transition: { duration: custom }
  })
};
const countryNameVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: (custom: number) => ({
    opacity: 1,
    transition: { duration: custom - 0.5, delay: 0.5 }
  }),
  exit: (custom: number) => ({
    opacity: 0,
    transition: { duration: custom }
  })
};
const childrenVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({ opacity: 1, transition: { duration: custom - 0.5, delay: 0.5 } }),
  exit: (custom: number) => ({ opacity: 0, transition: { duration: custom } })
}

interface Props extends React.PropsWithChildren {
  location: typeof useLocation['locations'][GameLocation];
}
export function AnimatedMap({ location, children }: Props) {
  const stage = useAnimationStage();
  const duration = 1;
  const controls = useAnimationControls();

  useEffect(() => {
    console.log(location.name, stage.current);
    if (stage.current === 'leave') {
      controls.start('exit').finally(stage.next);
    } else if (stage.current === 'arrive') {
      controls.start('visible').finally(stage.next);
    }

    return controls.stop;
  }, [stage]);


  return (
    <motion.div 
      initial="hidden" 
      animate={controls} 
      style={{ perspective: 999 }}>
      <motion.img
        src={`/map-${location.name}.svg`}
        variants={mapVariants}
        custom={duration} />
      <Flag
        src={`/flag-${location.name}.svg`}
        variants={flagVariants}
        custom={duration} />
      <CountryName
        color={location.color}
        variants={countryNameVariants}
        custom={duration}>
          {location.displayName}
      </CountryName>
      <motion.div 
        variants={childrenVariants}
        custom={duration}>{children}</motion.div>
    </motion.div>
  )
}

// const Map = applyStyle('map', motion.img);
const Flag = applyStyle('map_flag', motion.img);
const CountryName = applyStyle('country_name', motion.h1);
