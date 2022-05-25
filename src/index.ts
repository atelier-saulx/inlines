import { createElement } from 'react'
import { css, keyframes } from 'goober'
import { transform } from './transform'
import type { Props, Style, As } from './types'

const styled = new Proxy(
  (as: As, style: Style) => {
    const Styled = (props: Props) =>
      createElement(
        as,
        transform(
          props,
          props.style
            ? {
                ...style,
                ...props.style
              }
            : style
        ),
        props.children
      )

    return Styled
  },
  {
    get(t: any, p: string) {
      if (!(p in t)) {
        if (p === 'prototype') {
          t[p] = undefined
        } else {
          const as = p.toLowerCase()
          const Styled = (props: Props) =>
            createElement(
              as,
              props.style ? transform(props, props.style) : props,
              props.children
            )
          t[p] = Styled
        }
      }
      return t[p]
    }
  }
)

export { styled, css, keyframes }
