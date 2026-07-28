import { readFile } from 'node:fs/promises'
import { findIndexFile } from '../functions.js'

class Css {
  indexFileExtensions = ['.css']

  /**
   * @param {string} dir
   * @param {string} indexFileName
   * @param {boolean} bundle
   * @returns {Promise<string>}
   */
  async transpileDir(dir, indexFileName, bundle = true) {
    const indexFile = await findIndexFile(
      dir,
      indexFileName,
      this.indexFileExtensions
    )

    if (!indexFile) {
      return ''
    }

    if (bundle) {
      const lightningcss = await import('lightningcss')
      const { code } = lightningcss.bundle({
        filename: indexFile,
        minify: false,
        sourceMap: false
      })

      return code.toString()
    }

    return (await readFile(indexFile)).toString()
  }
}

export { Css }
