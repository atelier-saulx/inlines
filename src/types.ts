import {
  ComponentClass,
  CSSProperties,
  FunctionComponent,
  PropsWithChildren
} from 'react'

export type Props = PropsWithChildren<any>
export type Style = CSSProperties & any
export type As = string | FunctionComponent<any> | ComponentClass<any, any>
