import {
  createElement,
  FunctionComponent,
  ComponentClass,
  CSSProperties,
  PropsWithChildren
} from 'react'
import { css, keyframes } from 'goober'

type Props = PropsWithChildren<any>
type Style = CSSProperties & any

const addImportant = (nested: any, style: Style) => {
  for (const i in nested) {
    if (typeof nested[i] === 'object') {
      addImportant(nested[i], style)
    } else if (i in style && !/!important/.test(nested[i])) {
      nested[i] += ' !important'
    }
  }
}

const transformProps = (p: Props, style: Style) => {
  const props = { ...p }
  const s = {} as Style
  for (const key in style) {
    const value = style[key]
    if (value !== null) {
      if (/^[a-zA-Z]/.test(key)) {
        s[key] = value
      } else if (/^@keyframes/.test(key)) {
        s.animation = `${keyframes(value)} 1s`
      } else {
        addImportant(value, style)
        const className = css({ [key]: value })
        props.className = props.className
          ? `${props.className} ${className}`
          : className
      }
    }
  }
  props.style = s
  return props
}

const styled = new Proxy(
  (
    as: string | FunctionComponent<any> | ComponentClass<any, any>,
    style: Style
  ) => {
    const Styled = (props: Props) =>
      createElement(
        as,
        transformProps(
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
              props.style ? transformProps(props, props.style) : props,
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
