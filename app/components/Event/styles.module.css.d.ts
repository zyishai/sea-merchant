import {FC, ComponentProps} from 'react'

interface StyledParagraphProps {
  align?: 'left' | 'center' | 'right'
  
}

export interface ParagraphProps extends ComponentProps<'p'> {
  align?: 'left' | 'center' | 'right'
  
}
export declare const Paragraph: FC<ParagraphProps>
interface StyledTitleProps {
  
  
}

export declare const Title: FC<ComponentProps<'h1'>>

interface ClassName {
  'event_paragraph' : StyledParagraphProps
  'event_title' : StyledTitleProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
