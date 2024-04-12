import test from 'ava'
import { extractCss, styled } from '../src/index.js'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

test('ssr', async (t) => {
  const el = createElement(styled.div, {
    style: {
      border: '1px solid red',
      '&:a': {
        background: 'blue',
      },
    },
  })

  console.log(renderToString(el))

  // After your app has rendered, just call it:
  const styleTag = `<style id="_goober">${extractCss()}</style>`

  console.log(styleTag)

  t.pass()
})
