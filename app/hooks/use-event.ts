import { useCallback, useEffect } from "react"
import { eventOccurred, eventResolved } from "~/store/event";
import { useSignal } from "./use-signal";
import { useAnimationStage } from "~/components/AnimationStage";

export const useEvent = () => {
  const [event, resetEvent] = useSignal(eventOccurred);
  const getResolved = useCallback(() => true, []);
  const [resolved, resetResolved] = useSignal(eventResolved, getResolved);
  const animationStage = useAnimationStage();

  useEffect(() => {
    if (animationStage.current === 'event') {
      if (event?.type === 'nothing') {
        event.onEventResolved();
      }
  
      if (!!resolved) {
        resetEvent();
        resetResolved();
        animationStage.next();
      }
    }
  }, [animationStage, resolved]);

  return animationStage.current === 'event' && event?.type !== 'nothing' ? event : undefined;
}
