import { readFile } from 'node:fs/promises'
import { findIndexFile } from '../functions.js'

class Css {
  indexFileExtensions = ['.css']

  /**
   * @param {string} dir
   * @param {string} indexFileName
   * @param {boolean} bundle
   * @returns {Promise<string>}
   * @throws If the transpile process fails
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
      const minifier = await import('esbuild')
      const result = await minifier.build({
        entryPoints: [indexFile],
        bundle: true,
        write: false,
        loader: {
          '.gif': 'dataurl',
          '.jpg': 'dataurl',
          '.png': 'dataurl',
          '.webp': 'dataurl',
          '.svg': 'text'
        }
      })

      // @ts-ignore
      return result.outputFiles[0].text ?? ''
    }

    return (await readFile(indexFile)).toString()
  }
}

export { Css }
