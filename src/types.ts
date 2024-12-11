import {
  CSSProperties,
  FunctionComponent,
  ReactHTML,
  ReactNode,
  ReactSVG,
} from 'react'

export type Style = CSSProperties & {
  [key: `@media${string}`]: Style
  [key: `@keyframes${string}`]: Record<string, CSSProperties>
  [key: `&${string}`]: Style
}

export type Props = { [key: string]: any; style?: Style; children?: ReactNode }
export type As = string | FunctionComponent<any>

export type StyledFn = (as: As, style: Style) => FunctionComponent<Props>
export type StyledProxy = {
  [Tag in keyof (ReactHTML & ReactSVG)]: FunctionComponent<
    Omit<JSX.IntrinsicElements[Tag], 'style'> & { style?: Style }
  >
}
