import ts from 'typescript'
import { css } from './index.js'
import { extractCss } from './ssr.js'

export const optimize = (code: string) => {
  const sourceFile = ts.createSourceFile(
    '',
    code,
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.TSX,
  )

  const chars = code.split('')
  const rm = (i, end) => {
    for (; i < end; i++) {
      chars[i] = ''
    }
  }

  const read = (i, end) => {
    let str = ''
    for (; i < end; i++) {
      str += chars[i]
    }
    return str
  }

  const traverse = (node, walk, ...args) => {
    let lastChild
    for (const key in node) {
      if (key === 'p') continue
      if (typeof node[key] === 'object') {
        lastChild = node[key]
        lastChild.p = node
        walk(lastChild, ...args)
      }
    }
    return lastChild
  }

  const walkStyleProp = (node, classNames) => {
    if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
      if (node.properties) {
        let remainingProps
        let keepStyled
        for (let i = 0; i < node.properties.length; i++) {
          const prop = node.properties[i]

          if (!prop.initializer) {
            keepStyled = true
            continue
          }

          const key = prop.name.escapedText || prop.name.text
          if (!key) {
            keepStyled = true
            continue
          }

          const isNumber =
            prop.initializer.kind === ts.SyntaxKind.FirstLiteralToken

          if (
            isNumber ||
            prop.initializer.kind === ts.SyntaxKind.StringLiteral
          ) {
            classNames.push(
              css(
                {
                  [key]: isNumber
                    ? Number(prop.initializer.text)
                    : prop.initializer.text,
                },
                1,
              ),
            )
            if (i < node.properties.length - 1) {
              const next = node.properties[i + 1]
              rm(prop.pos, next.pos)
            } else {
              rm(prop.pos, node.end - 1)
            }
            continue
          }

          if (!keepStyled) {
            remainingProps = true
            if ((key[0] === '@' && key[1] === 'm') || key[0] === '&') {
              keepStyled = true
            }
          }
        }

        if (!keepStyled) {
          let el = node
          let tagName

          while (!tagName) {
            el = el.p
            tagName = el.tagName
          }

          rm(tagName.expression.pos, tagName.name.pos)

          if (el.p.closingElement) {
            const tagClose = el.p.closingElement.tagName
            rm(tagClose.expression.pos, tagClose.name.pos)
          }

          if (!remainingProps) {
            rm(node.p.p.pos, node.p.p.end)
          }
        }
      }

      return
    }

    traverse(node, walkStyleProp, classNames)
  }

  const walkStyledEl = (node, classNames) => {
    if (node.kind === ts.SyntaxKind.JsxAttribute) {
      if (node.name?.escapedText === 'className') {
        if (node.initializer.kind === ts.SyntaxKind.JsxExpression) {
          classNames.hasExpression = true
          classNames.push(
            `\${${read(
              node.initializer.expression.pos,
              node.initializer.expression.end,
            )}}`,
          )
        } else {
          classNames.push(node.initializer.text)
        }

        rm(node.pos, node.end)
      }
      if (node.name?.escapedText === 'style') {
        traverse(node, walkStyleProp, classNames)
        return
      }
    }

    traverse(node, walkStyledEl, classNames)
  }

  const walk = (node: any) => {
    if (
      node.kind === ts.SyntaxKind.JsxOpeningElement ||
      node.kind === ts.SyntaxKind.JsxSelfClosingElement
    ) {
      if (node.tagName.expression?.escapedText === 'styled') {
        const classNames: any = []
        const lastChild = traverse(node, walkStyledEl, classNames)
        if (classNames.length) {
          let a, b
          if (classNames.hasExpression) {
            a = '{`'
            b = '`}'
          } else {
            a = b = '"'
          }
          chars[lastChild.pos] =
            ` className=${a}${classNames.join(' ')}${b}${chars[lastChild.pos]}`
        }
        return
      }
    }
    traverse(node, walk)
  }

  ts.forEachChild(sourceFile, walk)

  return {
    js: chars.join(''),
    css: extractCss(),
  }
}
