import { createContext, useContext, useMemo } from "react";
import { useStage } from "~/hooks/use-stage";

const stages = ['idle', 'clock', 'alert', 'leave', 'event', 'arrive'] as const;
type Stages = typeof stages;
type Stage = Stages[number];

// @ts-ignore
const AnimationStageContext = createContext<ReturnType<typeof useStage<Stage>>>();
export function AnimationStageProvider({ children, initialStage }: React.PropsWithChildren<{ initialStage?: Stage }>) {
  const stageConfig = useMemo(() => ({ initialStage, stages }), [initialStage]);
  const stage = useStage(stageConfig);

  return (
    <AnimationStageContext.Provider value={stage}>{children}</AnimationStageContext.Provider>
  );
}

export const useAnimationStage = () => {
  const context = useContext(AnimationStageContext);

  if (!context) {
    throw new Error('useAnimationStage can only be used under Scheduler component!');
  }

  return context;
}
