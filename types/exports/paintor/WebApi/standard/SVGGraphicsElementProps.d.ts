import { SVGElementProps } from './SVGElementProps'

/**
 * Represents SVG elements whose primary purpose is to directly render
 * graphics into a group.
 *
 * @see https://developer.mozilla.org/docs/Web/API/SVGGraphicsElement
 */
export interface SVGGraphicsElementProps extends SVGElementProps {
  /**
   * Fired when the user initiates a copy action through the browser's user
   * interface.
   *
   * The event's default action is to copy the selection (if any) to the clipboard.
   *
   * A handler for this event can modify the clipboard contents by calling
   * `setData(format, data)` on the event's `ClipboardEvent.clipboardData`
   * property, and cancelling the event's default action using
   * `event.preventDefault()`.
   *
   * However, the handler cannot read the clipboard data.
   *
   * It's possible to construct and dispatch a synthetic `copy` event,
   * but this will not affect the system clipboard.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGGraphicsElement/copy_event)
   */
  onCopy?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * Fired when the user has initiated a "cut" action through the browser's user
   * interface.
   *
   * If the user attempts a cut action on uneditable content, the `cut` event
   * still fires but the event object contains no data.
   *
   * The event's default action is to copy the current selection (if any)
   * to the system clipboard and remove it from the document.
   *
   * A handler for this event can modify the clipboard contents by calling
   * `setData(format, data)` on the event's `ClipboardEvent.clipboardData`
   * property, and cancelling the default action using `event.preventDefault()`.
   *
   * Note though that cancelling the default action will also prevent
   * the document from being updated. So an event handler which wants
   * to emulate the default action for "cut" while modifying the clipboard
   * must also manually remove the selection from the document.
   *
   * The handler cannot read the clipboard data.
   *
   * It's possible to construct and dispatch a synthetic `cut` event,
   * but this will not affect the system clipboard or the document's contents.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGGraphicsElement/cut_event)
   */
  onCut?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * Fired when the user has initiated a "paste" action through the browser's user interface.
   *
   * If the cursor is in an editable context (for example, in a `<textarea>`
   * or an element with `contenteditable` attribute set to true) then
   * the default action is to insert the contents of the clipboard
   * into the document at the cursor position.
   *
   * A handler for this event can access the clipboard contents by calling
   * `getData()` on the event's `clipboardData` property.
   *
   * To override the default behavior (for example to insert some different
   * data or a transformation of the clipboard contents) an event handler
   * must cancel the default action using `event.preventDefault()`,
   * and then insert its desired data manually.
   *
   * It's possible to construct and dispatch a synthetic `paste` event,
   * but this will not affect the document's contents.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGGraphicsElement/paste_event)
   */
  onPaste?(this: GlobalEventHandlers, event: ClipboardEvent): any,
}
