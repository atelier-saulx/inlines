import { css, keyframes } from 'goober'
import type { Props, Style } from './types'

const addImportant = (nested: any, style: Style) => {
  for (const key in nested) {
    if (typeof nested[key] === 'object') {
      if (key[0] === '&') {
        addImportant(nested[key], style)
      }
    } else if (key in style && !/!important/.test(nested[key])) {
      nested[key] += ' !important'
    }
  }
}

export const transform = (p: Props, style: Style) => {
  const props = { ...p }
  const s = {} as Style
  for (const key in style) {
    const value = style[key]
    if (typeof value === 'object') {
      if (value !== null) {
        if (key[0] === '@') {
          if (key[1] === 'm') {
            addImportant(value, style)
          } else if (key[1] === 'k') {
            s.animation = `${keyframes(value)} 1s`
            continue
          }
        } else if (key[0] === '&') {
          addImportant(value, style)
        }
        const className = css({ [key]: value })
        props.className = props.className
          ? `${props.className} ${className}`
          : className
      }
    } else {
      s[key] = value
    }
  }
  props.style = s
  return props
}
