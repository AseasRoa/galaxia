import { readFile } from '../../../../../functions/fileSystem.js'

/**
 * @param {string} inputFile
 * @returns {Promise<Function>}
 */
export async function compileFile(inputFile) {
  const compiler = await import('marked')
  const fileContents = (await readFile(inputFile)).toString()
  const md = compiler.parse(fileContents)

  return () => md
}
