import { Container } from "../Layout/styles.module.css";
import { Background, Text } from "./styles.module.css";
import { motion, useTransform } from "framer-motion";
import { useTimeAnimation } from "~/hooks/use-time-animation";
import { useClock } from "~/store/clock";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const variants: Variants = {
//   normal: {
//     translateX: 0,
//     translateY: 0,
//     scale: 1
//   },
//   big: {
//     translateX: 'calc(50vw - 50%)',
//     translateY: 200,
//     scale: 3
//   }
// }

export function Clock() {
  const clock = useClock();
  const { total, time, day } = useTimeAnimation();
  const transformedTime = useTransform(time, value => {
    const hour = Math.floor(value);
    const minute = Math.floor((value - hour) / 0.25) * 15;

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  });
  const transformedDay = useTransform(day, dayIndex => days[dayIndex]);
  // const controls = useAnimation();

  // useEffect(() => {
  //   const unsubscribeAnimationStart = total.on('animationStart', () => {
  //     controls.start("big", { duration: total.animation?.duration || 1 });
  //   });
  //   const unsubscribeAnimationEnd = total.on('animationComplete', () => {
  //     controls.start("normal", { duration: total.animation?.duration || 1});
  //   });
  //   const unsubscribeAnimationCancelled = total.on('animationCancel', () => {
  //     controls.start("normal", { duration: total.animation?.duration || 1 });
  //   });

  //   return () => {
  //     unsubscribeAnimationStart();
  //     unsubscribeAnimationEnd();
  //     unsubscribeAnimationCancelled();
  //   }
  // }, [total]);

  return (
    <Container>
      <Background>
        <Text>
          <motion.span>{transformedDay}</motion.span>, <motion.span>{transformedTime}</motion.span>
        </Text>
      </Background>
    </Container>
  );
}
