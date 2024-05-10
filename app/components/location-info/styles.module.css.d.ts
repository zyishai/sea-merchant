import {FC, ComponentProps} from 'react'

interface StyledIconProps {
  
  size?: string
src: string
}

export interface IconProps extends ComponentProps<'span'> {
  
  size?: string
src: string
}
export declare const Icon: FC<IconProps>
interface StyledPictureProps {
  
  height?: string
}

export interface PictureProps extends ComponentProps<'img'> {
  
  height?: string
}
export declare const Picture: FC<PictureProps>
interface StyledItemProps {
  
  
}

export declare const Item: FC<ComponentProps<'div'>>
interface StyledLocationCardProps {
  active?: boolean
  
}

export interface LocationCardProps extends ComponentProps<'article'> {
  active?: boolean
  
}
export declare const LocationCard: FC<LocationCardProps>
interface StyledRowProps {
  
  
}

export declare const Row: FC<ComponentProps<'div'>>
interface StyledTitleProps {
  
  
}

export declare const Title: FC<ComponentProps<'h1'>>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'div'>>

interface ClassName {
  'icon' : StyledIconProps
  'picture' : StyledPictureProps
  'item' : StyledItemProps
  'location-card' : StyledLocationCardProps
  'row' : StyledRowProps
  'title' : StyledTitleProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
