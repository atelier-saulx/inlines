import test from 'ava'
import { toHash } from '../src/core/to-hash.js'

test('hash', async (t) => {
  let n = 2000000
  const set = new Set()

  while (n--) {
    const id = toHash(String(n))
    if (!isNaN(Number(id[0]))) {
      t.fail()
    }
    if (set.has(id)) {
      t.fail()
    }
    set.add(id)
  }

  t.pass()
})
