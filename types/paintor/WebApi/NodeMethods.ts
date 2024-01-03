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

export type NodeMethods = {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild */
  appendChild? : Node['appendChild'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode */
  cloneNode? : Node['cloneNode'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition */
  compareDocumentPosition? : Node['compareDocumentPosition'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains */
  contains? : Node['contains'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode */
  getRootNode? : Node['getRootNode'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes */
  hasChildNodes? : Node['hasChildNodes'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore */
  insertBefore? : Node['insertBefore'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isDefaultNamespace */
  isDefaultNamespace? : Node['isDefaultNamespace'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode */
  isEqualNode? : Node['isEqualNode'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isSameNode */
  isSameNode? : Node['isSameNode'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupPrefix */
  lookupPrefix? : Node['lookupPrefix'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupNamespaceURI */
  lookupNamespaceURI? : Node['lookupNamespaceURI'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize */
  normalize? : Node['normalize'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild */
  removeChild? : Node['removeChild'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild */
  replaceChild? : Node['replaceChild'],
}
