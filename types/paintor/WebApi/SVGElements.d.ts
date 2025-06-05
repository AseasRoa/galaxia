import {
  FormatArray,
  Reactive,
  StringConvertible,
  SVGChildren
} from './common'
import { SVGElementProps } from './standard/SVGElementProps'
import {
  animateAttributes,
  animateMotionAttributes,
  animateTransformAttributes,
  circleAttributes,
  clipPathAttributes,
  defsAttributes,
  descAttributes, discardAttributes,
  ellipseAttributes,
  feBlendAttributes,
  feColorMatrixAttributes,
  feComponentTransferAttributes,
  feCompositeAttributes,
  feConvolveMatrixAttributes,
  feDiffuseLightingAttributes,
  feDisplacementMapAttributes,
  feDistantLightAttributes,
  feDropShadowAttributes,
  feFloodAttributes,
  feFuncAAttributes,
  feFuncBAttributes,
  feFuncGAttributes,
  feFuncRAttributes,
  feGaussianBlurAttributes,
  feImageAttributes,
  feMergeAttributes,
  feMergeNodeAttributes,
  feMorphologyAttributes,
  feOffsetAttributes,
  fePointLightAttributes,
  feSpecularLightingAttributes,
  feSpotLightAttributes,
  feTileAttributes,
  feTurbulenceAttributes,
  filterAttributes,
  foreignObjectAttributes,
  gAttributes,
  imageAttributes,
  linearGradientAttributes, lineAttributes,
  markerAttributes,
  maskAttributes,
  metadataAttributes,
  mpathAttributes,
  pathAttributes,
  patternAttributes,
  polygonAttributes,
  polylineAttributes,
  radialGradientAttributes,
  rectAttributes,
  setAttributes,
  stopAttributes,
  svgAttributes, switchAttributes, symbolAttributes,
  textAttributes,
  textPathAttributes,
  tspanAttributes,
  useAttributes,
  viewAttributes
} from './attributes/svg'

export interface SVGElements {
  animate: {
    /**
     * The `<animate>` SVG element provides a way to animate
     * an attribute of an element over time.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/animate)
     */
    (props: animateAttributes): SVGAnimateElement
  };

  animateMotion: {
    /**
     * The `<animateMotion>` SVG element provides a way to define how an element
     * moves along a motion path.
     *
     * > **_NOTE:_**
     * To reuse an existing path, it will be necessary to use an `<mpath>`
     * element inside the `<animateMotion>` element instead of the path attribute.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/animateMotion)
     */
    (): SVGAnimateMotionElement
    (props: animateMotionAttributes, ...children: SVGChildren): SVGAnimateMotionElement
    (...children: SVGChildren): SVGAnimateMotionElement
  };

  animateTransform: {
    /**
     * The `<animateMotion>` SVG element provides a way to define how an element
     * moves along a motion path.
     *
     * > **_NOTE:_**
     * To reuse an existing path, it will be necessary to use an `<mpath>`
     * element inside the `<animateMotion>` element instead of the path attribute.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/animateTransform)
     */
    (props: animateTransformAttributes): SVGAnimateTransformElement
  };

  circle: {
    /**
     * The `<circle>` SVG element is an SVG basic shape, used to draw circles
     * based on a center point and a radius.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/circle)
     */
    (): SVGCircleElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGCircleElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGCircleElement
    (props: circleAttributes, ...children: SVGChildren): SVGCircleElement
    (...children: SVGChildren): SVGCircleElement
  };

  clipPath: {
    /**
     * The `<clipPath>` SVG element defines a clipping path,
     * to be used by the `clip-path` property.
     *
     * A clipping path restricts the region to which paint can be applied.
     * Conceptually, parts of the drawing that lie outside the region
     * bounded by the clipping path are not drawn.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/clipPath)
     */
    (): SVGClipPathElement
    (props: clipPathAttributes, ...children: SVGChildren): SVGClipPathElement
    (...children: SVGChildren): SVGClipPathElement
  };

  defs: {
    /**
     * The `<defs>` SVG element is used to store graphical objects that will
     * be used at a later time. Objects created inside a `<defs>` element are
     * not rendered directly. To display them you have to reference them
     * (with a `<use>` element for example).
     *
     * Graphical objects can be referenced from anywhere, however, defining
     * these objects inside a `<defs> `element promotes understandability
     * of the SVG content and is beneficial to the overall accessibility
     * of the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/defs)
     */
    (): SVGDefsElement
    (props: defsAttributes, ...children: SVGChildren): SVGDefsElement
    (...children: SVGChildren): SVGDefsElement
  };

  desc: {
    /**
     * The `<desc>` SVG element provides an accessible, long-text description
     * of any SVG container element or graphics element.
     *
     * Text in a `<desc>` element is not rendered as part of the graphic.
     * If the element can be described by visible text, it is possible
     * to reference that text with the `aria-describedby` attribute.
     * If `aria-describedby` is used, it will take precedence over `<desc>`.
     *
     * The hidden text of a `<desc>` element can also be concatenated with
     * the visible text of other elements using multiple IDs in an
     * `aria-describedby` value. In that case, the `<desc>` element
     * must provide an ID for reference.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/desc)
     */
    (): SVGDescElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGDescElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGDescElement
    (props: descAttributes, ...children: SVGChildren): SVGDescElement
    (...children: SVGChildren): SVGDescElement
  };

  discard: {
    /**
     * The `<discard>` SVG element may be used to specify the time at which
     * a particular element should be removed from the DOM. This allows
     * an SVG viewer to conserve memory by discarding elements that
     * are no longer needed, such as animated elements that have completed.
     *
     * The operation removes the target element and all its children,
     * and then the `<discard>` element itself (this happens even
     * if the target element was invalid).
     *
     * The `begin` attribute is used to specify the trigger point at which
     * the `<discard>` element becomes active and its associated element
     * is discarded. The target element that is to be removed from
     * the DOM is specified using the `href` attribute. If not specified,
     * the immediate parent of the `<discard>` element is the target.
     *
     * `<discard>` may be used in all the same places as the `<animate>`
     * element. Authors should set the `playbackorder` attribute
     * to `forwardonly` when using this element, as elements
     * are not re-added if the user seeks backwards in the timeline.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/discard)
     */
    (): SVGAnimationElement
    (props: discardAttributes, ...children: SVGChildren): SVGAnimationElement
    (...children: SVGChildren): SVGAnimationElement
  };

  ellipse: {
    /**
     * The `<ellipse>` SVG element is an SVG basic shape, used to create
     * ellipses based on a center coordinate, and both their x and y radius.
     *
     * > **_NOTE:_**
     * Ellipses are unable to specify the exact orientation of the ellipse
     * (if, for example, you wanted to draw an ellipse tilted at a 45 degree
     * angle), but it can be rotated by using the `transform` attribute.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/ellipse)
     */
    (): SVGEllipseElement
    (props: ellipseAttributes, ...children: SVGChildren): SVGEllipseElement
    (...children: SVGChildren): SVGEllipseElement
  };

  feBlend: {
    /**
     * The `<feBlend>` SVG filter primitive composes two objects together ruled
     * by a certain blending mode. This is similar to what is known from image
     * editing software when blending two layers. The mode is defined by the
     * `mode` attribute.
     *
     * Like other filter primitives, it handles color components in the
     * `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feBlend)
     */
    (): SVGFEBlendElement
    (props: feBlendAttributes, ...children: SVGChildren): SVGFEBlendElement
    (...children: SVGChildren): SVGFEBlendElement
  };

  feColorMatrix: {
    /**
     * The `<feColorMatrix>` SVG filter element changes colors based on
     * a transformation matrix. Every pixel's color value `[R,G,B,A]` is matrix
     * multiplied by a 5 by 5 color matrix to create new color `[R',G',B',A']`.
     *
     * > **_NOTE:_**
     * The prime symbol `'` is used in mathematics indicate the result of
     * a transformation.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feColorMatrix)
     */
    (): SVGFEColorMatrixElement
    (props: feColorMatrixAttributes, ...children: SVGChildren): SVGFEColorMatrixElement
    (...children: SVGChildren): SVGFEColorMatrixElement
  };

  feComponentTransfer: {
    /**
     * The `<feComponentTransfer>` SVG filter primitive performs
     * color-component-wise remapping of data for each pixel.
     * It allows operations like brightness adjustment,
     * contrast adjustment, color balance or thresholding.
     *
     * The calculations are performed on non-premultiplied color values.
     * The colors are modified by changing each channel (R, G, B, and A)
     * to the result of what the children `<feFuncR>`, `<feFuncB>`, `<feFuncG>`,
     * and `<feFuncA>` return. If more than one of the same element is provided,
     * the last one specified is used, and if no element is supplied to modify
     * one of the channels, the effect is the same is if an identity
     * transformation had been given for that channel.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use `sRGB` instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feComponentTransfer)
     */
    (): SVGFEComponentTransferElement
    (props: feComponentTransferAttributes, ...children: SVGChildren): SVGFEComponentTransferElement
    (...children: SVGChildren): SVGFEComponentTransferElement
  };

  feComposite: {
    /**
     * The `<feComposite>` SVG filter primitive performs the combination of two
     * input images pixel-wise in image space using one of the Porter-Duff
     * compositing operations: `over`, `in`, `atop`, `out`, `xor`, `lighter`,
     * or `arithmetic`.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feComposite)
     */
    (): SVGFECompositeElement
    (props: feCompositeAttributes, ...children: SVGChildren): SVGFECompositeElement
    (...children: SVGChildren): SVGFECompositeElement
  };

  feConvolveMatrix: {
    /**
     * The `<feConvolveMatrix>` SVG filter primitive applies a matrix
     * convolution filter effect. A convolution combines pixels in the input
     * image with neighboring pixels to produce a resulting image.
     * A wide variety of imaging operations can be achieved through
     * convolutions, including blurring, edge detection, sharpening,
     * embossing and beveling.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feConvolveMatrix)
     */
    (): SVGFEConvolveMatrixElement
    (props: feConvolveMatrixAttributes, ...children: SVGChildren): SVGFEConvolveMatrixElement
    (...children: SVGChildren): SVGFEConvolveMatrixElement
  };

  feDiffuseLighting: {
    /**
     * The `<feDiffuseLighting>` SVG filter primitive lights an image using
     * the alpha channel as a bump map. The resulting image, which is an RGBA
     * opaque image, depends on the light color, light position and surface
     * geometry of the input bump map.
     *
     * The light map produced by this filter primitive can be combined with
     * a texture image using the multiply term of the `arithmetic` operator
     * of the `<feComposite>` filter primitive. Multiple light sources can
     * be simulated by adding several of these light maps together before
     * applying it to the texture image.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDiffuseLighting)
     */
    (props: feDiffuseLightingAttributes, ...children: SVGChildren): SVGFEDiffuseLightingElement
    (...children: SVGChildren): SVGFEDiffuseLightingElement
  };

  feDisplacementMap: {
    /**
     * The `<feDisplacementMap>` SVG filter primitive uses the pixel values
     * from the image from in2 to spatially displace the image from `in`.
     *
     * The formula for the transformation looks like this:
     *
     * `P'(x,y) ← P(x + scale * (XC(x,y) - 0.5), y + scale * (YC(x,y) - 0.5))`
     *
     * where `P(x,y)` is the input image, `in`, and `P'(x,y)` is
     * the destination. `XC(x,y)` and `YC(x,y)` are the component
     * values of the channel designated by `xChannelSelector` and `yChannelSelector`.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDisplacementMap)
     */
    (): SVGFEDisplacementMapElement
    (props: feDisplacementMapAttributes, ...children: SVGChildren): SVGFEDisplacementMapElement
    (...children: SVGChildren): SVGFEDisplacementMapElement
  };

  feDistantLight: {
    /**
     * The `<feDistantLight>` SVG filter primitive defines a distant light
     * source that can be used within a lighting filter primitive:
     * `<feDiffuseLighting>` or `<feSpecularLighting>`.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDistantLight)
     */
    (): SVGFEDistantLightElement
    (props: feDistantLightAttributes, ...children: SVGChildren): SVGFEDistantLightElement
    (...children: SVGChildren): SVGFEDistantLightElement
  };

  feDropShadow: {
    /**
     * The `<feDropShadow>` SVG filter primitive creates a drop shadow of
     * the input image. It can only be used inside a `<filter>` element.
     *
     * > **_NOTE:_**
     * The drop shadow color and opacity can be changed by using
     * the `flood-color` and `flood-opacity` presentation attributes.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feDropShadow)
     */
    (): SVGFEDropShadowElement
    (props: feDropShadowAttributes, ...children: SVGChildren): SVGFEDropShadowElement
    (...children: SVGChildren): SVGFEDropShadowElement
  };

  feFlood: {
    /**
     * The `<feFlood>` SVG filter primitive fills the filter subregion with
     * the color and opacity defined by `flood-color` and `flood-opacity`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feFlood)
     */
    (): SVGFEFloodElement
    (props: feFloodAttributes, ...children: SVGChildren): SVGFEFloodElement
    (...children: SVGChildren): SVGFEFloodElement
  };

  feFuncA: {
    /**
     * The `<feFuncA>` SVG filter primitive defines the transfer function for
     * the alpha component of the input graphic of its parent
     * `<feComponentTransfer>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feFuncA)
     */
    (): SVGFEFuncAElement
    (props: feFuncAAttributes, ...children: SVGChildren): SVGFEFuncAElement
    (...children: SVGChildren): SVGFEFuncAElement
  };

  feFuncB: {
    /**
     * The `<feFuncB>` SVG filter primitive defines the transfer function for
     * the blue component of the input graphic of its parent
     * `<feComponentTransfer>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feFuncB)
     */
    (): SVGFEFuncBElement
    (props: feFuncBAttributes, ...children: SVGChildren): SVGFEFuncBElement
    (...children: SVGChildren): SVGFEFuncBElement
  };

  feFuncG: {
    /**
     * The `<feFuncG>` SVG filter primitive defines the transfer function for
     * the green component of the input graphic of its parent
     * `<feComponentTransfer>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feFuncG)
     */
    (): SVGFEFuncGElement
    (props: feFuncGAttributes, ...children: SVGChildren): SVGFEFuncGElement
    (...children: SVGChildren): SVGFEFuncGElement
  };

  feFuncR: {
    /**
     * The `<feFuncR>` SVG filter primitive defines the transfer function for
     * the red component of the input graphic of its parent
     * `<feComponentTransfer>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feFuncR)
     */
    (): SVGFEFuncRElement
    (props: feFuncRAttributes, ...children: SVGChildren): SVGFEFuncRElement
    (...children: SVGChildren): SVGFEFuncRElement
  };

  feGaussianBlur: {
    /**
     * The `<feGaussianBlur>` SVG filter primitive blurs the input image by
     * the amount specified in `stdDeviation`, which defines the bell-curve.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feGaussianBlur)
     */
    (): SVGFEGaussianBlurElement
    (props: feGaussianBlurAttributes, ...children: SVGChildren): SVGFEGaussianBlurElement
    (...children: SVGChildren): SVGFEGaussianBlurElement
  };

  feImage: {
    /**
     * The `<feImage>` SVG filter primitive fetches image data from an external
     * source and provides the pixel data as output (meaning if the external
     * source is an SVG image, it is rasterized.)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feImage)
     */
    (): SVGFEImageElement
    (props: feImageAttributes, ...children: SVGChildren): SVGFEImageElement
    (...children: SVGChildren): SVGFEImageElement
  };

  feMerge: {
    /**
     * The `<feMerge>` SVG element allows filter effects to be applied
     * concurrently instead of sequentially. This is achieved by other filters
     * storing their output via the result attribute and then accessing it in
     * a `<feMergeNode>` child.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feMerge)
     */
    (): SVGFEMergeElement
    (props: feMergeAttributes, ...children: SVGFEMergeNodeElement[]): SVGFEMergeElement
    (...children: SVGFEMergeNodeElement[]): SVGFEMergeElement
  };

  feMergeNode: {
    /**
     * The `<feMergeNode>` SVG takes the result of another filter to be
     * processed by its parent `<feMerge>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feMergeNode)
     */
    (): SVGFEMergeNodeElement
    (props: feMergeNodeAttributes, ...children: SVGChildren): SVGFEMergeNodeElement
    (...children: SVGChildren): SVGFEMergeNodeElement
  };

  feMorphology: {
    /**
     * The `<feMorphology>` SVG filter primitive is used to erode or dilate
     * the input image. Its usefulness lies especially in fattening or thinning effects.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feMorphology)
     */
    (): SVGFEMorphologyElement
    (props: feMorphologyAttributes, ...children: SVGChildren): SVGFEMorphologyElement
    (...children: SVGChildren): SVGFEMorphologyElement
  };

  feOffset: {
    /**
     * The `<feOffset>` SVG filter primitive enables offsetting an input image
     * relative to its current position. The input image as a whole is offset
     * by the values specified in the `dx` and `dy` attributes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feOffset)
     */
    (): SVGFEOffsetElement
    (props: feOffsetAttributes, ...children: SVGChildren): SVGFEOffsetElement
    (...children: SVGChildren): SVGFEOffsetElement
  };

  fePointLight: {
    /**
     * The `<fePointLight>` SVG filter primitive defines a light source which
     * allows to create a point light effect. It that can be used within
     * a lighting filter primitive:
     * `<feDiffuseLighting>` or `<feSpecularLighting>`.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/fePointLight)
     */
    (): SVGFEPointLightElement
    (props: fePointLightAttributes, ...children: SVGChildren): SVGFEPointLightElement
    (...children: SVGChildren): SVGFEPointLightElement
  };

  feSpecularLighting: {
    /**
     * The `<feSpecularLighting>` SVG filter primitive lights a source graphic
     * using the alpha channel as a bump map. The resulting image is an RGBA
     * image based on the light color. The lighting calculation follows
     * the standard specular component of the Phong lighting model.
     * The resulting image depends on the light color, light position
     * and surface geometry of the input bump map. The result of the lighting
     * calculation is added. The filter primitive assumes that the viewer is
     * at infinity in the z direction.
     *
     * This filter primitive produces an image which contains the specular
     * reflection part of the lighting calculation. Such a map is intended
     * to be combined with a texture using the add term of the arithmetic
     * `<feComposite>` method. Multiple light sources can be simulated by
     * adding several of these light maps before applying it to the texture
     * image.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feSpecularLighting)
     */
    (props: feSpecularLightingAttributes, ...children: SVGChildren): SVGFESpecularLightingElement
    (...children: SVGChildren): SVGFESpecularLightingElement
  };

  feSpotLight: {
    /**
     * The `<feSpotLight>` SVG filter primitive defines a light source that can
     * be used to create a spotlight effect. It is used within a lighting filter
     * primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feSpotLight)
     */
    (): SVGFESpotLightElement
    (props: feSpotLightAttributes, ...children: SVGChildren): SVGFESpotLightElement
    (...children: SVGChildren): SVGFESpotLightElement
  };

  feTile: {
    /**
     * The `<feTile>` SVG filter primitive allows to fill a target rectangle
     * with a repeated, tiled pattern of an input image. The effect is similar
     * to the one of a `<pattern>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feTile)
     */
    (): SVGFETileElement
    (props: feTileAttributes, ...children: SVGChildren): SVGFETileElement
    (...children: SVGChildren): SVGFETileElement
  };

  feTurbulence: {
    /**
     * The `<feTurbulence>` SVG filter primitive creates an image using
     * the Perlin turbulence function. It allows the synthesis of artificial
     * textures like clouds or marble. The resulting image will fill the entire
     * filter primitive subregion.
     *
     * Like other filter primitives, it handles color components in
     * the `linearRGB` color space by default.
     * You can use `color-interpolation-filters` to use sRGB instead.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/feTurbulence)
     */
    (): SVGFETurbulenceElement
    (props: feTurbulenceAttributes, ...children: SVGChildren): SVGFETurbulenceElement
    (...children: SVGChildren): SVGFETurbulenceElement
  };

  filter: {
    /**
     * The `<filter>` SVG element defines a custom filter effect by grouping
     * atomic filter primitives. It is never rendered itself, but must be used
     * by the `filter` attribute on SVG elements, or the `filter` CSS property for
     * SVG/HTML elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/filter)
     */
    (): SVGFilterElement
    (props: filterAttributes, ...children: SVGChildren): SVGFilterElement
    (...children: SVGChildren): SVGFilterElement
  };

  foreignObject: {
    /**
     * The `<foreignObject>` SVG element includes elements from a different
     * XML namespace. In the context of a browser, it is most likely (X)HTML.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/foreignObject)
     */
    (): SVGForeignObjectElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGForeignObjectElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGForeignObjectElement
    (props: foreignObjectAttributes, ...children: SVGChildren): SVGForeignObjectElement
    (...children: SVGChildren): SVGForeignObjectElement
  };

  g: {
    /**
     * The `<g>` SVG element is a container used to group other SVG elements.
     *
     * Transformations applied to the `<g>` element are performed on its child
     * elements, and its attributes are inherited by its children. It can also
     * group multiple elements to be referenced later with the `<use>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/g)
     */
    (): SVGGElement
    (props: gAttributes, ...children: SVGChildren): SVGGElement
    (...children: SVGChildren): SVGGElement
  };

  image: {
    /**
     * The `<image>` SVG element includes images inside SVG documents.
     * It can display raster image files or other SVG files.
     *
     * The only image formats SVG software must support are JPEG, PNG,
     * and other SVG files. Animated GIF behavior is undefined.
     *
     * SVG files displayed with `<image>` are treated as an image: external
     * resources aren't loaded, :visited styles aren't applied, and they
     * cannot be interactive. To include dynamic SVG elements, try `<use>`
     * with an external URL. To include SVG files and run scripts inside them,
     * try `<object>` inside `<foreignObject>`.
     *
     * > **_NOTE:_**
     * The HTML spec defines `<image>` as a synonym for `<img>` while parsing
     * HTML. This specific element and its behavior only apply inside SVG
     * documents or inline SVGs.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/image)
     */
    (): SVGImageElement
    (props: imageAttributes, ...children: SVGChildren): SVGImageElement
    (...children: SVGChildren): SVGImageElement
  };

  line: {
    /**
     * The `<line>` SVG element is an SVG basic shape used to create a line
     * connecting two points.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/line)
     */
    (): SVGLineElement
    (props: lineAttributes, ...children: SVGChildren): SVGLineElement
    (...children: SVGChildren): SVGLineElement
  };

  linearGradient: {
    /**
     * The `<linearGradient>` SVG element lets authors define linear gradients
     * to apply to other SVG elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/linearGradient)
     */
    (): SVGLinearGradientElement
    (props: linearGradientAttributes, ...children: SVGChildren): SVGLinearGradientElement
    (...children: SVGChildren): SVGLinearGradientElement
  };

  marker: {
    /**
     * The `<marker>` SVG element defines a graphic used for drawing arrowheads
     * or polymarkers on a given `<path>`, `<line>`, `<polyline>` or `<polygon>`
     * element.
     *
     * Markers can be attached to shapes using the `marker-start`, `marker-mid`,
     * and `marker-end` properties.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/marker)
     */
    (): SVGMarkerElement
    (props: markerAttributes, ...children: SVGChildren): SVGMarkerElement
    (...children: SVGChildren): SVGMarkerElement
  };

  mask: {
    /**
     * The `<mask>` SVG element defines an alpha mask for compositing
     * the current object into the background. A mask is used/referenced
     * using the `mask` property.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/mask)
     */
    (): SVGMaskElement
    (props: maskAttributes, ...children: SVGChildren): SVGMaskElement
    (...children: SVGChildren): SVGMaskElement
  };

  metadata: {
    /**
     * The `<metadata>` SVG element adds metadata to SVG content. Metadata is
     * structured information about data. The contents of `<metadata>` should
     * be elements from other XML namespaces such as RDF, FOAF, etc.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/metadata)
     */
    (): SVGMetadataElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGMetadataElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGMetadataElement
    (props: metadataAttributes, ...children: SVGChildren): SVGMetadataElement
    (...children: SVGChildren): SVGMetadataElement
  };

  mpath: {
    /**
     * The `<mpath>` SVG sub-element for the <animateMotion> element provides
     * the ability to reference an external `<path>` element as the definition
     * of a motion path.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/mpath)
     */
    (): SVGMPathElement
    (props: mpathAttributes, ...children: SVGChildren): SVGMPathElement
    (...children: SVGChildren): SVGMPathElement
  };

  path: {
    /**
     * The `<path>` SVG element is the generic element to define a shape.
     * All the basic shapes can be created with a path element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/path)
     */
    (): SVGPathElement
    (props: pathAttributes, ...children: SVGChildren): SVGPathElement
    (...children: SVGChildren): SVGPathElement
  };

  pattern: {
    /**
     * The `<pattern>` SVG element defines a graphics object which can be
     * redrawn at repeated x- and y-coordinate intervals ("tiled") to cover
     * an area.
     *
     * The `<pattern>` is referenced by the `fill` and/or `stroke` attributes
     * on other graphics elements to fill or stroke those elements with
     * the referenced pattern.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/pattern)
     */
    (): SVGPatternElement
    (props: patternAttributes, ...children: SVGChildren): SVGPatternElement
    (...children: SVGChildren): SVGPatternElement
  };

  polygon: {
    /**
     * The `<polygon>` SVG element defines a closed shape consisting of a set
     * of connected straight line segments. The last point is connected to
     * the first point.
     *
     * For open shapes, see the `<polyline>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/polygon)
     */
    (): SVGPolygonElement
    (props: polygonAttributes, ...children: SVGChildren): SVGPolygonElement
    (...children: SVGChildren): SVGPolygonElement
  };

  polyline: {
    /**
     * The `<polyline>` SVG element is an SVG basic shape that creates straight
     * lines connecting several points. Typically, a polyline is used to create
     * open shapes as the last point doesn't have to be connected to the first
     * point. For closed shapes see the `<polygon>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/polyline)
     */
    (): SVGPolylineElement
    (props: polylineAttributes, ...children: SVGChildren): SVGPolylineElement
    (...children: SVGChildren): SVGPolylineElement
  };

  radialGradient: {
    /**
     * The `<radialGradient>` SVG element lets authors define radial gradients
     * that can be applied to fill or stroke of graphical elements.
     *
     * > **_NOTE:_**
     * Don't be confused with CSS `radial-gradient()` as CSS gradients can only
     * apply to HTML elements where SVG gradient can only apply to SVG elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/radialGradient)
     */
    (): SVGRadialGradientElement
    (props: radialGradientAttributes, ...children: SVGChildren): SVGRadialGradientElement
    (...children: SVGChildren): SVGRadialGradientElement
  };

  rect: {
    /**
     * The `<rect>` SVG element is a basic SVG shape that draws rectangles,
     * defined by their position, width, and height. The rectangles may have
     * their corners rounded.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/rect)
     */
    (): SVGRectElement
    (props: rectAttributes, ...children: SVGChildren): SVGRectElement
    (...children: SVGChildren): SVGRectElement
  };

  set: {
    /**
     * The `<set>` SVG element provides a method of setting the value of
     * an attribute for a specified duration.
     *
     * It supports all attribute types, including those that cannot reasonably
     * be interpolated, such as string and boolean values. For attributes that
     * can be reasonably be interpolated, the `<animate>` is usually preferred.
     *
     * > **_NOTE:_**
     * The `<set>` element is non-additive. The `additive` and `accumulate`
     * attributes are not allowed, and will be ignored if specified.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/set)
     */
    (): SVGSetElement
    (props: setAttributes, ...children: SVGChildren): SVGSetElement
    (...children: SVGChildren): SVGSetElement
  };

  stop: {
    /**
     * The `<stop>` SVG element defines a color and its position to use on
     * a gradient. This element is always a child of a `<linearGradient>`
     * or `<radialGradient>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/stop)
     */
    (): SVGStopElement
    (props: stopAttributes, ...children: SVGChildren): SVGStopElement
    (...children: SVGChildren): SVGStopElement
  };

  svg: {
    /**
     * SVG drawings and images are created using a wide array
     * of elements which are dedicated to the construction,
     * drawing, and layout of vector images and diagrams.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Element)
     */
    (): SVGElement
    (props: svgAttributes & SVGElementProps, ...children: SVGChildren): SVGElement
    (...children: SVGChildren): SVGElement
  };

  switch: {
    /**
     * The `<switch>` SVG element evaluates any `requiredFeatures`,
     * `requiredExtensions` and `systemLanguage` attributes on its direct child
     * elements in order, and then renders the first child where these
     * attributes evaluate to true.
     *
     * Other direct children will be bypassed and therefore not rendered.
     * If a child element is a container element, like `<g>`, then its subtree
     * is also processed/rendered or bypassed/not rendered.
     *
     * > **_NOTE:_**
     * The `display` and `visibility` properties have no effect on `<switch>`
     * element processing. In particular, setting `display:none` on a child
     * has no effect on the true/false testing for `<switch>` processing.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/switch)
     */
    (): SVGSwitchElement
    (props: switchAttributes, ...children: SVGChildren): SVGSwitchElement
    (...children: SVGChildren): SVGSwitchElement
  };

  symbol: {
    /**
     * The `<symbol>` SVG element is used to define graphical template objects
     * which can be instantiated by a `<use>` element.
     *
     * The use of `<symbol>` elements for graphics that are used multiple times
     * in the same document adds structure and semantics. Documents that are
     * rich in structure may be rendered graphically, as speech, or as Braille,
     * and thus promote accessibility.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/symbol)
     */
    (): SVGSymbolElement
    (props: symbolAttributes, ...children: SVGChildren): SVGSymbolElement
    (...children: SVGChildren): SVGSymbolElement
  };

  text: {
    /**
     * The `<text>` SVG element draws a graphics element consisting of text.
     * It's possible to apply a gradient, pattern, clipping path, mask,
     * or filter to `<text>`, like any other SVG graphics element.
     *
     * If text is included in SVG not inside a `<text>` element, it is not
     * rendered. This is different than being hidden by default, as setting
     * the `display` property won't show the text.
     *
     * > **_NOTE:_**
     * The `<text>` element does not wrap by default, to make this happen it
     * needs to be styled with the `white-space` CSS property.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/text)
     */
    (): SVGTextElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGTextElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGTextElement
    (props: textAttributes, ...children: SVGChildren): SVGTextElement
    (...children: SVGChildren): SVGTextElement
  };

  textPath: {
    /**
     * The `<textPath>` SVG element is used to render text along the shape
     * of a `<path>` element. The text must be enclosed in the `<textPath>`
     * element and its `href` attribute is used to reference the desired
     * `<path>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
     */
    (): SVGTextPathElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGTextPathElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGTextPathElement
    (props: textPathAttributes, ...children: SVGChildren): SVGTextPathElement
    (...children: SVGChildren): SVGTextPathElement
  };

  tspan: {
    /**
     * The `<tspan>` SVG element defines a subtext within a `<text>` element
     * or another `<tspan>` element. It allows for adjustment of the style
     * and/or position of that subtext as needed.
     *
     * > **_NOTE:_**
     * The `<tspan>` element does not wrap by default, to make this happen it
     * needs to be styled with the `white-space` CSS property.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/tspan)
     */
    (): SVGTSpanElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGTSpanElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGTSpanElement
    (props: tspanAttributes, ...children: SVGChildren): SVGTSpanElement
    (...children: SVGChildren): SVGTSpanElement
  };

  use: {
    /**
     * The `<use>` element takes nodes from within the SVG document, and
     * duplicates them somewhere else. The effect is the same as if the nodes
     * were deeply cloned into a non-exposed DOM, then pasted where the `use`
     * element is, much like cloned template elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/use)
     */
    (): SVGUseElement
    (props: useAttributes, ...children: SVGChildren): SVGUseElement
    (...children: SVGChildren): SVGUseElement
  };

  view: {
    /**
     * The `<view>` SVG element defines a particular view of an SVG document.
     * A specific view can be displayed by referencing the `<view>` element's `id`
     * as the target fragment of a URL.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/view)
     */
    (): SVGViewElement
    (props: viewAttributes, ...children: SVGChildren): SVGViewElement
    (...children: SVGChildren): SVGViewElement
  };
}
