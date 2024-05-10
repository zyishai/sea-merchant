import {FC, ComponentProps} from 'react'

interface StyledCloseButtonProps {
  
  
}

export declare const CloseButton: FC<ComponentProps<'button'>>
interface StyledPopupCardProps {
  
  
}

export declare const PopupCard: FC<ComponentProps<'dialog'>>
interface StyledPopupOverlayProps {
  
  
}

export declare const PopupOverlay: FC<ComponentProps<'div'>>

interface ClassName {
  'modal__close-button' : StyledCloseButtonProps
  'modal__card' : StyledPopupCardProps
  'modal__overlay' : StyledPopupOverlayProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
