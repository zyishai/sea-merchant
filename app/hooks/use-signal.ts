import { on } from "@holycow/state";
import { useCallback, useEffect, useState } from "react";

export function useSignal<T extends (...args: any[]) => void, U = Parameters<T>[0]>(signal: T, getValue?: () => U, getServerValue?: () => U) {
  // === The commented code below is alternative way to implement this hook, it's using useSyncExternalStore hook instead of useEffect. Both implementation equivalent in terms of React flow. ===
  // const currentValue = useRef<U|undefined>(getServerValue ? getServerValue() : undefined);
  // const subscribe = useCallback((callback: () => void) => {
  //   return on(signal, (value: U) => {
  //     currentValue.current = getValue ? getValue() : value;
  //     callback();
  //   });
  // }, [signal, getValue]);
  // const getSnapshot = useCallback(() => currentValue.current, []);
  // const getServerSnapshot = useCallback(() => getServerValue ? getServerValue() : undefined, [getServerValue]);
  // return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [currentValue, setCurrentValue] = useState<U|undefined>(getServerValue?.());
  const resetValue = useCallback(() => setCurrentValue(undefined), []);

  useEffect(() => {
    return on(signal, (value: U) => {
      setCurrentValue(getValue ? getValue() : value);
    });
  }, [signal, getValue]);

  return [currentValue, resetValue] as const;
}
