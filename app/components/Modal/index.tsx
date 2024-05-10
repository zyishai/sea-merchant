import React, { useMemo, useState, type PropsWithChildren } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { applyStyle } from './styles.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps extends PropsWithChildren {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  contentCard?: React.FC;
}
export function Modal({ trigger, title, description, children, open, onOpenChange, defaultOpen, contentCard }: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const isOpen = typeof open === 'boolean' ? open : uncontrolledOpen;
  const handleOpenChange = typeof onOpenChange === 'function' ? onOpenChange : setUncontrolledOpen;
  const Content = useMemo(() => contentCard ?? applyStyle('modal__content', motion.div), [contentCard]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} defaultOpen={defaultOpen}>
        {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
        <AnimatePresence>
          {isOpen ? <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                  <Overlay initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <Card initial={{ scale: 0, translate: '-50% -50%' }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Content>
                    {title ? <Title>{title}</Title> : null}
                    {description ? <Description>{description}</Description> : null}
                    {children}
                    {trigger || onOpenChange ? <Close>
                      <Cross1Icon style={{ height: 12 }} />
                    </Close> : null}
                  </Content>
                </Card>
              </Dialog.Content>
          </Dialog.Portal> : null}
        </AnimatePresence>
      </Dialog.Root>
  )
}

Modal.CloseButton = Dialog.Close;

const Overlay = applyStyle('modal__overlay', motion.div);
const Card = applyStyle('modal__card', motion.div);
const Title = applyStyle('modal__title', Dialog.Title);
const Description = applyStyle('modal__description', Dialog.Description);
const Close = applyStyle('modal__close', Dialog.Close);
