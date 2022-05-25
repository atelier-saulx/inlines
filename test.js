import test from 'node:test'
import { transform } from './dist/transform.js'

test('synchronous passing test', (t) => {
  const props = {
    style: {
      opacity: 1,
      '&:hover': {
        opacity: 0.5
      }
    }
  }

  console.log(transform(props, props.style))
})
