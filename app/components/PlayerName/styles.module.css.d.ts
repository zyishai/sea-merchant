import {FC, ComponentProps} from 'react'

interface StyledNameProps {
  
  
}

export declare const Name: FC<ComponentProps<'h1'>>

interface ClassName {
  'player_name' : StyledNameProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
