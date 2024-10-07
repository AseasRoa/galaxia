import { component, isComponent, isTemplate } from 'paintor'
import { Words } from './Words.js'

class Views {
  /** @type {Words} */
  #words

  /**
   * @param {Words} words
   */
  constructor( words) {
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
    if (isComponent(fn)) {
      const translation = await this.#words.getTranslation()

      // @ts-ignore
      html = fn.useTranslations(translation).html()
    }
    // Case 2: Paintor Template
    else if (isTemplate(fn)) {
      const translation = await this.#words.getTranslation()

      html = component(fn).useTranslations(translation).html()
    }
    else if (typeof fn === 'function') {
      // @ts-ignore
      html = fn(data)

      if (isComponent(html) || isTemplate(html)) {
        // @ts-ignore
        return this.generateHtml(html, data)
      }
    }

    return (typeof html === 'string') ? html : 'NOT_STRING'
  }
}

export { Views }
