import { readFile } from '../../../functions/fileSystem.js'
import { findIndexFile } from '../functions.js'

class Stylus {
  indexFileExtensions = ['.styl']

  /**
   * @param {string} dir
   * @param {string} indexFileName
   * @returns {Promise<string>}
   * @throws If the transpile process fails
   */
  async transpileDir(dir, indexFileName) {
    /**
     * Note:
     * It seems that when setting 'filename', the name must be written
     * with / instead of \, otherwise @require/@import doesn't work in
     * the .styl files.
     *
     * Alternatively, a directory path can be used, and it seems that
     * it doesn't matter what the slash is.
     *
     * If 'filename' points to a file that doesn't exist, there is an error.
     */

    /**
     * Note:
     * The callback in render() is synchronous
     */

    const indexFile = await findIndexFile(
      dir,
      indexFileName,
      this.indexFileExtensions
    )

    if (!indexFile) {
      return ''
    }

    let output = ''

    /**
     * @type {import('stylus')}
     */
    const transpiler = (await import('stylus')).default
    const code = (await readFile(indexFile)).toString()

    transpiler(code)
      .set('filename', indexFile)
      .set('include css', true)
      // Emit comments indicating filename and line numbers
      .set('linenos', false)
      // https://stylus-lang.com/docs/sourcemaps.html
      .set('sourcemap', { inline: true })
      .render((err, css) => {
        if (err) throw err
        output = css
      })

    return output
  }
}

export { Stylus }
