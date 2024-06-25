import { join } from 'node:path'
import { isClass } from '../functions/utils.js'

class RouterFileGenerator {
  /**
   * @param {string} sourceFileAbsPath
   * @param {string} moduleName
   * @param {string} routerName
   * @param {string} ajaxVersion
   * @returns {Promise<string>}
   */
  async generate(sourceFileAbsPath, moduleName, routerName, ajaxVersion) {
    const version = new Date().getTime()

    const exports = (await import(join('file://', `${sourceFileAbsPath}?v=${version}`)))

    let output = `
const module = '${moduleName}'
const router = '${routerName}'
const ajaxVersion = '${ajaxVersion}'

`

    const namedExports = this.#generateNamedExports(exports)
    const defaultExports = this.#generateDefaultExports(exports, namedExports)

    let namedExportsString = ''

    namedExports.forEach((exp) => {
      namedExportsString += exp
    })

    output += `
${namedExportsString}
${defaultExports}
`.trimStart()

    return output
  }

  /**
   * @param {Function} theClass
   * @returns {{name: string, code: string}}
   */
  #generateClass(theClass) {
    const output = { name: '', code: '' }

    const descriptors = Object.getOwnPropertyDescriptors(theClass)

    let className = String(descriptors['name']?.value ?? '')

    // The class name it 'default' when it is exported as default class
    if (className === 'default') {
      className = ''
    }

    output.name = className

    output.code += `class ${(className) ? `${className} ` : ''}{
  #constructorArgs
  #sessionKey = ''

  constructor() {
    this.#constructorArgs = arguments
    this.#sessionKey = rpc.randomString(8)
  }
`

    let methods = Object.getOwnPropertyNames(theClass.prototype)

    methods = methods.filter((method) => method !== 'constructor')
    methods = methods.map((method) => this.#generateMethod(method, true))

    output.code += `${methods.join('')}}\n`

    return output
  }

  /**
   * @param {Object<string, any>} exports
   * @param {Map<string, string>} namedExports
   * @returns {string}
   */
  #generateDefaultExports(exports, namedExports) {
    let output = ''

    const defaultExport = exports['default']

    if (isClass(defaultExport)) {
      const generatedClass = this.#generateClass(defaultExport)
      const routerName = generatedClass.name
      const classOrName = (namedExports.has(routerName))
        ? routerName
        : generatedClass.code

      output += `export default ${classOrName}`
    }
    else if (defaultExport instanceof Object) {
      const names = []

      output += 'export default {'

      for (const name in defaultExport) {
        if (typeof defaultExport[name] === 'function') {
          names.push(name)
        }
      }

      output += `${names.join(',')}}`
    }

    return output
  }

  /**
   * @param {string} name
   * @param {boolean} isAsync
   * @returns {string}
   */
  #generateFunction(name, isAsync) {
    const async = (isAsync) ? 'async ' : ''

    return `${async}function ${name}() {
  return rpc('', module, router, [], '${name}', arguments, ajaxVersion, '')
}
`
  }

  /**
   * @param {string} name
   * @param {boolean} isAsync
   * @returns {string}
   */
  #generateMethod(name, isAsync) {
    const async = (isAsync) ? 'async ' : ''

    return `
  ${async}${name}() {
    return rpc(this.constructor.name, module, router, this.#constructorArgs, '${name}', arguments, ajaxVersion, this.#sessionKey)
  }
`
  }

  /**
   * @param {Object<string, any>} exports
   * @returns {Map<string, string>}
   */
  #generateNamedExports(exports) {
  /** @type {Map<string, string>} */
    const output = new Map()

    for (const name in exports) {
      if (name === 'default') continue

      const exp = exports[name]

      if (isClass(exp)) {
        output.set(name, `export ${this.#generateClass(exp).code}`)
      }
      else if (typeof exp === 'function') {
        output.set(name, `export ${this.#generateFunction(name, true)}`)
      }
    }

    return output
  }
}

export { RouterFileGenerator }
