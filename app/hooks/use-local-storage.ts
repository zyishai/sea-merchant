import { useCallback, useSyncExternalStore } from "react";

export function useLocalStorage(key: string): [string|null, (value:string) => void, () => void] {
  const value = useSyncExternalStore(subscribe(key), getSnapshot(key), () => null);
  const setValue = useCallback((value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue: value
    }));
  }, []);
  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    window.dispatchEvent(new StorageEvent('storage', {
      key
    }));
  }, []);

  return [value, setValue, removeValue];
}

function subscribe(key: string) {
  return (callback: () => void) => {
    function listener(ev: StorageEvent) {
      if (ev.key === key) {
        callback();
      }
    }
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }
}

function getSnapshot(key: string) {
  return () => localStorage.getItem(key);
}
