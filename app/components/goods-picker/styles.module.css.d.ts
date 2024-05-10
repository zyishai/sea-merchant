import {FC, ComponentProps} from 'react'

interface StyledImageProps {
  
  
}

export declare const Image: FC<ComponentProps<'img'>>
interface StyledProductItemProps {
  selected?: boolean
  
}

export interface ProductItemProps extends ComponentProps<'article'> {
  selected?: boolean
  
}
export declare const ProductItem: FC<ProductItemProps>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'div'>>

interface ClassName {
  'image' : StyledImageProps
  'product-item' : StyledProductItemProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
