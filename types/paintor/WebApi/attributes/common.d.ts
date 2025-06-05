import { Bindable, StringConvertible } from '../common'
import { CSSColors } from '../CSSColors'
import { CSSProperties } from '../CSSProperties'

export interface svgCommonAttributes {
  /**
   * The `accumulate` attribute controls whether an animation is cumulative.
   *
   * It is frequently useful for repeated animations to build upon
   * the previous results, accumulating with each iteration.
   * This attribute said to the animation if the value is
   * added to the previous animated attribute's value on
   * each iteration.
   *
   * - `sum`: Specifies that each repeat iteration after the first builds
   * upon the last value of the previous iteration.
   *
   * - `none`: Specifies that repeat iterations are not cumulative.
   *
   * This attribute is ignored if the target attribute value does not support
   * addition, or if the animation element does not repeat.
   *
   * This attribute will be ignored if the animation function is specified
   * with only the `to` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/accumulate)
   */
  accumulate?: Bindable<'none'|'sum'>,

  /**
   * The `additive` attribute controls whether an animation is additive.
   *
   * It is frequently useful to define animation as an offset or delta
   * to an attribute's value, rather than as absolute values.
   *
   * - `sum`: Specifies that the animation will add to the underlying
   * value of the attribute and other lower priority animations.
   *
   * - `replace`: Specifies that the animation will override the underlying
   * value of the attribute and other lower priority animations.
   * This is the default, however the behavior is also affected
   * by the animation value attributes `by` and `to`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/additive)
   */
  additive?: Bindable<'replace'|'sum'>,

  /**
   * The `amplitude` attribute controls the amplitude of the gamma function
   * of a component transfer element when its `type` attribute is `gamma`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/amplitude)
   */
  amplitude?: Bindable<number>,

  /**
   * The `attributeName` attribute indicates the name of the CSS property
   * or attribute of the target element that is going to be changed during
   * an animation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/attributeName)
   */
  attributeName?: Bindable<string>,

  /**
   * The `azimuth` attribute specifies the direction angle for the light source
   * on the XY plane (clockwise), in degrees from the x axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/azimuth)
   */
  azimuth?: Bindable<number>,

  /**
   * The baseFrequency attribute represents the base frequency parameter
   * for the noise function of the `<feTurbulence>` filter primitive.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/azimuth)
   */
  baseFrequency?: Bindable<number>,

  /**
   * The `begin` attribute defines when the associated element becomes active.
   * For an animation element, this is the point at which the animation should
   * begin.
   *
   * The attribute value is a semicolon separated list of values.
   * The interpretation of a list of start times is detailed in the SMIL
   * specification in
   * ["Evaluation of begin and end time lists"](https://www.w3.org/TR/smil-animation/#Timing-EvaluationOfBeginEndTimeLists).
   * Each individual value can be one of the following: `<offset-value>`,
   * `<syncbase-value>`, `<event-value>`, `<repeat-value>`, `<accessKey-value>`,
   * `<wallclock-sync-value>` or the keyword `indefinite`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/begin)
   */
  begin?: Bindable<string>,

  /**
   * The `bias` attribute shifts the range of the filter.
   * After applying the `kernelMatrix` of the `<feConvolveMatrix>` element
   * to the input image to yield a number and applied the `divisor` attribute,
   * the `bias` attribute is added to each component. This allows representation
   * of values that would otherwise be clamped to `0` or `1`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/bias)
   */
  bias?: Bindable<number>,

  /**
   * The `by` attribute specifies a relative offset value for an attribute
   * that will be modified during an animation.
   *
   * The starting value for the attribute is either indicated by specifying
   * it as value for the attribute given in the `attributeName` or the `from`
   * attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/by)
   */
  by?: Bindable<string>,

  /**
   * The `calcMode` attribute specifies the interpolation mode
   * for the animation.
   *
   * The default mode is `linear`, however if the attribute does not support
   * linear interpolation (e.g., for strings), the `calcMode` attribute is
   * ignored and discrete interpolation is used.
   *
   * - `discrete`: This specifies that the animation function will jump from
   * one value to the next without any interpolation.
   *
   * - `linear`: Simple linear interpolation between values is used to calculate
   * the animation function. Except for `<animateMotion>`, this is the default
   * value.
   *
   * - `paced`: Defines interpolation to produce an even pace of change across
   * the animation. This is only supported for values that define a linear
   * numeric range, and for which some notion of "distance" between points
   * can be calculated (e.g., position, width, height, etc.). If paced is
   * specified, any `keyTimes` or `keySplines` will be ignored.
   * For `<animateMotion>`, this is the default value.
   *
   * - `spline`: Interpolates from one value in the `values` list to the next
   * according to a time function defined by a cubic Bézier spline. The points
   * of the spline are defined in the `keyTimes` attribute, and the control
   * points for each interval are defined in the `keySplines` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/calcMode)
   */
  calcMode?: Bindable<'discrete'|'linear'|'paced'|'spline'>,

  /**
   * Assigns a class name or set of class names to an element. You may assign
   * the same class name or names to any number of elements, however, multiple
   * class names must be separated by whitespace characters.
   *
   * An element's class name serves two key roles:
   *
   * - As a style sheet selector, for when an author assigns style information
   * to a set of elements.
   * - For general use by the browser.
   *
   * You can use this class to style SVG content using CSS.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/class)
   */
  class?: Bindable<string | string[]>,

  /**
   * The `clipPathUnits` attribute indicates which coordinate system to use for
   * the contents of the `<clipPath>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/clipPathUnits)
   */
  clipPathUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `crossorigin` attribute, valid on the `<image>` and `<feImage>`
   * elements, provides support for configuration of the Cross-Origin Resource
   * Sharing ([CORS](https://developer.mozilla.org/docs/Web/HTTP/Guides/CORS))
   * requests for the element's fetched data.
   *
   * This table shows possible keywords and their meaning:
   *
   * - `anonymous`: Client CORS requests for this element will have
   * the credentials flag set to 'same-origin'.
   * - `use-credentials`: Client CORS requests for this element will
   * have the credentials flag set to 'include'.
   * - ``: Setting the attribute name to an empty value, like `crossorigin`
   * or `crossorigin=""`, is the same as `anonymous`.
   *
   * It follows the same processing rules as the HTML attribute `crossorigin`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/crossorigin)
   */
  crossOrigin?: Bindable<'anonymous'|'use-credentials'|''>,

  /**
   * The `decoding` attribute, valid on `<image>` elements, provides a hint to
   * the browser whether it should perform image decoding along with rendering
   * other content in a single presentation step that looks more "correct"
   * (`sync`), or render and present the other content first and then decode
   * the image and present it later (`async`). In practice, `async` means that
   * the next paint does not wait for the image to decode.
   *
   * It is often difficult to perceive any noticeable effect when using
   * `decoding` on static `<image>` elements. They'll likely be initially
   * rendered as empty images while the image files are fetched (either from
   * the network or from the cache) and then handled independently anyway, so
   * the "syncing" of content updates is less apparent. However, the blocking
   * of rendering while decoding happens, while often quite small, can be
   * measured — even if it is difficult to observe with the human eye.
   *
   * Using different `decoding` types can result in more noticeable differences
   * when dynamically inserting `<image>` elements into the DOM via
   * JavaScript.
   *
   * Allowed values:
   *
   * - `sync`:
   * Decode the image synchronously along with rendering the other content,
   * and present everything together.
   *
   * - `async`:
   * Decode the image asynchronously, after rendering and presenting the other
   * content.
   *
   * - `auto`:
   * No preference for the decoding mode; the browser decides what is best for
   * the user. This is the default value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/decoding)
   */
  decoding?: Bindable<'sync'|'async'|'auto'>,

  /**
   * The `diffuseConstant` attribute represents the kd value in the
   * [Phong lighting model](https://en.wikipedia.org/wiki/Phong_reflection_model).
   * In SVG, this can be any non-negative number.
   *
   * It's used to determine the final RGB value of a given pixel. The brighter
   * the lighting-color, the smaller this number should be.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/diffuseConstant)
   */
  diffuseConstant?: Bindable<number>,

  /**
   * The `divisor` attribute specifies the value by which the resulting number
   * of applying the `kernelMatrix` of a `<feConvolveMatrix>` element to
   * the input image color value is divided to yield the destination
   * color value.
   *
   * A divisor that is the sum of all the matrix values tends to have
   * an evening effect on the overall color intensity of the result.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/divisor)
   */
  divisor?: Bindable<number|string>,

  /**
   * The `dur` attribute indicates the simple duration of an animation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/dur)
   */
  dur?: Bindable<string|'media'|'indefinite'>,

  /**
   * The `dx` attribute indicates a shift along the x-axis on the position
   * of an element or its content.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/dx)
   */
  dx?: Bindable<number|string>,

  /**
   * The `dy` attribute indicates a shift along the y-axis on the position
   * of an element or its content.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/dy)
   */
  dy?: Bindable<number|string>,

  /**
   * The `edgeMode` attribute determines how to extend the input image as
   * necessary with color values so that the matrix operations can be applied
   * when the kernel is positioned at or near the edge of the input image.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/edgeMode)
   */
  edgeMode?: Bindable<'duplicate'|'wrap'|'none'>,

  /**
   * The `elevation` attribute specifies the direction angle for the light
   * source from the XY plane towards the Z-axis, in degrees. Note that
   * the positive Z-axis points towards the viewer of the content.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/elevation)
   */
  elevation?: Bindable<number>,

  /**
   * The `end` attribute defines an end value for the animation that can
   * constrain the active duration.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/end)
   */
  end?: Bindable<string>,

  /**
   * The `exponent` attribute defines the exponent of the gamma function.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/exponent)
   */
  exponent?: Bindable<number>,

  /**
   * The `filterUnits` attribute defines the coordinate system for
   * the attributes `x`, `y`, `width` and `height`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/filterUnits)
   */
  filterUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `fr` attribute defines the radius of the focal point for the radial
   * gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/fr)
   */
  fr?: Bindable<number|string>,

  /**
   * The `from` attribute indicates the initial value of the attribute that will
   * be modified during the animation.
   *
   * When used with the `to` attribute, the animation will change the modified
   * attribute from the `from` value to the `to` value. When used with the `by`
   * attribute, the animation will change the attribute relatively from the
   * `from` value by the value specified in `by`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/from)
   */
  from?: Bindable<number|string>,

  /**
   * The `fx` attribute defines the x-axis coordinate of the focal point for
   * a radial gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/fx)
   */
  fx?: Bindable<number|string>,

  /**
   * The `fx` attribute defines the y-axis coordinate of the focal point for
   * a radial gradient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/fy)
   */
  fy?: Bindable<number|string>,

  /**
   * The gradientTransform attribute contains the definition of an optional
   * additional transformation from the gradient coordinate system onto
   * the target coordinate system (i.e., userSpaceOnUse or objectBoundingBox).
   * This allows for things such as skewing the gradient.
   * This additional transformation matrix is post-multiplied to
   * (i.e., inserted to the right of) any previously defined transformations,
   * including the implicit transformation necessary to convert from object
   * bounding box units to user space.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/gradientTransform)
   */
  gradientTransform?: Bindable<string>,

  /**
   * The `gradientUnits` attribute defines the coordinate system used for
   * attributes specified on the gradient elements.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/gradientUnits)
   */
  gradientUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `height` attribute defines the vertical length of an element in
   * the user coordinate system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/height)
   */
  height?: Bindable<number|string|'auto'>,

  /**
   * The `href` attribute defines a link to a resource as a reference URL.
   * The exact meaning of that link depends on the context of each element
   * using it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/href)
   */
  href?: Bindable<string>,

  /**
   * The `id` attribute assigns a unique name to an element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/id)
   */
  id?: Bindable<string>,

  /**
   * The `in` attribute identifies input for the given filter primitive.
   *
   * The value can be either one of the six keywords defined below, or a string
   * which matches a previous `result` attribute value within the same
   * `<filter>` element. If no value is provided and this is the first filter
   * primitive, then this filter primitive will use `SourceGraphic` as its
   * input. If no value is provided and this is a subsequent filter primitive,
   * then this filter primitive will use the result from the previous filter
   * primitive as its input.
   *
   * If the value for `result` appears multiple times within a given `<filter>`
   * element, then a reference to that result will use the closest preceding
   * filter primitive with the given value for attribute `result`.
   *
   * - `SourceGraphic`:
   * This keyword represents the graphics elements that were the original input
   * into the `<filter>` element.
   *
   * - `SourceAlpha`:
   * This keyword represents the graphics elements that were the original input
   * into the `<filter>` element. SourceAlpha has all the same rules as
   * `SourceGraphic` except that only the alpha channel is used.
   *
   * - `BackgroundImage`:
   * This keyword represents an image snapshot of the SVG document under
   * the filter region at the time that the `<filter>` element was invoked.
   *
   * - `BackgroundAlpha`:
   * Same as `BackgroundImage` except only the alpha channel is used.
   *
   * - `FillPaint`:
   * This keyword represents the value of the `fill` property on the target
   * element for the filter effect. In many cases, the `FillPaint` is opaque
   * everywhere, but that might not be the case if a shape is painted with
   * a gradient or pattern which itself includes transparent or semi-transparent
   * parts.
   *
   * - `StrokePaint`:
   * This keyword represents the value of the `stroke` property on the target
   * element for the filter effect. In many cases, the `StrokePaint` is opaque
   * everywhere, but that might not be the case if a shape is painted with
   * a gradient or pattern which itself includes transparent or semi-transparent
   * parts.
   *
   * - `<filter-primitive-reference>`:
   * This value is an assigned name for the filter primitive in the form of
   * a `<custom-ident>`. If supplied, then graphics that result from processing
   * this filter primitive can be referenced by an in attribute on a subsequent
   * filter primitive within the same filter element. If no value is provided,
   * the output will only be available for re-use as the implicit input into
   * the next filter primitive if that filter primitive provides no value for
   * its in attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/in)
   */
  in?: Bindable<
    string
    |'SourceGraphic'
    |'SourceAlpha'
    |'BackgroundImage'
    |'BackgroundAlpha'
    |'FillPaint'
    |'StrokePaint'
  >,

  /**
   * The `in2` attribute identifies the second input for the given filter
   * primitive. It works exactly like the in attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/in2)
   */
  in2?: Bindable<
    string
    |'SourceGraphic'
    |'SourceAlpha'
    |'BackgroundImage'
    |'BackgroundAlpha'
    |'FillPaint'
    |'StrokePaint'
  >,

  /**
   * The `intercept` attribute defines the intercept of the linear function of
   * color component transfers when the `type` attribute is set to `linear`.
   *
   * The `linear` function is defined as `slope * color + intercept`, where
   * `color` is the color value, the intercept provides a base value for
   * the result, and the `slope` is a scaling factor.
   *
   * The `intercept` attribute is supported by children of
   * the `<feComponentTransfer>` filter primitive and is used with the following
   * SVG component transfer function elements when `type="linear"` is set:
   *
   * - `<feFuncA>`
   * - `<feFuncB>`
   * - `<feFuncG>`
   * - `<feFuncR>`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/intercept)
   */
  intercept?: Bindable<number>,

  /**
   * The `k1` attribute defines one of the values to be used within
   * the `arithmetic` operation of the `<feComposite>` filter primitive.
   *
   * The pixel composition is computed using the following formula:
   *
   * `result = k1 * i1 * i2 + k2 * i1 + k3 * i2 + k4;`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/k1)
   */
  k1?: Bindable<number>,

  /**
   * The `k2` attribute defines one of the values to be used within
   * the `arithmetic` operation of the `<feComposite>` filter primitive.
   *
   * The pixel composition is computed using the following formula:
   *
   * `result = k1 * i1 * i2 + k2 * i1 + k3 * i2 + k4;`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/k2)
   */
  k2?: Bindable<number>,

  /**
   * The `k3` attribute defines one of the values to be used within
   * the `arithmetic` operation of the `<feComposite>` filter primitive.
   *
   * The pixel composition is computed using the following formula:
   *
   * `result = k1 * i1 * i2 + k2 * i1 + k3 * i2 + k4;`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/k3)
   */
  k3?: Bindable<number>,

  /**
   * The `k4` attribute defines one of the values to be used within
   * the `arithmetic` operation of the `<feComposite>` filter primitive.
   *
   * The pixel composition is computed using the following formula:
   *
   * `result = k1 * i1 * i2 + k2 * i1 + k3 * i2 + k4;`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/k4)
   */
  k4?: Bindable<number>,

  /**
   * The `kernelMatrix` attribute defines the list of numbers that make up
   * the kernel matrix for the `<feConvolveMatrix>` element.
   *
   * Values are separated by space characters and/or a comma. The number of
   * entries in the list must equal to `<orderX>` by `<orderY>` as defined in
   * the `order` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/kernelMatrix)
   */
  kernelMatrix?: Bindable<string>,

  /**
   * The `keyPoints` attribute indicates the simple duration of an animation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/keyPoints)
   */
  keyPoints?: Bindable<string>,

  /**
   * The `keySplines` attribute defines a set of Bézier curve control points
   * associated with the keyTimes list, defining a cubic Bézier function that
   * controls interval pacing.
   *
   * This attribute is ignored unless the `calcMode` attribute is set to
   * `spline`.
   *
   * If there are any errors in the `keySplines` specification (bad values, too
   * many or too few values), the animation will not occur.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/keySplines)
   */
  keySplines?: Bindable<string>,

  /**
   * The `keyTimes` attribute represents a list of time values used to control
   * the pacing of the animation.
   *
   * Each time in the list corresponds to a value in the `values` attribute
   * list, and defines when the value is used in the animation. Each time value
   * in the `keyTimes` list is specified as a floating point value between
   * 0 and 1 (inclusive), representing a proportional offset into the duration
   * of the animation element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/keyTimes)
   */
  keyTimes?: Bindable<string>,

  /**
   * The `lang` attribute specifies the primary language used in contents and
   * attributes containing text content of particular elements.
   *
   * There is also an `xml:lang` attribute (with namespace). If both of them
   * are defined, the one with namespace is used and the one without is ignored.
   *
   * You can use this attribute with any SVG element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/lang)
   */
  lang?: Bindable<string>,

  /**
   * The `lengthAdjust` attribute controls how the text is stretched into
   * the length defined by the `textLength` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/lengthAdjust)
   */
  lengthAdjust?: Bindable<'spacing'|'spacingAndGlyphs'>,

  /**
   * The `limitingConeAngle` attribute represents the angle in degrees between
   * the spot light axis (i.e., the axis between the light source and the point
   * to which it is pointing at) and the spot light cone. So it defines
   * a limiting cone which restricts the region where the light is projected.
   * No light is projected outside the cone.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/limitingConeAngle)
   */
  limitingConeAngle?: Bindable<number>,

  /**
   * The `markerHeight` attribute represents the height of the viewport into
   * which the `<marker>` is to be fitted when it is rendered according
   * to the `viewBox` and `preserveAspectRatio` attributes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/markerHeight)
   */
  markerHeight?: Bindable<number|string>,

  /**
   * The `markerUnits` attribute defines the coordinate system for
   * the `markerWidth` and `markerHeight` attributes and the contents
   * of the `<marker>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/markerUnits)
   */
  markerUnits?: Bindable<'userSpaceOnUse'|'strokeWidth'>,

  /**
   * The `markerWidth` attribute represents the width of the viewport into
   * which the `<marker>` is to be fitted when it is rendered according
   * to the `viewBox` and `preserveAspectRatio` attributes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/markerWidth)
   */
  markerWidth?: Bindable<number|string>,

  /**
   * The `maskContentUnits` attribute indicates which coordinate system to use
   * for the contents of the `<mask>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/maskContentUnits)
   */
  maskContentUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `maskUnits` attribute indicates which coordinate system to use for
   * the geometry properties of the `<mask>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/maskUnits)
   */
  maskUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `max` attribute specifies the maximum value of the active animation
   * duration.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/max)
   */
  max?: Bindable<string>,

  /**
   * The `media` attribute specifies a media query that must be matched for
   * a style sheet to apply.
   *
   * A `<media-type>` describes the general category of a device. Except when
   * using the `only` logical operator, the media type is optional and the all
   * type is implied.
   *
   * - `all`:
   * Suitable for all devices.
   *
   * - `print`:
   * Intended for paged material and documents viewed on a screen in print
   * preview mode. (Please see paged media for information about formatting
   * issues that are specific to these formats.)
   *
   * - `screen`:
   * Intended primarily for screens.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/media)
   */
  media?: Bindable<string|'all'|'print'|'screen'>,

  /**
   * The `method` attribute indicates the method by which text should be
   * rendered along the path of a `<textPath>` element.
   *
   * - `align`
   * This value indicates that the characters should be rendered so that they
   * are not stretched or warped. The characters are rotated, scaled and
   * stretched when they are rendered. As a result, for fonts with connected
   * characters (e.g., cursive fonts), the connections may not align properly
   * when text is rendered along the path.
   *
   * - `stretch`
   * This value indicates that the character outlines will be converted into
   * paths, and then stretched and possibly warped. With this approach,
   * connected characters, such as in cursive fonts, will maintain their
   * connections.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/method)
   */
  method?: Bindable<'align'|'stretch'>,

  /**
   * The `min` attribute specifies the minimum value of the active animation
   * duration.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/min)
   */
  min?: Bindable<string>,

  /**
   * The `mode` attribute defines the blending mode on the `<feBlend>` filter
   * primitive.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/mode)
   */
  mode?: Bindable<
    'normal'
    |'multiply'
    |'screen'
    |'overlay'
    |'darken'
    |'lighten'
    |'color-dodge'
    |'color-burn'
    |'hard-light'
    |'soft-light'
    |'difference'
    |'exclusion'
    |'hue'
    |'saturation'
    |'color'
    |'luminosity'
  >,

  /**
   * The `numOctaves` attribute defines the number of octaves for the noise
   * function of the `<feTurbulence>` primitive.
   *
   * An octave is a noise function defined by its frequency and amplitude.
   * A turbulence is built by accumulating several octaves with increasing
   * frequencies and decreasing amplitudes. The higher the number of octaves,
   * the more natural the noise looks. Though more octaves also require more
   * calculations, resulting in a negative impact on performance.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/numOctaves)
   */
  numOctaves?: Bindable<number>,

  /**
   * The `operator` attribute has two meanings based on the context it's used
   * in. Either it defines the compositing or morphing operation to be
   * performed.
   *
   * For `<feComposite>`, operator defines the compositing operation that is
   * to be performed.
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
   * This value indicates that the non-overlapping regions of the source
   * graphic defined in the `in` attribute and the destination graphic defined
   * in the `in2` attribute are combined.
   *
   * - `lighter`:
   * This value indicates that the sum of the source graphic defined in
   * the `in` attribute and the destination graphic defined in the `in2`
   * attribute is displayed.
   *
   * - `arithmetic`:
   * This value indicates that the source graphic defined in the `in` attribute
   * and the destination graphic defined in the `in2` attribute are combined
   * using the following formula:
   * `result = k1*i1*i2 + k2*i1 + k3*i2 + k4`
   * where: `i1` and `i2` indicate the corresponding pixel channel values of
   * the input image, which map to `in` and `in2` respectively,
   * and `k1`, `k2`, `k3`, and `k4` indicate the values of the attributes
   * with the same name.
   *
   * For `<feMorphology>`, operator defines whether to `erode` (i.e., thin) or
   * `dilate` (fatten) the source graphic.
   *
   * - `erode`:
   * This value thins the source graphic defined in the `in` attribute.
   *
   * - `dilate`:
   * This value fattens the source graphic defined in the `in` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/operator)
   */
  operator?: Bindable<
    'over'|'in'|'out'|'atop'|'xor'|'lighter'|'arithmetic'
    |'erode'|'dilate'
  >,

  /**
   * The `order` attribute indicates the size of the matrix to be used by
   * a `<feConvolveMatrix>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/order)
   */
  order?: Bindable<number|string>,

  /**
   * The `orient` attribute indicates how a marker is rotated when it is placed
   * at its position on the shape.
   *
   * - `auto`:
   * This value indicates that the marker is oriented such that its positive
   * x-axis is pointing in a direction relative to the path at the position
   * the marker is placed.
   *
   * - `auto-start-reverse`:
   * If placed by `marker-start`, the marker is oriented 180° different from
   * the orientation that would be used if auto were specified. For all other
   * markers, `auto-start-reverse` means the same as auto.
   *
   * > **_NOTE:_**
   * This allows a single arrowhead marker to be defined that can be used
   * for both the start and end of a path, i.e., which points outwards from both
   * ends.
   *
   * - `<angle>`:
   * This value indicates that the marker is oriented such that the specified
   * angle is that measured between the shape's positive x-axis and the marker's
   * positive x-axis.
   *
   * > **_NOTE:_**
   * For example, if a value of 45 is given, then the marker's positive
   * x-axis would be pointing down and right in the shape's coordinate system.
   *
   * - `<number>`:
   * This value indicates an angle in degrees. The marker is oriented such that
   * the specified angle is that measured between the shape's positive x-axis
   * and the marker's positive x-axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/orient)
   */
  orient?: Bindable<number|string|'auto'|'auto-start-reverse'>,

  /**
   * The `origin` attribute specifies the origin of motion for an animation.
   * It has no effect in SVG.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/orient)
   */
  origin?: Bindable<'default'>,

  /**
   * The `path` attribute has two different meanings, either it defines a text
   * path along which the characters of a text are rendered, or a motion path
   * along which a referenced element is animated.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/path)
   */
  path?: Bindable<string>,

  /**
   * The `pathLength` attribute lets authors specify a total length for
   * the path, in user units. This value is then used to calibrate
   * the browser's distance calculations with those of the author,
   * by scaling all distance computations using the ratio
   * `pathLength` / *(computed value of path length)*.
   *
   * This can affect the actual rendered lengths of paths; including text paths,
   * animation paths, and various stroke operations. Basically, all computations
   * that require the length of the path. `stroke-dasharray`, for example, will
   * assume the start of the path being 0 and the end point the value defined in
   * the pathLength attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/pathLength)
   */
  pathLength?: Bindable<number>,

  /**
   * The `patternContentUnits` attribute indicates which coordinate system to
   * use for the contents of the `<pattern>` element.
   *
   * > **_NOTE:_**
   * This attribute has no effect if attribute `viewBox` is specified on
   * the `<pattern>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/patternContentUnits)
   */
  patternContentUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `patternTransform` attribute defines a list of transform definitions
   * that are applied to a pattern tile.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/patternTransform)
   */
  patternTransform?: Bindable<string>,

  /**
   * The `patternUnits` attribute indicates which coordinate system to use for
   * the geometry properties of the `<pattern> `element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/patternUnits)
   */
  patternUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `points` attribute defines a list of points. Each point is defined by
   * a pair of number representing a X and a Y coordinate in the user coordinate
   * system. If the attribute contains an odd number of coordinates, the last
   * one will be ignored.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/points)
   */
  points?: Bindable<string>,

  /**
   * The `pointsAtX` attribute represents the x location in the coordinate
   * system established by attribute `primitiveUnits` on the `<filter>` element
   * of the point at which the light source is pointing.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/pointsAtX)
   */
  pointsAtX?: Bindable<number>,

  /**
   * The `pointsAtY` attribute represents the y location in the coordinate
   * system established by attribute `primitiveUnits` on the `<filter>` element
   * of the point at which the light source is pointing.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/pointsAtY)
   */
  pointsAtY?: Bindable<number>,

  /**
   * The `pointsAtZ` attribute represents the z location in the coordinate
   * system established by attribute `primitiveUnits` on the `<filter>` element
   * of the point at which the light source is pointing, assuming that,
   * in the initial local coordinate system, the positive z-axis comes
   * out towards the person viewing the content and assuming that one
   * unit along the z-axis equals one unit in x and y.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/pointsAtZ)
   */
  pointsAtZ?: Bindable<number>,

  /**
   * The `preserveAlpha` attribute indicates how a `<feConvolveMatrix>` element
   * handles alpha transparency.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/preserveAlpha)
   */
  preserveAlpha?: Bindable<boolean>,

  /**
   * The `preserveAspectRatio` attribute indicates how an element with
   * a `viewBox` providing a given aspect ratio must fit into a viewport
   * with a different aspect ratio.
   *
   * The aspect ratio of an SVG image is defined by the `viewBox` attribute.
   * Therefore, if `viewBox` isn't set, the `preserveAspectRatio` attribute
   * has no effect on SVG's scaling (except in the case of the `<image>`
   * element, where preserveAspectRatio behaves differently as described below).
   *
   * Syntax
   * `preserveAspectRatio="<align> [<meet or slice>]"`
   *
   * The `preserveAspectRatio` attribute value consists of up to two keywords:
   * a required alignment value and an optional `meet` or `slice` keyword.
   *
   * The alignment value indicates whether to force uniform scaling and, if so,
   * the alignment method to use in case the aspect ratio of the `viewBox`
   * doesn't match the aspect ratio of the viewport. `xMidYMid` is the default
   * value. The alignment value must be one of the following keyword values:
   *
   * - `none`:
   * Does not force uniform scaling. Scale the graphic content of the given
   * element non-uniformly if necessary such that the element's bounding box
   * exactly matches the viewport rectangle. Note that if `<align>` is none,
   * then the optional `<meetOrSlice>` value is ignored.
   *
   * - `xMinYMin`:
   * Forces uniform scaling. Align the `<min-x>` of the element's `viewBox` with
   * the smallest X value of the viewport. Align the `<min-y>` of the element's
   * `viewBox` with the smallest Y value of the viewport.
   *
   * - `xMidYMin`:
   * Forces uniform scaling. Align the midpoint X value of the element's
   * `viewBox` with the midpoint X value of the viewport. Align the `<min-y>`
   * of the element's viewBox with the smallest Y value of the viewport.
   *
   * - `xMaxYMin`:
   * Forces uniform scaling. Align the `<min-x>+<width>` of the element's
   * `viewBox` with the maximum X value of the viewport. Align the `<min-y>`
   * of the element's `viewBox` with the smallest Y value of the viewport.
   *
   * - `xMinYMid`:
   * Forces uniform scaling. Align the `<min-x>` of the element's `viewBox`
   * with the smallest X value of the viewport. Align the midpoint Y value
   * of the element's `viewBox` with the midpoint Y value of the viewport.
   *
   * - `xMidYMid`:
   * Forces uniform scaling. Align the midpoint X value of the element's
   * `viewBox` with the midpoint X value of the viewport. Align the midpoint
   * Y value of the element's `viewBox` with the midpoint Y value of
   * the viewport. This is the default value.
   *
   * - `xMaxYMid`:
   * Forces uniform scaling. Align the `<min-x>+<width>` of the element's
   * `viewBox` with the maximum X value of the viewport. Align the midpoint
   * Y value of the element's `viewBox` with the midpoint Y value of the viewport.
   *
   * - `xMinYMax`:
   * Forces uniform scaling. Align the <min-x> of the element's `viewBox`
   * with the smallest X value of the viewport. Align the `<min-y>+<height>`
   * of the element's `viewBox` with the maximum Y value of the viewport.
   *
   * - `xMidYMax`:
   * Forces uniform scaling. Align the midpoint X value of the element's
   * `viewBox` with the midpoint X value of the viewport.
   * Align the `<min-y>+<height>` of the element's `viewBox` with the maximum
   * Y value of the viewport.
   *
   * - `xMaxYMax`:
   * Forces uniform scaling. Align the `<min-x>+<width>` of the element's
   * `viewBox` with the maximum X value of the viewport.
   * Align the `<min-y>+<height>` of the element's `viewBox` with the maximum
   * Y value of the viewport.
   *
   * The following two keywords determine how the SVG should be scaled relative
   * to the container's bounds. Specifying the `meet` or `slice` reference is
   * optional and, if provided, it must be one only one of two keywords.
   * `meet` is the default value.
   *
   * - `meet`:
   * Scales the graphic such that:
   *
   * - The aspect ratio is preserved.
   * - The entire `viewBox` is visible within the viewport.
   * - The `viewBox` is scaled up as much as possible, while still meeting
   * the other criteria.
   *
   * In this case, if the aspect ratio of the graphic does not match
   * the viewport, some of the viewport will extend beyond the bounds
   * of the `viewBox` (i.e., the area into which the `viewBox` will draw
   * will be smaller than the viewport).
   *
   * - `slice`:
   * Scales the graphic such that:
   *
   * - The aspect ratio is preserved.
   * - The entire viewport is covered by the `viewBox`.
   * - The `viewBox` is scaled down as much as possible, while still meeting
   * the other criteria.
   *
   * In this case, if the aspect ratio of the `viewBox` does not match
   * the viewport, some of the `viewBox` will extend beyond the bounds
   * of the viewport (i.e., the area into which the `viewBox` will draw
   * is larger than the viewport).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/preserveAspectRatio)
   */
  preserveAspectRatio?: Bindable<
    'none'
    |'xMinYMin'
    |'xMidYMin'
    |'xMaxYMin'
    |'xMinYMid'
    |'xMidYMid'
    |'xMaxYMid'
    |'xMinYMax'
    |'xMidYMax'
    |'xMaxYMax'
    |'meet'
    |'slice'
    |'xMinYMin meet'|'xMinYMin slice'
    |'xMidYMin meet'|'xMidYMin slice'
    |'xMaxYMin meet'|'xMaxYMin slice'
    |'xMinYMid meet'|'xMinYMid slice'
    |'xMidYMid meet'|'xMidYMid slice'
    |'xMaxYMid meet'|'xMaxYMid slice'
    |'xMinYMax meet'|'xMinYMax slice'
    |'xMidYMax meet'|'xMidYMax slice'
    |'xMaxYMax meet'|'xMaxYMax slice'
  >,

  /**
   * The `primitiveUnits` attribute specifies the coordinate system for
   * the various length values within the filter primitives and for
   * the attributes that define the filter primitive subregion.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/primitiveUnits)
   */
  primitiveUnits?: Bindable<'userSpaceOnUse'|'objectBoundingBox'>,

  /**
   * The `r` attribute defines the radius of a circle.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/r)
   */
  r?: Bindable<number|string>,

  /**
   * The `radius` attribute represents the radius (or radii) for the operation
   * on a given `<feMorphology>` filter primitive.
   *
   * If two numbers are provided, the first number represents the x-radius
   * and the second one the y-radius. If one number is provided, then that
   * value is used for both x and y. The values are in the coordinate system
   * established by the `primitiveUnits` attribute on the `<filter>` element.
   *
   * A negative or zero value disables the effect of the given filter primitive
   * (i.e., the result is the filter input image).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/radius)
   */
  radius?: Bindable<string>,

  /**
   * The `refX` attribute defines the x coordinate of an element's reference
   * point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/refX)
   */
  refX?: Bindable<number|string|'left'|'center'|'right'>,

  /**
   * The `refY` attribute defines the y coordinate of an element's reference
   * point.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/refY)
   */
  refY?: Bindable<number|string|'left'|'center'|'right'>,

  /**
   * The `repeatCount` attribute indicates the number of times an animation
   * will take place.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/repeatCount)
   */
  repeatCount?: Bindable<number|'indefinite'>,

  /**
   * The `repeatDur` attribute specifies the total duration for repeating
   * an animation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/repeatDur)
   */
  repeatDur?: Bindable<string|'indefinite'>,

  /**
   * The `restart` attribute specifies whether an animation can restart.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/restart)
   */
  restart?: Bindable<'always'|'whenNotActive'|'never'>,

  /**
   * The `result` attribute defines the assigned name for this filter primitive.
   * If supplied, then graphics that result from processing this filter
   * primitive can be referenced by an `in` attribute on a subsequent filter
   * primitive within the same `<filter>` element. If no value is provided,
   * the output will only be available for re-use as the implicit input into
   * the next filter primitive if that filter primitive provides no value for
   * its `in` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/restart)
   */
  result?: Bindable<string>,

  /**
   * The `rotate` attribute specifies how the animated element rotates as it
   * travels along a path specified in an <animateMotion> element.
   *
   * The `auto` and `auto-reverse` values allow the animated element's rotation
   * to change dynamically as it travels along the path. If the value of
   * `rotate` is `auto`, the element turns to align its right-hand side
   * in the current direction of motion. If the value is `auto-reverse`,
   * it turns its left-hand side in the current direction of motion.
   *
   * Setting `rotate`'s value to a number specifies a constant rotation,
   * in degrees, that does not change with the animation. The default value
   * of `0` keeps the animated element in its original orientation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/rotate)
   */
  rotate?: Bindable<number|'auto'|'auto-reverse'>,

  /**
   * The `rx` attribute defines a radius on the x-axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/rx)
   */
  rx?: Bindable<number|string|'auto'>,

  /**
   * The `ry` attribute defines a radius on the y-axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/ry)
   */
  ry?: Bindable<number|string|'auto'>,

  /**
   * The `scale` attribute defines the displacement scale factor to be used on
   * a `<feDisplacementMap>` filter primitive. The amount is expressed in
   * the coordinate system established by the `primitiveUnits` attribute on
   * the `<filter>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/scale)
   */
  scale?: Bindable<number>,

  /**
   * The `seed` attribute represents the starting number for the pseudo random
   * number generator of the `<feTurbulence>` filter primitive.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/seed)
   */
  seed?: Bindable<number>,

  /**
   * The `side` attribute determines the side of a path the text is placed
   * on (relative to the path direction).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/side)
   */
  side?: Bindable<'left'|'right'>,

  /**
   * The `slope` attribute defines the values for linear filters, such as
   * brightness.
   *
   * The `slope` attribute is supported by children of
   * the `<feComponentTransfer>` filter primitive, including the `feFunc-RGBA`
   * transfer functions. When the `type` of a transfer function is `linear`,
   * the `slope` defines the slope of the linear function.
   *
   * You can use this attribute with the following SVG component transfer
   * function elements when `type="linear"` is set:
   *
   * - `<feFuncR>`
   * - `<feFuncG>`
   * - `<feFuncB>`
   * - `<feFuncA>`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/slope)
   */
  slope?: Bindable<number>,

  /**
   * The `spacing` attribute indicates how the user agent should determine
   * the spacing between typographic characters that are to be rendered
   * along a path.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/spacing)
   */
  spacing?: Bindable<'auto'|'exact'>,

  /**
   * The `specularConstant` attribute controls the ratio of reflection of
   * the specular lighting. It represents the ks value in the Phong lighting
   * model. The bigger the value the stronger the reflection.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/specularConstant)
   */
  specularConstant?: Bindable<number>,

  /**
   * The `specularExponent` attribute controls the focus for the light source.
   * The bigger the value the brighter the light.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/specularExponent)
   */
  specularExponent?: Bindable<number>,

  /**
   * The `spreadMethod` attribute determines how a shape is filled beyond
   * the defined edges of a gradient.
   *
   * - `pad`:
   * This value indicates that the final color of the gradient fills the shape beyond the gradient's edges.
   *
   * - `reflect`:
   * This value indicates that the gradient repeats in reverse beyond its edges.
   *
   * - `repeat`:
   * This value specifies that the gradient repeats in the original order beyond its edges.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/spreadMethod)
   */
  spreadMethod?: Bindable<'pad'|'reflect'|'repeat'>,

  /**
   * The `startOffset` attribute defines an offset from the start of the path
   * for the initial current text position along the path after converting
   * the path to the `<textPath>` element's coordinate system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/startOffset)
   */
  startOffset?: Bindable<number|string>,

  /**
   * The `stdDeviation` attribute defines the standard deviation for the blur
   * operation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stdDeviation)
   */
  stdDeviation?: Bindable<string>,

  /**
   * The `stitchTiles` attribute defines how the Perlin Noise tiles behave
   * at the border.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stitchTiles)
   */
  stitchTiles?: Bindable<'noStitch'|'stitch'>,

  /**
   * The `style` attribute allows to style an element using CSS declarations.
   * It functions identically to the `style` attribute in HTML.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/style)
   */
  style?: Bindable<string|CSSProperties>,

  /**
   * The `surfaceScale` attribute represents the height of the surface for
   * a light filter primitive.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/surfaceScale)
   */
  surfaceScale?: Bindable<number>,

  /**
   * The `systemLanguage` attribute represents a list of supported language
   * tags. This list is matched against the language defined in the user
   * preferences.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/systemLanguage)
   */
  systemLanguage?: Bindable<string>,

  /**
   * The `tabindex` attribute allows you to control whether an element is
   * focusable and to define the relative order of the element for
   * the purposes of sequential focus navigation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/tabindex)
   */
  tabIndex?: Bindable<number>,

  /**
   * The `tableValues` attribute defines a list of numbers defining a lookup
   * table of values for a color component transfer function.
   *
   * You can use this attribute with the following SVG elements:
   *
   * - `<feFuncA>`
   * - `<feFuncB>`
   * - `<feFuncG>`
   * - `<feFuncR>`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/tableValues)
   */
  tableValues?: Bindable<string>,

  /**
   * The `target` attribute should be used when there are multiple possible
   * targets for the ending resource, such as when the parent document is
   * embedded within an HTML or XHTML document, or is viewed with a tabbed
   * browser. This attribute specifies the name of the browsing context
   * (e.g., a browser tab or an (X)HTML iframe or object element) into
   * which a document is to be opened when the link is activated:
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/target)
   */
  target?: Bindable<string|'_self'|'_parent'|'_top'|'_blank'>,

  /**
   * The `targetX` attribute determines the positioning in horizontal direction
   * of the convolution matrix relative to a given target pixel in the input
   * image. The leftmost column of the matrix is column number zero. The value
   * must be such that: `0` <= `targetX` < `x` of `order`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/targetX)
   */
  targetX?: Bindable<number>,

  /**
   * The `targetY` attribute determines the positioning in vertical direction
   * of the convolution matrix relative to a given target pixel in the input
   * image. The topmost row of the matrix is row number zero. The value
   * must be such that: `0` <= `targetY` < `y` of `order`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/targetY)
   */
  targetY?: Bindable<number>,

  /**
   * The `textLength` attribute, available on SVG `<text>` and `<tspan>`
   * elements, lets you specify the width of the space into which the text
   * will draw. The user agent will ensure that the text does not extend
   * farther than that distance, using the method or methods specified by
   * the `lengthAdjust` attribute. By default, only the spacing between
   * characters is adjusted, but the glyph size can also be adjusted if
   * you change `lengthAdjust`.
   *
   * By using `textLength`, you can ensure that your SVG text displays at
   * the same width regardless of conditions including web fonts failing
   * to load (or not having loaded yet).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/textLength)
   */
  textLength?: Bindable<string|number>,

  /**
   * The `to` attribute indicates the final value of the attribute that will
   * be modified during the animation.
   *
   * The value of the attribute will change between the `from` attribute value
   * and this value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/to)
   */
  to?: Bindable<StringConvertible>,

  /**
   * The `type` attribute is a generic attribute and it has different meaning
   * based on the context in which it's used.
   *
   * - For the `<animateTransform>` element, it defines the type of
   * transformation, whose values change over time.
   * - For the `<feColorMatrix>` element, it indicates the type of matrix
   * operation. The keyword `matrix` indicates that a full 5x4 matrix of
   * values will be provided. The other keywords represent convenience
   * shortcuts to allow commonly used color operations to be performed
   * without specifying a complete matrix.
   * - For the `<feFuncR>`, `<feFuncG>`, `<feFuncB>`, and `<feFuncA>` elements,
   * it Indicates the type of component transfer function.
   * - For the `<feTurbulence>` element, it indicates whether the filter
   * primitive should perform a noise or turbulence function.
   * - For the `<style>` and `<script>` elements, it defines the content
   * type of the element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/type)
   */
  type?: Bindable<string>,

  /**
   * The `values` attribute has different meanings, depending upon the context
   * where it's used, either it defines a sequence of values used over
   * the course of an animation, or it's a list of numbers for a color matrix,
   * which is interpreted differently depending on the type of color change
   * to be performed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/values)
   */
  values?: Bindable<string>,

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
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/viewBox)
   */
  viewBox?: Bindable<string|'none'>,

  /**
   * The `width` attribute defines the horizontal length of an element in
   * the user coordinate system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/width)
   */
  width?: Bindable<number|string|'auto'>,

  /**
   * The `x` attribute defines an x-axis coordinate in the user coordinate
   * system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/x)
   */
  x?: Bindable<number|string>,

  /**
   * The `x1` attribute is used to specify the first x-coordinate for drawing
   * an SVG element that requires more than one coordinate. Elements that only
   * need one coordinate use the `x` attribute instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/x1)
   */
  x1?: Bindable<number|string>,

  /**
   * The `x2` attribute is used to specify the second x-coordinate for drawing
   * an SVG element that requires more than one coordinate. Elements that only
   * need one coordinate use the `x` attribute instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/x2)
   */
  x2?: Bindable<number|string>,

  /**
   * The `xChannelSelector` attribute indicates which color channel from `in2`
   * to use to displace the pixels in `in` along the x-axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/xChannelSelector)
   */
  xChannelSelector?: Bindable<'R'|'G'|'B'|'A'>,

  /**
   * The `y` attribute defines an y-axis coordinate in the user coordinate
   * system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/y)
   */
  y?: Bindable<number|string>,

  /**
   * The `y1` attribute is used to specify the first y-coordinate for drawing
   * an SVG element that requires more than one coordinate. Elements that only
   * need one coordinate use the `y` attribute instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/y1)
   */
  y1?: Bindable<number|string>,

  /**
   * The `y2` attribute is used to specify the second y-coordinate for drawing
   * an SVG element that requires more than one coordinate. Elements that only
   * need one coordinate use the `y` attribute instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/y2)
   */
  y2?: Bindable<number|string>,

  /**
   * The `yChannelSelector` attribute indicates which color channel from `in2`
   * to use to displace the pixels in `in` along the y-axis.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/yChannelSelector)
   */
  yChannelSelector?: Bindable<'R'|'G'|'B'|'A'>,

  /**
   * The `z` attribute defines the location along the z-axis for a light source
   * in the coordinate system established by the `primitiveUnits` attribute on
   * the `<filter>` element, assuming that, in the initial coordinate system,
   * the positive z-axis comes out towards the person viewing the content and
   * assuming that one unit along the z-axis equals one unit in x and y.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/z)
   */
  z?: Bindable<number|string>,
}

export interface svgPresentationAttributes {
  /**
   * Specifies how an object is aligned with respect to its parent.
   * This property specifies which baseline of this element is to
   * be aligned with the corresponding baseline of the parent.
   * For example, this allows alphabetic baselines in Roman
   * text to stay aligned across font size changes.
   * It defaults to the baseline with the same name
   * as the computed value of the `alignment-baseline`
   * property.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `alignment-baseline` also has a CSS property
   * counterpart: `alignment-baseline`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/alignment-baseline)
   */
  'alignment-baseline'?: Bindable<
    'auto'
    |'baseline'
    |'before-edge'
    |'text-before-edge'
    |'middle'
    |'central'
    |'after-edge'
    |'text-after-edge'
    |'ideographic'
    |'alphabetic'
    |'hanging'
    |'mathematical'
    |'top'
    |'center'
    |'bottom'
  >,

  /**
   * The `baseline-shift` attribute allows repositioning
   * of the dominant-baseline relative to the dominant-baseline
   * of the parent text content element.
   * The shifted object might be a sub- or superscript.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `baseline-shift` also has a CSS property
   * counterpart: `baseline-shift`. When both are specified,
   * the CSS property takes priority.
   *
   * > **_NOTE:_**
   * This property is going to be deprecated and authors are advised
   * to use `vertical-align` instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/azimuth)
   */
  'baseline-shift'?: Bindable<number>,

  /**
   * The `clip-path` presentation attribute defines or associates a clipping
   * path with the element it is related to.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `clip-path` also has a CSS property
   * counterpart: `clip-path`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/clip-path)
   */
  'clip-path'?: Bindable<CSSProperties['clip-path']>,

  /**
   * The `clip-rule` attribute only applies to graphics elements that are
   * contained within a `<clipPath>` element. The `clip-rule` attribute
   * basically works as the `fill-rule` attribute, except that it applies
   * to `<clipPath>` definitions.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `clip-rule` also has a CSS property
   * counterpart: `clip-rule`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/clip-rule)
   */
  'clip-rule'?: Bindable<'nonzero'|'evenodd'|'inherit'>,

  /**
   * The `color` attribute is used to provide a potential indirect value,
   * `currentcolor`, for the `fill`, `stroke`, `stop-color`, `flood-color`,
   * and `lighting-color` attributes.
   *
   * Technically, `color` can be applied to any element, but it has no direct
   * effect on SVG elements.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `color` also has a CSS property
   * counterpart: `color`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/color)
   */
  color?: Bindable<CSSProperties['color']>,

  /**
   * The `color-interpolation` attribute specifies the color space for gradient
   * interpolations, color animations, and alpha compositing.
   *
   * > **_NOTE:_**
   * For filter effects, the `color-interpolation-filters` property controls
   * which color space is used.
   *
   * The `color-interpolation` property chooses between color operations
   * occurring in the sRGB color space or in a (light energy linear) linearized
   * RGB color space. Having chosen the appropriate color space, component-wise
   * linear interpolation is used.
   *
   * When a child element is blended into a background, the value of
   * the `color-interpolation` property on the child determines the type of
   * blending, not the value of the `color-interpolation` on the parent.
   * For gradients which make use of the `href` or the deprecated `xlink:href`
   * attribute to reference another gradient, the gradient uses the property's
   * value from the gradient element which is directly referenced by the `fill`
   * or `stroke` property. When animating colors, color interpolation is
   * performed according to the value of the `color-interpolation` property on
   * the element being animated.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `color-interpolation` also has a CSS property
   * counterpart: `color-interpolation`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/color-interpolation)
   */
  'color-interpolation'?: Bindable<CSSProperties['color-interpolation']>,

  /**
   * The `color-interpolation-filters` attribute specifies the color space for
   * imaging operations performed via filter effects.
   *
   * > **_NOTE:_**
   * This property just has an effect on filter operations. Therefore, it has no
   * effect on filter primitives like `<feOffset>`, `<feImage>`, `<feTile>`
   * or `<feFlood>`.
   * `color-interpolation-filters` has a different initial value than
   * `color-interpolation`.
   * `color-interpolation-filters` has an initial value of `linearRGB`, whereas
   * `color-interpolation` has an initial value of `sRGB`. Thus, in the default
   * case, filter effects operations occur in the `linearRGB` color space,
   * whereas all other color interpolations occur by default in the `sRGB`
   * color space.
   * It has no effect on filter functions, which operate in the `sRGB` color
   * space.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `color-interpolation-filters` also has
   * a CSS property counterpart: `color-interpolation-filters`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/color-interpolation-filters)
   */
  'color-interpolation-filters'?: Bindable<CSSProperties['color-interpolation-filters']>,

  /**
   * The `cursor` attribute specifies the mouse cursor displayed when the mouse
   * pointer is over an element.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `cursor` also has a CSS property
   * counterpart: `cursor`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/cursor)
   */
  cursor?: Bindable<
    string
    |'auto'
    |'crosshair'
    |'default'
    |'pointer'
    |'move'
    |'e-resize'
    |'ne-resize'
    |'nw-resize'
    |'n-resize'
    |'se-resize'
    |'sw-resize'
    |'s-resize'
    |'w-resize'
    |'text'
    |'wait'
    |'help'
    |'inherit'
  >,

  /**
   * The `cx` attribute defines the x-axis coordinate of a center point.
   *
   * You can use this attribute with the following SVG elements:
   *
   * > **_NOTE:_**
   * As a geometry property, `cx` can also be used as CSS property for
   * `<circle>` and `<ellipse>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/cx)
   */
  cx?: Bindable<CSSProperties['cx']>,

  /**
   * The `cx` attribute defines the y-axis coordinate of a center point.
   *
   * You can use this attribute with the following SVG elements:
   *
   * > **_NOTE:_**
   * As a geometry property, `cy` can also be used as CSS property for
   * `<circle>` and `<ellipse>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/cy)
   */
  cy?: Bindable<CSSProperties['cy']>,

  /**
   * The `d` attribute defines a path to be drawn.
   *
   * A path definition is a list of
   * [path commands](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/d#path_commands)
   * where each command is composed of a command letter and numbers that
   * represent the command parameters.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `d` also has a CSS property
   * counterpart: `d`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/d)
   */
  d?: Bindable<CSSProperties['d']>,

  /**
   * The `direction` attribute specifies the inline-base direction of a `<text>`
   * or `<tspan>` element. It defines the start and end points of a line of text
   * as used by the `text-anchor` and `inline-size` properties.
   * It also may affect the direction in which characters are positioned if
   * the `unicode-bidi` property's value is either embed or bidi-override.
   *
   * It applies only to glyphs oriented perpendicular to the inline-base
   * direction, which includes the usual case of horizontally-oriented
   * Latin or Arabic text and the case of narrow-cell Latin or Arabic
   * characters rotated 90 degrees clockwise relative to a top-to-bottom
   * inline-base direction.
   *
   * In many cases, the bidirectional Unicode algorithm produces the desired
   * result automatically, so this attribute doesn't need to be specified in
   * those cases. For other cases, such as when using right-to-left languages,
   * it may be sufficient to add the `direction` attribute to the outermost
   * `<svg>` element, and allow that direction to inherit to all text elements.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `direction` also has a CSS property
   * counterpart: `direction`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/direction)
   */
  direction?: Bindable<CSSProperties['direction']>,

  /**
   * The `display` attribute lets you control the rendering of graphical or
   * container elements.
   *
   * A value of `display="none"` indicates that the given element and its
   * children will not be rendered. Any value other than `none` or `inherit`
   * indicates that the given element will be rendered by the browser.
   *
   * When applied to a container element, setting `display` to `none` causes
   * the container and all of its children to be invisible; thus, it acts on
   * groups of elements as a group. This means that any child of an element
   * with `display="none"` will never be rendered even if the child has a value
   * for display other than `none`.
   *
   * When the `display` attribute is set to `none`, then the given element does
   * not become part of the rendering tree. It has implications for
   * the `<tspan>` elements, event processing, for bounding box calculations
   * and for calculation of clipping paths:
   *
   * - If `display` is set to `none` on a `<tspan>` element, then the text string
   * is ignored for the purposes of text layout.
   * - Regarding events, if `display` is set to `none`, the element receives
   * no events.
   * - The geometry of a graphics element with `display` set to `none` is not
   * included in bounding box and clipping paths calculations.
   *
   * The `display` attribute only affects the direct rendering of a given
   * element, whereas it does not prevent elements from being referenced by
   * other elements. For example, setting it to `none` on a `<path>` element
   * will prevent that element from getting rendered directly onto the canvas,
   * but the `<path>` element can still be referenced by a `<textPath>` element;
   * furthermore, its geometry will be used in text-on-a-path processing even
   * if the `<path>` has a display value of none.
   *
   * This attribute also affects direct rendering into offscreen canvases,
   * such as occurs with masks or clip paths. Thus, setting `display="none"`
   * on a child of a `<mask>` will prevent the given child element from being
   * rendered as part of the mask. Similarly, setting `display="none"` on
   * a child of a `<clipPath>` element will prevent the given child element
   * from contributing to the clipping path.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/display)
   */
  display?: Bindable<CSSProperties['display']>,

  /**
   * The `dominant-baseline` CSS property specifies the specific baseline used
   * to align the box's text and inline-level contents. It also indicates
   * the default alignment baseline of any boxes participating in baseline
   * alignment in the box's alignment context. If present, it overrides
   * the shape's `dominant-baseline` attribute.
   *
   * Baselines are selected from the font baseline table. If there is no
   * baseline table in the nominal font, or if the baseline table lacks
   * an entry for the desired baseline, then the browser may use heuristics
   * to determine the position of the desired baseline.
   *
   * The `dominant-baseline` property is used to determine or re-determine
   * a scaled-baseline-table. A scaled-baseline-table is a compound value
   * with three components:
   *
   * - a baseline-identifier for the `dominant-baseline`,
   * - a baseline-table, and
   * - a baseline-table font-size.
   *
   * Some values of `dominant-baseline` re-determine all three values.
   * Others only re-establish the baseline-table font-size. When the initial
   * value, `auto`, would give an undesired result, this property can be used
   * to explicitly set the desired scaled-baseline-table.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `dominant-baseline` also has a CSS property
   * counterpart: `dominant-baseline`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/dominant-baseline)
   */
  'dominant-baseline'?: Bindable<CSSProperties['dominant-baseline']>,

  /**
   * Sets the color inside the object.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `fill` also has a CSS property
   * counterpart: `fill`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/fill)
   */
  fill?: Bindable<CSSColors>,

  /**
   * A presentation attribute defining the opacity of the paint server (color,
   * gradient, pattern, etc.) applied to a shape.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `fill-opacity` also has a CSS property
   * counterpart: `fill-opacity`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/fill-opacity)
   */
  'fill-opacity'?: Bindable<CSSProperties['fill-opacity']>,

  /**
   * A presentation attribute defining the algorithm to use to determine
   * the inside part of a shape.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `fill-rule` also has a CSS property
   * counterpart: `fill-rule`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/fill-rule)
   */
  'fill-rule'?: Bindable<CSSProperties['fill-rule']>,

  /**
   * The `filter` attribute specifies the filter effects defined by
   * the `<filter>` element that shall be applied to its element.
   *
   * Technically, `filter` can be applied to any element, but it only has effect
   * on container elements without the `<defs>` element, all graphics elements,
   * and the `<use>` element.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `filter` also has a CSS property
   * counterpart: `filter`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/filter)
   */
  filter?: Bindable<CSSProperties['filter']>,

  /**
   * The `flood-color` attribute indicates what color to use to flood
   * the current filter primitive subregion.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `flood-color` also has a CSS property
   * counterpart: `flood-color`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/flood-color)
   */
  'flood-color'?: Bindable<CSSProperties['flood-color']>,

  /**
   * The `flood-opacity` attribute indicates the opacity value to use across
   * the current filter primitive subregion.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `flood-opacity` also has a CSS property
   * counterpart: `flood-opacity`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/flood-opacity)
   */
  'flood-opacity'?: Bindable<CSSProperties['flood-opacity']>,

  /**
   * The `font-family` attribute indicates which font family will be used to
   * render the text, specified as a prioritized list of font family names
   * and/or generic family names.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `font-family` also has a CSS property
   * counterpart: `font-family`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/font-family)
   */
  'font-family'?: Bindable<CSSProperties['font-family']>,

  /**
   * The `font-size` attribute refers to the size of the font from baseline
   * to baseline when multiple lines of text are set solid in a multiline
   * layout environment.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `font-size` also has a CSS property
   * counterpart: `font-size`. When both are specified,
   * the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/font-size)
   */
  'font-size'?: Bindable<CSSProperties['font-size']>,

  /**
   * The `font-size-adjust` attribute allows authors to specify an aspect value
   * for an element that will preserve the x-height of the first choice font in
   * a substitute font.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `font-size-adjust` also has a CSS property
   * counterpart: `font-size-adjust`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/font-size-adjust)
   */
  'font-size-adjust'?: Bindable<CSSProperties['font-size-adjust']>,

  /**
   * The `font-style` attribute specifies whether the text is to be rendered
   * using a normal, italic, or oblique face.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `font-style` also has a CSS property
   * counterpart: `font-style`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/font-style)
   */
  'font-style'?: Bindable<CSSProperties['font-style']>,

  /**
   * The `font-variant` attribute indicates whether the text is to be rendered
   * using variations of the font's glyphs.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `font-variant` also has a CSS property
   * counterpart: `font-variant`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/font-variant)
   */
  'font-variant'?: Bindable<CSSProperties['font-variant']>,

  /**
   * The `font-weight` attribute refers to the boldness or lightness of
   * the glyphs used to render the text, relative to other fonts in
   * the same font family.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `font-weight` also has a CSS property
   * counterpart: `font-weight`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/font-weight)
   */
  'font-weight'?: Bindable<CSSProperties['font-weight']>,

  /**
   * The `image-rendering` attribute provides a hint to the browser about how to
   * make speed vs. quality tradeoffs as it performs image processing.
   *
   * The resampling is always done in a truecolor (e.g., 24-bit) color space
   * even if the original data and/or the target device is indexed color.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `image-rendering` also has a CSS property
   * counterpart: `image-rendering`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/image-rendering)
   */
  'image-rendering'?: Bindable<'auto' |'optimizeSpeed' |'optimizeQuality'>,

  /**
   * The `letter-spacing` attribute controls spacing between text characters.
   *
   * If the attribute value is a unitless number (like `128`), the browser
   * processes it as a `<length>` in the current user coordinate system.
   *
   * If the attribute value has a unit identifier, such as `.25em` or `1%`,
   * then the browser converts the `<length>` into its corresponding value
   * in the current user coordinate system.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `letter-spacing` also has a CSS property
   * counterpart: `letter-spacing`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/letter-spacing)
   */
  'letter-spacing'?: Bindable<CSSProperties['letter-spacing']>,

  /**
   * The `lighting-color` attribute defines the color of the light source for
   * lighting filter primitives.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `lighting-color` also has a CSS property
   * counterpart: `lighting-color`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/lighting-color)
   */
  'lighting-color'?: Bindable<CSSProperties['lighting-color']>,

  /**
   * The `marker-end` attribute defines the arrowhead or polymarker that will be
   * drawn at the final vertex of the given shape.
   *
   * For all shape elements, except `<polyline>` and `<path>`, the last vertex
   * is the same as the first vertex. In this case, if the value of
   * `marker-start` and `marker-end` are both not `none`, then two markers will
   * be rendered on that final vertex. For `<path>` elements, for each closed
   * subpath, the last vertex is the same as the first vertex. marker-end is
   * only rendered on the final vertex of the path data.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `marker-end` also has a CSS property
   * counterpart: `marker-end`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/marker-end)
   */
  'marker-end'?: Bindable<CSSProperties['marker-end']>,

  /**
   * The `marker-mid` attribute defines the arrowhead or polymarker that will be
   * drawn at all interior vertices of the given shape.
   *
   * The marker is rendered on every vertex other than the first and last
   * vertices of the path data.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `marker-mid` also has a CSS property
   * counterpart: `marker-mid`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/marker-mid)
   */
  'marker-mid'?: Bindable<CSSProperties['marker-mid']>,

  /**
   * The `marker-start` attribute defines the arrowhead or polymarker that will
   * be drawn at the first vertex of the given shape.
   *
   * For all shape elements, except `<polyline>` and `<path>`, the last vertex
   * is the same as the first vertex. In this case, if the value of
   * `marker-start` and `marker-end` are both not `none`, then two markers will
   * be rendered on that final vertex. For `<path>` elements, for each closed
   * subpath, the last vertex is the same as the first vertex. `marker-start`
   * is only rendered on the first vertex of the path data.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `start` also has a CSS property
   * counterpart: `start`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/marker-start)
   */
  'marker-start'?: Bindable<CSSProperties['marker-start']>,

  /**
   * The `mask` attribute is a presentation attribute mainly used to bind
   * a given `<mask>` element with the element the attribute belongs to.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `mask` also has a CSS property
   * counterpart: `mask`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/mask)
   */
  mask?: Bindable<CSSProperties['mask']>,

  /**
   * The `opacity` attribute specifies the transparency of an object or of
   * a group of objects, that is, the degree to which the background behind
   * the element is overlaid.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `opacity` also has a CSS property
   * counterpart: `opacity`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/opacity)
   */
  opacity?: Bindable<number>,

  /**
   * The `overflow` attribute sets what to do when an element's content is too
   * big to fit in its block formatting context.
   *
   * This attribute has the same parameter values and meaning as the CSS
   * `overflow` property, however, the following additional points apply:
   *
   * - If it has a value of visible, the attribute has no effect
   * (i.e., a clipping rectangle is not created).
   * - If the `overflow` property has the value `hidden` or `scroll`, a clip of
   * the exact size of the SVG viewport is applied.
   * - When `scroll` is specified on an `<svg>` element, a scrollbar or panner
   * is normally shown for the SVG viewport whether any of its content
   * is clipped.
   * - Within SVG content, the value `auto` implies that all rendered content
   * for child elements must be visible, either through a scrolling mechanism,
   * or by rendering with no clip.
   *
   * > **_NOTE:_**
   * Although the initial value for overflow is `auto`, it is overwritten in
   * the User Agent style sheet for the `<svg>` element when it is not the root
   * element of a stand-alone document, the `<pattern>` element,
   * and the `<marker>` element to be hidden by default.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `overflow` also has a CSS property
   * counterpart: `overflow`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/overflow)
   */
  overflow?: Bindable<CSSProperties['overflow']>,

  /**
   * The `paint-order` attribute specifies the order that the fill, stroke,
   * and markers of a given shape or text element are painted.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `paint-order` also has a CSS property
   * counterpart: `paint-order`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/paint-order)
   */
  'paint-order'?: Bindable<CSSProperties['paint-order']>,

  /**
   * The `pointer-events` attribute is a presentation attribute that allows defining whether or when an element may be the target of a mouse event.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `pointer-events` also has a CSS property
   * counterpart: `pointer-events`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/pointer-events)
   */
  'pointer-events'?: Bindable<CSSProperties['pointer-events']>,

  /**
   * The `shape-rendering` attribute provides hints to the renderer about what
   * tradeoffs to make when rendering shapes like paths, circles, or rectangles.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `shape-rendering` also has a CSS property
   * counterpart: `shape-rendering`.
   * When both are specified, the CSS property takes priority.
   *
   * - `auto`:
   * This value indicates that the user agent shall make appropriate tradeoffs
   * to balance speed, crisp edges and geometric precision, but with geometric
   * precision given more importance than speed and crisp edges.
   *
   * - `optimizeSpeed`:
   * This value indicates that the user agent shall emphasize rendering speed
   * over geometric precision and crisp edges. This option will sometimes cause
   * the user agent to turn off shape anti-aliasing.
   *
   * - `crispEdges`:
   * This value indicates that the user agent shall attempt to emphasize
   * the contrast between clean edges of artwork over rendering speed and
   * geometric precision. To achieve crisp edges, the user agent might turn
   * off anti-aliasing for all lines and curves or possibly just for straight
   * lines which are close to vertical or horizontal. Also, the user agent
   * might adjust line positions and line widths to align edges with device
   * pixels.
   *
   * - `geometricPrecision`:
   * Indicates that the user agent shall emphasize geometric precision over
   * speed and crisp edges.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/shape-rendering)
   */
  'shape-rendering'?: Bindable<
    'auto'
    |'optimizeSpeed'
    |'crispEdges'
    |'geometricPrecision'
  >,

  /**
   * The `stop-color` attribute indicates what color to use at a gradient stop.
   *
   * > **_NOTE:_**
   * With respect to gradients, SVG treats the `transparent` keyword differently
   * than CSS. SVG does not calculate gradients in pre-multiplied space, so
   * `transparent` really means transparent black. So, specifying a `stop-color`
   * with the value transparent is equivalent to specifying a `stop-color` with
   * the value `black` and a `stop-opacity` with the value `0`.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stop-color` also has a CSS property
   * counterpart: `stop-color`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stop-color)
   */
  'stop-color'?: Bindable<CSSProperties['stop-color']>,

  /**
   * The `stop-opacity` attribute defines the opacity of a given color gradient
   * stop.
   *
   * The opacity value used for the gradient calculation is the product of
   * the value of `stop-opacity` and the opacity of the value of
   * the `stop-color` attribute. For `stop-color` values that
   * don't include explicit opacity information, the opacity
   * is treated as `1`.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stop-opacity` also has a CSS property
   * counterpart: `stop-opacity`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stop-opacity)
   */
  'stop-opacity'?: Bindable<CSSProperties['stop-opacity']>,

  /**
   * Sets the color of the line drawn around the object.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke` also has a CSS property
   * counterpart: `stroke`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke)
   */
  stroke?: Bindable<CSSProperties['stroke']>,

  /**
   * A presentation attribute defining the pattern of dashes and gaps used
   * to paint the outline of the shape.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-dasharray` also has a CSS property
   * counterpart: `stroke-dasharray`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-dasharray)
   */
  'stroke-dasharray'?: Bindable<CSSProperties['stroke-dasharray']>,

  /**
   * A presentation attribute defining an offset on the rendering
   * of the associated dash array.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-dashoffset` also has a CSS property
   * counterpart: `stroke-dashoffset`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)
   */
  'stroke-dashoffset'?: Bindable<CSSProperties['stroke-dashoffset']>,

  /**
   * A presentation attribute defining the shape to be used at the end
   * of open subpaths when they are stroked.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-linecap` also has a CSS property
   * counterpart: `stroke-linecap`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-linecap)
   */
  'stroke-linecap'?: Bindable<CSSProperties['stroke-linecap']>,

  /**
   * A presentation attribute defining the shape to be used at the corners
   * of paths when they are stroked.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-linejoin` also has a CSS property
   * counterpart: `stroke-linejoin`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-linejoin)
   */
  'stroke-linejoin'?: Bindable<'arcs'|'bevel'|'miter'|'miter-clip'|'round'>,

  /**
   * A presentation attribute defining a limit on the ratio of the miter length
   * to the `stroke-width` used to draw a miter join. When the limit is
   * exceeded, the join is converted from a miter to a bevel.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-miterlimit` also has a CSS property
   * counterpart: `stroke-miterlimit`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-miterlimit)
   */
  'stroke-miterlimit'?: Bindable<CSSProperties['stroke-miterlimit']>,

  /**
   * A presentation attribute defining the opacity of the paint server
   * (*color*, *gradient*, *pattern*, etc.) applied to the stroke of a shape.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-opacity` also has a CSS property
   * counterpart: `stroke-opacity`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-opacity)
   */
  'stroke-opacity'?: Bindable<CSSProperties['stroke-opacity']>,

  /**
   * A presentation attribute defining the width of the stroke to be applied
   * to the shape. It applies to any SVG shape or text-content element,
   * but as an inherited property, it may be applied to elements such
   * as `<g>` and still have the intended effect on descendant
   * elements' strokes.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `stroke-width` also has a CSS property
   * counterpart: `stroke-width`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-width)
   */
  'stroke-width'?: Bindable<CSSProperties['stroke-width']>,

  /**
   * The `text-anchor` attribute is used to align (start-, middle- or
   * end-alignment) a string of pre-formatted text or auto-wrapped text where
   * the wrapping area is determined from the `inline-size` property relative
   * to a given point.
   *
   * This attribute is not applicable to other types of auto-wrapped text.
   * For those cases you should use `text-align`. For multi-line text,
   * the alignment takes place for each line.
   *
   * The `text-anchor` attribute is applied to each individual text chunk
   * within a given `<text>` element. Each text chunk has an initial current
   * text position, which represents the point in the user coordinate system
   * resulting from (depending on context) application of the `x` and `y`
   * attributes on the `<text>` element, any `x` or `y` attribute values on
   * a `<tspan>` element assigned explicitly to the first rendered character
   * in a text chunk, or determination of the initial current text position
   * for a `<textPath>` element.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `text-anchor` also has a CSS property
   * counterpart: `text-anchor`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/text-anchor)
   */
  'text-anchor'?: Bindable<CSSProperties['text-anchor']>,

  /**
   * The `text-decoration` attribute defines whether text is decorated with
   * an underline, overline and/or strike-through. It is a shorthand for
   * the `text-decoration-line` and `text-decoration-style` properties.
   *
   * The fill and stroke of the text decoration are given by the fill and
   * stroke of the text at the point where the text decoration is declared.
   *
   * The paint order of the text decoration, i.e., the fill and stroke, is
   * determined by the value of the `paint-order` attribute at the point where
   * the text decoration is declared.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `text-decoration` also has a CSS property
   * counterpart: `text-decoration`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/text-decoration)
   */
  'text-decoration'?: Bindable<CSSProperties['text-decoration']>,

  /**
   * The `text-rendering` attribute provides hints to the renderer about what
   * tradeoffs to make when rendering text.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `text-rendering` also has a CSS property
   * counterpart: `text-rendering`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/text-rendering)
   */
  'text-rendering'?: Bindable<CSSProperties['text-rendering']>,

  /**
   * The `transform` attribute defines a list of transform definitions that
   * are applied to an element and the element's children.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `transform` also has a CSS property
   * `counterpart`: transform. When both are specified, the CSS property
   * takes priority. However, be aware that there are some differences in
   * syntax between the CSS property and the attribute. See the documentation
   * for the CSS property `transform` for the specific syntax to use in that case.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/transform)
   */
  transform?: Bindable<CSSProperties['transform']>,

  /**
   * The `transform-origin` SVG attribute sets the origin for an item's
   * transformations.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `text-rendering` also has a CSS property
   * counterpart: `text-rendering`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/transform-origin)
   */
  'transform-origin'?: Bindable<CSSProperties['transform-origin']>,

  /**
   * The `unicode-bidi` attribute specifies how the accumulation of
   * the background image is managed.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `unicode-bidi` also has a CSS property
   * counterpart: `unicode-bidi`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/unicode-bidi)
   */
  'unicode-bidi'?: Bindable<CSSProperties['unicode-bidi']>,

  /**
   * The `vector-effect` property specifies the vector effect to use when
   * drawing an object. Vector effects are applied before any of the other
   * compositing operations, i.e., filters, masks and clips.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `vector-effect` also has a CSS property
   * counterpart: `vector-effect`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/vector-effect)
   */
  'vector-effect'?: Bindable<CSSProperties['vector-effect']>,

  /**
   * The `visibility` attribute lets you control the visibility of graphical
   * elements. With a value of `hidden` or `collapse` the current graphics
   * element is invisible.
   *
   * > **_NOTE:_**
   * If the `visibility` attribute is set to `hidden` on a text element, then
   * the text is invisible but still takes up space in text layout calculations.
   *
   * Depending on the value of attribute `pointer-events`, graphics elements
   * which have their visibility attribute set to `hidden` still might receive
   * events.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `vector-effect` also has a CSS property
   * counterpart: `vector-effect`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/visibility)
   */
  'visibility'?: Bindable<CSSProperties['visibility']>,

  /**
   * The `word-spacing` attribute specifies spacing behavior between words.
   *
   * If a `<length>` is provided without a unit identifier (e.g., an unqualified
   * number such as 128), the browser processes the <length> as a width value in
   * the current user coordinate system.
   *
   * If a `<length>` is provided with one of the unit identifiers (e.g., .25em
   * or 1%), then the browser converts the <length> into a corresponding value
   * in the current user coordinate system.
   *
   * > **_NOTE:_**
   * As a presentation attribute, `word-spacing` also has a CSS property
   * counterpart: `word-spacing`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/word-spacing)
   */
  'word-spacing'?: Bindable<CSSProperties['word-spacing']>,

  /**
   * The `writing-mode` attribute specifies whether the initial
   * inline-progression-direction for a `<text>` element shall be left-to-right,
   * right-to-left, or top-to-bottom. The writing-mode attribute applies only
   * to `<text>` elements; the attribute is ignored for `<tspan>` and
   * `<textPath>` sub-elements. (Note that the inline-progression-direction
   * can change within a `<text>` element due to the Unicode bidirectional
   * algorithm and properties `direction` and `unicode-bidi`.)
   *
   * > **_NOTE:_**
   * As a presentation attribute, `writing-mode` also has a CSS property
   * counterpart: `writing-mode`.
   * When both are specified, the CSS property takes priority.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/writing-mode)
   */
  'writing-mode'?: Bindable<CSSProperties['writing-mode']>,
}
