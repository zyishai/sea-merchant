import {FC, ComponentProps} from 'react'

interface StyledCountryNameProps {
  
  color?: string
}

export declare const CountryName: FC<ComponentProps<''>>
interface StyledMapFlagProps {
  
  
}

export declare const MapFlag: FC<ComponentProps<''>>
interface StyledMapProps {
  
  
}

export declare const Map: FC<ComponentProps<'div'>>
interface StyledPerspectiveContainerProps {
  
  
}

export declare const PerspectiveContainer: FC<ComponentProps<'div'>>

interface ClassName {
  'country_name' : StyledCountryNameProps
  'map_flag' : StyledMapFlagProps
  'map' : StyledMapProps
  'perspective_container' : StyledPerspectiveContainerProps
}

type ApplyStyle = <C extends keyof ClassName, P>(className: C, Component: FC<P>) => FC<P & ClassName[C]>

export declare const applyStyle: ApplyStyle
