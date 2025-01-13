import { readFile } from '../../../../../functions/fileSystem.js'

/**
 * @param {string} inputFile
 * @returns {Promise<Function>}
 */
export async function compileFile(inputFile) {
  const compiler = (await import('handlebars')).default
  const fileContents = (await readFile(inputFile)).toString()
  const template = compiler.compile(fileContents)

  return template
}
