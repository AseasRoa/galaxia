import { Bindable, StringConvertible } from '../common'

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Node)
 */
export interface NodeProps {
/**
   * Sets the value of the current node.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeValue)
   */
  nodeValue?: Bindable<StringConvertible>,

  /**
   * Sets the value of the current node.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/textContent)
   */
  textContent?: Bindable<StringConvertible>,

  /**
   * The `selectstart` event of the
   * [Selection API](https://developer.mozilla.org/docs/Web/API/Selection)
   * is fired when a user starts a new selection.
   *
   * If the event is canceled, the selection is not changed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/selectstart_event)
   */
  onSelectStart?: GlobalEventHandlers['onselectstart'],
}
