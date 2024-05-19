import { buyWarning, guardShipsWarning, repairWarning, sailWarning, sellWarning } from "~/store/signals";
import { useAnimationStage } from "../AnimationStage";
import { useSignal } from "~/hooks/use-signal";
import { useEffect } from "react";

export function Alerts() {
  const stage = useAnimationStage();
  const [sailAlert] = useSignal(sailWarning);
  const [guardShipsAlert] = useSignal(guardShipsWarning);
  const [buyAlert] = useSignal(buyWarning);
  const [sellAlert] = useSignal(sellWarning);
  const [repairAlert] = useSignal(repairWarning);

  useEffect(() => {
    if (stage.current === 'alert') {
      stage.next();
    }
  }, [stage]);

  // useEffect(() => {
  //   if (scheduler.stage === 'alert') {
  //     scheduler.methods.next();
  //   }
  //   // if (stage.current === 'alert' && !alerts.length) {
  //   //   return;
  //   // }

  //   // if (alerts.length) {
  //   //   alerts.forEach(({ message, dismiss }) => {
  //   //     toast.warning(message, {
  //   //       onDismiss: dismiss,
  //   //       action: {
  //   //         label: 'OK',
  //   //         onClick: dismiss,
  //   //       }
  //   //     })
  //   //   })
  //   // }
  // }, [scheduler.stage, alerts]);

  return null;
}
