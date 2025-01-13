/**
 * @param {string} inputFile
 * @returns {Promise<Function>}
 */
export async function compileFile(inputFile) {
  const compiler = await import('pug')
  const fn = compiler.compileFile(
    inputFile,
    {
      filename: inputFile
    }
  )

  return fn
}
