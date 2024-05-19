import { useSyncExternalStore } from "react";

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, () => true);
  return isOnline;
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  }
}

function getSnapshot() {
  return navigator.onLine;
}
