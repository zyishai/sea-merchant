import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";

type UseState<T> = [T|null|undefined, React.Dispatch<React.SetStateAction<T|null|undefined>>];
export const PopupContext = React.createContext<UseState<HTMLDivElement>>([] as any);

export function PopupProvider({ children }: React.PropsWithChildren) {
  const popupContainerState = useState<HTMLDivElement|null>();
  const [, setRef] = popupContainerState;

  return (
    <PopupContext.Provider value={popupContainerState}>
      {children}
      <div ref={setRef} />
    </PopupContext.Provider>
  );
}

const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("PopupProvider is not registered.");
  }

  return context;
}

export function PopupPortal({ children }: { children: React.ReactNode|(() => JSX.Element) }) {
  const [ref] = usePopupContext();

  return (
    ref 
      ? createPortal(typeof children === 'function' ? children() : children, ref) 
      : null
  )
}
