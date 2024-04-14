import { hash } from './core/hash.js'
import { getSheet } from './core/get-sheet.js'

export const css = (obj, bundle?) => hash(obj, getSheet(), false, bundle)
export const keyframes = (obj, bundle?) => hash(obj, getSheet(), true, bundle)
