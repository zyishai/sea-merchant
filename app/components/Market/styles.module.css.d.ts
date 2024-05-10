import {FC, ComponentProps} from 'react'

interface StyledCenteredTextProps {
  
  
}

export declare const CenteredText: FC<ComponentProps<'p'>>

interface ClassName {
  'centered_text' : StyledCenteredTextProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
