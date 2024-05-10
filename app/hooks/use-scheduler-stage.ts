import { useContext } from "react"
import { ScheduleContext } from "~/components/Scheduler"

export const useSchedulerStage = () => {
  const stage = useContext(ScheduleContext);

  if (!stage) {
    throw new Error("Not under scheduler provider");
  }

  return stage;
}
