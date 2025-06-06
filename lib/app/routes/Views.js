import { compose, isComposition, isTemplate } from 'paintor'
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
   * @param {Template} fn
   * @param {Object<*,*>} [data] TODO use this parameter
   * @returns {Promise<string>}
   */
  async generateHtml(fn, data = {}) {
    let html = ''

    // Case 1: Paintor Component
    if (isComposition(fn)) {
      const translation = await this.#words.getTranslation()

      // @ts-expect-error
      html = fn.useTranslations(translation).html()
    }
    // Case 2: Paintor Template
    else if (isTemplate(fn)) {
      const translation = await this.#words.getTranslation()

      html = compose(fn).useTranslations(translation).html()
    }
    else if (typeof fn === 'function') {
      // @ts-expect-error
      html = fn(data)

      if (isComposition(html) || isTemplate(html)) {
        // @ts-expect-error
        return this.generateHtml(html, data)
      }
    }

    return (typeof html === 'string') ? html : 'NOT_STRING'
  }
}

export { Views }
