import { getSheet } from './get-sheet.js'
/**
 * Extracts and wipes the cache
 * @returns {String}
 */
export let extractCss = () => {
  let sheet = getSheet()
  let out = sheet.data
  sheet.data = ''
  return out
}

/**
 * Updates the target and keeps a local cache
 * @param {String} css
 * @param {Object} sheet
 * @param {Boolean} append
 */
export let update = (css, sheet) => {
  return sheet.data.indexOf(css) === -1 && (sheet.data = sheet.data + css)
}
