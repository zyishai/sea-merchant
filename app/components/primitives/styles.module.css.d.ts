import {FC, ComponentProps} from 'react'

interface StyledAbsolutePositionProps {
  
  bottom?: string
left?: string
right?: string
top?: string
inset?: string
}

export interface AbsolutePositionProps extends ComponentProps<'div'> {
  
  bottom?: string
left?: string
right?: string
top?: string
inset?: string
}
export declare const AbsolutePosition: FC<AbsolutePositionProps>
interface StyledCenteredColumnProps {
  inline?: 'start' | 'center' | 'stretch'
  margin?: string
padding?: string
gap?: string
}

export interface CenteredColumnProps extends ComponentProps<'div'> {
  inline?: 'start' | 'center' | 'stretch'
  margin?: string
padding?: string
gap?: string
}
export declare const CenteredColumn: FC<CenteredColumnProps>
interface StyledFlexRowProps {
  inline?: 'start' | 'center'
  margin?: string
padding?: string
gap?: string
}

export interface FlexRowProps extends ComponentProps<'div'> {
  inline?: 'start' | 'center'
  margin?: string
padding?: string
gap?: string
}
export declare const FlexRow: FC<FlexRowProps>
interface StyledImageIconProps {
  
  size?: string
width?: string
height?: string
}

export interface ImageIconProps extends ComponentProps<'img'> {
  
  size?: string
width?: string
height?: string
}
export declare const ImageIcon: FC<ImageIconProps>
interface StyledBorderedCardProps {
  mode?: 'whiteCast' | 'none'
  image?: string
padding?: string
}

export interface BorderedCardProps extends ComponentProps<'div'> {
  mode?: 'whiteCast' | 'none'
  image?: string
padding?: string
}
export declare const BorderedCard: FC<BorderedCardProps>
interface StyledButtonProps {
  color?: 'blue' | 'gold' | 'red' | 'jade' | 'black' | 'white'
variant?: 'primary' | 'secondary' | 'outline'
size?: 'small' | 'normal' | 'big'
  
}

export interface ButtonProps extends ComponentProps<'button'> {
  color?: 'blue' | 'gold' | 'red' | 'jade' | 'black' | 'white'
variant?: 'primary' | 'secondary' | 'outline'
size?: 'small' | 'normal' | 'big'
  
}
export declare const Button: FC<ButtonProps>
interface StyledSeparatorProps {
  
  color?: string
width?: string
m?: string
margin?: string
}

export interface SeparatorProps extends ComponentProps<'hr'> {
  
  color?: string
width?: string
m?: string
margin?: string
}
export declare const Separator: FC<SeparatorProps>
interface StyledRightColumnProps {
  
  
}

export declare const RightColumn: FC<ComponentProps<'div'>>
interface StyledLeftColumnProps {
  
  
}

export declare const LeftColumn: FC<ComponentProps<'div'>>
interface StyledFixedColumnLayoutProps {
  
  fixedColumnMinWidth?: string
}

export interface FixedColumnLayoutProps extends ComponentProps<'main'> {
  
  fixedColumnMinWidth?: string
}
export declare const FixedColumnLayout: FC<FixedColumnLayoutProps>
interface StyledFullHeightContainerProps {
  
  
}

export declare const FullHeightContainer: FC<ComponentProps<'main'>>

interface ClassName {
  'absolute_position' : StyledAbsolutePositionProps
  'centered_column' : StyledCenteredColumnProps
  'flex_row' : StyledFlexRowProps
  'image_icon' : StyledImageIconProps
  'bordered_card' : StyledBorderedCardProps
  'button' : StyledButtonProps
  'separator' : StyledSeparatorProps
  'right_column' : StyledRightColumnProps
  'fixed_left_column' : StyledLeftColumnProps
  'fixed_column_layout' : StyledFixedColumnLayoutProps
  'container' : StyledFullHeightContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
