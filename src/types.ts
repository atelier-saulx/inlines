import {
  ComponentClass,
  CSSProperties,
  FunctionComponent,
  PropsWithChildren
} from 'react'

export type Props = PropsWithChildren<any>
export type As = string | FunctionComponent<any> | ComponentClass<any, any>
export interface Style extends CSSProperties {
  [key: string]: Style | string | number | undefined | null
}
