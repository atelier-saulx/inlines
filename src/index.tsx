import * as React from 'react'
import { css, keyframes } from 'goober'
import { transform } from './transform.js'
import type {
  Props,
  Style,
  As,
  StyledComponent,
  StyledHtmlComponent,
  StyledFn,
  Theme
} from './types.js'

const InlinesContext = React.createContext<Theme | undefined>(undefined)

const ThemeProvider = ({
  children,
  theme
}: {
  children: React.ReactNode
  theme: Theme
}) => {
  return (
    <InlinesContext.Provider value={theme}>{children}</InlinesContext.Provider>
  )
}

const styled = new Proxy(
  (as: As, style: Style) => {
    const Styled = React.forwardRef((props: Props, ref) => {
      const theme = React.useContext(InlinesContext)

      return React.createElement(
        as,
        transform(
          props,
          props.style
            ? {
                ...style,
                ...props.style
              }
            : style,
          ref,
          theme
        ),
        props.children
      )
    })

    return Styled
  },
  {
    get(t: any, p: string) {
      if (!(p in t)) {
        if (p === 'prototype') {
          t[p] = undefined
        } else {
          const as = p.toLowerCase()
          const Styled = React.forwardRef((props: Props, ref) => {
            const theme = React.useContext(InlinesContext)

            return React.createElement(
              as,
              transform(props, props.style, ref, theme),
              props.children
            )
          })
          t[p] = Styled
        }
      }
      return t[p]
    }
  }
) as Record<string, StyledHtmlComponent> & StyledFn

export type { Props, Style, As, StyledComponent, StyledFn, StyledHtmlComponent }
export { styled, css, keyframes, ThemeProvider }
