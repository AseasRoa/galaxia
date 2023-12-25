/**
 * @see https://nodejs.org/api/module.html#hooks
 */

import { readFile } from 'fs/promises'

/**
 * @typedef LoaderContext
 * @type {object}
 * @property {string[]} conditions
 * @property {object} importAssertions
 * @property {string | undefined} parentURL
 */

/**
 * @param {string} specifier
 * @param {LoaderContext} context
 * @param {Function} next
 * @returns {Promise<*>}
 */

/**
 * This function loads the content of files ending with ".css"
 * to an ECMAScript Module, so the default export is a string
 * containing the CSS stylesheet.
 *
 * @param {string} url
 * @param {LoaderContext} context
 * @param {Function} nextLoad
 * @returns {Promise<*>}
 */
export async function load(url, context, nextLoad) {
  if (url.endsWith('.css')) {
    const content = await readFile(new URL(url))

    return {
      format: 'module',
      source: `export default ${JSON.stringify(content.toString())}`,
      shortCircuit: true
    }
  }

  return nextLoad(url, context, nextLoad)
}
