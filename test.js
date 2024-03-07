import { describe, it } from 'node:test'
import { deepStrictEqual } from 'node:assert'
import { transform } from './dist/transform.js'

describe('transform()', () => {
  it('should overwrite values when theme is provided', () => {
    const theme = {
      primary: 'darkblue',
      'primary:hover': 'lightblue'
    }

    const props = {
      style: {
        background: 'primary !important',
        border: '1px solid primary:hover',
        '&:hover': {
          background: 'primary:hover'
        }
      }
    }

    const result = transform(props, props.style, null, theme)

    deepStrictEqual(result.style, {
      background: 'darkblue !important',
      border: '1px solid lightblue'
    })
  })

  // would be nice to have tests for e.g the following stuff, but we don't have access to goobers output here
  // so there is no easy way to assert
  // it('should add !important to repeated keys', () => {
  //   const props = {
  //     style: {
  //       background: 'blue',
  //       '&:hover': {
  //         background: 'red'
  //       }
  //     }
  //   }

  //   const result = transform(props, props.style, null)

  //   deepStrictEqual(result.style, {
  //     background: 'blue'
  //   })
  // })
})
