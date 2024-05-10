import {FC, ComponentProps} from 'react'

interface StyledSmallButtonProps {
  
  
}

export declare const SmallButton: FC<ComponentProps<'button'>>
interface StyledFieldProps {
  
  
}

export declare const Field: FC<ComponentProps<'div'>>
interface StyledEvenlySpacedProps {
  align?: 'start' | 'center' | 'end'
rtl?: boolean
orientation?: 'vertical' | 'horizontal'
  gap?: string
}

export interface EvenlySpacedProps extends ComponentProps<'div'> {
  align?: 'start' | 'center' | 'end'
rtl?: boolean
orientation?: 'vertical' | 'horizontal'
  gap?: string
}
export declare const EvenlySpaced: FC<EvenlySpacedProps>
interface StyledEngagementContentProps {
  
  
}

export declare const EngagementContent: FC<ComponentProps<'section'>>
interface StyledEngagementOptionProps {
  
  
}

export declare const EngagementOption: FC<ComponentProps<'button'>>
interface StyledEngagementActionsProps {
  show?: boolean
  
}

export interface EngagementActionsProps extends ComponentProps<'div'> {
  show?: boolean
  
}
export declare const EngagementActions: FC<EngagementActionsProps>
interface StyledEngagementsContainerProps {
  
  
}

export declare const EngagementsContainer: FC<ComponentProps<'div'>>

interface ClassName {
  'small-button' : StyledSmallButtonProps
  'field' : StyledFieldProps
  'evenly-spaced' : StyledEvenlySpacedProps
  'engagement-content' : StyledEngagementContentProps
  'engagement-option' : StyledEngagementOptionProps
  'engagement-actions' : StyledEngagementActionsProps
  'engagements-container' : StyledEngagementsContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
