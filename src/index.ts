import { createElement, forwardRef } from 'react'
import { css, keyframes } from 'goober'
import { transform } from './transform.js'
import type { Props, Style, As } from './types'

const styled = new Proxy(
  (as: As, style: Style) => {
    const Styled = forwardRef((props: Props, ref) =>
      createElement(
        as,
        transform(
          props,
          props.style
            ? {
                ...style,
                ...props.style
              }
            : style,
          ref
        ),
        props.children
      )
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
          const Styled = forwardRef((props: Props, ref) =>
            createElement(
              as,
              transform(props, props.style, ref),
              props.children
            )
          )
          t[p] = Styled
        }
      }
      return t[p]
    }
  }
)

export { styled, css, keyframes }
