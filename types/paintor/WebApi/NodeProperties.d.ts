/**
 * The DOM Node interface is an abstract base class upon which
 * many other DOM API objects are based, thus letting those
 * object types to be used similarly and often interchangeably.
 * As an abstract class, there is no such thing as a plain Node
 * object. All objects that implement Node functionality are
 * based on one of its subclasses. Most notable are Document,
 * Element, and DocumentFragment.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */

import { Combo } from './common'

export type NodeProperties = {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI
   * @readonly
   */
  readonly baseURI? : Node['baseURI'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
   * @readonly
   */
  readonly childNodes? : Node['childNodes'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild
   * @readonly
   */
  readonly firstChild? : Node['firstChild'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected
   * @readonly
   */
  readonly isConnected? : Node['isConnected'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild
   * @readonly
   */
  readonly lastChild? : Node['lastChild'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
   * @readonly
   */
  readonly nextSibling? : Node['nextSibling'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
   * @readonly
   */
  readonly nodeName? : Node['nodeName'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
   * @readonly
   */
  readonly nodeType? : Node['nodeType'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue */
  nodeValue? : Combo<Node['nodeValue']>,

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument
   * @readonly
   */
  readonly ownerDocument? : Node['ownerDocument'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
   * @readonly
   */
  readonly parentNode? : Node['parentNode'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
   * @readonly
   */
  readonly parentElement? : Node['parentElement'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling
   * @readonly
   */
  readonly previousSibling? : Node['previousSibling'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent */
  textContent? : Combo<Node['textContent'] | any[] | number | boolean>,
}
