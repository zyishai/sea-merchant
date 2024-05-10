import {FC, ComponentProps} from 'react'

interface StyledActionButtonProps {
  
  bg?: string
}

export interface ActionButtonProps extends ComponentProps<'button'> {
  
  bg?: string
}
export declare const ActionButton: FC<ActionButtonProps>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'div'>>

interface ClassName {
  'action-button' : StyledActionButtonProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
