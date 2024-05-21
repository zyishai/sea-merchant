import { motion, useAnimationControls, type Variants } from "framer-motion";
import { GameLocation, useLocation } from "~/store/location";
import { useAnimationStage } from "../AnimationStage";
import { useEffect } from "react";
import { Img } from "../Layout/styles.module.css";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";

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
    opacity: 0
  },
  visible: (custom: number) => ({
    scale: 1,
    opacity: 1,
    zIndex: 2,
    transition: { duration: custom - 0.5, delay: 0.5 }
  }),
  exit: (custom: number) => ({
    scale: 0,
    opacity: 0,
    transition: { duration: custom }
  })
};

interface Props extends React.PropsWithChildren {
  location: typeof useLocation['locations'][GameLocation];
}
export function AnimatedMap({ location }: Props) {
  const stage = useAnimationStage();
  const duration = 1;
  const controls = useAnimationControls();

  useEffect(() => {
    if (stage.current === 'leave') {
      controls.start('exit').finally(stage.next);
    } else if (stage.current === 'arrive') {
      controls.start('visible').finally(stage.next);
    }

    return controls.stop;
  }, [stage]);


  return (
    <Grid columns='1' rows='1' asChild>
      <motion.div 
        initial="hidden" 
        animate={controls} 
        style={{ perspective: 999 }}>
        <Box gridRow='1' gridColumn='1' asChild>
          <motion.img
            src={`/map-${location.name}.svg`}
            variants={mapVariants}
            custom={duration} />
        </Box>
        <Box gridRow='1' gridColumn='1' asChild>
          <motion.div variants={flagVariants} custom={duration}>
            <Flex direction='column' align='center'>
              <Img src={`/flag-${location.name}.svg`} alt={`${location.displayName} flag`} size='120px' />
              <Heading size='8' color='blue' highContrast>{location.displayName}</Heading>
            </Flex>
          </motion.div>
        </Box>
      </motion.div>
    </Grid>
  )
}
