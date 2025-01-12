import { parse } from 'node:path'

/**
 * @param {string} inputFile
 * @returns {Promise<Function | null>}
 */
async function compileFile(inputFile) {
  const parsedPath = parse(inputFile)
  let compiler = null

  if (parsedPath.ext === '.html') {
    compiler = await import('./compilers/html.js')
  }
  else if (parsedPath.ext === '.md') {
    compiler = await import('./compilers/md.js')
  }
  else if (parsedPath.ext === '.ejs') {
    compiler = await import('./compilers/ejs.js')
  }
  else if (parsedPath.ext === '.pug') {
    compiler = await import('./compilers/pug.js')
  }
  else if (parsedPath.ext === '.handlebars') {
    compiler = await import('./compilers/handlebars.js')
  }

  if (compiler) {
    return compiler.compileFile(inputFile)
  }

  return null
}

/**
 * @param {string} ext
 * @param {Function} template
 * @param {Object<*,*>} data
 * @returns {string}
 */
function applyTemplate(ext, template, data) {
  if (
    ext === '.html'
    || ext === '.md'
    || ext === '.ejs'
    || ext === '.pug'
    || ext === '.handlebars'
  ) {
    return template(data)
  }

  return ''
}

export { applyTemplate, compileFile }
