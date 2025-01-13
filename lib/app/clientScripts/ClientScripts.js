import { readFile } from 'node:fs/promises'
import { dirname, join, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { minifyJS } from '../../codeModifiers/codeMinifiers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class ClientScripts {
  /**
   * @type {boolean}
   */
  #minify = false

  /**
   * @type {string}
   */
  #repositoryDirName = 'repository'

  /**
   * A cache used for file contents
   *
   * @type {Map<string, string>}
   */
  #scriptsCache = new Map()

  /**
   * Read JS repository for the browser. Each script would
   * be put into a <script> tag and ready to be injected
   * into an HTML code.
   *
   * @param {boolean} minify
   */
  constructor(minify) {
    this.#minify = minify
  }

  /**
   * Get a script (JS file contents) from a path, relative to /node_modules
   *
   * @param {string} relativePath
   * A relative path to a file, located in node_modules
   * @returns {Promise<string>}
   */
  async getScriptFromNodeModules(relativePath) {
    let code = this.#scriptsCache.get(relativePath)

    if (code === undefined) {
      const filePath = join(__dirname, '../../node_modules', relativePath)

      code = await this.#readJsFile(filePath)

      this.#scriptsCache.set(relativePath, code)
    }

    return code
  }

  /**
   * Get a script (JS file contents) from the /repository dir
   *
   * @param {"browserSupportCheck.js" | "rpc.js"} fileName
   * @returns {Promise<string>}
   * @throws If the requested script doesn't exist as a file
   */
  async getScriptFromRepository(fileName) {
    let code = this.#scriptsCache.get(fileName)

    if (code === undefined) {
      const filePath
        = __dirname + sep
        + this.#repositoryDirName + sep
        + fileName

      code = await this.#readJsFile(filePath)

      this.#scriptsCache.set(fileName, code)
    }

    return code
  }

  /**
   * Reads the contents of the requested JS file and returns them as they are,
   * or as minified version. A file is read only once, because its contents are
   * cached.
   *
   * @param {string} absoluteFilePath
   * @returns {Promise<string>}
   * Returns the contents of the requested JS file as they are, or minified
   * @throws
   * If the file cannot be read
   */
  async #readJsFile(absoluteFilePath) {
    let code = (await readFile(absoluteFilePath)).toString()

    if (this.#minify) code = await minifyJS(code)

    return code
  }
}

export { ClientScripts }
