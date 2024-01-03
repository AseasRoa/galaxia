import { Combo } from './common'
import { CSSProperties } from './CSSProperties'

/**
 * The HTMLElement interface represents any HTML element.
 * Some elements directly implement this interface, while
 * others implement it via an interface that inherits it.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 */

export type HTMLElementProperties = {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/accessKey */
  accessKey? : Combo<string>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/accessKeyLabel
   * @readonly
   */
  accessKeyLabel? : Combo<string>,

  /** @see @readonly */
  attributeStyleMap? : Combo<string>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable */
  contentEditable? : Combo<'true'|'false'|'inherit'>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/isContentEditable
   * @readonly
   */
  isContentEditable? : Combo<boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contextMenu */
  contextMenu? : Combo<HTMLMenuElement>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
   * @readonly
   */
  dataset? : Combo<DOMStringMap>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir */
  dir? : Combo<'ltr'|'rtl'|'auto'>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  draggable? : Combo<boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint */
  enterkeyhint? : Combo<'enter'|'done'|'go'|'next'|'previous'|'search'|'send'>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden */
  hidden? : Combo<boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert */
  inert? : Combo<boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText */
  innerText? : Combo<string|number|boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  itemScope? : Combo<boolean>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
   * @readonly
   */
  itemType? : Combo<DOMTokenList>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  itemId? : Combo<string>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
   * @readonly
   */
  itemRef? : Combo<DOMTokenList>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
   * @readonly
   */
  itemProp? : Combo<DOMTokenList>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  itemValue? : Combo<Record<any, any>>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang */
  lang? : Combo<string>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  noModule? : Combo<boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/nonce */
  nonce? : Combo<number>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
   * @readonly
   */
  offsetHeight? : Combo<number>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
   * @readonly
   */
  offsetLeft? : Combo<number>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
   * @readonly
   */
  offsetParent? : Combo<Element>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
   * @readonly
   */
  offsetTop? : Combo<number>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
   * @readonly
   */
  offsetWidth? : Combo<number>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  spellcheck? : Combo<boolean>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style */
  style? : Combo<CSSProperties>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/tabIndex */
  tabIndex? : Combo<number>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/title */
  title? : Combo<string>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement */
  translate? : Combo<boolean>,
}
