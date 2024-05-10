import { PopupOverlay, PopupCard, CloseButton } from "./styles.module.css";
import { PopupPortal } from "./context";
import { useEffect, useId, useState } from "react";
import { Action, Computed, action, append, computed, createState } from "@holycow/state";

type OverlaysState = {
  ids: string[];
  currentId: Computed<OverlaysState, string>;
  register: Action<OverlaysState, [id: string]>;
  remove: Action<OverlaysState, [id: string]>;
}
const useOverlays = createState<OverlaysState>({
  ids: [],
  currentId: computed(({ ids }) => ids[0]),
  register: action(({ ids, set }) => (id) => {
    set('ids', append(id, ids));
  }),
  remove: action(({ set }) => (id) => {
    set('ids', (ids) => ids.filter((i) => i !== id));
  })
});

type ModalProps = {
  open: boolean;
  onClose: () => void;
} | {
  open: undefined;
  onClose: undefined;
};
export function Modal({ open, onClose, children }: React.PropsWithChildren<ModalProps>) {
  const [controlledOpen, setControlledOpen] = useState(false);
  const handleClose = onClose ? onClose : () => {};
  return (
    <PopupPortal>
      <Overlay singleton onClose={onClose} />
      <PopupCard open={open} onClose={onClose}>
        <Close onClose={onClose} />
        {children}
      </PopupCard>
    </PopupPortal>
  )
}

Modal.Trigger = 

function Overlay({ singleton, onClose }: { onClose: () => void; singleton?: boolean }) {
  const overlays = useOverlays();
  const id = useId();

  useEffect(() => {
    overlays.register(id);

    return () => overlays.remove(id);
  }, []);

  return (
    (!singleton || overlays.ids[0] === id) ? <PopupOverlay onClick={onClose} /> : null
  )
}

function Close({ onClose }: { onClose: () => void }) {
  return (
    <CloseButton onClick={onClose}>
      &#10006;
    </CloseButton>
  )
}
