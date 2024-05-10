import { useState } from "react"

export const useLocalError = () => {
  const [error, setError] = useState<Error>();

  return {
    get message() {
      return error?.message;
    },
    set(e: Error | string) {
      if (typeof e === 'string') {
        setError(new Error(e));
      } else {
        setError(e);
      }
    },
    clear() {
      setError(undefined);
    }
  };
}

export const useGlobalError = () => {
  throw new Error('Not implemented');
};
