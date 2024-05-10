import { on } from "@holycow/state";
import { useEffect, useState } from "react"
import { useSchedulerStage } from "./use-scheduler-stage";

export const useAlerts = (signals: Array<(message: string, options?: {error?: boolean}) => void>) => {
  const stage = useSchedulerStage();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribes = signals.map((signal) => on(signal, (message, options) => {
      stage.on('alert', () => {
        setAlerts(alerts => [...alerts, message]);
      }, { once: true });
    }));

    return () => unsubscribes.forEach(fn => fn());
  }, []);

  return alerts.map((message) => ({
    message,
    dismiss() {
      setAlerts(alerts => alerts.filter(msg => msg !== message))
    }
  }));
}
