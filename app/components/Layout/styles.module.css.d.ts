import {FC, ComponentProps} from 'react'

interface StyledPriceTableGridProps {
  
  
}

export declare const PriceTableGrid: FC<ComponentProps<'div'>>
interface StyledTooltipContentProps {
  
  
}

export declare const TooltipContent: FC<ComponentProps<''>>
interface StyledSvgImageProps {
  
  size?: string
}

export interface SvgImageProps extends ComponentProps<'img'> {
  
  size?: string
}
export declare const SvgImage: FC<SvgImageProps>
interface StyledItemProps {
  
  gap?: string
}

export interface ItemProps extends ComponentProps<'article'> {
  
  gap?: string
}
export declare const Item: FC<ItemProps>
interface StyledTitleProps {
  
  
}

export declare const Title: FC<ComponentProps<'small'>>
interface StyledGroupProps {
  
  gap?: string
}

export interface GroupProps extends ComponentProps<'div'> {
  
  gap?: string
}
export declare const Group: FC<GroupProps>
interface StyledHeadingProps {
  
  
}

export declare const Heading: FC<ComponentProps<'small'>>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'section'>>
interface StyledWithBorderImageProps {
  
  image?: string
}

export declare const WithBorderImage: FC<ComponentProps<''>>
interface StyledImgProps {
  
  size?: string
width?: string
height?: string
}

export interface ImgProps extends ComponentProps<'img'> {
  
  size?: string
width?: string
height?: string
}
export declare const Img: FC<ImgProps>

interface ClassName {
  'price_table_grid' : StyledPriceTableGridProps
  'tooltip_content' : StyledTooltipContentProps
  'section_image' : StyledSvgImageProps
  'section_item' : StyledItemProps
  'section_group__title' : StyledTitleProps
  'section_group' : StyledGroupProps
  'section_heading' : StyledHeadingProps
  'section_container' : StyledContainerProps
  'with_border_image' : StyledWithBorderImageProps
  'image' : StyledImgProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
