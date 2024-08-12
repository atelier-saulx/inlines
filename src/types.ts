import {
  ComponentClass,
  CSSProperties,
  FunctionComponent,
  InputHTMLAttributes,
  ReactHTML,
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
export type StyledHtmlComponent<T> = T extends T
  ? FunctionComponent<InputHTMLAttributes<T>>
  : never

export type StyledFn = (as: As, style: Style) => StyledComponent

type Keys = keyof ReactHTML

export type StyledProxy = {
  [Tag in Keys]: StyledHtmlComponent<JSX.IntrinsicElements[Tag]>
}
