import { parse } from 'node:path'

/**
 * @param {'js' | 'css' } loader
 * @param {string} code
 * @param {string} [sourceFilename]
 * @returns {Promise<string>}
 */
async function minify(loader, code, sourceFilename) {
  // Is already minified?
  if (!code.includes('\n')) {
    return code
  }

  /**
   * Whether the code should remain as is (preserved)
   */
  let preserve = false

  if (sourceFilename) {
    const sourceFilenameParse = parse(sourceFilename)

    if (sourceFilenameParse.base.includes('.preserve')) {
      preserve = true
    }
  }

  /**
   * Note: For DocSchema, inline JsDoc comments are used, and they must stay
   * in the file!
   * However, such problem exists, that minifiers seem to always remove inline
   * JsDoc comments, even if they are marked with @preserve. For that reason,
   * the decision is to just not minify the whole file when DocSchema is being
   * used in it.
   */
  if (
    !preserve
    && (code.includes('docSchema(') || code.includes('new DocSchema('))
  ) {
    preserve = true
  }

  if (preserve) {
    return code
  }

  /** @type {import('esbuild').TransformOptions} */
  const options = {
    minify: true,
    loader: loader,
  }

  if (sourceFilename) {
    options.sourcemap = 'inline'
    options.sourceRoot = sourceFilename
  }

  const minifier = await import('esbuild')
  const minified = await minifier.transform(code, options)

  if (
    (
      !sourceFilename
      && code.length > 0
      && minified.code.length === 0
    )
    || (
      sourceFilename
      && code.length > 0
      && minified.code.indexOf('//# sourceMappingURL') === 0
    )
  ) {
    return code
  }

  return minified.code
}

/**
 * @param {string} code
 * @param {string} [sourceFilename]
 * @returns {Promise<string>}
 */
function minifyCSS(code, sourceFilename) {
  return minify('css', code, sourceFilename)
}

/**
 * @param {string} code
 * @param {string} [sourceFilename]
 * @returns {Promise<string>}
 */
function minifyJS(code, sourceFilename) {
  return minify('js', code, sourceFilename)
}

export { minifyCSS, minifyJS }
