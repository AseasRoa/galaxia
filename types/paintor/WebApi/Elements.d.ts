import { Children, FormatArray, Reactive, StringConvertible } from './common'
import {
  AreaElementProps,
  AudioElementProps,
  BaseElementProps,
  BdoElementProps,
  BlockquoteElementProps,
  ButtonElementProps,
  CanvasElementProps,
  ColElementProps,
  ColgroupElementProps,
  DataElementProps,
  DelElementProps,
  DetailsElementProps,
  DialogElementProps,
  EmbedElementProps,
  FencedFrameProps,
  FieldSetElementProps,
  FormElementProps,
  IFrameElementProps,
  ImageElementProps,
  InputElementProps,
  InsElementProps,
  LabelElementProps,
  LiElementProps,
  LinkElementProps,
  MapElementProps,
  MetaElementProps,
  MeterElementProps,
  ObjectElementProps,
  OlElementProps,
  OptgroupElementProps,
  OptionElementProps,
  OutputElementProps,
  ProgressElementProps,
  QElementProps,
  SelectElementProps,
  SlotElementProps,
  SourceElementProps,
  TdElementProps,
  TextAreaElementProps,
  ThElementProps,
  TimeElementProps,
  TrackElementProps,
  VideoElementProps,
} from './props/htmlElementProps'
import { HTMLElementProps } from './standard/HTMLElementProps'

export interface Elements {
  abbr: {
    /**
     * The `<abbr>` HTML element represents an abbreviation or acronym.
     *
     * When including an abbreviation or acronym, provide a full expansion
     * of the term in plain text on first use, along with the `<abbr>` to
     * mark up the abbreviation. This informs the user what the abbreviation
     * or acronym means.
     *
     * The optional `title` attribute can provide an expansion for the
     * abbreviation or acronym when a full expansion is not present.
     * This provides a hint to user agents on how to announce/display
     * the content while informing all users what the abbreviation means.
     * If present, `title` must contain this full description and nothing else.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/abbr)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  address: {
    /**
     * The `<address>` HTML element indicates that the enclosed HTML provides
     * contact information for a person or people, or for an organization.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/address)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  area: {
    /**
     * The `<area>` HTML element defines an area inside an image map that has
     * predefined clickable areas. An image map allows geometric areas on an
     * image to be associated with hypertext links.
     *
     * This element is used only within a `<map>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/area)
     */
    (props: AreaElementProps): HTMLAreaElement
  };

  article: {
    /**
     * The `<article>` HTML element represents a self-contained composition
     * in a document, page, application, or site, which is intended to be
     * independently distributable or reusable (e.g., in syndication).
     * Examples include: a forum post, a magazine or newspaper article,
     * or a blog entry, a product card, a user-submitted comment,
     * an interactive widget or gadget, or any other independent
     * item of content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/article)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  aside: {
    /**
     * The `<aside>` HTML element represents a portion of a document whose
     * content is only indirectly related to the document's main content.
     * Asides are frequently presented as sidebars or call-out boxes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/aside)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  audio: {
    /**
     * The `<audio>` HTML element is used to embed sound content in documents.
     * It may contain one or more audio sources, represented using the `src`
     * attribute or the `<source>` element: the browser will choose the most
     * suitable one. It can also be the destination for streamed media,
     * using a `MediaStream`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/audio)
     */
    (): HTMLAudioElement
    (formatArray: FormatArray, ...children: Children): HTMLAudioElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLAudioElement
    (props: AudioElementProps, ...children: Children): HTMLAudioElement
    (...children: Children): HTMLAudioElement
  };

  b: {
    /**
     * The `<b>` HTML element is used to draw the reader's attention
     * to the element's contents, which are not otherwise granted special
     * importance. This was formerly known as the Boldface element,
     * and most browsers still draw the text in boldface. However,
     * you should not use `<b>` for styling text or granting importance.
     * If you wish to create boldface text, you should use the CSS
     * `font-weight` property. If you wish to indicate an element
     * is of special importance, you should use the `<strong>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/b)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  base: {
    /**
     * The `<base>` HTML element specifies the base URL to use for all relative
     * URLs in a document. There can be only one `<base>` element in a document.
     *
     * A document's used base URL can be accessed by scripts with
     * `Node.baseURI`. If the document has no `<base>` elements,
     * then `baseURI` defaults to `location.href`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/base)
     */
    (props: BaseElementProps): HTMLBaseElement
  };

  bdi: {
    /**
     * The `<bdi>` HTML element tells the browser's bidirectional algorithm to
     * treat the text it contains in isolation from its surrounding text.
     * It's particularly useful when a website dynamically inserts some
     * text and doesn't know the directionality of the text being inserted.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/bdi)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  bdo: {
    /**
     * The `<bdo>` HTML element overrides the current directionality of text,
     * so that the text within is rendered in a different direction.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/bdo)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: BdoElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  blockquote: {
    /**
     * The `<blockquote>` HTML element indicates that the enclosed text
     * is an extended quotation. Usually, this is rendered visually by
     * indentation. A URL for the source of the quotation may be given
     * using the `cite` attribute, while a text representation of the
     * source can be given using the `<cite>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/blockquote)
     */
    (): HTMLQuoteElement
    (formatArray: FormatArray, ...children: Children): HTMLQuoteElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLQuoteElement
    (props: BlockquoteElementProps, ...children: Children): HTMLQuoteElement
    (...children: Children): HTMLQuoteElement
  };

  body: {
    /**
     * The `<body>` HTML element represents the content of an HTML document.
     * There can be only one `<body>` element in a document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/body)
     */
    (): HTMLBodyElement
    (formatArray: FormatArray, ...children: Children): HTMLBodyElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLBodyElement
    (props: HTMLElementProps, ...children: Children): HTMLBodyElement
    (...children: Children): HTMLBodyElement
  };

  br: {
    /**
     * The `<br>` HTML element produces a line break in text (carriage-return).
     * It is useful for writing a poem or an address, where the division of
     * lines is significant.
     *
     * > **_NOTE:_**
     * Do not use `<br>` to create margins between paragraphs; wrap them in
     * `<p>` elements and use the CSS `margin` property to control their size.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/br)
     */
    (): HTMLBRElement
    (props: HTMLElementProps): HTMLBRElement
  };

  button: {
    /**
     * The `<button>` HTML element is an interactive element activated by
     * a user with a mouse, keyboard, finger, voice command, or other
     * assistive technology. Once activated, it then performs an action,
     * such as submitting a `form` or opening a dialog.
     *
     * By default, HTML buttons are presented in a style resembling the platform
     * the user agent runs on, but you can change buttons' appearance with CSS.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/button)
     */
    (): HTMLButtonElement
    (formatArray: FormatArray, ...children: Children): HTMLButtonElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLButtonElement
    (props: ButtonElementProps, ...children: Children): HTMLButtonElement
    (...children: Children): HTMLButtonElement
  };

  canvas: {
    /**
     * Use the HTML `<canvas>` element with either the canvas scripting API
     * or the WebGL API to draw graphics and animations.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/canvas)
     */
    (): HTMLCanvasElement
    (formatArray: FormatArray, ...children: Children): HTMLCanvasElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLCanvasElement
    (props: CanvasElementProps, ...children: Children): HTMLCanvasElement
    (...children: Children): HTMLCanvasElement
  };

  caption: {
    /**
     * The `<caption>` HTML element specifies the caption (or title) of a table,
     * providing the table an accessible description.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/caption)
     */
    (): HTMLTableCaptionElement
    (formatArray: FormatArray, ...children: Children): HTMLTableCaptionElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLTableCaptionElement
    (props: HTMLElementProps, ...children: Children): HTMLTableCaptionElement
    (...children: Children): HTMLTableCaptionElement
  };

  cite: {
    /**
     * The `<cite>` HTML element is used to mark up the title of a cited
     * creative work. The reference may be in an abbreviated form
     * according to context-appropriate conventions related to
     * citation metadata.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/cite)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  code: {
    /**
     * The `<code>` HTML element displays its contents styled in a fashion
     * intended to indicate that the text is a short fragment of computer
     * code. By default, the content text is displayed using the user
     * agent's default monospace font.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/code)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  col: {
    /**
     * The `<col>` HTML element defines one or more columns in a column group
     * represented by its parent `<colgroup>` element. The `<col>` element
     * is only valid as a child of a `<colgroup>` element that has no span
     * attribute defined.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/col)
     */
    (): HTMLTableColElement
    (props: ColElementProps): HTMLTableColElement
  };

  colgroup: {
    /**
     * The `<colgroup>` HTML element defines a group of columns within a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/colgroup)
     */
    (): HTMLTableColElement
    (props: ColgroupElementProps, ...children: Children): HTMLTableColElement
    (...children: Children): HTMLTableColElement
  };

  data: {
    /**
     * The `<data>` HTML element links a given piece of content with
     * a machine-readable translation. If the content is time-
     * or date-related, the `<time>` element must be used.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/data)
     */
    (): HTMLDataElement
    (formatArray: FormatArray, ...children: Children): HTMLDataElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLDataElement
    (props: DataElementProps, ...children: Children): HTMLDataElement
    (...children: Children): HTMLDataElement
  };

  datalist: {
    /**
     * The `<datalist>` HTML element contains a set of `<option>` elements that
     * represent the permissible or recommended options available to choose
     * from within other controls.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/datalist)
     */
    (): HTMLDataListElement
    (formatArray: FormatArray, ...children: Children): HTMLDataListElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLDataListElement
    (props: DataElementProps, ...children: Children): HTMLDataListElement
    (...children: Children): HTMLDataListElement
  };

  dd: {
    /**
     * The `<dd>` HTML element provides the description, definition,
     * or value for the preceding term (`<dt>`) in a description
     * list (`<dl>`).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dd)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  del: {
    /**
     * The `<del>` HTML element represents a range of text that has been deleted
     * from a document. This can be used when rendering "track changes" or
     * source code diff information, for example. The `<ins>` element can
     * be used for the opposite purpose: to indicate text that has been
     * added to the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/del)
     */
    (): HTMLModElement
    (formatArray: FormatArray, ...children: Children): HTMLModElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLModElement
    (props: DelElementProps, ...children: Children): HTMLModElement
    (...children: Children): HTMLModElement
  };

  details: {
    /**
     * The `<details>` HTML element creates a disclosure widget in which
     * information is visible only when the widget is toggled into
     * an open state. A summary or label must be provided using
     * the `<summary>` element.
     *
     * A disclosure widget is typically presented onscreen using a small
     * triangle that rotates (or twists) to indicate open/closed state,
     * with a label next to the triangle. The contents of the `<summary>`
     * element are used as the label for the disclosure widget.
     * The contents of the `<details>` provide the accessible description
     * for the `<summary>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/details)
     */
    (): HTMLDetailsElement
    (formatArray: FormatArray, ...children: Children): HTMLDetailsElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLDetailsElement
    (props: DetailsElementProps, ...children: Children): HTMLDetailsElement
    (...children: Children): HTMLDetailsElement
  };

  dfn: {
    /**
     * The `<dfn>` HTML element indicates a term to be defined. The `<dfn>`
     * element should be used in a complete definition statement, where
     * the full definition of the term can be one of the following:
     *
     * - The ancestor paragraph (a block of text, sometimes marked by a `<p>`
     * element)
     * - The `<dt>`/`<dd>` pairing
     * - The nearest section ancestor of the `<dfn>` element,
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dfn)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  dialog: {
    /**
     * The `<dialog>` HTML element represents a modal or non-modal dialog box or
     * other interactive component, such as a dismissible alert, inspector,
     * or subwindow.
     *
     * The HTML `<dialog>` element is used to create both modal and non-modal
     * dialog boxes. Modal dialog boxes interrupt interaction with the rest
     * of the page being inert, while non-modal dialog boxes allow interaction
     * with the rest of the page.
     *
     * JavaScript should be used to display the `<dialog>` element. Use the
     * `.showModal()` method to display a modal dialog and the `.show()` method
     * to display a non-modal dialog. The dialog box can be closed using
     * the `.close()` method or using the `dialog` method when submitting
     * a `<form>` that is nested within the `<dialog>` element. Modal dialogs
     * can also be closed by pressing the `Esc` key.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dialog)
     */
    (): HTMLDialogElement
    (formatArray: FormatArray, ...children: Children): HTMLDialogElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLDialogElement
    (props: DialogElementProps, ...children: Children): HTMLDialogElement
    (...children: Children): HTMLDialogElement
  };

  div: {
    /**
     * The `<div>` HTML element is the generic container for flow content.
     * It has no effect on the content or layout until styled in some way
     * using CSS.
     *
     * As a "pure" container, the `<div>` element does not inherently represent
     * anything. Instead, it's used to group content so it can be easily styled
     * using the `class` or `id` attributes, marking a section of a document as
     * being written in a different language (using the `lang` attribute),
     * and so on.
     *
     * ```html
     * <div class="warning">
     *   <img src="/media/examples/leopard.jpg" alt="An intimidating leopard." />
     *   <p>Beware of the leopard</p>
     * </div>
     * ```
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/div)
     */
    (): HTMLDivElement
    (formatArray: FormatArray, ...children: Children): HTMLDivElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLDivElement
    (props: HTMLElementProps, ...children: Children): HTMLDivElement
    (...children: Children): HTMLDivElement
  }

  dl: {
    /**
     * The `<dl>` HTML element represents a description list. The element
     * encloses a list of groups of terms (specified using the `<dt>` element)
     * and descriptions (provided by `<dd>` elements). Common uses for this
     * element are to implement a glossary or to display metadata
     * (a list of key-value pairs).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dl)
     */
    (): HTMLDListElement
    (props: HTMLElementProps, ...children: Children): HTMLDListElement
    (...children: Children): HTMLDListElement
  };

  dt: {
    /**
     * The `<dt>` HTML element specifies a term in a description or definition
     * list, and as such must be used inside a `<dl>` element. It is usually
     * followed by a `<dd>` element; however, multiple `<dt>` elements in
     * a row indicate several terms that are all defined by the immediate
     * next `<dd>` element.
     *
     * The subsequent `<dd>` (Description Details) element provides
     * the definition or other related text associated with the term
     * specified using `<dt>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dt)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  em: {
    /**
     * The `<em>` HTML element marks text that has stress emphasis.
     * The `<em>` element can be nested, with each level of nesting
     * indicating a greater degree of emphasis.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/em)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  embed: {
    /**
     * The `<embed>` HTML element embeds external content at the specified point
     * in the document. This content is provided by an external application or
     * other source of interactive content such as a browser plug-in.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/embed)
     */
    (props: EmbedElementProps): HTMLEmbedElement
  };

  fencedframe: {
    /**
     * The `<fencedframe>` HTML element represents a nested browsing context,
     * embedding another HTML page into the current one. `<fencedframe>`s are
     * very similar to `<iframe>` elements in form and function, except that:
     *
     * - Communication is restricted between the `<fencedframe>` content
     * and its embedding site.
     * - A `<fencedframe>` can access cross-site data, but only in a very
     * specific set of controlled circumstances that preserve user privacy.
     * - A `<fencedframe>` cannot be manipulated or have its data accessed
     * via regular scripting (for example reading or setting the source URL).
     * `<fencedframe>` content can only be embedded via specific APIs.
     * - A `<fencedframe>` cannot access the embedding context's DOM,
     * nor can the embedding context access the `<fencedframe>`'s DOM.
     *
     * The `<fencedframe>` element is a type of `<iframe>` with more native
     * privacy features built in. It addresses shortcomings of `<iframe>`s
     * such as reliance on third-party cookies and other privacy risks.
     *
     * TODO Change the return type to HTMLFencedFrameElement eventually
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/fencedframe)
     */
    (props: FencedFrameProps): HTMLElement
  };

  fieldset: {
    /**
     * The `<fieldset>` HTML element is used to group several controls
     * as well as labels (`<label>`) within a web form.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/fieldset)
     */
    (): HTMLFieldSetElement
    (props: FieldSetElementProps, ...children: Children): HTMLFieldSetElement
    (...children: Children): HTMLFieldSetElement
  };

  figcaption: {
    /**
     * The `<figcaption>` HTML element represents a caption or legend describing
     * the rest of the contents of its parent `<figure>` element, providing
     * the `<figure>` an accessible description.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/figcaption)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  figure: {
    /**
     * The `<figure>` HTML element represents self-contained content,
     * potentially with an optional caption, which is specified using
     * the `<figcaption>` element. The figure, its caption, and its
     * contents are referenced as a single unit.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/figure)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  footer: {
    /**
     * The `<footer>` HTML element represents a footer for its nearest ancestor
     * sectioning content or sectioning root element. A `<footer>` typically
     * contains information about the author of the section, copyright data
     * or links to related documents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/footer)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  form: {
    /**
     * The `<form>` HTML element represents a document section containing
     * interactive controls for submitting information.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/form)
     */
    (): HTMLFormElement
    (formatArray: FormatArray, ...children: Children): HTMLFormElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLFormElement
    (props: FormElementProps, ...children: Children): HTMLFormElement
    (...children: Children): HTMLFormElement
  };

  h1: {
    /**
     * The `<h1>` to `<h6>` HTML elements represent six levels of section
     * headings. `<h1>` is the highest section level and `<h6>` is the lowest.
     * By default, all heading elements create a block-level box in the layout,
     * starting on a new line and taking up the full width available in their
     * containing block.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/h1)
     */
    (): HTMLHeadingElement
    (formatArray: FormatArray, ...children: Children): HTMLHeadingElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLHeadingElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadingElement
    (...children: Children): HTMLHeadingElement
  };

  h2: {
    /**
     * The `<h1>` to `<h6>` HTML elements represent six levels of section
     * headings. `<h1>` is the highest section level and `<h6>` is the lowest.
     * By default, all heading elements create a block-level box in the layout,
     * starting on a new line and taking up the full width available in their
     * containing block.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/h1)
     */
    (): HTMLHeadingElement
    (formatArray: FormatArray, ...children: Children): HTMLHeadingElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLHeadingElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadingElement
    (...children: Children): HTMLHeadingElement
  };

  h3: {
    /**
     * The `<h1>` to `<h6>` HTML elements represent six levels of section
     * headings. `<h1>` is the highest section level and `<h6>` is the lowest.
     * By default, all heading elements create a block-level box in the layout,
     * starting on a new line and taking up the full width available in their
     * containing block.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/h1)
     */
    (): HTMLHeadingElement
    (formatArray: FormatArray, ...children: Children): HTMLHeadingElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLHeadingElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadingElement
    (...children: Children): HTMLHeadingElement
  };

  h4: {
    /**
     * The `<h1>` to `<h6>` HTML elements represent six levels of section
     * headings. `<h1>` is the highest section level and `<h6>` is the lowest.
     * By default, all heading elements create a block-level box in the layout,
     * starting on a new line and taking up the full width available in their
     * containing block.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/h1)
     */
    (): HTMLHeadingElement
    (formatArray: FormatArray, ...children: Children): HTMLHeadingElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLHeadingElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadingElement
    (...children: Children): HTMLHeadingElement
  };

  h5: {
    /**
     * The `<h1>` to `<h6>` HTML elements represent six levels of section
     * headings. `<h1>` is the highest section level and `<h6>` is the lowest.
     * By default, all heading elements create a block-level box in the layout,
     * starting on a new line and taking up the full width available in their
     * containing block.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/h1)
     */
    (): HTMLHeadingElement
    (formatArray: FormatArray, ...children: Children): HTMLHeadingElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLHeadingElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadingElement
    (...children: Children): HTMLHeadingElement
  };

  h6: {
    /**
     * The `<h1>` to `<h6>` HTML elements represent six levels of section
     * headings. `<h1>` is the highest section level and `<h6>` is the lowest.
     * By default, all heading elements create a block-level box in the layout,
     * starting on a new line and taking up the full width available in their
     * containing block.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/h1)
     */
    (): HTMLHeadingElement
    (formatArray: FormatArray, ...children: Children): HTMLHeadingElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLHeadingElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadingElement
    (...children: Children): HTMLHeadingElement
  };

  head: {
    /**
     * The `<head>` HTML element contains machine-readable information
     * (metadata) about the document, like its title, scripts, and
     * style sheets. There can be only one `<head>` element in an
     * HTML document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/head)
     */
    (): HTMLHeadElement
    (props: HTMLElementProps, ...children: Children): HTMLHeadElement
    (...children: Children): HTMLHeadElement
  };

  header: {
    /**
     * The `<header>` HTML element represents introductory content, typically
     * a group of introductory or navigational aids. It may contain some
     * heading elements but also a logo, a search form, an author name,
     * and other elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/header)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  hgroup: {
    /**
     * The `<hgroup>` HTML element represents a heading and related content.
     * It groups a single `<h1>`–`<h6>` element with one or more `<p>`.
     *
     * ###### Permitted content
     * Zero or more `<p>` elements, followed by one `h1`, `h2`, `h3`, `h4`,
     * `h5`, or `h6` element, followed by zero or more `<p>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/hgroup)
     */
    (): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  hr: {
    /**
     * The `<hr>` HTML element represents a thematic break between
     * paragraph-level elements: for example, a change of scene
     * in a story, or a shift of topic within a section.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/hr)
     */
    (): HTMLHRElement
    (props: HTMLElementProps): HTMLHRElement
  };

  html: {
    /**
     * The `<html>` HTML element represents the root (top-level element) of
     * an HTML document, so it is also referred to as the root element.
     * All other elements must be descendants of this element.
     * There can be only one `<html>` element in a document.
     *
     * ###### Permitted content
     * One `<head>` element, followed by one `<body>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/html)
     */
    (): HTMLHtmlElement
    (props: HTMLElementProps, ...children: Children): HTMLHtmlElement
    (...children: Children): HTMLHtmlElement
  };

  i: {
    /**
     * The `<i>` HTML element represents a range of text that is set off from
     * the normal text for some reason, such as idiomatic text, technical terms,
     * taxonomical designations, among others. Historically, these have been
     * presented using italicized type, which is the original source of the
     * `<i>` naming of this element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/i)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  iframe: {
    /**
     * The `<iframe>` HTML element represents a nested browsing context,
     * embedding another HTML page into the current one.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/iframe)
     */
    (props: IFrameElementProps): HTMLIFrameElement
  };

  img: {
    /**
     * The `<img>` HTML element embeds an image into the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/img)
     */
    (props: ImageElementProps): HTMLImageElement
  };

  input: {
    /**
     * The `<input>` HTML element is used to create interactive controls for
     * web-based forms in order to accept data from the user; a wide variety
     * of types of input data and control widgets are available, depending
     * on the device and user agent. The `<input>` element is one of the
     * most powerful and complex in all of HTML due to the sheer number
     * of combinations of input types and attributes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/input)
     */
    (props: InputElementProps): HTMLInputElement
  };

  ins: {
    /**
     * The `<ins>` HTML element represents a range of text that has been added
     * to a document. You can use the `<del>` element to similarly represent
     * a range of text that has been deleted from the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ins)
     */
    (): HTMLModElement
    (formatArray: FormatArray, ...children: Children): HTMLModElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLModElement
    (props: InsElementProps, ...children: Children): HTMLModElement
    (...children: Children): HTMLModElement
  };

  kbd: {
    /**
     * The `<kbd>` HTML element represents a span of inline text denoting
     * textual user input from a keyboard, voice input, or any other text
     * entry device. By convention, the user agent defaults to rendering
     * the contents of a `<kbd>` element using its default monospace font,
     * although this is not mandated by the HTML standard.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/kbd)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  label: {
    /**
     * The `<label>` HTML element represents a caption
     * for an item in a user interface.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/label)
     */
    (): HTMLLabelElement
    (formatArray: FormatArray, ...children: Children): HTMLLabelElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLLabelElement
    (props: LabelElementProps, ...children: Children): HTMLLabelElement
    (...children: Children): HTMLLabelElement
  };

  legend: {
    /**
     * The `<legend>` HTML element represents a caption
     * for the content of its parent `<fieldset>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/legend)
     */
    (): HTMLLegendElement
    (formatArray: FormatArray, ...children: Children): HTMLLegendElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLLegendElement
    (props: HTMLElementProps, ...children: Children): HTMLLegendElement
    (...children: Children): HTMLLegendElement
  };

  li: {
    /**
     * The `<li>` HTML element is used to represent an item in a list.
     * It must be contained in a parent element: an ordered list (`<ol>`),
     * an unordered list (`<ul>`), or a menu (`<menu>`). In menus and
     * unordered lists, list items are usually displayed using bullet
     * points. In ordered lists, they are usually displayed with
     * an ascending counter on the left, such as a number or letter.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/li)
     */
    (): HTMLLIElement
    (formatArray: FormatArray, ...children: Children): HTMLLIElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLLIElement
    (props: LiElementProps, ...children: Children): HTMLLIElement
    (...children: Children): HTMLLIElement
  };

  link: {
    /**
     * The `<link>` HTML element specifies relationships between the current
     * document and an external resource. This element is most commonly used
     * to link to stylesheets, but is also used to establish site icons
     * (both "favicon" style icons and icons for the home screen and apps on
     * mobile devices) among other things.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/link)
     */
    (props: LinkElementProps): HTMLLinkElement
  };

  main: {
    /**
     * The `<main>` HTML element represents the dominant content of
     * the `<body>` of a document. The main content area consists
     * of content that is directly related to or expands upon
     * the central topic of a document, or the central
     * functionality of an application.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/main)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  map: {
    /**
     * The `<map>` HTML element is used with <area> elements to define
     * an image map (a clickable link area).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/map)
     */
    (props: MapElementProps, ...children: Children): HTMLMapElement
    (...children: Children): HTMLMapElement
  };

  mark: {
    /**
     * The `<mark>` HTML element represents text which is marked or highlighted
     * for reference or notation purposes due to the marked passage's relevance
     * in the enclosing context.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/mark)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  menu: {
    /**
     * The `<menu>` HTML element is described in the HTML specification as
     * a semantic alternative to `<ul>`, but treated by browsers (and exposed
     * through the accessibility tree) as no different than `<ul>`.
     * It represents an unordered list of items (which are represented
     * by `<li>` elements).
     *
     * ###### Permitted content
     * Zero or more occurrences of `<li>`, `<script>`, and `<template>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/menu)
     */
    (): HTMLMenuElement
    (props: HTMLElementProps, ...children: Children): HTMLMenuElement
    (...children: Children): HTMLMenuElement
  };

  meta: {
    /**
     * The `<meta>` HTML element represents metadata that cannot be represented
     * by other HTML meta-related elements, like `<base>`, `<link>`, `<script>`,
     * `<style>` or `<title>`.
     *
     * The type of metadata provided by the `<meta>` element can be
     * one of the following:
     *
     * - If the `name` attribute is set, the `<meta>` element provides
     * document-level metadata, applying to the whole page.
     *
     * - If the `http-equiv` attribute is set, the `<meta>` element is a pragma
     * directive, providing information equivalent to what can be given by
     * a similarly-named HTTP header.
     *
     * - If the `charset` attribute is set, the `<meta>` element is a charset
     * declaration, giving the character encoding in which the document
     * is encoded.
     *
     * - If the `itemprop` attribute is set, the `<meta>` element provides
     * user-defined metadata.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
     */
    (props: MetaElementProps): HTMLMetaElement
  };

  meter: {
    /**
     * The `<meter>` HTML element represents either a scalar value within
     * a known range or a fractional value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/meter)
     */
    (formatArray: FormatArray, ...children: Children): HTMLMeterElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLMeterElement
    (props: MeterElementProps, ...children: Children): HTMLMeterElement
    (...children: Children): HTMLMeterElement
  };

  nav: {
    /**
     * The `<nav>` HTML element represents a section of a page whose purpose
     * is to provide navigation links, either within the current document or
     * to other documents. Common examples of navigation sections are menus,
     * tables of contents, and indexes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/nav)
     */
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  noscript: {
    /**
     * The `<noscript>` HTML element defines a section of HTML to be inserted if
     * a script type on the page is unsupported or if scripting is currently
     * turned off in the browser.
     *
     * ###### Permitted content
     * - When scripting is disabled and when it is a descendant of the `<head>`
     * element: in any order, zero or more `<link>` elements, zero or more
     * `<style>` elements, and zero or more `<meta>` elements.
     *
     * - When scripting is disabled and when it isn't a descendant of
     * the `<head>` element: any transparent content, but no `<noscript>`
     * element must be among its descendants.
     *
     * - Otherwise: flow content or phrasing content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/noscript)
     */
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  object: {
    /**
     * The `<object>` HTML element represents an external resource, which can be
     * treated as an image, a nested browsing context, or a resource to be
     * handled by a plugin.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object)
     */
    (props: ObjectElementProps, ...children: Children): HTMLObjectElement
    (...children: Children): HTMLObjectElement
  };

  ol: {
    /**
     * The `<ol>` HTML element represents an ordered list of items — typically
     * rendered as a numbered list.
     *
     * ###### Permitted content
     * Zero or more `<li>`, `<script>` and `<template>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ol)
     */
    (props: OlElementProps, ...children: Children): HTMLOListElement
    (...children: Children): HTMLOListElement
  };

  optgroup: {
    /**
     * The `<optgroup>` HTML element creates a grouping of options within
     * a `<select>` element.
     *
     * ###### Permitted content
     * Zero or more `<option>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/optgroup)
     */
    (props: OptgroupElementProps, ...children: Children): HTMLOptGroupElement
    (...children: Children): HTMLOptGroupElement
  };

  option: {
    /**
     * The `<option>` HTML element is used to define an item contained in
     * a `<select>`, an `<optgroup>`, or a `<datalist>` element. As such,
     * `<option>` can represent menu items in popups and other lists of
     * items in an HTML document.
     *
     * ###### Permitted content
     * Text, possibly with escaped characters (like &eacute;).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/option)
     */
    (formatArray: FormatArray): HTMLOptionElement
    (text: Reactive<StringConvertible>): HTMLOptionElement
    // Special for option and textarea
    (props: OptionElementProps): HTMLOptionElement
    (props: OptionElementProps, formatArray: FormatArray): HTMLOptionElement
    (props: OptionElementProps, text: Reactive<StringConvertible>): HTMLOptionElement
  };

  output: {
    /**
     * The `<output>` HTML element is a container element into which
     * a site or app can inject the results of a calculation or
     * the outcome of a user action.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/output)
     */
    (formatArray: FormatArray, ...children: Children): HTMLOutputElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLOutputElement
    (props: OutputElementProps, ...children: Children): HTMLOutputElement
    (...children: Children): HTMLOutputElement
  };

  p: {
    /**
     * The `<p>` HTML element represents a paragraph. Paragraphs are usually
     * represented in visual media as blocks of text separated from adjacent
     * blocks by blank lines and/or first-line indentation, but HTML
     * paragraphs can be any structural grouping of related content,
     * such as images or form fields.
     *
     * Paragraphs are block-level elements, and notably will automatically
     * close if another block-level element is parsed before the closing
     * `</p>` tag. See "Tag omission" below.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/p)
     */
    (): HTMLParagraphElement
    (formatArray: FormatArray, ...children: Children): HTMLParagraphElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLParagraphElement
    (props: HTMLElementProps, ...children: Children): HTMLParagraphElement
    (...children: Children): HTMLParagraphElement
  };

  picture: {
    /**
     * The `<picture>` HTML element contains zero or more `<source>` elements
     * and one `<img>` element to offer alternative versions of an image for
     * different display/device scenarios.
     *
     * The browser will consider each child `<source>` element and choose
     * the best match among them. If no matches are found—or the browser
     * doesn't support the `<picture>` element—the URL of the `<img>`
     * element's `src` attribute is selected. The selected image is then
     * presented in the space occupied by the `<img>` element.
     *
     * ###### Permitted content
     * Zero or more `<source>` elements, followed by one `<img>` element,
     * optionally intermixed with script-supporting elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/picture)
     */
    (props: HTMLElementProps, ...children: Children): HTMLPictureElement
    (...children: Children): HTMLPictureElement
  };

  pre: {
    /**
     * The `<pre>` HTML element represents preformatted text which is to be
     * presented exactly as written in the HTML file. The text is typically
     * rendered using a non-proportional, or monospaced font.
     *
     * Whitespace inside this element is displayed as written, with one
     * exception. If one or more leading newline characters are included
     * immediately following the opening `<pre>` tag, the first newline
     * character is stripped.
     *
     * By default, `<pre>` is a block-level element, i.e. its default `display`
     * value is `block`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/pre)
     */
    (): HTMLPreElement
    (formatArray: FormatArray, ...children: Children): HTMLPreElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLPreElement
    (props: HTMLElementProps, ...children: Children): HTMLPreElement
    (...children: Children): HTMLPreElement
  };

  progress: {
    /**
     * The `<progress>` HTML element displays an indicator showing
     * the completion progress of a task, typically displayed
     * as a progress bar.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/progress)
     */
    (formatArray: FormatArray, ...children: Children): HTMLProgressElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLProgressElement
    (props: ProgressElementProps, ...children: Children): HTMLProgressElement
    (...children: Children): HTMLProgressElement
  };

  q: {
    /**
     * The `<q>` HTML element indicates that the enclosed text is a short inline
     * quotation. Most modern browsers implement this by surrounding the text
     * in quotation marks. This element is intended for short quotations that
     * don't require paragraph breaks; for long quotations use
     * the `<blockquote>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/q)
     */
    (): HTMLQuoteElement
    (formatArray: FormatArray, ...children: Children): HTMLQuoteElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLQuoteElement
    (props: QElementProps, ...children: Children): HTMLQuoteElement
    (...children: Children): HTMLQuoteElement
  };

  rp: {
    /**
     * The `<rp>` HTML element is used to provide fall-back parentheses for
     * browsers that do not support display of ruby annotations using
     * the `<ruby>` element. One `<rp>` element should enclose each
     * of the opening and closing parentheses that wrap the `<rt>`
     * element that contains the annotation's text.
     *
     * ###### Permitted content
     * Text
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/rp)
     */
    (formatArray: FormatArray): HTMLElement
    (text: Reactive<StringConvertible>): HTMLElement
  };

  rt: {
    /**
     * The `<rt>` HTML element specifies the ruby text component of a ruby
     * annotation, which is used to provide pronunciation, translation,
     * or transliteration information for East Asian typography.
     * The `<rt>` element must always be contained within a `<ruby>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/rt)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  ruby: {
    /**
     * The `<ruby>` HTML element represents small annotations that are rendered
     * above, below, or next to base text, usually used for showing
     * the pronunciation of East Asian characters. It can also be
     * used for annotating other kinds of text, but this usage is
     * less common.
     *
     * The term *ruby* originated as a unit of measurement used by typesetters,
     * representing the smallest size that text can be printed on newsprint
     * while remaining legible.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ruby)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  s: {
    /**
     * The `<s>` HTML element renders text with a strikethrough, or a line
     * through it. Use the `<s>` element to represent things that are no
     * longer relevant or no longer accurate. However, `<s>` is not
     * appropriate when indicating document edits; for that, use the
     * `<del>` and `<ins>` elements, as appropriate.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/s)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  samp: {
    /**
     * The `<samp>` HTML element is used to enclose inline text which represents
     * sample (or quoted) output from a computer program. Its contents are
     * typically rendered using the browser's default monospaced font
     * (such as Courier or Lucida Console).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/samp)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  search: {
    /**
     * The `<search>` HTML element is a container representing the parts of
     * the document or application with form controls or other content related
     * to performing a search or filtering operation. The `<search>` element
     * semantically identifies the purpose of the element's contents as having
     * search or filtering capabilities. The search or filtering functionality
     * can be for the website or application, the current web page or document,
     * or the entire Internet or subsection thereof.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/search)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  section: {
    /**
     * The `<section>` HTML element represents a generic standalone section of
     * a document, which doesn't have a more specific semantic element to
     * represent it. Sections should always have a heading, with very
     * few exceptions.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/section)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  select: {
    /**
     * The `<select>` HTML element represents a control
     * that provides a menu of options.
     *
     * ###### Permitted content
     * Zero or more `<option>`, `<optgroup>` or `<hr>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/select)
     */
    (): HTMLSelectElement
    (props: SelectElementProps, ...children: Children): HTMLSelectElement
    (...children: Children): HTMLSelectElement
  };

  slot: {
    /**
     * The `<slot>` HTML element—part of the Web Components technology suite—is
     * a placeholder inside a web component that you can fill with your own
     * markup, which lets you create separate DOM trees and present them
     * together.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/slot)
     */
    (): HTMLSlotElement
    (formatArray: FormatArray, ...children: Children): HTMLSlotElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLSlotElement
    (props: SlotElementProps, ...children: Children): HTMLSlotElement
    (...children: Children): HTMLSlotElement
  };

  small: {
    /**
     * The `<small>` HTML element represents side-comments and small print,
     * like copyright and legal text, independent of its styled presentation.
     * By default, it renders text within it one font-size smaller, such as
     * from `small` to `x-small`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/small)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  source: {
    /**
     * The `<source>` HTML element specifies one or more media resources for
     * the `<picture>`, `<audio>`, and `<video>` elements. It is a void
     * element, which means that it has no content and does not require
     * a closing tag. This element is commonly used to offer the same
     * media content in multiple file formats in order to provide
     * compatibility with a broad range of browsers given their
     * differing support for image file formats and media file formats.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/source)
     */
    (props: SourceElementProps): HTMLSourceElement
  };

  span: {
    /**
     * The `<span>` HTML element is a generic inline container for phrasing
     * content, which does not inherently represent anything. It can be used
     * to group elements for styling purposes (using the `class` or `id`
     * attributes), or because they share attribute values, such as `lang`.
     * It should be used only when no other semantic element is appropriate.
     * `<span>` is very much like a `<div>` element, but `<div>` is
     * a block-level element whereas a `<span>` is an inline-level element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/span)
     */
    (): HTMLSpanElement
    (formatArray: FormatArray, ...children: Children): HTMLSpanElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLSpanElement
    (props: HTMLElementProps, ...children: Children): HTMLSpanElement
    (...children: Children): HTMLSpanElement
  };

  strong: {
    /**
     * The `<strong>` HTML element indicates that its contents have strong
     * importance, seriousness, or urgency. Browsers typically render
     * the contents in bold type.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/strong)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  sub: {
    /**
     * The `<sub>` HTML element specifies inline text which should be displayed
     * as subscript for solely typographical reasons. Subscripts are typically
     * rendered with a lowered baseline using smaller text.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/sub)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  summary: {
    /**
     * The `<summary>` HTML element specifies a summary, caption, or legend for
     * a `<details>` element's disclosure box. Clicking the <summary> element
     * toggles the state of the parent <details> element open and closed.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/summary)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  sup: {
    /**
     * The `<sup>` HTML element specifies inline text which is to be displayed
     * as superscript for solely typographical reasons. Superscripts are usually
     * rendered with a raised baseline using smaller text.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/sup)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  table: {
    /**
     * The `<table>` HTML element represents tabular data—that is, information
     * presented in a two-dimensional table comprised of rows and columns of
     * cells containing data.
     *
     * ###### Permitted content
     * In this order:
     * - 1: an optional `<caption>` element,
     * - 2: zero or more `<colgroup>` elements,
     * - 3: an optional `<thead>` element,
     * - 4: either one of the following:
     *   - zero or more `<tbody>` elements
     *   - one or more `<tr>` elements
     * - 5: an optional `<tfoot>` element
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/table)
     */
    (): HTMLTableElement
    (props: HTMLElementProps, ...children: Children): HTMLTableElement
    (...children: Children): HTMLTableElement
  };

  tbody: {
    /**
     * The `<tbody>` HTML element encapsulates a set of table rows
     * (`<tr>` elements), indicating that they comprise the body
     * of a table's (main) data.
     *
     * ###### Permitted content
     * Zero or more `<tr>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/tbody)
     */
    (): HTMLTableSectionElement
    (props: HTMLElementProps, ...children: Children): HTMLTableSectionElement
    (...children: Children): HTMLTableSectionElement
  };

  td: {
    /**
     * The `<td>` HTML element defines a cell of a table that contains data
     * and may be used as a child of the `<tr>` element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/td)
     */
    (): HTMLTableCellElement
    (formatArray: FormatArray, ...children: Children): HTMLTableCellElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLTableCellElement
    (props: TdElementProps, ...children: Children): HTMLTableCellElement
    (...children: Children): HTMLTableCellElement
  };

  template: {
    /**
     * The `<template>` HTML element serves as a mechanism for holding HTML
     * fragments, which can either be used later via JavaScript or
     * generated immediately into shadow DOM.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/template)
     */
    (): HTMLTemplateElement
    (formatArray: FormatArray, ...children: Children): HTMLTemplateElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLTemplateElement
    (props: HTMLElementProps, ...children: Children): HTMLTemplateElement
    (...children: Children): HTMLTemplateElement
  };

  textarea: {
    /**
     * The `<textarea>` HTML element represents a multi-line plain-text editing
     * control, useful when you want to allow users to enter a sizeable amount
     * of free-form text, for example a comment on a review or feedback form.
     *
     * ###### Permitted content
     * Text
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/textarea)
     */
    (): HTMLTextAreaElement
    (formatArray: FormatArray): HTMLTextAreaElement
    (text: Reactive<StringConvertible>): HTMLTextAreaElement
    // Special for option and textarea
    (props: TextAreaElementProps): HTMLTextAreaElement
    (props: TextAreaElementProps, formatArray: FormatArray): HTMLTextAreaElement
    (props: TextAreaElementProps, text: Reactive<StringConvertible>): HTMLTextAreaElement
  };

  tfoot: {
    /**
     * The `<tfoot>` HTML element encapsulates a set of table rows
     * (`<tr>` elements), indicating that they comprise the foot
     * of a table with information about the table's columns.
     * This is usually a summary of the columns, e.g.,
     * a sum of the given numbers in a column.
     *
     * ###### Permitted content
     * Zero or more `<tr>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/tfoot)
     */
    (): HTMLTableSectionElement
    (props: HTMLElementProps, ...children: Children): HTMLTableSectionElement
    (...children: Children): HTMLTableSectionElement
  };

  th: {
    /**
     * The `<th>` HTML element defines a cell as the header of a group of table
     * cells and may be used as a child of the `<tr>` element. The exact nature
     * of this group is defined by the `scope` and `headers` attributes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th)
     */
    (): HTMLTableCellElement
    (formatArray: FormatArray, ...children: Children): HTMLTableCellElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLTableCellElement
    (props: ThElementProps, ...children: Children): HTMLTableCellElement
    (...children: Children): HTMLTableCellElement
  };

  thead: {
    /**
     * The `<thead>` HTML element encapsulates a set of table rows
     * (`<tr>` elements), indicating that they comprise the head
     * of a table with information about the table's columns.
     * This is usually in the form of column headers (`<th>` elements).
     *
     * ###### Permitted content
     * Zero or more `<tr>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/thead)
     */
    (): HTMLTableSectionElement
    (props: HTMLElementProps, ...children: Children): HTMLTableSectionElement
    (...children: Children): HTMLTableSectionElement
  };

  time: {
    /**
     * The `<time>` HTML element represents a specific period in time.
     * It may include the datetime attribute to translate dates into
     * machine-readable format, allowing for better search engine
     * results or custom features such as reminders.
     *
     * It may represent one of the following:
     *
     * - A time on a 24-hour clock.
     *
     * - A precise date in the Gregorian calendar (with optional
     * time and timezone information).
     *
     * - A valid time duration.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/time)
     */
    (): HTMLTimeElement
    (formatArray: FormatArray, ...children: Children): HTMLTimeElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLTimeElement
    (props: TimeElementProps, ...children: Children): HTMLTimeElement
    (...children: Children): HTMLTimeElement
  };

  tr: {
    /**
     * The `<tr>` HTML element defines a row of cells in a table. The row's
     * cells can then be established using a mix of `<td>` (data cell) and
     * `<th>` (header cell) elements.
     *
     * ###### Permitted content
     * Zero or more `<td>` and/or `<th>` elements; script-supporting elements
     * (`<script>` and `<template>`) are also allowed.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/tr)
     */
    (): HTMLTableRowElement
    (props: HTMLElementProps, ...children: Children): HTMLTableRowElement
    (...children: Children): HTMLTableRowElement
  };

  track: {
    /**
     * The `<track>` HTML element is used as a child of the media elements,
     * `<audio>` and `<video>`. Each track element lets you specify a timed
     * text track (or time-based data) that can be displayed in parallel with
     * the media element, for example to overlay subtitles or closed captions
     * on top of a video or alongside audio tracks.
     *
     * Multiple tracks can be specified for a media element, containing
     * different kinds of timed text data, or timed text data that has been
     * translated for different locales. The data that is used will either
     * be the track that has been set to be the default, or a kind and
     * translation based on user preferences.
     *
     * The tracks are formatted in WebVTT format (.vtt files) — Web Video
     * Text Tracks.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/track)
     */
    (props: TrackElementProps): HTMLTrackElement
  };

  u: {
    /**
     * The `<u>` HTML element represents a span of inline text which should be
     * rendered in a way that indicates that it has a non-textual annotation.
     * This is rendered by default as a single solid underline, but may be
     * altered using CSS.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/u)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  ul: {
    /**
     * The `<ul>` HTML element represents an unordered list of items, typically
     * rendered as a bulleted list.
     *
     * ###### Permitted content
     * Zero or more `<li>`, `<script>` and `<template>` elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ul)
     */
    (): HTMLUListElement
    (props: HTMLElementProps, ...children: Children): HTMLUListElement
    (...children: Children): HTMLUListElement
  };

  var: {
    /**
     * The `<var>` HTML element represents the name of a variable in
     * a mathematical expression or a programming context. It's typically
     * presented using an italicized version of the current typeface,
     * although that behavior is browser-dependent.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/var)
     */
    (): HTMLElement
    (formatArray: FormatArray, ...children: Children): HTMLElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLElement
    (props: HTMLElementProps, ...children: Children): HTMLElement
    (...children: Children): HTMLElement
  };

  video: {
    /**
     * The `<video>` HTML element embeds a media player which supports video
     * playback into the document. You can use `<video>` for audio content
     * as well, but the `<audio>` element may provide a more appropriate
     * user experience.
     *
     * ###### Permitted content
     * If the element has a src attribute: zero or more `<track>` elements,
     * followed by transparent content that contains no media elements–that
     * is no `<audio>` or `<video>`.
     *
     * Else: zero or more `<source>` elements, followed by zero or more
     * `<track>` elements, followed by transparent content that contains
     * no media elements–that is no `<audio>` or `<video>`.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video)
     */
    (): HTMLVideoElement
    (formatArray: FormatArray, ...children: Children): HTMLVideoElement
    (text: Reactive<StringConvertible>, ...children: Children): HTMLVideoElement
    (props: VideoElementProps, ...children: Children): HTMLVideoElement
    (...children: Children): HTMLVideoElement
  };

  wbr: {
    /**
     * The `<wbr>` HTML element represents a word break opportunity—a position
     * within text where the browser may optionally break a line, though its
     * line-breaking rules would not otherwise create a break at that location.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/wbr)
     */
    (): HTMLElement
  };
}
