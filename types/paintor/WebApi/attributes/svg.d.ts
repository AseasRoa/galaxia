import { Bindable } from '../common'
import { svgCommonAttributes, svgPresentationAttributes } from './common'
import { SVGGraphicsElementProps } from '../standard/SVGGraphicsElementProps'
import { SVGAnimationElementProps } from '../standard/SVGAnimationElementProps'
import { SVGElementProps } from '../standard/SVGElementProps'

export interface aAttributes extends SVGGraphicsElementProps {
  /**
   * Instructs browsers to download a URL instead of navigating to it,
   * so the user will be prompted to save it as a local file.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/a)
   */
  download?: Bindable<string>,

  /**
   * The human language of the URL or URL fragment that the hyperlink points to.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/a)
   */
  hrefLang?: Bindable<string>,

  /**
   * A space-separated list of URLs to which, when the hyperlink is followed,
   * `POST` requests with the body `PING` will be sent by the browser
   * (in the background). Typically used for tracking. For a more
   * widely-supported feature addressing the same use cases,
   * see
   * [Navigator.sendBeacon()](https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/a)
   */
  ping?: Bindable<string>,

  /**
   * Which referrer to send when fetching the URL.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/a)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    |'no-referrer-when-downgrade'
    |'same-origin'
    |'origin'
    |'strict-origin'
    |'origin-when-cross-origin'
    |'strict-origin-when-cross-origin'
    |'unsafe-url'
  >,

  /**
   * The relationship of the target object to the link object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/a)
   */
  rel?: Bindable<string>,

  target?: svgCommonAttributes['target'],

  type?: svgCommonAttributes['type'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface animateAttributes extends SVGAnimationElementProps {
  'accumulate'?: svgCommonAttributes['accumulate'],
  'additive'?: svgCommonAttributes['additive'],
  'attributeName'?: svgCommonAttributes['attributeName'],
  'begin'?: svgCommonAttributes['begin'],
  'by'?: svgCommonAttributes['by'],
  'calcMode'?: svgCommonAttributes['calcMode'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'dur'?: svgCommonAttributes['dur'],
  'end'?: svgCommonAttributes['end'],
  'fill'?: svgPresentationAttributes['fill'],
  'from'?: svgCommonAttributes['from'],
  'href'?: svgCommonAttributes['href'],
  'id'?: svgCommonAttributes['id'],
  'keyPoints'?: svgCommonAttributes['keyPoints'],
  'keySplines'?: svgCommonAttributes['keySplines'],
  'keyTimes'?: svgCommonAttributes['keyTimes'],
  'max'?: svgCommonAttributes['max'],
  'min'?: svgCommonAttributes['min'],
  'repeatCount'?: svgCommonAttributes['repeatCount'],
  'repeatDur'?: svgCommonAttributes['repeatDur'],
  'restart'?: svgCommonAttributes['restart'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'to'?: svgCommonAttributes['to'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'type'?: Bindable<'translate'|'scale'|'rotate'|'skewX'|'skewY'>,
  'values'?: svgCommonAttributes['values'],
}

export interface animateMotionAttributes extends SVGAnimationElementProps {
  /**
   * This attribute indicate, in the range [0,1], how far is the object along
   * the path for each `keyTimes` associated values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/animateMotion)
   */
  keyPoints?: svgCommonAttributes['keyPoints'],

  /**
   * This attribute defines the path of the motion, using the same syntax
   * as the `d` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/animateMotion)
   */
  path?: svgCommonAttributes['path'],

  /**
   * This attribute defines a rotation applied to the element animated along
   * a path, usually to make it pointing in the direction of the animation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/animateMotion)
   */
  rotate?: svgCommonAttributes['rotate'],

  'accumulate'?: svgCommonAttributes['accumulate'],
  'additive'?: svgCommonAttributes['additive'],
  'begin'?: svgCommonAttributes['begin'],
  'by'?: svgCommonAttributes['by'],
  'calcMode'?: svgCommonAttributes['calcMode'],
  'color'?: svgPresentationAttributes['color'],
  'dur'?: svgCommonAttributes['dur'],
  'end'?: svgCommonAttributes['end'],
  'fill'?: svgPresentationAttributes['fill'],
  'from'?: svgCommonAttributes['from'],
  'href'?: svgCommonAttributes['href'],
  'id'?: svgCommonAttributes['id'],
  'keySplines'?: svgCommonAttributes['keySplines'],
  'keyTimes'?: svgCommonAttributes['keyTimes'],
  'max'?: svgCommonAttributes['max'],
  'min'?: svgCommonAttributes['min'],
  'origin'?: svgCommonAttributes['origin'],
  'repeatCount'?: svgCommonAttributes['repeatCount'],
  'repeatDur'?: svgCommonAttributes['repeatDur'],
  'restart'?: svgCommonAttributes['restart'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'to'?: svgCommonAttributes['to'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'values'?: svgCommonAttributes['values'],
}

export interface animateTransformAttributes extends SVGAnimationElementProps {
  by?: svgCommonAttributes['by'],
  from?: svgCommonAttributes['from'],
  to?: svgCommonAttributes['to'],
  type?: Bindable<'translate'|'scale'|'rotate'|'skewX'|'skewY'>,

  'accumulate'?: svgCommonAttributes['accumulate'],
  'additive'?: svgCommonAttributes['additive'],
  'attributeName'?: svgCommonAttributes['attributeName'],
  'begin'?: svgCommonAttributes['begin'],
  'calcMode'?: svgCommonAttributes['calcMode'],
  'color'?: svgPresentationAttributes['color'],
  'dur'?: svgCommonAttributes['dur'],
  'end'?: svgCommonAttributes['end'],
  'fill'?: svgPresentationAttributes['fill'],
  'href'?: svgCommonAttributes['href'],
  'id'?: svgCommonAttributes['id'],
  'keyPoints'?: svgCommonAttributes['keyPoints'],
  'keySplines'?: svgCommonAttributes['keySplines'],
  'keyTimes'?: svgCommonAttributes['keyTimes'],
  'max'?: svgCommonAttributes['max'],
  'min'?: svgCommonAttributes['min'],
  'repeatCount'?: svgCommonAttributes['repeatCount'],
  'repeatDur'?: svgCommonAttributes['repeatDur'],
  'restart'?: svgCommonAttributes['restart'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'values'?: svgCommonAttributes['values'],
}

export interface circleAttributes extends SVGGraphicsElementProps {
  /**
   * The x-axis coordinate of the center of the circle.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/circle)
   */
  cx?: svgPresentationAttributes['cx'],

  /**
   * The y-axis coordinate of the center of the circle.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/circle)
   */
  cy?: svgPresentationAttributes['cy'],

  /**
   * The radius of the circle. A value lower or equal to zero disables
   * rendering of the circle.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/circle)
   */
  r?: svgCommonAttributes['r'],

  /**
   * The total length for the circle's circumference, in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/circle)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface clipPathAttributes extends SVGElementProps {
  clipPathUnits?: svgCommonAttributes['clipPathUnits'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'clip-rule'?: svgPresentationAttributes['clip-rule'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface defsAttributes extends SVGGraphicsElementProps {
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'id'?: svgCommonAttributes['id'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface descAttributes extends SVGElementProps {
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface discardAttributes extends SVGAnimationElementProps {
  /**
   * The trigger that causes the `<discard>` element to become active, at which
   * point the associated element should be discarded. This is commonly
   * a `syncbase-value` indicating the start or end of another animation,
   * an `offset-value` relative to when the SVG file was loaded into the DOM,
   * or an `event-value`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/discard)
   */
  begin?: svgCommonAttributes['begin'],

  /**
   * An URL reference for the target element to discard. This has the same
   * requirements as href on animation elements, and can be another `<discard>`
   * element. If not defined, the target element is the immediate parent of
   * the `<discard>` element.
   *
   * Note that if the target element is not part of the current SVG document
   * fragment, whether it is discarded depends on the target language.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/discard)
   */
  href?: svgCommonAttributes['href'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface ellipseAttributes extends SVGGraphicsElementProps {
  /**
   * The x position of the center of the ellipse.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/ellipse)
   */
  cx?: svgPresentationAttributes['cx'],

  /**
   * The y position of the center of the ellipse.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/ellipse)
   */
  cy?: svgPresentationAttributes['cy'],

  /**
   * The radius of the ellipse on the x axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/ellipse)
   */
  rx?: svgCommonAttributes['rx'],

  /**
   * The radius of the ellipse on the y axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/ellipse)
   */
  ry?: svgCommonAttributes['ry'],

  /**
   * This attribute lets specify the total length for the path, in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/ellipse)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface feBlendAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  in2?: svgCommonAttributes['in2'],
  mode?: svgCommonAttributes['mode'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feColorMatrixAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  type?: Bindable<'matrix'|'saturate'|'hueRotate'|'luminanceToAlpha'>,
  values?: svgCommonAttributes['values'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feComponentTransferAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feCompositeAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  in2?: svgCommonAttributes['in2'],

  /**
   * Defines the compositing operation that is to be performed.
   *
   * - `over`:
   * This value indicates that the source graphic defined in the `in` attribute
   * is placed over the destination graphic defined in the `in2` attribute.
   *
   * - `in`:
   * This value indicates that the parts of the source graphic defined in
   * the `in` attribute that overlap the destination graphic defined in
   * the `in2` attribute, replace the destination graphic.
   *
   * - `out`:
   * This value indicates that the parts of the source graphic defined in
   * the `in` attribute that fall outside the destination graphic defined in
   * the `in2` attribute, are displayed.
   *
   * - `atop`:
   * This value indicates that the parts of the source graphic defined in
   * the `in` attribute, which overlap the destination graphic defined in
   * the `in2` attribute, replace the destination graphic. The parts of
   * the destination graphic that do not overlap with the source graphic
   * stay untouched.
   *
   * - `xor`:
   * This value indicates that the non-overlapping regions of the source graphic
   * defined in the `in` attribute and the destination graphic defined in
   * the `in2` attribute are combined.
   *
   * - `lighter`:
   * This value indicates that the sum of the source graphic defined in the `in`
   * attribute and the destination graphic defined in the `in2` attribute is
   * displayed.
   *
   * - `arithmetic`:
   * This value indicates that the source graphic defined in the `in` attribute
   * and the destination graphic defined in the `in2` attribute are combined
   * using the following formula:
   *
   * `result = k1*i1*i2 + k2*i1 + k3*i2 + k4`
   *
   * where: `i1` and `i2` indicate the corresponding pixel channel values of
   * the input image, which map to `in` and `in2` respectively,
   * and `k1`, `k2`, `k3`, and `k4` indicate the values of
   * the attributes with the same name.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/operator)
   */
  operator?: Bindable<'over'|'in'|'out'|'atop'|'xor'|'lighter'|'arithmetic'>,
  k1?: svgCommonAttributes['k1'],
  k2?: svgCommonAttributes['k2'],
  k3?: svgCommonAttributes['k3'],
  k4?: svgCommonAttributes['k4'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feConvolveMatrixAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  order?: svgCommonAttributes['order'],
  kernelMatrix?: svgCommonAttributes['kernelMatrix'],
  bias?: svgCommonAttributes['bias'],
  targetX?: svgCommonAttributes['targetX'],
  targetY?: svgCommonAttributes['targetY'],
  edgeMode?: svgCommonAttributes['edgeMode'],
  preserveAlpha?: svgCommonAttributes['preserveAlpha'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'divisor'?: svgCommonAttributes['divisor'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feDiffuseLightingAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  surfaceScale?: svgCommonAttributes['surfaceScale'],
  diffuseConstant?: svgCommonAttributes['diffuseConstant'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'lighting-color'?: svgPresentationAttributes['lighting-color'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feDisplacementMapAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  in2?: svgCommonAttributes['in2'],
  scale?: svgCommonAttributes['scale'],
  xChannelSelector?: svgCommonAttributes['xChannelSelector'],
  yChannelSelector?: svgCommonAttributes['yChannelSelector'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feDistantLightAttributes extends SVGElementProps {
  azimuth?: svgCommonAttributes['azimuth'],
  elevation?: svgCommonAttributes['elevation'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface feDropShadowAttributes extends SVGElementProps {
  /**
   * This attribute defines the x offset of the drop shadow.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDropShadow)
   */
  dx?: svgCommonAttributes['dx'],

  /**
   * This attribute defines the y offset of the drop shadow.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDropShadow)
   */
  dy?: svgCommonAttributes['dy'],

  /**
   * This attribute defines the standard deviation for the blur operation in
   * the drop shadow.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDropShadow)
   */
  stdDeviation?: svgCommonAttributes['stdDeviation'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'flood-color'?: svgPresentationAttributes['flood-color'],
  'flood-opacity'?: svgPresentationAttributes['flood-opacity'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'in'?: svgCommonAttributes['in'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feFloodAttributes extends SVGElementProps {
  'flood-color'?: svgPresentationAttributes['flood-color'],
  'flood-opacity'?: svgPresentationAttributes['flood-opacity'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feFuncAAttributes extends SVGElementProps {
  'amplitude'?: svgCommonAttributes['amplitude'],
  'exponent'?: svgCommonAttributes['exponent'],
  'id'?: svgCommonAttributes['id'],
  'intercept'?: svgCommonAttributes['intercept'],
  'slope'?: svgCommonAttributes['slope'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'tableValues'?: svgCommonAttributes['tableValues'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'type'?: Bindable<'identity'|'table'|'discrete'|'linear'|'gamma'>,
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feFuncBAttributes extends SVGElementProps {
  'amplitude'?: svgCommonAttributes['amplitude'],
  'exponent'?: svgCommonAttributes['exponent'],
  'id'?: svgCommonAttributes['id'],
  'intercept'?: svgCommonAttributes['intercept'],
  'slope'?: svgCommonAttributes['slope'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'tableValues'?: svgCommonAttributes['tableValues'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'type'?: Bindable<'identity'|'table'|'discrete'|'linear'|'gamma'>,
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feFuncGAttributes extends SVGElementProps {
  'amplitude'?: svgCommonAttributes['amplitude'],
  'exponent'?: svgCommonAttributes['exponent'],
  'id'?: svgCommonAttributes['id'],
  'intercept'?: svgCommonAttributes['intercept'],
  'slope'?: svgCommonAttributes['slope'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'tableValues'?: svgCommonAttributes['tableValues'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'type'?: Bindable<'identity'|'table'|'discrete'|'linear'|'gamma'>,
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feFuncRAttributes extends SVGElementProps {
  'amplitude'?: svgCommonAttributes['amplitude'],
  'exponent'?: svgCommonAttributes['exponent'],
  'id'?: svgCommonAttributes['id'],
  'intercept'?: svgCommonAttributes['intercept'],
  'slope'?: svgCommonAttributes['slope'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'tableValues'?: svgCommonAttributes['tableValues'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'type'?: Bindable<'identity'|'table'|'discrete'|'linear'|'gamma'>,
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feGaussianBlurAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  stdDeviation?: svgCommonAttributes['stdDeviation'],
  edgeMode?: svgCommonAttributes['edgeMode'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feImageAttributes extends SVGElementProps {
  crossOrigin?: svgCommonAttributes['crossOrigin'],
  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'href'?: svgCommonAttributes['href'],
  'id'?: svgCommonAttributes['id'],
  'in'?: svgCommonAttributes['in'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feMergeAttributes extends SVGElementProps {
  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feMergeNodeAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feMorphologyAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],

  /**
   * Defines the compositing operation that is to be performed.
   *
   * - `erode`:
   * This value thins the source graphic defined in the `in` attribute.
   *
   * - `dilate`:
   * This value fattens the source graphic defined in the `in` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/operator)
   */
  operator?: Bindable<'erode'|'dilate'>,
  radius?: svgCommonAttributes['radius'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feOffsetAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  dx?: svgCommonAttributes['dx'],
  dy?: svgCommonAttributes['dy'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface fePointLightAttributes extends SVGElementProps {
  x?: svgCommonAttributes['x'],
  y?: svgCommonAttributes['y'],
  z?: svgCommonAttributes['z'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface feSpecularLightingAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],
  specularConstant?: svgCommonAttributes['specularConstant'],
  specularExponent?: svgCommonAttributes['specularExponent'],
  surfaceScale?: svgCommonAttributes['surfaceScale'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'lighting-color'?: svgPresentationAttributes['lighting-color'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feSpotLightAttributes extends SVGElementProps {
  x?: svgCommonAttributes['x'],
  y?: svgCommonAttributes['y'],
  z?: svgCommonAttributes['z'],
  pointsAtX?: svgCommonAttributes['pointsAtX'],
  pointsAtY?: svgCommonAttributes['pointsAtY'],
  specularExponent?: svgCommonAttributes['specularExponent'],
  limitingConeAngle?: svgCommonAttributes['limitingConeAngle'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface feTileAttributes extends SVGElementProps {
  in?: svgCommonAttributes['in'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'result'?: svgCommonAttributes['result'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface feTurbulenceAttributes extends SVGElementProps {
  baseFrequency?: svgCommonAttributes['baseFrequency'],

  'color-interpolation-filters'?: svgPresentationAttributes['color-interpolation-filters'],
  'height'?: svgCommonAttributes['height'],
  'width'?: svgCommonAttributes['width'],
  'id'?: svgCommonAttributes['id'],
  'numOctaves'?: svgCommonAttributes['numOctaves'],
  'result'?: svgCommonAttributes['result'],
  'seed'?: svgCommonAttributes['seed'],
  'stitchTiles'?: svgCommonAttributes['stitchTiles'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'type'?: Bindable<'fractalNoise'|'turbulence'>,
  'x'?: svgCommonAttributes['x'],
  'y'?: svgCommonAttributes['y'],
}

export interface filterAttributes extends SVGElementProps {
  x?: svgCommonAttributes['x'],
  y?: svgCommonAttributes['y'],
  height?: svgCommonAttributes['height'],
  width?: svgCommonAttributes['width'],
  filterUnits?: svgCommonAttributes['filterUnits'],
  primitiveUnits?: svgCommonAttributes['primitiveUnits'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface foreignObjectAttributes extends SVGGraphicsElementProps {
  x?: svgCommonAttributes['x'],
  y?: svgCommonAttributes['y'],
  height?: svgCommonAttributes['height'],
  width?: svgCommonAttributes['width'],

  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'id'?: svgCommonAttributes['id'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface gAttributes extends SVGGraphicsElementProps {
  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface imageAttributes extends SVGGraphicsElementProps {
  x?: svgCommonAttributes['x'],

  y?: svgCommonAttributes['y'],

  /**
   * The width the image renders at. Unlike HTML's `<img>`,
   * this attribute is required.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/image)
   */
  width: svgCommonAttributes['width'],

  /**
   * The height the image renders at. Unlike HTML's `<img>`,
   * this attribute is required.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/image)
   */
  height: svgCommonAttributes['height'],

  /**
   * Points at a URL for the image file.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/image)
   */
  href?: svgCommonAttributes['href'],

  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],

  crossOrigin?: svgCommonAttributes['crossOrigin'],

  decoding?: svgCommonAttributes['decoding'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'image-rendering'?: svgPresentationAttributes['image-rendering'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface lineAttributes extends SVGGraphicsElementProps {
  /**
   * Defines the x-axis coordinate of the line starting point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/line)
   */
  x1?: svgCommonAttributes['x1'],

  /**
   * Defines the x-axis coordinate of the line ending point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/line)
   */
  x2?: svgCommonAttributes['x2'],

  /**
   * Defines the y-axis coordinate of the line starting point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/line)
   */
  y1?: svgCommonAttributes['y1'],

  /**
   * Defines the y-axis coordinate of the line ending point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/line)
   */
  y2?: svgCommonAttributes['y2'],

  /**
   * Defines the total path length in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/line)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linecap'?: svgPresentationAttributes['stroke-linecap'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface linearGradientAttributes extends SVGElementProps {
  /**
   * This attribute defines the coordinate system for attributes `x1`, `x2`,
   * `y1`, `y2`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  gradientUnits?: svgCommonAttributes['gradientUnits'],

  /**
   * This attribute provides additional transformation to the gradient
   * coordinate system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  gradientTransform?: svgCommonAttributes['gradientTransform'],

  /**
   * This attribute defines a reference to another `<linearGradient>` element
   * that will be used as a template.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  href?: svgCommonAttributes['href'],

  /**
   * This attribute indicates how the gradient behaves if it starts or ends
   * inside the bounds of the shape containing the gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  spreadMethod?: svgCommonAttributes['spreadMethod'],

  /**
   * This attribute defines the x coordinate of the starting point
   * of the vector gradient along which the linear gradient is drawn.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  x1?: svgCommonAttributes['x1'],

  /**
   * This attribute defines the x coordinate of the ending point
   * of the vector gradient along which the linear gradient is drawn.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  x2?: svgCommonAttributes['x2'],

  /**
   * This attribute defines the y coordinate of the starting point
   * of the vector gradient along which the linear gradient is drawn.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  y1?: svgCommonAttributes['y1'],

  /**
   * This attribute defines the y coordinate of the ending point
   * of the vector gradient along which the linear gradient is drawn.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
   */
  y2?: svgCommonAttributes['y2'],

  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface markerAttributes extends SVGElementProps {
  markerHeight?: svgCommonAttributes['markerHeight'],

  markerUnits?: svgCommonAttributes['markerUnits'],

  markerWidth?: svgCommonAttributes['markerWidth'],

  orient?: svgCommonAttributes['orient'],

  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],

  viewBox?: svgCommonAttributes['viewBox'],

  /**
   * This attribute defines the x coordinate for the reference point
   * of the marker.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/marker)
   */
  refX?: svgCommonAttributes['refX'],

  /**
   * This attribute defines the x coordinate for the reference point
   * of the marker.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/marker)
   */
  refY?: svgCommonAttributes['refY'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface maskAttributes extends SVGElementProps {
  /**
   * This attribute determines the height of the masking area.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/mask)
   */
  height?: svgCommonAttributes['height'],

  maskContentUnits?: svgCommonAttributes['maskContentUnits'],

  maskUnits?: svgCommonAttributes['maskUnits'],

  /**
   * This attribute defines the x-axis coordinate of the top-left corner
   * of the masking area.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/mask)
   */
  x?: svgCommonAttributes['x'],

  /**
   * This attribute defines the y-axis coordinate of the top-left corner
   * of the masking area.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/mask)
   */
  y?: svgCommonAttributes['y'],

  /**
   * This attribute defines the width of the masking area.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/mask)
   */
  width?: svgCommonAttributes['width'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface metadataAttributes extends SVGElementProps {
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface mpathAttributes extends SVGElementProps {
  /**
   * For `<mpath>`, `href` defines a URL referring to the `<path>` element or
   * basic shape which defines the motion path.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/path)
   */
  href?: svgCommonAttributes['href'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface pathAttributes extends SVGGraphicsElementProps {
  d?: svgPresentationAttributes['d'],

  /**
   * This attribute lets authors specify the total length for the path, in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/path)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'fill-rule'?: svgPresentationAttributes['fill-rule'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linecap'?: svgPresentationAttributes['stroke-linecap'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface patternAttributes extends SVGElementProps {
  /**
   * This attribute determines the height of the pattern tile.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/pattern)
   */
  height?: svgCommonAttributes['height'],

  /**
   * For `<pattern>`, `href` defines a URL referring to a different `<pattern>`
   * element within the current SVG document. Any attributes which are defined
   * on the referenced element which are not defined on this element are
   * inherited by this element. If this element has no children, and
   * the referenced element does (possibly due to its own `href` attribute),
   * then this element inherits the children from the referenced element.
   * Inheritance can be indirect to an arbitrary level; thus, if the referenced
   * element inherits attributes or children due to its own `href` attribute,
   * then the current element can inherit those attributes or children.
   * On the `<pattern>` element, the `href` attribute is animatable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/pattern)
   */
  href?: svgCommonAttributes['href'],

  patternContentUnits?: svgCommonAttributes['patternContentUnits'],

  patternTransform?: svgCommonAttributes['patternTransform'],

  patternUnits?: svgCommonAttributes['patternUnits'],

  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],

  viewBox?: svgCommonAttributes['viewBox'],

  /**
   * This attribute determines the width of the pattern tile.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/pattern)
   */
  width?: svgCommonAttributes['width'],

  /**
   * This attribute determines the x coordinate shift of the pattern tile.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/pattern)
   */
  x?: svgCommonAttributes['x'],

  /**
   * This attribute determines the x coordinate shift of the pattern tile.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/pattern)
   */
  y?: svgCommonAttributes['y'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface polygonAttributes extends SVGGraphicsElementProps {
  /**
   * This attribute defines the list of points (pairs of x,y absolute
   * coordinates) required to draw the polygon.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/polyline)
   */
  points?: svgCommonAttributes['points'],

  /**
   * This attribute lets specify the total length for the path, in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/polyline)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'fill-rule'?: svgPresentationAttributes['fill-rule'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface polylineAttributes extends SVGGraphicsElementProps {
  /**
   * This attribute defines the list of points (pairs of x,y absolute
   * coordinates) required to draw the polyline.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/polyline)
   */
  points?: svgCommonAttributes['points'],

  /**
   * This attribute lets specify the total length for the path, in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/polyline)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'fill-rule'?: svgPresentationAttributes['fill-rule'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linecap'?: svgPresentationAttributes['stroke-linecap'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface radialGradientAttributes extends SVGElementProps {
  /**
   * This attribute defines the x coordinate of the end circle of
   * the radial gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  cx?: svgPresentationAttributes['cx'],

  /**
   * This attribute defines the y coordinate of the end circle of
   * the radial gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  cy?: svgPresentationAttributes['cy'],

  /**
   * This attribute defines the radius of the start circle of the radial
   * gradient. The gradient will be drawn such that the 0% `<stop>` is mapped
   * to the perimeter of the start circle.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  fr?: svgCommonAttributes['fr'],

  /**
   * This attribute defines the x coordinate of the start circle of the radial
   * gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  fx?: svgCommonAttributes['fx'],

  /**
   * This attribute defines the y coordinate of the start circle of the radial
   * gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  fy?: svgCommonAttributes['fy'],

  /**
   * This attribute defines the coordinate system for attributes `cx`, `cy`,
   * `r`, `fx`, `fy`, `fr`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  gradientUnits?: svgCommonAttributes['gradientUnits'],

  /**
   * This attribute provides additional transformation to the gradient
   * coordinate system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  gradientTransform?: svgCommonAttributes['gradientTransform'],

  /**
   * This attribute defines a reference to another `<radialGradient>` element
   * that will be used as a template.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  href?: svgCommonAttributes['href'],

  /**
   * This attribute defines the radius of the end circle of the radial gradient.
   * The gradient will be drawn such that the 100% `<stop>` is mapped to
   * the perimeter of the end circle.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  r?: svgCommonAttributes['r'],

  /**
   * This attribute indicates how the gradient behaves if it starts or ends
   * inside the bounds of the shape containing the gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
   */
  spreadMethod?: svgCommonAttributes['spreadMethod'],

  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface rectAttributes extends SVGGraphicsElementProps {
  /**
   * The x coordinate of the rect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  x?: svgCommonAttributes['x'],

  /**
   * The y coordinate of the rect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  y?: svgCommonAttributes['y'],

  /**
   * The width of the rect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  width?: svgCommonAttributes['width'],

  /**
   * The height of the rect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  height?: svgCommonAttributes['height'],

  /**
   * The horizontal corner radius of the rect.
   * Defaults to `ry` if it is specified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  rx?: svgCommonAttributes['rx'],

  /**
   * The vertical corner radius of the rect.
   * Defaults to `rx` if it is specified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  ry?: svgCommonAttributes['ry'],

  /**
   * The total length of the rectangle's perimeter, in user units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
   */
  pathLength?: svgCommonAttributes['pathLength'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'marker-end'?: svgPresentationAttributes['marker-end'],
  'marker-mid'?: svgPresentationAttributes['marker-mid'],
  'marker-start'?: svgPresentationAttributes['marker-start'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'shape-rendering'?: svgPresentationAttributes['shape-rendering'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
}

export interface scriptAttributes extends SVGElementProps {
  crossOrigin?: svgCommonAttributes['crossOrigin'],

  /**
   * For `<script>`, `href` defines a URL referring to an external resource
   * containing the script code.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/style)
   */
  href?: svgCommonAttributes['href'],

  /**
   * This attribute defines type of the script language to use.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/style)
   */
  type?: Bindable<string|'application/ecmascript'>,

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface setAttributes extends SVGAnimationElementProps {
  /**
   * This attribute defines the value to be applied to the target attribute
   * for the duration of the animation. The value must match the requirements
   * of the target attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/set)
   */
  to?: svgCommonAttributes['to'],

  'attributeName'?: svgCommonAttributes['attributeName'],
  'begin'?: svgCommonAttributes['begin'],
  'color'?: svgPresentationAttributes['color'],
  'dur'?: svgCommonAttributes['dur'],
  'end'?: svgCommonAttributes['end'],
  'fill'?: svgPresentationAttributes['fill'],
  'href'?: svgCommonAttributes['href'],
  'id'?: svgCommonAttributes['id'],
  'keyPoints'?: svgCommonAttributes['keyPoints'],
  'max'?: svgCommonAttributes['max'],
  'min'?: svgCommonAttributes['min'],
  'repeatCount'?: svgCommonAttributes['repeatCount'],
  'repeatDur'?: svgCommonAttributes['repeatDur'],
  'restart'?: svgCommonAttributes['restart'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface stopAttributes extends SVGElementProps {
  /**
   * This attribute defines where the gradient stop is placed along
   * the gradient vector.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/stop)
   */
  offset?: Bindable<number|string>,

  /**
   * This attribute defines where the gradient stop is placed along
   * the gradient vector.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/stop)
   */
  'stop-color'?: svgPresentationAttributes['stop-color'],

  /**
   * This attribute defines the opacity of the gradient stop.
   * It can be used as a CSS property.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/stop)
   */
  'stop-opacity'?: svgPresentationAttributes['stop-opacity'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface styleAttributes extends SVGElementProps {
  /**
   * This attribute defines type of the style sheet language to use as a media
   * type string.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/style)
   */
  type?: Bindable<string|'text/css'>,

  /**
   * This attribute defines to which media the style applies.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/style)
   */
  media?: svgCommonAttributes['media'],

  /**
   * This attribute is the title of the style sheet which can be used to switch
   * between alternate style sheets.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/style)
   */
  title?: Bindable<string>,

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface svgAttributes extends SVGElementProps {
  /**
   * The displayed height of the rectangular viewport.
   * (Not the height of its coordinate system.)
   *
   * Default value: `auto`; Animatable: **yes**.
   *
   * > **_NOTE:_**
   * Starting with SVG2, `x`, `y`, `width`, and `height`
   * are *Geometry Properties*, meaning these attributes
   * can also be used as CSS properties.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Attribute/height)
   */
  height?: svgCommonAttributes['height'],

  /**
   * Indicates how an element with a `viewBox` providing a given aspect ratio
   * must fit into a viewport with a different aspect ratio.
   *
   * The aspect ratio of an SVG image is defined by the `viewBox` attribute.
   * Therefore, if viewBox isn't set, the `preserveAspectRatio` attribute
   * has no effect on SVG's scaling (except in the case of the `<image>`
   * element, where `preserveAspectRatio` behaves differently).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Attribute/preserveAspectRatio)
   */
  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],

  /**
   * The `viewBox` attribute defines the position and dimension,
   * in user space, of an SVG viewport.
   *
   * The value of the `viewBox` attribute is a list of four numbers separated
   * by whitespace and/or a comma: `min-x`, `min-y`, `width`, and `height`.
   * `min-x` and `min-y` represent the smallest X and Y coordinates that
   * the `viewBox` may have (the origin coordinates of the `viewBox`)
   * and the width and height specify the `viewBox` size.
   * The resulting `viewBox` is a rectangle in user space mapped to the bounds
   * of the viewport of an SVG element (not the browser viewport).
   * When an SVG contains a viewBox attribute (often in combination with a
   * `preserveAspectRatio` attribute), a transform stretches or resizes
   * the SVG viewport to fit a particular container element.
   *
   * @example
   * ```html
   * <svg viewBox="-5 -5 10 10" xmlns="http://www.w3.org/2000/svg">
   *   <rect x="0" y="0" width="100%" height="100%" />
   *   <circle cx="50%" cy="50%" r="4" fill="white" />
   * </svg>
   * ```
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Attribute/viewBox)
   */
  viewBox?: svgCommonAttributes['viewBox'],

  /**
   * The displayed width of the rectangular viewport.
   * (Not the width of its coordinate system.)
   *
   * Default value: `auto`; Animatable: **yes**.
   *
   * > **_NOTE:_**
   * Starting with SVG2, `x`, `y`, `width`, and `height`
   * are *Geometry Properties*, meaning these attributes
   * can also be used as CSS properties.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Attribute/width)
   */
  width?: svgCommonAttributes['width'],

  /**
   * The displayed x coordinate of the svg container.
   * No effect on outermost svg elements.
   *
   * > **_NOTE:_**
   * Starting with SVG2, `x`, `y`, `width`, and `height`
   * are *Geometry Properties*, meaning these attributes
   * can also be used as CSS properties.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Attribute/x)
   */
  x?: svgCommonAttributes['x'],

  /**
   * The displayed y coordinate of the svg container.
   * No effect on outermost svg elements.
   *
   * > **_NOTE:_**
   * Starting with SVG2, `x`, `y`, `width`, and `height`
   * are *Geometry Properties*, meaning these attributes
   * can also be used as CSS properties.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Attribute/y)
   */
  y?: svgCommonAttributes['y'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface switchAttributes extends SVGGraphicsElementProps {
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface symbolAttributes extends SVGGraphicsElementProps {
  /**
   * This attribute determines the height of the symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/symbol)
   */
  height?: svgCommonAttributes['height'],

  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],

  /**
   * This attribute determines the x coordinate of the reference point
   * of the symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/symbol)
   */
  refX?: svgCommonAttributes['refX'],

  /**
   * This attribute determines the y coordinate of the reference point
   * of the symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/symbol)
   */
  refY?: svgCommonAttributes['refY'],

  /**
   * This attribute defines the bound of the SVG viewport for the current
   * symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/symbol)
   */
  viewBox?: svgCommonAttributes['viewBox'],

  /**
   * This attribute determines the width of the symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/symbol)
   */
  width?: svgCommonAttributes['width'],

  /**
   * This attribute determines the x coordinate of the symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  x?: svgCommonAttributes['x'],

  /**
   * This attribute determines the y coordinate of the symbol.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  y?: svgCommonAttributes['y'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface textAttributes extends SVGGraphicsElementProps {
  /**
   * The x coordinate of the starting point of the text baseline,
   * or the x coordinate of each individual glyph if a list
   * of values is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  x?: svgCommonAttributes['x'],

  /**
   * The y coordinate of the starting point of the text baseline,
   * or the y coordinate of each individual glyph if a list
   * of values is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  y?: svgCommonAttributes['y'],

  /**
   * Shifts the text position horizontally from a previous text element,
   * or shifts the position of each individual glyph if a list
   * of values is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  dx?: svgCommonAttributes['dx'],

  /**
   * Shifts the text position vertically from a previous text element,
   * or shifts the position of each individual glyph if a list
   * of values is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  dy?: svgCommonAttributes['dy'],

  /**
   * Rotates orientation of each individual glyph.
   * Can rotate glyphs individually.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  rotate?: svgCommonAttributes['rotate'],

  /**
   * How the text is stretched or compressed to fit the width defined by
   * the `textLength` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  lengthAdjust?: svgCommonAttributes['lengthAdjust'],

  /**
   * A width that the text should be scaled to fit.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
   */
  textLength?: svgCommonAttributes['textLength'],

  'alignment-baseline': svgPresentationAttributes['alignment-baseline'],
  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'direction'?: svgPresentationAttributes['direction'],
  'display'?: svgPresentationAttributes['display'],
  'dominant-baseline'?: svgPresentationAttributes['dominant-baseline'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'fill-rule'?: svgPresentationAttributes['fill-rule'],
  'filter'?: svgPresentationAttributes['filter'],
  'font-family'?: svgPresentationAttributes['font-family'],
  'font-size'?: svgPresentationAttributes['font-size'],
  'font-size-adjust'?: svgPresentationAttributes['font-size-adjust'],
  'font-style'?: svgPresentationAttributes['font-style'],
  'font-variant'?: svgPresentationAttributes['font-variant'],
  'font-weight'?: svgPresentationAttributes['font-weight'],
  'id'?: svgCommonAttributes['id'],
  'lang'?: svgCommonAttributes['lang'],
  'letter-spacing'?: svgPresentationAttributes['letter-spacing'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'overflow'?: svgPresentationAttributes['overflow'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linecap'?: svgPresentationAttributes['stroke-linecap'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'text-anchor'?: svgPresentationAttributes['text-anchor'],
  'text-decoration'?: svgPresentationAttributes['text-decoration'],
  'text-rendering'?: svgPresentationAttributes['text-rendering'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'unicode-bidi'?: svgPresentationAttributes['unicode-bidi'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
  'word-spacing'?: svgPresentationAttributes['word-spacing'],
  'writing-mode'?: svgPresentationAttributes['writing-mode'],
}

export interface textPathAttributes extends SVGGraphicsElementProps {
  /**
   * For `<textPath>`, `href` defines a URL referring to the `<path>` element or
   * basic shape onto which the text will be rendered if no path attribute is
   * provided. On the `<textPath>` element, the href attribute is animatable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  href?: svgCommonAttributes['href'],

  /**
   * Where length adjustment should be applied to the text: the space between
   * glyphs, or both the space and the glyphs themselves.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  lengthAdjust?: svgCommonAttributes['lengthAdjust'],

  /**
   * Which method to render individual glyphs along the path.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  method?: svgCommonAttributes['method'],

  /**
   * The path on which the text should be rendered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  path?: svgCommonAttributes['path'],

  /**
   * Which side of the path the text should be rendered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  side?: svgCommonAttributes['side'],

  /**
   * How space between glyphs should be handled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  spacing?: svgCommonAttributes['spacing'],

  /**
   * How far the beginning of the text should be offset from the beginning
   * of the path.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  startOffset?: svgCommonAttributes['startOffset'],

  /**
   * The width of the space into which the text will render.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
   */
  textLength?: svgCommonAttributes['textLength'],

  'alignment-baseline': svgPresentationAttributes['alignment-baseline'],
  'baseline-shift': svgPresentationAttributes['baseline-shift'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'direction'?: svgPresentationAttributes['direction'],
  'dominant-baseline'?: svgPresentationAttributes['dominant-baseline'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'fill-rule'?: svgPresentationAttributes['fill-rule'],
  'font-family'?: svgPresentationAttributes['font-family'],
  'font-size'?: svgPresentationAttributes['font-size'],
  'font-size-adjust'?: svgPresentationAttributes['font-size-adjust'],
  'font-style'?: svgPresentationAttributes['font-style'],
  'font-variant'?: svgPresentationAttributes['font-variant'],
  'font-weight'?: svgPresentationAttributes['font-weight'],
  'id'?: svgCommonAttributes['id'],
  'letter-spacing'?: svgPresentationAttributes['letter-spacing'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linecap'?: svgPresentationAttributes['stroke-linecap'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'text-anchor'?: svgPresentationAttributes['text-anchor'],
  'text-decoration'?: svgPresentationAttributes['text-decoration'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'unicode-bidi'?: svgPresentationAttributes['unicode-bidi'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
  'word-spacing'?: svgPresentationAttributes['word-spacing'],
  'writing-mode'?: svgPresentationAttributes['writing-mode'],
}

export interface titleAttributes extends SVGElementProps {
  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}

export interface tspanAttributes extends SVGGraphicsElementProps {
  /**
   * The x coordinate of the starting point of the text baseline, or the x
   * coordinate of each individual glyph if a list of values is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  x?: svgCommonAttributes['x'],

  /**
   * The y coordinate of the starting point of the text baseline, or the y
   * coordinate of each individual glyph if a list of values is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  y?: svgCommonAttributes['y'],

  /**
   * Shifts the text position horizontally from a previous text element,
   * or shifts the position of each individual glyph if a list of values
   * is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  dx?: svgCommonAttributes['dx'],

  /**
   * Shifts the text position vertically from a previous text element,
   * or shifts the position of each individual glyph if a list of values
   * is provided.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  dy?: svgCommonAttributes['dy'],

  /**
   * Rotates orientation of each individual glyph.
   * Can rotate glyphs individually.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  rotate?: svgCommonAttributes['rotate'],

  /**
   * How the text is stretched or compressed to fit the width defined by
   * the `textLength` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  lengthAdjust?: svgCommonAttributes['lengthAdjust'],

  /**
   * A width that the text should be scaled to fit.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
   */
  textLength?: svgCommonAttributes['textLength'],

  'alignment-baseline': svgPresentationAttributes['alignment-baseline'],
  'baseline-shift': svgPresentationAttributes['baseline-shift'],
  'color'?: svgPresentationAttributes['color'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'direction'?: svgPresentationAttributes['direction'],
  'dominant-baseline'?: svgPresentationAttributes['dominant-baseline'],
  'fill'?: svgPresentationAttributes['fill'],
  'fill-opacity'?: svgPresentationAttributes['fill-opacity'],
  'fill-rule'?: svgPresentationAttributes['fill-rule'],
  'font-family'?: svgPresentationAttributes['font-family'],
  'font-size'?: svgPresentationAttributes['font-size'],
  'font-size-adjust'?: svgPresentationAttributes['font-size-adjust'],
  'font-style'?: svgPresentationAttributes['font-style'],
  'font-variant'?: svgPresentationAttributes['font-variant'],
  'font-weight'?: svgPresentationAttributes['font-weight'],
  'id'?: svgCommonAttributes['id'],
  'letter-spacing'?: svgPresentationAttributes['letter-spacing'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'paint-order'?: svgPresentationAttributes['paint-order'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'stroke'?: svgPresentationAttributes['stroke'],
  'stroke-dasharray'?: svgPresentationAttributes['stroke-dasharray'],
  'stroke-dashoffset'?: svgPresentationAttributes['stroke-dashoffset'],
  'stroke-linecap'?: svgPresentationAttributes['stroke-linecap'],
  'stroke-linejoin'?: svgPresentationAttributes['stroke-linejoin'],
  'stroke-miterlimit'?: svgPresentationAttributes['stroke-miterlimit'],
  'stroke-opacity'?: svgPresentationAttributes['stroke-opacity'],
  'stroke-width'?: svgPresentationAttributes['stroke-width'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'text-anchor'?: svgPresentationAttributes['text-anchor'],
  'text-decoration'?: svgPresentationAttributes['text-decoration'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'unicode-bidi'?: svgPresentationAttributes['unicode-bidi'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
  'visibility'?: svgPresentationAttributes['visibility'],
  'word-spacing'?: svgPresentationAttributes['word-spacing'],
  'writing-mode'?: svgPresentationAttributes['writing-mode'],
}

export interface useAttributes extends SVGGraphicsElementProps {
  /**
   * For `<use>`, `href` defines a URL referring to an element or fragment
   * within an SVG document to be cloned.
   *
   * The `<use>` element can reference an entire SVG document by specifying
   * an `href` value without a fragment. Such references are taken to be
   * referring to the root element of the referenced document.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/use)
   */
  href?: svgCommonAttributes['href'],

  /**
   * The `x` coordinate of an additional final offset transformation applied
   * to the `<use>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/use)
   */
  x?: svgCommonAttributes['x'],

  /**
   * The `y` coordinate of an additional final offset transformation applied
   * to the `<use>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/use)
   */
  y?: svgCommonAttributes['y'],

  width?: svgCommonAttributes['width'],

  height?: svgCommonAttributes['height'],

  'clip-path'?: svgPresentationAttributes['clip-path'],
  'color-interpolation'?: svgPresentationAttributes['color-interpolation'],
  'cursor'?: svgPresentationAttributes['cursor'],
  'display'?: svgPresentationAttributes['display'],
  'filter'?: svgPresentationAttributes['filter'],
  'id'?: svgCommonAttributes['id'],
  'mask'?: svgPresentationAttributes['mask'],
  'opacity'?: svgPresentationAttributes['opacity'],
  'pointer-events'?: svgPresentationAttributes['pointer-events'],
  'style'?: svgCommonAttributes['style'],
  'systemLanguage'?: svgCommonAttributes['systemLanguage'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
  'vector-effect'?: svgPresentationAttributes['vector-effect'],
}

export interface viewAttributes extends SVGElementProps {
  preserveAspectRatio?: svgCommonAttributes['preserveAspectRatio'],
  viewBox?: svgCommonAttributes['viewBox'],

  'id'?: svgCommonAttributes['id'],
  'style'?: svgCommonAttributes['style'],
  'tabIndex'?: svgCommonAttributes['tabIndex'],
  'transform'?: svgPresentationAttributes['transform'],
  'transform-origin'?: svgPresentationAttributes['transform-origin'],
}
