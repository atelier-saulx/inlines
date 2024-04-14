import { toHash } from './to-hash.js'
import { update } from './update.js'
import { parse } from './parse.js'

let cache = {}
let stringify = (data) => {
  if (typeof data == 'object') {
    let out = ''
    for (let p in data) out += p + stringify(data[p])
    return out
  }
  return data
}

export let hash = (compiled, sheet, keyframes = false, bundle) => {
  // Get a string representation of the object or the value that is called 'compiled'
  let stringifiedCompiled = stringify(compiled)

  // Retrieve the className from cache or hash it in place
  let className =
    cache[stringifiedCompiled] ||
    (cache[stringifiedCompiled] = toHash(stringifiedCompiled, bundle))

  // If there's no entry for the current className
  if (!cache[className]) {
    // Parse it
    cache[className] = parse(
      // For keyframes
      keyframes ? { ['@keyframes ' + className]: compiled } : compiled,
      '.' + className,
    )
  }

  // add or update
  update(cache[className], sheet)

  // return hash
  return className
}
