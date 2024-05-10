import {FC, ComponentProps} from 'react'

interface StyledToggleItemProps {
  active?: boolean
  
}

export declare const ToggleItem: FC<ComponentProps<''>>
interface StyledToggleGroupProps {
  
  
}

export declare const ToggleGroup: FC<ComponentProps<''>>

interface ClassName {
  'toggle_item' : StyledToggleItemProps
  'toggle_group' : StyledToggleGroupProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
