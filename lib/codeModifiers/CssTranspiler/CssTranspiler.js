import { Css } from './definitions/Css.js'
import { Sass } from './definitions/Sass.js'
import { Stylus } from './definitions/Stylus.js'

class CssTranspiler {
  /**
   * An array of CSS transpiler definitions. The order matters.
   *
   * @type {Array<(Css | Stylus | Sass)>}
   */
  transpilers = [new Css(), new Sass(), new Stylus()]

  /**
   * @param {string} dir
   * @param {string} [indexFileName]
   * @returns {Promise<string>}
   */
  async transpileDir(dir, indexFileName = 'index') {
    let cssCode = ''

    for (const transpiler of this.transpilers) {
      cssCode = await transpiler.transpileDir(dir, indexFileName)

      if (cssCode) break
    }

    return cssCode
  }
}

export { CssTranspiler }
