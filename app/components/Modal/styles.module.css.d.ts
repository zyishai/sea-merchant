import {FC, ComponentProps} from 'react'

interface StyledModal_CloseProps {
  
  
}

export declare const Modal_Close: FC<ComponentProps<''>>
interface StyledModal_DescriptionProps {
  
  
}

export declare const Modal_Description: FC<ComponentProps<''>>
interface StyledModal_TitleProps {
  
  
}

export declare const Modal_Title: FC<ComponentProps<''>>
interface StyledModal_ContentProps {
  
  
}

export declare const Modal_Content: FC<ComponentProps<''>>
interface StyledModal_CardProps {
  
  
}

export declare const Modal_Card: FC<ComponentProps<''>>
interface StyledModal_OverlayProps {
  
  
}

export declare const Modal_Overlay: FC<ComponentProps<''>>

interface ClassName {
  'modal__close' : StyledModal_CloseProps
  'modal__description' : StyledModal_DescriptionProps
  'modal__title' : StyledModal_TitleProps
  'modal__content' : StyledModal_ContentProps
  'modal__card' : StyledModal_CardProps
  'modal__overlay' : StyledModal_OverlayProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
