import {FC, ComponentProps} from 'react'

interface StyledSeparatorProps {
  
  
}

export declare const Separator: FC<ComponentProps<'hr'>>
interface StyledPictureProps {
  
  height?: string
}

export interface PictureProps extends ComponentProps<'img'> {
  
  height?: string
}
export declare const Picture: FC<PictureProps>
interface StyledEntryProps {
  
  
}

export declare const Entry: FC<ComponentProps<'article'>>
interface StyledTitleProps {
  variant?: 'primary' | 'secondary'
  
}

export interface TitleProps extends ComponentProps<'h1'> {
  variant?: 'primary' | 'secondary'
  
}
export declare const Title: FC<TitleProps>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'div'>>

interface ClassName {
  'separator' : StyledSeparatorProps
  'picture' : StyledPictureProps
  'entry' : StyledEntryProps
  'title' : StyledTitleProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
