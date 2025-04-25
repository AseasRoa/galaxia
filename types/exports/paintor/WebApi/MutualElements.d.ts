import {
  FormatArray,
  Reactive,
  StringConvertible,
  SVGChildren,
} from './common'
import {
  AnchorElementProps,
  ScriptElementProps,
  StyleElementProps,
} from './props/htmlElementProps'
import {
  aAttributes,
  scriptAttributes,
  styleAttributes,
  titleAttributes,
} from './attributes/svg'
import { Children } from './common'
import { HTMLElementProps } from './standard/HTMLElementProps'

export interface MutualElements {
  /**
   * Create custom HTML element
   */
  $element(
    tagName: string,
    props?: HTMLElementProps,
    ...children: (Children | string)[]
  ): HTMLElement;

  a: {
    /**
     * The `<a>` HTML element (or anchor element), with its `href` attribute,
     * creates a hyperlink to web pages, files, email addresses, locations in
     * the same page, or anything else a URL can address.
     *
     * Content within each `<a>` should indicate the link's destination.
     * If the `href` attribute is present, pressing the enter key while
     * focused on the `<a>` element will activate it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/a)
     */
    (): HTMLAnchorElement
    (formatArray: FormatArray, ...children: Children): HTMLAnchorElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLAnchorElement
    (props: AnchorElementProps, ...children: Children): HTMLAnchorElement
    (...children: Children): HTMLAnchorElement

    (): SVGAElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGAElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGAElement
    (props: aAttributes, ...children: SVGChildren): SVGAElement
    (...children: SVGChildren): SVGAElement
  };

  script: {
    /**
     * The `<script>` HTML element is used to embed executable code or data;
     * this is typically used to embed or refer to JavaScript code.
     * The `<script>` element can also be used with other languages, such as
     * WebGL's GLSL shader programming language and JSON.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/script)
     */
    (): HTMLScriptElement
    (formatArray: FormatArray, ...children: Children): HTMLScriptElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLScriptElement
    (props: ScriptElementProps, ...children: Children): HTMLScriptElement
    (
      props: ScriptElementProps,
      clientCode: () => void,
      ...children: Children[]
    ): HTMLScriptElement
    (...children: Children): HTMLScriptElement

    (): SVGScriptElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGScriptElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGScriptElement
    (props: scriptAttributes, ...children: SVGChildren): SVGScriptElement
    (
      props: scriptAttributes,
      clientCode: () => void,
      ...children: SVGChildren[]
    ): SVGScriptElement
    (...children: SVGChildren): SVGScriptElement
  };

  style: {
    /**
     * The `<style>` HTML element contains style information for a document,
     * or part of a document. It contains CSS, which is applied to the contents
     * of the document containing the `<style>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/style)
     */
    (): HTMLStyleElement
    (formatArray: FormatArray, ...children: Children): HTMLStyleElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLStyleElement
    (props: StyleElementProps, ...children: Children): HTMLStyleElement
    (...children: Children): HTMLStyleElement

    (): SVGStyleElement
    (formatArray: FormatArray, ...children: SVGChildren): SVGStyleElement
    (text: Reactive<StringConvertible>, ...children: SVGChildren): SVGStyleElement
    (props: styleAttributes, ...children: SVGChildren): SVGStyleElement
    (...children: SVGChildren): SVGStyleElement
  };

  title: {
    /**
     * The `<title>` HTML element defines the document's title that is shown in
     * a browser's title bar or a page's tab. It only contains text; tags within
     * the element are ignored.
     *
     * ###### Permitted content
     * Text that is not inter-element whitespace.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/title)
     */
    (): HTMLTitleElement
    (formatArray: FormatArray): HTMLTitleElement
    (text: Reactive<StringConvertible>): HTMLTitleElement

    /**
     * The `<title>` SVG element provides an accessible, short-text description
     * of any SVG container element or graphics element.
     *
     * Text in a `<title>` element is not rendered as part of the graphic, but
     * browsers usually display it as a tooltip. If an element can be described
     * by visible text, it is recommended to reference that text with
     * an `aria-labelledby` attribute rather than using the `<title>` element.
     *
     * > **_NOTE:_**
     * For backward compatibility with SVG 1.1, `<title>` elements should be
     * the first child element of their parent.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/SVG/Reference/Element/textPath)
     */
    (): SVGTitleElement
    (props: titleAttributes, ...children: SVGChildren): SVGTitleElement
    (...children: SVGChildren): SVGTitleElement
  };
}
