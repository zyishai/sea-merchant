import { AnimationPlaybackControls, animate, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useAnimationStage } from "~/components/AnimationStage";
import { useClock } from "~/store/clock";
import { timeUpdated } from "~/store/signals";
import { useSignal } from "./use-signal";

export const useTimeAnimation = () => {
  const clock = useClock();
  const stage = useAnimationStage();
  const getTime = useCallback(() => clock.time, [clock]);
  const updatedTime = useSignal(timeUpdated, getTime, getTime);
  const total = useMotionValue(clock.total);
  const time = useTransform(total, value => value % 24);
  const day = useTransform(total, value => Math.min(6, Math.floor(value / 24)));
  const controls = useRef<AnimationPlaybackControls | undefined>();

  useEffect(() => {
    const diff = clock.total - total.get();
    const duration = diff * (diff > 8 ? 0.2 : 0.5); // 500ms per value change
    controls.current = animate(total, clock.total, { duration, ease: 'linear' });
    controls.current?.then(stage.next, stage.next);

    return () => {
      controls.current?.stop();
    }
  }, [updatedTime]);

  return {
    total,
    time,
    day
  };
}
