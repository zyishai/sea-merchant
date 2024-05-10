import {FC, ComponentProps} from 'react'

interface StyledButtonProps {
  variant?: 'small' | 'normal'
  
}

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'small' | 'normal'
  
}
export declare const Button: FC<ButtonProps>
interface StyledTextProps {
  noBlending?: boolean
  color?: string
}

export interface TextProps extends ComponentProps<'p'> {
  noBlending?: boolean
  color?: string
}
export declare const Text: FC<TextProps>
interface StyledTitleProps {
  noBlending?: boolean
  color?: string
}

export interface TitleProps extends ComponentProps<'h1'> {
  noBlending?: boolean
  color?: string
}
export declare const Title: FC<TitleProps>
interface StyledBackgroundImageProps {
  
  src: string
}

export interface BackgroundImageProps extends ComponentProps<'div'> {
  
  src: string
}
export declare const BackgroundImage: FC<BackgroundImageProps>
interface StyledContainerProps {
  
  p?: string
}

export interface ContainerProps extends ComponentProps<'div'> {
  
  p?: string
}
export declare const Container: FC<ContainerProps>

interface ClassName {
  'button' : StyledButtonProps
  'paragraph-text' : StyledTextProps
  'title-text' : StyledTitleProps
  'background' : StyledBackgroundImageProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
