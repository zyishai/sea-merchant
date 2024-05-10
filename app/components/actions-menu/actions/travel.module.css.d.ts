import {FC, ComponentProps} from 'react'

interface StyledCancelButtonProps {
  
  
}

export declare const CancelButton: FC<ComponentProps<'button'>>
interface StyledCtaButtonProps {
  
  
}

export declare const CtaButton: FC<ComponentProps<'button'>>
interface StyledSectionProps {
  flex?: boolean
  mx?: string
my?: string
m?: string
}

export interface SectionProps extends ComponentProps<'section'> {
  flex?: boolean
  mx?: string
my?: string
m?: string
}
export declare const Section: FC<SectionProps>
interface StyledLocationOptionProps {
  selected?: boolean
  color: string
}

export interface LocationOptionProps extends ComponentProps<'div'> {
  selected?: boolean
  color: string
}
export declare const LocationOption: FC<LocationOptionProps>
interface StyledLocationPickerProps {
  
  
}

export declare const LocationPicker: FC<ComponentProps<'div'>>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'div'>>

interface ClassName {
  'cancel-button' : StyledCancelButtonProps
  'cta-button' : StyledCtaButtonProps
  'section' : StyledSectionProps
  'location-option' : StyledLocationOptionProps
  'location-picker' : StyledLocationPickerProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
