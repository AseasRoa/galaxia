import { readFile } from '../../../functions/fileSystem.js'

/**
 * @param {string} inputFile
 * @returns {Promise<Function>}
 */
export async function compileFile(inputFile) {
  const html = (await readFile(inputFile)).toString()

  return () => html
}
