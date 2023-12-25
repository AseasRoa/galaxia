import paintor from 'paintor'
import { Words } from './Words.js'

class Views {
  /** @type {Words} */
  #words

  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {string} */
  componentsDir = ''

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   * @param {string} componentName
   * @param {Words} words
   */
  constructor(appConfig, appPaths, componentName, words) {
    this.appConfig = appConfig
    this.appPaths = appPaths
    this.componentName = componentName
    this.componentsDir = this.appPaths.components
    this.#words = words
  }

  /**
   * @param {Template | Component} fn
   * @param {Object<*,*>} [data] TODO use this parameter
   * @returns {Promise<string>}
   */
  async generateHtml(fn, data = {}) {
    let html = ''

    // Case 1: Paintor Component
    if (fn instanceof paintor.Component) {
      const translation = await this.#words.getTranslation()

      // @ts-ignore
      html = fn.useTranslations(translation).html()
    }
    // Case 2: Paintor Template
    else if (fn instanceof Function && paintor.isTemplate(fn)) {
      const translation = await this.#words.getTranslation()

      html = paintor.component(fn).useTranslations(translation).html()
    }

    return (typeof html === 'string') ? html : 'NOT_STRING'
  }
}

export { Views }
