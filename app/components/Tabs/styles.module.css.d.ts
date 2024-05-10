import {FC, ComponentProps} from 'react'

interface StyledTabContentProps {
  
  
}

export declare const TabContent: FC<ComponentProps<''>>
interface StyledTabButtonProps {
  
  
}

export declare const TabButton: FC<ComponentProps<''>>
interface StyledTabListProps {
  
  
}

export declare const TabList: FC<ComponentProps<''>>

interface ClassName {
  'tab_content' : StyledTabContentProps
  'tab_button' : StyledTabButtonProps
  'tab_list' : StyledTabListProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
