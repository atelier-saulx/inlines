import { stringHash } from '@saulx/hash'

const c = {}
let i = 10
let j = 36

export const toHash = (str, bundle?) => {
  const h = stringHash(str)
  if (!(h in c)) {
    if (bundle) {
      if (i === j) {
        i *= 10
        j *= 36
      }
      // means it's bundling
      c[h] = Number(i++).toString(36)
    } else {
      const id = Number(h >>> 0).toString(36)
      c[h] = isNaN(Number(id[0])) ? id : `_${id}`
    }
  }
  return c[h]
}
