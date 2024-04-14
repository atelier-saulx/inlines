import test from 'ava'
import fs from 'node:fs/promises'
import { join } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { optimize } from '../src/optimize.js'

const __dirname = fileURLToPath(dirname(import.meta.url))

test('extra inline styles', async (t) => {
  const file = join(__dirname, '../../test/examples/index.txt')
  const content = await fs.readFile(file)
  const code = content.toString()
  const { js, css } = optimize(code)

  console.log('\n\nJS:\n', js)
  console.log('\n\nCSS:\n', css)

  t.true(true)
})
