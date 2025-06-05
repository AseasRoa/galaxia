import { ElementProps } from './ElementProps'
import { Bindable, StringConvertible } from '../common'
import { CSSProperties } from '../CSSProperties'

/**
 * The HTMLElement interface represents any HTML element.
 * Some elements directly implement this interface, while
 * others implement it via an interface that inherits it.
 *
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export interface HTMLElementProps extends ElementProps {
  /**
   * The `data-*` attribute is used to store custom data private to the page
   * or application.
   *
   * The `data-*` attribute gives us the ability to embed custom data attributes
   * on all HTML elements.
   *
   * The stored (custom) data can then be used in the page's JavaScript to
   * create a more engaging user experience (without any Ajax calls or
   * server-side database queries).
   *
   * The `data-*` attribute consist of two parts:
   *
   * - The attribute name should not contain any uppercase letters,
   * and must be at least one character long after the prefix "data-"
   * - The attribute value can be any string
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/How_to/Use_data_attributes)
   */
  data?: Bindable<Record<string, StringConvertible>>,

  /**
   * Sets the keystroke which a user can press to jump to a given element.
   *
   * > **_NOTE:_**
   * The `HTMLElement.accessKey` property is seldom used because of its multiple
   * conflicts with already present key bindings in browsers. To work around
   * this, browsers implement accessKey behavior if the keys are pressed with
   * other "qualifying" keys (such as `Alt` + accessKey).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/accessKey)
   */
  accessKey?: Bindable<string>,

  /**
   * Controls whether inputted text is automatically capitalized and, if so,
   * in what manner. This is relevant to:
   *
   * - `<input>` and `<textarea>` elements.
   * - Any element with contenteditable set on it.
   *
   * It doesn't affect behavior when typing on a physical keyboard. It affects
   * the behavior of other input mechanisms such as virtual keyboards on mobile
   * devices and voice input. This can assist users by making data entry quicker
   * and easier, for example by automatically capitalizing the first letter of
   * each sentence.
   *
   * ###### Possible values
   *
   * - `off`: Do not automatically capitalize any text.
   *
   * - `sentences` or `on`: Automatically capitalize the first character
   * of each sentence.
   *
   * - `words`: Automatically capitalize the first character of each word.
   *
   * - `characters`: Automatically capitalize every character.
   *
   * ###### Usage notes
   *
   * - `autoCapitalize` can be set on `<input>` and `<textarea>` elements,
   * and on their containing `<form>` elements. When autocapitalize is set
   * on a `<form>` element, it sets the autocapitalize behavior for all
   * contained `<input>`s and `<textarea>`s, overriding any autocapitalize
   * values set on contained elements.
   *
   * - `autoCapitalize` has no effect on the `url`, `email`, or `password`
   * `<input>` types, where autocapitalization is never enabled.
   *
   * - Where `autoCapitalize` is not specified, the adopted default behavior
   * varies between browsers. For example:
   *   - Chrome and Safari default to on/sentences
   *   - Firefox defaults to `off`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocapitalize)
   */
  autoCapitalize?: Bindable<boolean|'off'|'on'|'sentences'|'words'|'characters'>,

  /**
   * Controls whether autocorrection of editable text is enabled for spelling
   * and/or punctuation errors.
   *
   * The specific autocorrection behavior, including which words are
   * substituted, depends on the user agent and the services provided by
   * the underlying device.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocorrect)
   */
  autoCorrect?: Bindable<boolean>,

  /**
   * Indicates whether the control should be focused when the page loads,
   * or when dialog or popover become shown if specified in an element
   * inside `<dialog>` elements or elements whose popover attribute is set.
   *
   * Only one form-associated element inside a document, or a `<dialog>`
   * element, or an element whose `popover` attribute is set, can have
   * this attribute specified. If there are several, the first element
   * with the attribute set inserted, usually the first such element
   * on the page, gets the initial focus.
   *
   * > **_NOTE:_**
   * Setting this property doesn't set the focus to the associated
   * element: it merely tells the browser to focus to it when the
   * element is inserted in the document. Setting it after the
   * insertion, that is most of the time after the document
   * load, has no visible effect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autofocus)
   */
  autoFocus?: Bindable<boolean>,

  /**
   * Specifies whether the element is editable.
   *
   * - `true`: Indicates that the element is contenteditable.
   * - `false`: Indicates that the element cannot be edited.
   * - `plaintext-only`: Indicates that the element's raw text is editable,
   * but rich text formatting is disabled.
   *
   * You can use the `isContentEditable` property to test the computed boolean
   * value of this property.
   *
   * If the attribute is missing or its value is invalid, its value
   * is inherited from its parent element: so the element is
   * editable (or not) based on the parent element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/contentEditable)
   */
  contentEditable?: Bindable<boolean|'plaintext-only'>,

  /**
   * Indicates the text writing directionality of the content of the current
   * element. If the `dir` attribute is unspecified, the element itself may
   * still inherit directionality from its parent. However, that inherited
   * directionality is not reflected by this property's value.
   *
   * The text writing directionality of an element is which direction that
   * text goes (for support of different language systems). Arabic languages
   * and Hebrew are typical languages using the RTL directionality.
   *
   * - `ltr`: Left-to-right writing direction.
   *
   * - `rtl`: Right-to-left writing direction.
   *
   * - `auto`: The direction of the element must be determined based on the
   * contents of the element.
   *
   * - *empty* - The default value; the directionality is inherited
   * from the parent element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dir)
   */
  dir?: Bindable<'ltr'|'rtl'|'auto'|''>,

  /**
   * Makes the element draggable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dir)
   */
  draggable?: Bindable<boolean>,

  /**
   * Sets an element's associated `EditContext` object.
   *
   * The
   * [EditContext API](https://developer.mozilla.org/docs/Web/API/EditContext_API)
   * can be used to build rich text editors on the web that support advanced
   * text input experiences, such as
   * [Input Method Editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor)
   * (IME) composition, emoji picker, or any other platform-specific
   * editing-related UI surfaces.
   *
   * ###### Possible elements
   * Setting the editContext property only works on certain types of elements:
   *
   * - One of these HTML elements: `<article>`, `<aside>`, `<blockquote>`,
   * `<body>`, `<div>`, `<footer>`, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`,
   * `<h6>`, `<header>`, `<main>`, `<nav>`, `<p>`, `<section>`, or `<span>`.
   *
   * - A valid custom element.
   *
   * - A `<canvas>` element.
   *
   * If you try to set the `editContext` property on an element that is not
   * one of the above, a `NotSupportedError` DOMException is thrown.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/editContext)
   */
  // @ts-expect-error
  editContext?: Bindable<EditContext>,

  /**
   * Defines what action label (or icon) to present for the enter key on virtual
   * keyboards. It accepts the following values as a string:
   *
   * - `enter`: Typically indicating inserting a new line.
   *
   * - `done`: Typically meaning there is nothing more to input and the input
   * method editor (IME) will be closed.
   *
   * - `go`: Typically meaning to take the user to the target of the text
   * they typed.
   *
   * - `next`: Typically taking the user to the next field that will
   * accept text.
   *
   * - `previous`: Typically taking the user to the previous field that
   * will accept text.
   *
   * - `search`: Typically taking the user to the results of searching
   * for the text they have typed.
   *
   * - `send`: Typically delivering the text to its target.
   *
   * If no `enterKeyHint` value has been specified or if it was set to
   * a different value than the allowed ones, it will return an empty string.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/enterKeyHint)
   */
  enterKeyHint?: Bindable<'enter'|'done'|'go'|'next'|'previous'|'search'|'send'>,

  /**
   * - `true`: The element is hidden.
   *
   * - `false`: The element is not hidden. This is the default value for
   * the attribute.
   *
   * - `until-found`: The element is hidden until found, meaning that
   * it is hidden but will be revealed if found through in page search
   * or reached through fragment navigation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/hidden)
   */
  hidden?: Bindable<boolean|'until-found'>,

  /**
   * Makes the browser "ignore" user input events for the element, including
   * focus events and events from assistive technologies. The browser may also
   * ignore page search and text selection in the element. This can be useful
   * when building UIs such as modals where you would want to "trap" the focus
   * inside the modal when it's visible.
   *
   * Specifically, inert does the following:
   *
   * - Prevents the `click` event from being fired when the user clicks
   * on the element.
   *
   * - Prevents the `focus` event from being raised by preventing the element
   * from gaining focus.
   *
   * - Prevents any contents of the element from being found/matched during
   * any use of the browser's find-in-page feature.
   *
   * - Prevents users from selecting text within the element — akin to using
   * the CSS property `user-select` to disable text selection.
   *
   * - Prevents users from editing any contents of the element that are
   * otherwise editable.
   *
   * - Hides the element and its content from assistive technologies by
   * excluding them from the accessibility tree.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/inert)
   */
  inert?: Bindable<boolean>,

  /**
   * Represents the rendered text content of a node and its descendants.
   *
   * As a getter, it approximates the text the user would get if they
   * highlighted the contents of the element with the cursor and then
   * copied it to the clipboard. As a setter this will replace the element's
   * children with the given value, converting any line breaks into
   * `<br>` elements.
   *
   * > **_NOTE:_**
   * `innerText` is easily confused with `Node.textContent`, but there are
   * important differences between the two. Basically, `innerText` is aware
   * of the rendered appearance of text, while `textContent` is not.
   *
   * If the element itself is not being rendered (for example, is detached
   * from the document or is hidden from view), the returned value is the
   * same as the `Node.textContent` property.
   *
   * > **_WARNING:_**
   * Setting `innerText` on a node removes all of the node's children and
   * replaces them with a single text node with the given string value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText)
   */
  innerText?: Bindable<StringConvertible>,

  /**
   * Provides a hint about the type of data that might be entered by the
   * user while editing the element or its contents. This allows the
   * browser to display an appropriate virtual keyboard.
   *
   * It is used primarily on `<input>` elements, but is usable on any element
   * in `contentEditable` mode.
   *
   * - `decimal`: Fractional numeric input keyboard that contains the digits
   * and decimal separator for the user's locale (typically `.` or `,`).
   *
   * - `email`: A virtual keyboard optimized for entering email addresses.
   * Typically, includes the `@` character as well as other optimizations.
   *
   * - `none`: No virtual keyboard. This is used when the page implements
   * its own keyboard input control.
   *
   * - `numeric`: Numeric input keyboard that only requires the digits 0–9.
   * Devices may or may not show a minus key.
   *
   * - `search`: A virtual keyboard optimized for search input.
   * For instance, the
   * [return/submit](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-enterkeyhint-attribute)
   * key may be labeled "Search".
   *
   * - `tel`: A telephone keypad input that includes the digits 0–9,
   * the asterisk (`*`), and the pound (`#`) key.
   *
   * - `text`: Standard input keyboard for the user's current locale.
   *
   * - `url`: A keypad optimized for entering URLs. This may have the `/`
   * key more prominent, for example.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/inputMode)
   */
  inputMode?: Bindable<
    'none'
    | 'decimal'
    | 'email'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
  >

  /**
   * Sets the base language of an element's attribute values and text content.
   *
   * The language code returned by this property is defined in
   * [RFC 5646: Tags for Identifying Languages (also known as BCP 47)](https://datatracker.ietf.org/doc/html/rfc5646)
   * . Common examples include "en" for English, "ja" for Japanese,
   * "es" for Spanish and so on. The default value of this attribute
   * is `unknown`. Note that this attribute, though valid at the
   * individual element level described here, is most often specified
   * for the root element of the document.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/lang)
   */
  lang?: Bindable<string>,

  // Defined for script and style
  // nonce?: Bindable<string>,

  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/outerText)
   */
  // Gives error like "... element has no parent."
  // outerText?: Bindable<HTMLElement['outerText']>,

  /**
   * Sets an element's popover state via JavaScript ("auto" or "manual"),
   * and can be used for feature detection.
   *
   * - `auto`:
   *
   *   - The popover can be "light dismissed" — this means that you can hide
   *   the popover by clicking outside it or pressing the `Esc` key.
   *
   *   - Usually, only one popover can be shown at a time — showing a second
   *   popover when one is already shown will hide the first one.
   *   The exception to this rule is when you have nested auto popovers.
   *
   * - `manual`:
   *
   *   - The popover cannot be "light dismissed", although declarative
   *   show/hide/toggle buttons will still work.
   *
   *   - Multiple independent popovers can be shown at a time.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/popover)
   */
  popover?: Bindable<'auto'|'manual'>,

  /**
   * Controls the
   * [spell-checking](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck)
   * hint. It is available on all HTML elements, though it doesn't affect
   * all of them.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/spellcheck)
   */
  spellCheck?: Bindable<boolean>,

  /**
   * Contains CSS styling declarations to be applied to the element.
   *
   * The declarations can be written in a string, or in object format,
   * for example:
   * ```js
   * // As a string
   * style: 'padding: "5px"; color: "green"'
   *
   * // As an object
   * style: { padding: '5px', color: 'green' }
   * ```
   *
   * > **_NOTE:_**
   * This attribute has mainly the purpose of allowing for quick styling,
   * for example for testing purposes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style)
   */
  style?: Bindable<string|CSSProperties>,

  /**
   * Allows developers to make HTML elements focusable, allow or prevent them
   * from being sequentially focusable (usually with the Tab key, hence the
   * name) and determine their relative ordering for sequential focus
   * navigation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex)
   */
  tabIndex?: Bindable<number>,

  /**
   * Text, representing advisory information related to the element
   * it belongs to.
   *
   * The main use of the title attribute is to label `<iframe>` elements
   * for assistive technology.
   *
   * The title attribute, when added to `<link rel="stylesheet">`,
   * creates an alternate stylesheet. When defining an alternative
   * style sheet with `<link rel="alternate">` the attribute is
   * required and must be set to a non-empty string.
   *
   * If included on the `<abbr>` opening tag, the `title` must be a full
   * expansion of the abbreviation or acronym. Instead of using `title`,
   * when possible, provide an expansion of the abbreviation or acronym
   * in plain text on first use, using the `<abbr>` to mark up the
   * abbreviation. This enables all users know what name or term the
   * abbreviation or acronym shortens while providing a hint to user
   * agents on how to announce the content.
   *
   * While title can be used to provide a programmatically associated
   * label for an `<input>` element, this is not good practice.
   * Use a `<label>` instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title)
   */
  title?: Bindable<StringConvertible>,

  /**
   * Used to specify whether an element's translatable attribute values and
   * its `Text` node children should be translated when the page is localized,
   * or whether to leave them unchanged.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate)
   */
  translate?: Bindable<boolean>,

  /**
   * When specified on an element that the element's content is editable
   * (for example, it is an `<input>` or `<textarea>` element, or an element
   * with the `contentEditable` attribute set), it controls the on-screen
   * virtual keyboard behavior on devices such as tablets, mobile phones,
   * or other devices where a hardware keyboard may not be available.
   *
   * The attribute must take one of the following values:
   *
   * - `auto`: Automatically shows the virtual keyboard when the element is
   * focused or tapped.
   *
   * - `manual`: Decouples focus and tap on the element from the virtual
   * keyboard's state.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/virtualkeyboardpolicy)
   */
  virtualKeyboardPolicy?: Bindable<'auto'|'manual'>,

  /**
   * Indicates if browser-provided writing suggestions should be enabled under
   * the scope of the element or not.
   *
   * Some browsers provide writing suggestions to users as they type in editable
   * fields. Suggestions usually appear as greyed-out text positioned after the
   * text cursor, completing the user's sentence. While this can be helpful to
   * users, developers might want to turn writing suggestions off in some cases,
   * such as when providing site-specific writing suggestions.
   *
   * It can be set on editable fields such as `<input>` or `<textarea>`
   * elements, or on other HTML elements to control the behavior of the
   * browser's suggestions on sections of a page, or on the entire page.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/writingsuggestions)
   */
  writingSuggestions?: Bindable<boolean>,

  /**
   * The `beforetoggle` event fires on a popover or `<dialog>` element just
   * before it is shown or hidden.
   *
   * - If the element is transitioning from hidden to showing,
   * the `event.oldState` property will be set to `closed` and
   * the `event.newState` property will be set to `open`.
   * - If the element is transitioning from showing to hidden,
   * then `event.oldState` will be `open` and `event.newState` will be `closed`.
   *
   * This event is cancelable when an element is toggled to open ("show")
   * but not when the element is closing.
   *
   * Among other things, this event can be used to:
   *
   * - prevent an element from being shown.
   *
   * - add or remove classes or properties from the element or associated
   * elements, for example to control the animation behaviour of a dialog
   * as it is opened and closed.
   *
   * - clear the state of the element before it is opened or after it is
   * hidden, for example to reset a dialog form and return value to
   * an empty state, or hide any nested manual popovers when reopening a popup.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/beforetoggle_event)
   */
  onBeforeToggle?(this: GlobalEventHandlers, event: ToggleEvent): any,

  /**
   * The `change` event is fired for `<input>`, `<select>`, and `<textarea>`
   * elements when the user modifies the element's value. Unlike the `input`
   * event, the `change` event is not necessarily fired for each alteration
   * to an element's `value`.
   *
   * Depending on the kind of element being changed and the way the user
   * interacts with the element, the `change` event fires at a different moment:
   *
   * - When a `<input type="checkbox">` element is checked or unchecked
   * (by clicking or using the keyboard);
   *
   * - When a `<input type="radio">` element is checked
   * (but not when unchecked);
   * - When the user commits the change explicitly (e.g., by selecting a value
   * from a `<select>`'s dropdown with a mouse click, by selecting a date from
   * a date picker for `<input type="date">`, by selecting a file in the file
   * picker for `<input type="file">`, etc.);
   *
   * - When the element loses focus after its value was changed: for elements
   * where the user's interaction is typing rather than selection,
   * such as a `<textarea>` or the `text`, `search`, `url`, `tel`,
   * `email`, or `password` types of the `<input>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)
   */
  onChange?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `copy` event fires when the user initiates a copy action through
   * the browser's user interface.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/copy_event)
   */
  onCopy?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * The `cut` event fires when the user initiates a cut action through
   * the browser's user interface.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/cut_event)
   */
  onCut?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * The `drag` event is fired every few hundred milliseconds as an element
   * or text selection is being dragged by the user.
   *
   * This event is cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event)
   */
  onDrag?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `dragend` event is fired when a drag operation ends (by releasing
   * a mouse button or hitting the escape key).
   *
   * This event is cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event)
   */
  onDragEnd?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `dragenter` event is fired when a dragged element or text selection
   * enters a valid drop target. The target object is the immediate user
   * selection (the element directly indicated by the user as the drop target),
   * or the `<body>` element.
   *
   * This event is cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event)
   */
  onDragEnter?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `dragleave` event is fired when a dragged element or text selection
   * leaves a valid drop target.
   *
   * This event is not cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event)
   */
  onDragLeave?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `dragover` event is fired when an element or text selection is being
   * dragged over a valid drop target (every few hundred milliseconds).
   *
   * This event is cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event)
   */
  onDragOver?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `dragstart` event is fired when the user starts dragging an element
   * or text selection.
   *
   * This event is cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event)
   */
  onDragStart?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `drop` event is fired when an element or text selection is dropped
   * on a valid drop target. To ensure that the `drop` event always fires as
   * expected, you should always include a `preventDefault()` call in the part
   * of your code which handles the `dragover` event.
   *
   * This event is cancelable and may bubble up to the `Document` and `Window`
   * objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event)
   */
  onDrop?(this: GlobalEventHandlers, event: DragEvent): any,

  /**
   * The `error` event is fired on an element when a resource failed to load,
   * or can't be used. For example, if a script has an execution error or
   * an image can't be found or is invalid.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event)
   */
  onError?(this: GlobalEventHandlers, event: UIEvent): any,

  /**
   * The `load` event fires for elements containing a resource when the resource
   * has successfully loaded. Currently, the list of supported HTML elements
   * are: `<body>`, `<embed>`, `<iframe>`, `<img>`, `<link>`, `<object>`,
   * `<script>`, `<style>`, and `<track>`.
   *
   * > **_NOTE:_**
   * The `load` event on `HTMLBodyElement` is actually an alias for
   * the `window.onload` event. Therefore, the `load` event will only fire on
   * the `<body>` element once all the document's resources have loaded or
   * errored. However, for the sake of clarity, it is recommended that
   * the event handler is attached to the `window` object directly rather
   * than on `HTMLBodyElement`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/load_event)
   */
  onLoad?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `paste` event fires when the user initiates a paste action through
   * the browser's user interface.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/paste_event)
   */
  onPaste?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * The `toggle` event fires on a popover element, `<dialog>` element,
   * or `<details>` element just after it is shown or hidden.
   *
   * - If the element is transitioning from hidden to showing,
   * the `event.oldState` property will be set to closed and
   * the `event.newState` property will be set to open.
   *
   * - If the element is transitioning from showing to hidden,
   * then `event.oldState` will be open and `event.newState` will be closed.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/toggle_event)
   */
  onToggle?(this: GlobalEventHandlers, event: ToggleEvent): any,
}
