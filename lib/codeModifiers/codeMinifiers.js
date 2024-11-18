/**
 * @param {'js' | 'css' } loader
 * @param {string} code
 * @param {string} [sourceFilename]
 * @returns {Promise<string>}
 * @throws
 */
async function minify(loader, code, sourceFilename) {
  // Is already minified?
  if (!code.includes('\n')) {
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

  return minified.code
}

/**
 * @param {string} code
 * @param {string} [sourceFilename]
 * @returns {Promise<string>}
 * @throws
 */
async function minifyCSS(code, sourceFilename) {
  return minify('css', code, sourceFilename)
}

/**
 * @param {string} code
 * @param {string} [sourceFilename]
 * @returns {Promise<string>}
 * @throws
 */
async function minifyJS(code, sourceFilename) {
  return minify('js', code, sourceFilename)
}

export { minifyCSS, minifyJS }
