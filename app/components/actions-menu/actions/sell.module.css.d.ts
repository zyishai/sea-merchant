import {FC, ComponentProps} from 'react'

interface StyledCancelButtonProps {
  
  
}

export declare const CancelButton: FC<ComponentProps<'button'>>
interface StyledFieldProps {
  
  
}

export declare const Field: FC<ComponentProps<'div'>>
interface StyledTransactionFormProps {
  
  
}

export declare const TransactionForm: FC<ComponentProps<'div'>>
interface StyledTransactionContainerProps {
  
  
}

export declare const TransactionContainer: FC<ComponentProps<'div'>>
interface StyledImageProps {
  
  
}

export declare const Image: FC<ComponentProps<'img'>>
interface StyledItemProps {
  selected?: boolean
  
}

export interface ItemProps extends ComponentProps<'article'> {
  selected?: boolean
  
}
export declare const Item: FC<ItemProps>
interface StyledGoodsPickerProps {
  
  
}

export declare const GoodsPicker: FC<ComponentProps<'div'>>
interface StyledContainerProps {
  
  
}

export declare const Container: FC<ComponentProps<'div'>>

interface ClassName {
  'cancel-button' : StyledCancelButtonProps
  'field' : StyledFieldProps
  'transaction-form' : StyledTransactionFormProps
  'transaction-container' : StyledTransactionContainerProps
  'image' : StyledImageProps
  'product-item' : StyledItemProps
  'goods-picker' : StyledGoodsPickerProps
  'container' : StyledContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
