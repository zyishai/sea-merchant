import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { ActionButton } from './styles.module.css';
import { PopupPanelRenderer } from '../Layout/popup-panel-row';

// @ts-expect-error
const ActionContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>();

export function Action({ children }: PropsWithChildren) {
  const state = useState(false);

  return (
    <ActionContext.Provider value={state}>
      {children}
    </ActionContext.Provider>
  )
}

export function ActionTrigger({children}: PropsWithChildren) {
  const [, setActive] = useContext(ActionContext);

  // FIXME - CODE DEBT: Prevent triggering two or more actions at the same time

  return (
    <ActionButton onClick={() => setActive(true)}>{children}</ActionButton>
  )
}

export function ActionResult({children}: PropsWithChildren) {
  const [active] = useContext(ActionContext);

  return (
    <PopupPanelRenderer>
      {active ? children : null}
    </PopupPanelRenderer>
  )
}

export const useAction = () => {
  const state = useContext(ActionContext);
  if (!state) {
    throw new Error('Not under action context!');
  }
  const [, setActive] = state;

  return {
    closePanel() {
      setActive(false);
    }
  }
}
