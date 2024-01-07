import { Combo } from './common'
import { EventHandlers } from './EventHandlers'
import { EventHandlersLowercase } from './EventHandlersLowercase'
import { HTMLElementProperties } from './HTMLElementProperties'
import { NodeMethods } from './NodeMethods'
import { NodeProperties } from './NodeProperties'

/**
 * Element is the most general base class from which all element
 * objects (i.e. objects that represent elements) in a Document
 * inherit. It only has methods and properties common to all kinds
 * of elements. More specific classes inherit from Element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */

export type GlobalProperties =
  ElementProperties
  & HTMLElementProperties
  & NodeProperties
  & NodeMethods
  & EventHandlers
  & EventHandlersLowercase

export type ElementProperties = {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/assignedSlot
   * @readonly
   */
  readonly assignedSlot? : Element['assignedSlot'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
   * @readonly
   */
  readonly attributes? : Element['attributes'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount
   * @readonly
   */
  readonly childElementCount? : Element['childElementCount'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/children
   * @readonly
   */
  readonly children? : Element['children'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   * @readonly
   */
  readonly classList? : Element['classList'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/className */
  className? : Combo<Element['className']>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
   * @readonly
   */
  readonly clientHeight? : Element['clientHeight'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft
   * @readonly
   */
  readonly clientLeft? : Element['clientLeft'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop
   * @readonly
   */
  readonly clientTop? : Element['clientTop'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
   * @readonly
   */
  readonly clientWidth? : Element['clientWidth'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild
   * @readonly
   */
  readonly firstElementChild? : Element['firstElementChild'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/id */
  id? : Combo<Element['id']>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML */
  innerHTML? : Combo<Element['innerHTML']>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild
   * @readonly
   */
  readonly lastElementChild? : Element['lastElementChild'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/localName
   * @readonly
   */
  readonly localName? : Element['localName'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/namespaceURI
   * @readonly
   */
  readonly namespaceURI? : Element['namespaceURI'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling
   * @readonly
   */
  readonly nextElementSibling? : Element['nextElementSibling'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML */
  outerHTML? : Combo<Element['outerHTML']>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/part */
  part? : Combo<string>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/prefix
   * @readonly
   */
  readonly prefix? : Element['prefix'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
   * @readonly
   */
  readonly previousElementSibling? : Element['previousElementSibling'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
   * @readonly
   */
  readonly scrollHeight? : Element['scrollHeight'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft */
  scrollLeft? : Combo<Element['scrollLeft']>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeftMax
   * @readonly
   */
  readonly scrollLeftMax? : number,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop */
  scrollTop? : Combo<Element['scrollTop']>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTopMax
   * @readonly
   */
  readonly scrollTopMax? : number,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth
   * @readonly
   */
  readonly scrollWidth? : Element['scrollWidth'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot
   * @readonly
   */
  readonly shadowRoot? : Element['shadowRoot'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/slot */
  slot? : Combo<Element['slot']>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName
   * @readonly
   */
  readonly tagName? : Element['tagName'],
}
