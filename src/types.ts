import {
  ComponentClass,
  CSSProperties,
  FunctionComponent,
  HTMLProps,
  FC,
  ReactNode,
} from 'react'

export type Style = CSSProperties & {
  [key: `@media${string}`]: Style
  [key: `@keyframes${string}`]: Record<string, CSSProperties>
  [key: `&${string}`]: Style
}
export type Props = { [key: string]: any; style?: Style; children?: ReactNode }
export type As = string | FunctionComponent<any> | ComponentClass<any, any>
export type StyledComponent = FunctionComponent<Props>
export type StyledHtmlComponent = FC<HTMLProps<any> & Props>
export type StyledFn = (as: As, style: Style) => StyledComponent
