import {FC, ComponentProps} from 'react'

interface StyledTextProps {
  
  
}

export declare const Text: FC<ComponentProps<'span'>>
interface StyledBackgroundProps {
  
  
}

export declare const Background: FC<ComponentProps<'div'>>

interface ClassName {
  'text' : StyledTextProps
  'background' : StyledBackgroundProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
