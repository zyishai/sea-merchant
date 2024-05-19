import { useMemo, useState } from "react"

export const useStage = <T extends string>(props: {
  initialStage?: T;
  stages: readonly T[];
}) => {
  const { initialStage, stages } = props;
  const [index, setIndex] = useState<number>(initialStage ? Math.max(stages.indexOf(initialStage), 0) : 0);

  return useMemo(() => ({
    get current() {
      return stages[index];
    },
    next() {
      setIndex((index + 1) % stages.length);
    },
    prev() {
      setIndex((index - 1) % stages.length);
    },
    set(stage: T) {
      setIndex(stages.indexOf(stage) % stages.length);
    },
    reset() {
      setIndex(0);
    }
  }), [index, stages]);
}
