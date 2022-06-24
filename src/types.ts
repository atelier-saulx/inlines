import { CSSAttribute } from 'goober'
import {
  ComponentClass,
  CSSProperties,
  FunctionComponent,
  PropsWithChildren
} from 'react'

export type Props = PropsWithChildren<any>
export type Style = CSSProperties & { [key: string]: string | CSSAttribute }
export type As = string | FunctionComponent<any> | ComponentClass<any, any>
