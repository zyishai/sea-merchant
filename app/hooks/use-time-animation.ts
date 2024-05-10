import { on } from "@holycow/state";
import { AnimationPlaybackControls, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useClock } from "~/store/clock";
import { timeUpdated } from "~/store/signals";
import { useSchedulerStage } from "./use-scheduler-stage";

export const useTimeAnimation = () => {
  const clock = useClock();
  const stage = useSchedulerStage();
  const total = useMotionValue(clock.total);
  const time = useTransform(total, value => value % 24);
  const day = useTransform(total, value => Math.min(6, Math.floor(value / 24)));
  const controls = useRef<AnimationPlaybackControls | undefined>();

  useEffect(() => {
    const unsubscribe = on(timeUpdated, () => {
      const diff = clock.total - total.get();
      const duration = diff * (diff > 8 ? 0.2 : 0.5); // 500ms per value change
      controls.current = animate(total, clock.total, { duration, ease: 'linear' });
    });

    return () => {
      controls.current?.stop();
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (stage.current === 'clock') {
      controls.current?.then(stage.next, stage.next);
    }
  }, [stage]);

  return {
    total,
    time,
    day
  };
}
