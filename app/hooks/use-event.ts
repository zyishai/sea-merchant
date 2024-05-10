import { on } from "@holycow/state";
import { useEffect, useState } from "react"
import { GameEvent, eventOccurred, eventResolved } from "~/store/event";
import { useSchedulerStage } from "./use-scheduler-stage";

export const useEvent = () => {
  const stage = useSchedulerStage();
  const [event, setEvent] = useState<GameEvent|null>(null);

  useEffect(() => {
    const unsubscribeEventOccurred = on(eventOccurred, (event) => {
      stage.on('event', () => {
        if (event.type === 'nothing') {
          event.onEventResolved();
        } else {
          setEvent(event);
        }
      }, { once: true });
    });
    const unsubscribeEventResolved = on(eventResolved, () => setEvent(null));

    return () => {
      unsubscribeEventOccurred();
      unsubscribeEventResolved();
    };
  }, []);

  return event;
}
