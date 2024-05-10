import { useEffect, useRef, useState } from "react"

export const useStage = <T extends string>(props: {
  initialStage?: T;
  stages: T[];
}) => {
  const { initialStage, stages } = props;
  const [index, setIndex] = useState<number>(initialStage ? Math.max(stages.indexOf(initialStage), 0) : 0);
  const listeners = useRef<Partial<Record<T, Array<{id: string|number, cb: () => void, once:boolean}>>>>({}).current;

  useEffect(() => {
    const callbacks = listeners[stages[index]];
    if (callbacks) {
      callbacks.forEach(({ cb }) => cb());
      listeners[stages[index]] = callbacks.filter(({ once }) => !once);
    }
  }, [index]);

  return {
    get current() {
      return stages[index];
    },
    next() {
      if (typeof index === 'undefined') {
        setIndex(0);
      } else if (index < stages.length - 1) {
        setIndex(i => i! + 1);
      }
    },
    prev() {
      if (typeof index !== 'undefined' && index > 0) {
        setIndex(i => i! - 1);
      }
    },
    set(stage: T) {
      const i = stages.indexOf(stage);
      setIndex(i >= 0 ? i : index);
    },
    on(stage: T, cb: () => void, options?: {once?:boolean}) {
      if (!listeners[stage]) {
        listeners[stage] = [];
      }

      const id = Date.now();
      listeners[stage]?.push({ id, cb, once: !!options?.once });

      return () => {
        listeners[stage] = listeners[stage]?.filter((listener) => listener.id !== id);
      }
    },
    reset() {
      setIndex(0);
    }
  }
}
