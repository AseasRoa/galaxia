import { SVGElementProps } from './SVGElementProps'

declare class TimeEvent {
  /**
   * A `long` that specifies some detail information about the Event, depending
   * on the type of the event. For this event type, indicates the repeat number
   * for the animation.
   * @readonly
   */
  readonly detail: number

  /**
   * A `WindowProxy` that identifies the Window from which the event was
   * generated.
   * @readonly
   */
  readonly view: WindowProxy

  /**
   * Used to initialize the value of a `TimeEvent` created through the
   * DocumentEvent interface. This method may only be called before
   * the `TimeEvent` has been dispatched via the `dispatchEvent` method,
   * though it may be called multiple times during that phase if necessary.
   */
  initTimeEvent?(): any
}

/**
 * The SVGAnimationElement interface is the base interface for
 * all the animation element interfaces:
 * `SVGAnimateElement`, `SVGSetElement`, `SVGAnimateColorElement`,
 * `SVGAnimateMotionElement` and `SVGAnimateTransformElement`.
 *
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimationElement
 */
export interface SVGAnimationElementProps extends SVGElementProps {
  /**
   * Fired when the element local timeline begins to play. It will be raised
   * each time the element begins the active duration (i.e., when it restarts,
   * but not when it repeats).
   *
   * It may be raised both in the course of normal
   * (i.e., scheduled or interactive) timeline play, as well as in the case
   * that the element was begun with a DOM method.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGAnimationElement/beginEvent_event)
   */
  onBegin?(this: GlobalEventHandlers, event: TimeEvent): any,

  /**
   * Fired when at the active end of the animation is reached.
   *
   * > **_NOTE:_**
   * This event is not raised at the simple end of each animation repeat.
   * This event may be raised both in the course of normal (i.e., scheduled
   * or interactive) timeline play, as well as in the case that the element
   * was ended with a DOM method.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGAnimationElement/endEvent_event)
   */
  onEnd?(this: GlobalEventHandlers, event: TimeEvent): any,

  /**
   * Fired when the element's local timeline repeats. It will be fired each time
   * the element repeats, after the first iteration.
   *
   * > **_NOTE:_**
   * Associated with the `repeat` event is an integer that indicates which
   * repeat iteration is beginning; this can be found in the `detail` property
   * of the event object. The value is a 0-based integer, but the repeat event
   * is not raised for the first iteration and so the observed values will be
   * >= 1.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGAnimationElement/repeatEvent_event)
   */
  onRepeat?(this: GlobalEventHandlers, event: TimeEvent): any,
}
