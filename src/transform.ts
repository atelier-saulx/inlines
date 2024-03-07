import { css, keyframes } from 'goober'
import type { Props, Style, Theme } from './types'

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

const replaceNestedValue = (value: any, style: Style, theme: Theme) => {
  const sortedKeys = Object.keys(theme).sort((a, b) => b.length - a.length)

  for (const key in value) {
    if (typeof value[key] === 'object') {
      replaceNestedValue(value[key], style, theme)
      continue
    }

    for (const themeKey of sortedKeys) {
      if (typeof value[key] === 'string' && value[key].includes(themeKey)) {
        value[key] = value[key].replace(themeKey, theme[themeKey])
      }
    }
  }
}

export const transform = (
  p: Props,
  style: Style = {},
  ref: any,
  theme?: Theme
) => {
  const props = { ...p, ref } as Props
  const s = {} as Style

  for (let key in style) {
    // @ts-ignore
    let value = style[key]
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
          if (key.includes(':hover')) {
            value = { [key]: value }
            key = '@media (hover: hover)'
          }
          addImportant(value, style)
        }

        if (theme) {
          replaceNestedValue(value, style, theme)
        }

        const className = css({ [key]: value })
        props.className = props.className
          ? `${props.className} ${className}`
          : className
      }
    } else {
      if (theme) {
        const sortedKeys = Object.keys(theme).sort(
          (a, b) => b.length - a.length
        )
        for (const themeKey of sortedKeys) {
          if (typeof value === 'string' && value.includes(themeKey)) {
            value = value.replace(themeKey, theme[themeKey])
          }
        }
      }

      // @ts-ignore
      s[key] = value
    }
  }

  // add some defaults
  if (p.onClick && !s.cursor) {
    s.cursor = 'pointer'
  }

  props.style = s
  return props
}
