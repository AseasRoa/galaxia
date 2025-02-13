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
      const lightningcss = await import('lightningcss')
      const { code } = lightningcss.bundle({
        filename: indexFile,
        minify: false,
        sourceMap: false
      })

      return code.toString()

      // const esbuild = await import('esbuild')
      // const result = await esbuild.build({
      //   entryPoints: [indexFile],
      //   bundle: true,
      //   write: false,
      //   loader: {
      //     '.gif': 'dataurl',
      //     '.jpg': 'dataurl',
      //     '.png': 'dataurl',
      //     '.webp': 'dataurl',
      //     '.svg': 'text'
      //   }
      // })
      //
      // // @ts-expect-error
      // return result.outputFiles[0].text ?? ''
    }

    return (await readFile(indexFile)).toString()
  }
}

export { Css }
