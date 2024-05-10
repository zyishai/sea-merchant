import {FC, ComponentProps} from 'react'

interface StyledThumbProps {
  
  
}

export declare const Thumb: FC<ComponentProps<''>>
interface StyledRangeProps {
  
  
}

export declare const Range: FC<ComponentProps<''>>
interface StyledLabelProps {
  
  
}

export declare const Label: FC<ComponentProps<'p'>>
interface StyledTrackProps {
  
  
}

export declare const Track: FC<ComponentProps<''>>
interface StyledSelectorProps {
  
  
}

export declare const Selector: FC<ComponentProps<''>>

interface ClassName {
  'thumb' : StyledThumbProps
  'range' : StyledRangeProps
  'label' : StyledLabelProps
  'track' : StyledTrackProps
  'selector' : StyledSelectorProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
