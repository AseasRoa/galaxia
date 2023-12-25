import { findIndexFile } from '../functions.js'

class Sass {
  indexFileExtensions = ['.sass', '.scss']

  /**
   * @param {string} dir
   * @param {string} indexFileName
   * @returns {Promise<string>}
   * @throws If the transpile process fails
   */
  async transpileDir(dir, indexFileName) {
    const indexFile = await findIndexFile(
      dir,
      indexFileName,
      this.indexFileExtensions
    )

    if (!indexFile) {
      return ''
    }

    /**
     * @type {import('sass')}
     */
    const transpiler = (await import('sass'))
    const result = transpiler.compile(indexFile)

    return result.css
  }
}

export { Sass }
