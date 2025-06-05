import { ElementProps } from './ElementProps'
import { Bindable } from '../common'
import { svgCommonAttributes } from '../attributes/common'

/**
 * @see https://developer.mozilla.org/docs/Web/API/SVGElement
 */
export interface SVGElementProps extends ElementProps {
  /**
   * Contains a boolean value reflecting the `autofocus` HTML global attribute.
   * It indicates whether the SVG element should be focused when the page loads
   * or when the element becomes shown if the SVG element is inside a `<dialog>`
   * or a popover.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement/autofocus)
   */
  autofocus?: Bindable<boolean>,

  style?: svgCommonAttributes['style'],

  /**
   * Represents the tab order of the current SVG element.
   *
   * Tab order is as follows:
   *
   * 1. Elements with a positive `tabIndex`. Elements that have identical
   * `tabIndex` values should be navigated in the order they appear.
   * Navigation proceeds from the lowest `tabIndex` to the highest `tabIndex`.
   *
   * 2. Elements that do not support the `tabIndex` attribute or support it
   * and assign `tabIndex` to `0`, in the order they appear.
   *
   * Elements that are disabled do not participate in the tabbing order.
   *
   * Values don't need to be sequential, nor must they begin with any particular
   * value. They may even be negative, though each browser trims very large
   * values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement/tabIndex)
   */
  tabIndex?: Bindable<number>,

  /**
   * Fired when page loading is stopped before an SVG element has been allowed
   * to load completely.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement)
   */
  onAbort?(this: GlobalEventHandlers, event: Event): any,

  /**
   * Fired when an SVG element does not load properly or when an error occurs
   * during script execution.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement)
   */
  onError?(this: GlobalEventHandlers, event: Event): any,

  /**
   * Fires on an `SVGElement` when it is loaded in the browser.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement)
   */
  onLoad?(this: GlobalEventHandlers, event: Event): any,

  /**
   * Fired when an SVG document is being resized.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement)
   */
  onResize?(this: GlobalEventHandlers, event: Event): any,

  /**
   * Fired when an SVG document view is being shifted along the X and/or Y axes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement)
   */
  onScroll?(this: GlobalEventHandlers, event: Event): any,

  /**
   * Fired when the DOM implementation removes an SVG document from a window
   * or frame.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement)
   */
  onUnload?(this: GlobalEventHandlers, event: Event): any,
}
