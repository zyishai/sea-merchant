import { useEffect } from "react";
import { toast } from "sonner";
import { useAlerts } from "~/hooks/use-alerts";
import { useSchedulerStage } from "~/hooks/use-scheduler-stage";
import { sailWarning } from "~/store/signals";

export function Alerts() {
  const stage = useSchedulerStage();
  const alerts = useAlerts([sailWarning]);

  useEffect(() => {
    stage.current === 'alert' && stage.next();
    // if (stage.current === 'alert' && !alerts.length) {
    //   return;
    // }

    // if (alerts.length) {
    //   alerts.forEach(({ message, dismiss }) => {
    //     toast.warning(message, {
    //       onDismiss: dismiss,
    //       action: {
    //         label: 'OK',
    //         onClick: dismiss,
    //       }
    //     })
    //   })
    // }
  }, [stage, alerts]);

  return null;
}
