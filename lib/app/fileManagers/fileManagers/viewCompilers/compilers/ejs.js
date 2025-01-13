import { readFile } from '../../../../../functions/fileSystem.js'

/**
 * @param {string} inputFile
 * @returns {Promise<Function>}
 */
export async function compileFile(inputFile) {
  const compiler = await import('ejs')
  const fileContents = (await readFile(inputFile)).toString()
  const fn = compiler.compile(
    fileContents,
    {
      filename: inputFile,
      strict: false,
      async: false
    }
  )

  return fn
}
