import { PropsWithChildren, createContext } from "react"
import { useStage } from "~/hooks/use-stage";

// @ts-ignore
export const ScheduleContext = createContext<ReturnType<typeof useStage>>();

interface SchedulerProps<T extends string> extends PropsWithChildren {
  stages: T[];
}
export function SchedulerProvider<T extends string>({ stages, children }: SchedulerProps<T>) {
  const stage = useStage({ stages });
  console.log(stage.current);

  return (
    <ScheduleContext.Provider value={stage}>{children}</ScheduleContext.Provider>
  )
}
