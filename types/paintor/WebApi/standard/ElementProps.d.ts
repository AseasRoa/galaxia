import { NodeProps } from './NodeProps'
import { Bindable } from '../common'

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element)
 */
export interface ElementProps extends NodeProps {
  /**
   * Sets the value of the class attribute of the specified element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/className)
   * */
  class?: Bindable<string | string[]>,

  /**
   * Reflects the value of the `aria-atomic` attribute, which indicates whether
   * assistive technologies will present all, or only parts of, the changed
   * region based on the change notifications defined by the `aria-relevant`
   * attribute.
   *
   * A string with one of the following values:
   *
   * - `false`: Assistive technologies will present only the changed
   * node or nodes.
   *
   * - `true`: Assistive technologies will present the entire changed
   * region as a whole, including the author-defined label if one exists.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaAtomic)
   */
  ariaAtomic?: Bindable<'false'|'true'>,

  /**
   * Reflects the value of the `aria-autocomplete` attribute, which indicates
   * whether inputting text could trigger display of one or more predictions
   * of the user's intended value for a combobox, searchbox, or textbox and
   * specifies how predictions would be presented if they were made.
   *
   * A string with one of the following values:
   *
   * - `inline`: When a user is providing input, text suggesting one way to
   * complete the provided input may be dynamically inserted after the caret.
   *
   * - `list`: When a user is providing input, an element containing
   * a collection of values that could complete the provided input may
   * be displayed.
   *
   * - `both`: When a user is providing input, an element containing
   * a collection of values that could complete the provided input
   * may be displayed. If displayed, one value in the collection
   * is automatically selected, and the text needed to complete
   * the automatically selected value appears after the caret
   * in the input.
   *
   * - `none`: When a user is providing input, there is no display
   * of an automatic suggestion that attempts to predict how the
   * user intends to complete the input.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaAutoComplete)
   */
  ariaAutoComplete?: Bindable<'inline'|'list'|'both'|'none'>,

  /**
   * Reflects the value of the `aria-braillelabel` attribute, which defines
   * the ARIA braille label of the element.
   *
   * This element label may be used by assistive technologies that can present
   * content in braille, but should only be set if a braille-specific label
   * would improve the user experience. The `aria-braillelabel` contains
   * additional information about when the property should be set.
   *
   * The value is a string, an unconstrained value type, that is intended
   * to be converted into braille.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleLabel)
   */
  ariaBrailleLabel?: Bindable<string>,

  /**
   * Reflects the value of the `aria-brailleroledescription` attribute, which
   * defines the ARIA braille role description of the element.
   *
   * This property may be used to provide an abbreviated version of
   * the `aria-roledescription` value. It should only be used if
   * `aria-roledescription` is present and in the rare case where
   * it is too verbose for braille.
   * The `aria-brailleroledescription` contains additional information
   * about when the property should be set.
   *
   * The value is a string, an unconstrained value type, that is intended
   * to be converted into braille.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleRoleDescription)
   */
  ariaBrailleRoleDescription?: Bindable<string>,

  /**
   * Reflects the value of the aria-busy attribute, which indicates whether
   * an element is being modified, as assistive technologies may want to
   * wait until the modifications are complete before exposing them to
   * the user.
   *
   * A string with one of the following values:
   *
   * - `true`: The element is being updated.
   *
   * - `false`: There are no expected updates for the element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBusy)
   */
  ariaBusy?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-checked` attribute, which indicates the
   * current "checked" state of checkboxes, radio buttons, and other widgets
   * that have a checked state.
   *
   * > **_NOTE:_**
   * Where possible use an HTML `<input>` element with `type="checkbox"`
   * as this element has built in semantics and does not require
   * ARIA attributes.
   *
   * A string with one of the following values:
   *
   * - `true`: The element is checked.
   *
   * - `mixed`: Indicates a mixed mode value for a tri-state checkbox
   * or menuitemcheckbox.
   *
   * - `false`: The element supports being checked but is not
   * currently checked.
   *
   * - `undefined`: The element does not support being checked.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaChecked)
   */
  ariaChecked?: Bindable<'true'|'false'|'mixed'|'undefined'>,

  /**
   * Reflects the value of the `aria-colcount` attribute, which defines
   * the number of columns in a table, grid, or treegrid.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColCount)
   */
  ariaColCount?: Bindable<string>,

  /**
   * Reflects the value of the `aria-colindex` attribute, which defines an
   * element's column index or position with respect to the total number
   * of columns within a table, grid, or treegrid.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColIndex)
   */
  ariaColIndex?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-colindextext` attribute, which defines
   * a human-readable text alternative of aria-colindex.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColIndexText)
   */
  ariaColIndexText?: Bindable<string>,

  /**
   * Reflects the value of the `aria-colspan` attribute, which defines
   * the number of columns spanned by a cell or gridcell within a table,
   * grid, or treegrid.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColSpan)
   */
  ariaColSpan?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-current` attribute, which indicates
   * the element that represents the current item within a container
   * or set of related elements.
   *
   * A string with one of the following values:
   *
   * - `page`: Represents the current page within a set of pages.
   *
   * - `step`: Represents the current step within a process.
   *
   * - `location`: Represents the current location, for example
   * the current page in a breadcrumbs hierarchy.
   *
   * - `date`: Represents the current date within a collection of dates.
   *
   * - `time`: Represents the current time within a set of times.
   *
   * - `true`: Represents the current item within a set.
   *
   * - `false`: Does not represent the current item within a set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaCurrent)
   */
  ariaCurrent?: Bindable<'page'|'step'|'location'|'date'|'time'|'true'|'false'>,

  /**
   * Reflects the value of the `aria-description` attribute, which defines
   * a string value that describes or annotates the current element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDescription)
   */
  ariaDescription?: Bindable<string>,

  /**
   * Reflects the value of the `aria-disabled` attribute, which indicates
   * that the element is perceivable but disabled, so it is not editable
   * or otherwise operable.
   *
   * A string with one of the following values:
   *
   * - `true`: The element and all focusable descendants are disabled,
   * but perceivable, and their values cannot be changed by the user.
   *
   * - `false`: The element is enabled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDisabled)
   */
  ariaDisabled?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-expanded` attribute, which indicates
   * whether a grouping element owned or controlled by this element
   * is expanded or collapsed.
   *
   * A string with one of the following values:
   *
   * - `true`: The grouping element this element owns
   * or controls is expanded.
   *
   * - `false`: The grouping element this element owns
   * or controls is collapsed.
   *
   * - `undefined`: The element does not own or control
   * a grouping element that is expandable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaExpanded)
   */
  ariaExpanded?: Bindable<'true'|'false'|'undefined'>,

  /**
   * Reflects the value of the `aria-haspopup` attribute, which indicates
   * the availability and type of interactive popup element, such as menu
   * or dialog, that can be triggered by an element.
   *
   * A string with one of the following values:
   *
   * - `false`: The element does not have a popup.
   *
   * - `true`: The element has a popup that is a menu.
   *
   * - `menu`: The element has a popup that is a menu.
   *
   * - `listbox`: The element has a popup that is a listbox.
   *
   * - `tree`: The element has a popup that is a tree.
   *
   * - `grid`: The element has a popup that is a grid.
   *
   * - `dialog`: The element has a popup that is a dialog.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaHasPopup)
   */
  ariaHasPopup?: Bindable<'false'|'true'|'menu'|'listbox'|'tree'|'grid'|'dialog'>,

  /**
   * Reflects the value of the `aria-hidden` attribute, which indicates
   * whether the element is exposed to an accessibility API.
   *
   * A string with one of the following values:
   *
   * - `true`: The element is hidden from the accessibility API.
   *
   * - `false`: The element is exposed to the accessibility API
   * as if it were rendered.
   *
   * - `undefined`: The element's hidden state is determined
   * by the user agent based on whether it is rendered.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaHidden)
   */
  ariaHidden?: Bindable<'true'|'false'|'undefined'>,

  /**
   * Reflects the value of the `aria-keyshortcuts` attribute, which indicates
   * keyboard shortcuts that an author has implemented to activate or give
   * focus to an element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaKeyShortcuts)
   */
  ariaKeyShortcuts?: Bindable<string>,

  /**
   * Reflects the value of the `aria-label` attribute, which defines a string
   * value that labels the current element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLabel)
   */
  ariaLabel?: Bindable<string|null>,

  /**
   * Reflects the value of the `aria-level` attribute, which defines
   * the hierarchical level of an element within a structure.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLevel)
   */
  ariaLevel?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-live` attribute, which indicates that
   * an element will be updated, and describes the types of updates
   * the user agents, assistive technologies, and user can expect
   * from the
   * [live region](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
   * .
   *
   * A string with one of the following values:
   *
   * - `assertive`: Indicates that updates to the region have the highest
   * priority and should be presented to the user immediately.
   *
   * - `off`: Indicates that updates to the region should not be presented
   * to the user unless the user is currently focused on that region.
   *
   * - `polite`: Indicates that updates to the region should be presented
   * at the next graceful opportunity, such as at the end of speaking
   * the current sentence or when the user pauses typing.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLive)
   */
  ariaLive?: Bindable<'assertive'|'off'|'polite'>,

  /**
   * Reflects the value of the `aria-modal` attribute, which indicates whether
   * an element is modal when displayed. Applying the `aria-modal` property
   * to an element with `role="dialog"` replaces the technique of using
   * aria-hidden on the background for informing assistive technologies
   * that content outside a dialog is inert.
   *
   * A string with one of the following values:
   *
   * - `true`: The element is modal.
   *
   * - `false`: The element is not modal.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaModal)
   */
  ariaModal?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-multiline` attribute, which indicates
   * whether a text box accepts multiple lines of input or only a single line.
   *
   * A string with one of the following values:
   *
   * - `true`: This is a multi-line text box.
   *
   * - `false`: This is a single-line text box.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaMultiLine)
   */
  ariaMultiLine?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-multiselectable` attribute, which
   * indicates that the user may select more than one item from
   * the current selectable descendants.
   *
   * A string with one of the following values:
   *
   * - `true`: More than one item may be selected at a time.
   *
   * - `false`: Only one item may be selected.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaMultiSelectable)
   */
  ariaMultiSelectable?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-orientation` attribute, which indicates
   * whether the element's orientation is horizontal, vertical,
   * or unknown/ambiguous.
   *
   * A string with one of the following values:
   *
   * - `horizontal`: The element is horizontal.
   *
   * - `vertical`: The element is vertical.
   *
   * - `undefined`: The element's orientation is unknown.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaOrientation)
   */
  ariaOrientation?: Bindable<'horizontal'|'vertical'|'undefined'>,

  /**
   * Reflects the value of the `aria-placeholder` attribute, which defines
   * a short hint intended to aid the user with data entry when the control
   * has no value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPlaceholder)
   */
  ariaPlaceholder?: Bindable<string>,

  /**
   * Reflects the value of the `aria-posinset` attribute, which defines
   * an element's number or position in the current set of listitems
   * or treeitems.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPosInSet)
   */
  ariaPosInSet?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-pressed` attribute, which indicates
   * the current "pressed" state of toggle buttons.
   *
   * A string with one of the following values:
   *
   * - "true" - The element is pressed.
   *
   * - "false" - The element supports being pressed but is not
   * currently pressed.
   *
   * - "mixed" - Indicates a mixed mode value for a tri-state toggle button.
   *
   * - "undefined" - The element does not support being pressed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPressed)
   */
  ariaPressed?: Bindable<'true'|'false'|'mixed'|'undefined'>,

  /**
   * Reflects the value of the `aria-readonly` attribute, which indicates
   * that the element is not editable, but is otherwise operable.
   *
   * A string with one of the following values:
   *
   * - "true" - The user cannot change the value of the element.
   *
   * - "false" - The user can set the value of the element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaReadOnly)
   */
  ariaReadOnly?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-relevant` attribute, which indicates
   * what notifications the user agent will trigger when the accessibility
   * tree within a live region is modified. This is used to describe what
   * changes in an `aria-live` region are relevant and should be announced.
   *
   * A string containing one or more of the following values, space separated:
   *
   * - "additions" - Additions of Element Nodes within the live region should be considered relevant.
   *
   * - "removals" - Deletion of Nodes from the live region should be considered relevant.
   *
   * - "text" - Changes to the textual content of existing nodes should be considered relevant.
   *
   * - "all" - Equivalent to "additions removals text".
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRelevant)
   */
  ariaRelevant?: Bindable<'additions'|'removals'|'text'|'all'>,

  /**
   * Reflects the value of the `aria-required` attribute, which indicates
   * that user input is required on the element before a form may be submitted.
   *
   * A string with one of the following values:
   *
   * - "true" - Users need to provide input on an element before
   * a form is submitted.
   *
   * - "false" - User input is not necessary to submit the form.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRequired)
   */
  ariaRequired?: Bindable<'true'|'false'>,

  /**
   * Reflects the value of the `aria-roledescription` attribute, which defines
   * a human-readable, author-localized description for the role of an element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRoleDescription)
   */
  ariaRoleDescription?: Bindable<string>,

  /**
   * Reflects the value of the `aria-rowcount` attribute, which defines
   * the total number of rows in a table, grid, or treegrid.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowCount)
   */
  ariaRowCount?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-rowindex` attribute, which defines
   * an element's row index or position with respect to the total number
   * of rows within a table, grid, or treegrid.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndex)
   */
  ariaRowIndex?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-rowindextext` attribute, which defines
   * a human-readable text alternative of aria-rowindex.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndexText)
   */
  ariaRowIndexText?: Bindable<string>,

  /**
   * Reflects the value of the `aria-rowspan` attribute, which defines
   * the number of rows spanned by a cell or gridcell within a table,
   * grid, or treegrid.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowSpan)
   */
  ariaRowSpan?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-selected` attribute, which indicates
   * the current "selected" state of elements that have a selected state.
   *
   * A string with one of the following values:
   *
   * - "true" - The item is selected.
   *
   * - "false" - The item is not selected.
   *
   * - "undefined" - The item is not selectable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSelected)
   */
  ariaSelected?: Bindable<'true'|'false'|'undefined'>,

  /**
   * Reflects the value of the `aria-setsize` attribute, which defines
   * the number of items in the current set of listitems or treeitems.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSetSize)
   */
  ariaSetSize?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-sort` attribute, which indicates if items
   * in a table or grid are sorted in ascending or descending order.
   *
   * A string with one of the following values:
   *
   * - "ascending" - Items are sorted in ascending order by this column.
   *
   * - "descending" - Items are sorted in descending order by this column.
   *
   * - "none" - There is no defined sort applied to the column.
   *
   * - "other" - A sort algorithm other than ascending or descending
   * has been applied.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSort)
   */
  ariaSort?: Bindable<'ascending'|'descending'|'none'|'other'>,

  /**
   * Reflects the value of the `aria-valuemax` attribute, which defines
   * the maximum allowed value for a range widget.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueMax)
   */
  ariaValueMax?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-valuemin` attribute, which defines
   * the minimum allowed value for a range widget.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueMin)
   */
  ariaValueMin?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-valuenow` attribute, which defines
   * the current value for a range widget.
   *
   * A string which contains an integer, or an integer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueNow)
   */
  ariaValueNow?: Bindable<string|number>,

  /**
   * Reflects the value of the `aria-valuetext` attribute, which defines
   * the human-readable text alternative of aria-valuenow for a range widget.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueText)
   */
  ariaValueText?: Bindable<string>,

  /**
   * Sets the value of the class attribute of the specified element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/className)
   * */
  className?: Bindable<string | string[]>,

  /**
   * Identifies elements for observation in the
   * [PerformanceElementTiming API](https://developer.mozilla.org/docs/Web/API/PerformanceElementTiming)
   * . The `elementTiming` property reflects the value of the `elementtiming`
   * attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/elementTiming)
   * */
  elementTiming?: Bindable<string>,

  /**
   * Represents the element's identifier, reflecting the id global attribute.
   *
   * If the `id` value is not the empty string, it must be unique in a document.
   *
   * The `id` is often used with `getElementById()` to retrieve a particular
   * element. Another common case is to use an element's ID as a selector when
   * styling the document with CSS.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/id)
   */
  id?: Bindable<string>,

  /**
   * `innerHTML` gets or sets the HTML or XML markup contained within
   * the element.
   *
   * More precisely, `innerHTML` gets a serialization of the nested child DOM
   * elements within the element, or sets HTML or XML that should be parsed
   * to replace the DOM tree within the element.
   *
   * To insert the HTML into the document rather than replace the contents
   * of an element, use the method `insertAdjacentHTML()`.
   *
   * The serialization of the DOM tree read from the property does not include
   * shadow roots — if you want to get a HTML string that includes shadow roots,
   * you must instead use the `Element.getHTML()` or `ShadowRoot.getHTML()`
   * methods. Similarly, when setting element content using `innerHTML`,
   * the HTML string is parsed into DOM elements that do not contain
   * shadow roots.
   *
   * So for example `<template>` is parsed into as `HTMLTemplateElement`,
   * whether the shadowrootmode attribute is specified In order
   * to set an element's contents from an HTML string that includes
   * declarative shadow roots, you must use either `Element.setHTMLUnsafe()`
   * or `ShadowRoot.setHTMLUnsafe()`.
   *
   * Setting the value of `innerHTML` removes all of the element's descendants
   * and replaces them with nodes constructed by parsing the HTML given in
   * the string *htmlString*.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/innerHTML)
   */
  innerHTML?: Bindable<string>,

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/outerHTML) */
  // Gives error like "... element has no parent."
  // outerHTML: Bindable<Element['outerHTML']>,

  /**
   * Represents the part identifier(s) of the element (i.e. set using
   * the `part` attribute), returned as a `DOMTokenList`. These can be
   * used to style parts of a shadow DOM, via the `::part` pseudo-element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/part)
   */
  part?: Bindable<DOMTokenList>,

  /**
   * Sets the number of pixels by which an element's content is scrolled from
   * its left edge. This value is subpixel precise in modern browsers, meaning
   * that it isn't necessarily a whole number.
   *
   * A double-precision floating-point value indicating the number of pixels
   * by which the element is currently scrolled horizontally from the origin,
   * where a positive value means the element is scrolled to the right
   * (to reveal more content to the right). If the element isn't scrolled
   * at all left or right, then `scrollLeft` is 0. If the document is not
   * the active document, the returned value is 0. If the document is rendered
   * on a subpixel-precise device, then the returned value is also
   * subpixel-precise and may contain a decimal component.
   *
   * It's possible for `scrollLeft` to be negative if the element can be
   * scrolled to the left from the initial containing block. For example,
   * if the element's direction is `rtl` (right-to-left) and content grows
   * to the left, then `scrollLeft` is 0 when the scrollbar is at its rightmost
   * position (at the start of the scrolled content), and then increasingly
   * negative as you scroll towards the end of the content.
   *
   * The `scrollLeft` property can be set, which causes the element to scroll
   * to the specified horizontal position, in the same way as using
   * `Element.scroll()` with `behavior: "auto"`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollLeft)
   */
  scrollLeft?: Bindable<number>,

  /**
   * Sets the number of pixels by which an element's content is scrolled from
   * its top edge. This value is subpixel precise in modern browsers, meaning
   * that it isn't necessarily a whole number.
   *
   * A double-precision floating-point value indicating the number of pixels
   * by which the element is currently scrolled vertically from the origin,
   * where a positive value means the element is scrolled down
   * (to reveal more content to the bottom). If the element isn't scrolled
   * at all up or down, then `scrollTop` is 0. If the document is not
   * the active document, the returned value is 0. If the document is rendered
   * on a subpixel-precise device, then the returned value is also
   * subpixel-precise and may contain a decimal component.
   *
   * It's possible for `scrollTop` to be negative if the element can be
   * scrolled up from the initial containing block. For example,
   * if the element's `flex-direction` is `column-reverse` and content grows
   * upwards, then `scrollTop` is 0 when the scrollbar is at its bottommost
   * position (at the start of the scrolled content), and then increasingly
   * negative as you scroll towards the end of the content.
   *
   * The `scrollTop` property can be set, which causes the element to scroll
   * to the specified vertical position, in the same way as using
   * `Element.scroll()` with `behavior: "auto"`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollLeft)
   */
  scrollTop?: Bindable<number>,

  /**
   * Returns the name of the shadow DOM slot the element is inserted in.
   *
   * A slot is a placeholder inside a web component that users can fill with
   * their own markup (see Using templates and slots for more information).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/slot)
   */
  slot?: Bindable<string>,

  /**
   * The `animationcancel` event is fired when a
   * [CSS Animation](https://developer.mozilla.org/docs/Web/CSS/CSS_animations)
   * unexpectedly aborts. In other words, any time it stops running without
   * sending an `animationend` event. This might happen when the
   * `animation-name` is changed such that the animation is removed, or when the
   * animating node is hidden using CSS. Therefore, either directly or because
   * any of its containing nodes are hidden.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event)
   */
  onAnimationCancel?(this: GlobalEventHandlers, event: AnimationEvent): any,

  /**
   * The `animationend` event is fired when a
   * [CSS Animation](https://developer.mozilla.org/docs/Web/CSS/CSS_animations)
   * has completed. If the animation aborts before reaching completion, such as
   * if the element is removed from the DOM or the animation is removed from the
   * element, the `animationend` event is not fired.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)
   */
  onAnimationEnd?(this: GlobalEventHandlers, event: AnimationEvent): any,

  /**
   * The `animationiteration` event is fired when an iteration of a
   * [CSS Animation](https://developer.mozilla.org/docs/Web/CSS/CSS_animations)
   * ends, and another one begins. This event does not occur at the same time as
   * the `animationend` event, and therefore does not occur for animations with
   * an `animation-iteration-count` of one.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)
   */
  onAnimationIteration?(this: GlobalEventHandlers, event: AnimationEvent): any,

  /**
   * The `animationstart` event is fired when a
   * [CSS Animation](https://developer.mozilla.org/docs/Web/CSS/CSS_animations)
   * has started. If there is an `animation-delay`, this event will fire once
   * the delay period has expired. A negative delay will cause the event to fire
   * with an `elapsedTime` equal to the absolute value of the delay (and,
   * correspondingly, the animation will begin playing at that time index into
   * the sequence).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)
   */
  onAnimationStart?(this: GlobalEventHandlers, event: AnimationEvent): any,

  /**
   * The `auxclick` event is fired at an `Element` when a non-primary pointing
   * device button (any mouse button other than the primary—usually
   * leftmost—button) has been pressed and released both within the same
   * element.
   *
   * `auxclick` is fired after the `mousedown` and `mouseup` events have been
   * fired, in that order.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/auxclick_event)
   */
  onAuxClick?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The DOM `beforeinput` event fires when the value of an `<input>` or
   * `<textarea>` element is about to be modified. But in contrast to the
   * `input` event, it does not fire on the `<select>` element. The event also
   * applies to elements with `contenteditable` enabled, and to any element when
   * designMode is turned on.
   *
   * This allows web apps to override text edit behavior before the browser
   * modifies the DOM tree, and provides more control over input events to
   * improve performance.
   *
   * In the case of contenteditable and designMode, the event target is the
   * editing host. If these properties apply to multiple elements, the editing
   * host is the nearest ancestor element whose parent isn't editable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforeinput_event)
   */
  onBeforeInput?(this: GlobalEventHandlers, event: InputEvent): any,

  /**
   * An element receives a `beforematch` event when it is in the hidden until
   * found state and the browser is about to reveal its content because the
   * user has found the content through the "find in page" feature or through
   * fragment navigation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforematch_event)
   */
  onBeforeMatch?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `blur` event fires when an element has lost focus. The event does not
   * bubble, but the related `focusout` event that follows does bubble.
   *
   * An element will lose focus if another element is selected. An element will
   * also lose focus if a style that does not allow focus is applied, such as
   * `hidden`, or if the element is removed from the document — in both of these
   * cases focus moves to the `body` element (viewport). Note however that
   * `blur` is not fired when a focused element is removed from the document.
   *
   * The opposite of `blur` is the `focus` event, which fires when the element
   * has received focus.
   *
   * The `blur` event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/blur_event)
   */
  onBlur?(this: GlobalEventHandlers, event: FocusEvent): any,

  /**
   * An element receives a `click` event when any of the following occurs:
   *
   * - A pointing-device button (such as a mouse's primary button) is both
   * pressed and released while the pointer is located inside the element.
   * - A touch gesture is performed on the element.
   * - Any user interaction that is equivalent to a click, such as pressing the
   * `Space` key or `Enter` key while the element is focused. Note that this
   * only applies to elements with a default key event handler, and therefore,
   * excludes other elements that have been made focusable by setting the
   * `tabIndex` attribute.
   *
   * If the button is pressed on one element and the pointer is moved outside
   * the element before the button is released, the event is fired on the most
   * specific ancestor element that contained both elements.
   *
   * `click` fires after both the `mousedown` and `mouseup` events have fired,
   * in that order.
   *
   * The event is a device-independent event — meaning it can be activated by
   * touch, keyboard, mouse, and any other mechanism provided by assistive
   * technology.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/click_event)
   */
  onClick?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `compositionend` event is fired when a text composition system such
   * as an
   * [input method editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor)
   * completes or cancels the current composition session.
   *
   * For example, this event could be fired after a user finishes entering
   * a Chinese character using a
   * [Pinyin](https://en.wikipedia.org/wiki/Pinyin)
   * [Input method editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/compositionend_event)
   */
  onCompositionEnd?(this: GlobalEventHandlers, event: CompositionEvent): any,

  /**
   * The `compositionstart` event is fired when a text composition system such
   * as an
   * [input method editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor)
   * starts a new composition session.
   *
   * For example, this event could be fired after a user starts entering
   * a Chinese character using a
   * [Pinyin](https://en.wikipedia.org/wiki/Pinyin)
   * [Input method editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/compositionend_event)
   */
  onCompositionStart?(this: GlobalEventHandlers, event: CompositionEvent): any,

  /**
   * The `compositionupdate` event is fired when a new character is received
   * in the context of a text composition session controlled by a text
   * composition system such as an
   * [input method editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor)
   * .
   *
   * For example, this event could be fired while a user enters a Chinese
   * character using a
   * [Pinyin](https://en.wikipedia.org/wiki/Pinyin)
   * [Input method editor](https://developer.mozilla.org/docs/Glossary/Input_method_editor).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/compositionend_event)
   */
  onCompositionUpdate?(this: GlobalEventHandlers, event: CompositionEvent): any,

  /**
   * The `contextmenu` event fires when the user attempts to open a context
   * menu. This event is typically triggered by clicking the right mouse button,
   * or by pressing the context menu key.
   *
   * In the latter case, the context menu is displayed at the bottom left of the
   * focused element, unless the element is a tree, in which case the context
   * menu is displayed at the bottom left of the current row.
   *
   * Any right-click event that is not disabled (by calling the click event's
   * `preventDefault()` method) will result in a `contextmenu` event being fired
   * at the targeted element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event)
   */
  onContextMenu?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `copy` event of the
   * [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API)
   * fires when the user initiates a copy action through the browser's user interface.
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
   * It's possible to construct and dispatch a synthetic `copy` event, but this
   * will not affect the system clipboard.
   *
   * This event bubbles, is cancelable and is composed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/copy_event)
   */
  onCopy?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * The `cut` event of the
   * [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API)
   * is fired when the user has initiated a "cut" action through the browser's
   * user interface.
   *
   * If the user attempts a cut action on uneditable content, the `cut` event
   * still fires but the event object contains no data.
   *
   * The event's default action is to copy the current selection (if any) to the
   * system clipboard and remove it from the document.
   *
   * A handler for this event can modify the clipboard contents by calling
   * `setData(format, data)` on the event's `ClipboardEvent.clipboardData`
   * property, and cancelling the default action using `event.preventDefault()`.
   *
   * Note though that cancelling the default action will also prevent the
   * document from being updated. So an event handler which wants to emulate
   * the default action for "cut" while modifying the clipboard must also
   * manually remove the selection from the document.
   *
   * The handler cannot read the clipboard data.
   *
   * It's possible to construct and dispatch a synthetic cut event, but this
   * will not affect the system clipboard or the document's contents.
   *
   * This event bubbles, is cancelable and is composed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/cut_event)
   */
  onCut?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * The `dblclick` event fires when a pointing device button (such as a mouse's
   * primary button) is double-clicked; that is, when it's rapidly clicked twice
   * on a single element within a very short span of time.
   *
   * `dblclick` fires after two `click` events (and by extension, after two
   * pairs of `mousedown` and `mouseup` events).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/dblclick_event)
   */
  onDblClick?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `focus` event fires when an element has received focus. The event does
   * not bubble, but the related `focusin` event that follows does bubble.
   *
   * The opposite of `focus` is the `blur` event, which fires when the element has
   * lost focus.
   *
   * The `focus` event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focus_event)
   */
  onFocus?(this: GlobalEventHandlers, event: FocusEvent): any,

  /**
   * The `focusin` event fires when an element has received focus, after the
   * `focus` event. The two events differ in that `focusin` bubbles, while
   * `focus` does not.
   *
   * The opposite of `focusin` is the `focusout` event, which fires when the
   * element has lost focus.
   *
   * The `focusin` event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focusin_event)
   */
  onFocusIn?(this: GlobalEventHandlers, event: FocusEvent): any,

  /**
   * The `focusout` event fires when an element has lost focus, after the `blur`
   * event. The two events differ in that `focusout` bubbles, while
   * `blur` does not.
   *
   * The opposite of `focusout` is the `focusin` event, which fires when the
   * element has received focus.
   *
   * The `focusout` event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focusout_event)
   */
  onFocusOut?(this: GlobalEventHandlers, event: FocusEvent): any,

  /**
   * The `fullscreenchange` event is fired immediately after an `Element`
   * switches into or out of fullscreen mode.
   *
   * This event is sent to the `Element` which is transitioning into or out of fullscreen mode.
   *
   * To find out whether the `Element` is entering or exiting fullscreen mode,
   * check the value of Document.fullscreenElement: if this value is `null`
   * then the element is exiting fullscreen mode, otherwise it is entering
   * fullscreen mode.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/fullscreenchange_event)
   */
  onFullScreenChange?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `fullscreenerror` event is fired when the browser cannot switch to
   * fullscreen mode.
   *
   * As with the `fullscreenchange` event, two `fullscreenerror` events are
   * fired; the first is sent to the `Element` which failed to change modes,
   * and the second is sent to the `Document` which owns that element.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/fullscreenerror_event)
   */
  onFullScreenError?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `gotpointercapture` event is fired when an element captures a pointer
   * using `setPointerCapture()`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event)
   */
  onGotPointerCapture?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The input event fires when the value of an `<input>`, `<select>`, or
   * `<textarea>` element has been changed as a direct result of a user action
   * (such as typing in a textbox or checking a checkbox).
   *
   * The event also applies to elements with `contenteditable` enabled, and to
   * any element when `designMode` is turned on. In the case of
   * `contenteditable` and `designMode`, the event target is the *editing host*.
   * If these properties apply to multiple elements, the editing host is the
   * nearest ancestor element whose parent isn't editable.
   *
   * For `<input>` elements with `type=checkbox` or `type=radio`, the `input`
   * event should fire whenever a user toggles the control, per the
   * [HTML Living Standard specification](https://html.spec.whatwg.org/multipage/input.html#the-input-element:event-input-2)
   * . However, historically this has not always been the case. Check
   * compatibility, or use the `change` event instead for elements of these
   * types.
   *
   * For `<textarea>` and `<input>` elements that accept text input
   * (`type=text`, `type=tel`, etc.), the interface is `InputEvent`; for others,
   * the interface is `Event`.
   *
   * The `input` event is fired every time the `value` of the element changes.
   * This is unlike the `change` event, which only fires when the value is
   * committed, such as by pressing the enter key or selecting a value from a
   * list of options. Note that the `input` event is not fired when JavaScript
   * changes an element's `value` programmatically.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/input_event)
   */
  onInput?(this: GlobalEventHandlers, event: InputEvent): any,

  /**
   * The `keydown` event is fired when a key is pressed.
   *
   * Unlike the deprecated `keypress` event, the `keydown` event is fired for
   * all keys, regardless of whether they produce a character value.
   *
   * The `keydown` and `keyup` events provide a code indicating which key is
   * pressed, while `keypress` indicates which character was entered.
   * For example, a lowercase "a" will be reported as 65 by `keydown` and
   * `keyup`, but as 97 by `keypress`. An uppercase "A" is reported as 65 by
   * all events.
   *
   * The event target of a key event is the currently focused element which is
   * processing the keyboard activity. This includes: `<input>`, `<textarea>`,
   * anything that is `contentEditable`, and anything else that can be
   * interacted with the keyboard, such as `<a>`, `<button>`, and `<summary>`.
   * If no suitable element is in focus, the event target will be the `<body>`
   * or the root. If not caught, the event `bubbles` up the DOM tree until
   * reaching `Document`.
   *
   * The event target might change between different key events. For example,
   * the `keydown` target for pressing the `Tab` key would be different from
   * the `keyup` target, because the focus has changed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keydown_event)
   */
  onKeyDown?(this: GlobalEventHandlers, event: KeyboardEvent): any,

  /**
   * The `keypress` event is fired when a letter, number, punctuation, or symbol
   * key is pressed, or else when the `Enter` key is pressed — including when
   * the `Enter` key is pressed in combination with the `Shift` key or `Ctrl`
   * key. Otherwise, when a modifier key such as the `Alt`, `Shift`, `Ctrl`,
   * `Meta`, `Esc`, or Option key is pressed in isolation, the keypress event
   * is not fired.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keypress_event)
   *
   * @deprecated
   */
  onKeyPress?(this: GlobalEventHandlers, event: KeyboardEvent): any,

  /**
   * The `keyup` event is fired when a key is released.
   *
   * The `keydown` and `keyup` events provide a code indicating which key is
   * pressed, while `keypress` indicates which character was entered.
   * For example, a lowercase "a" will be reported as 65 by `keydown` and
   * `keyup`, but as 97 by `keypress`. An uppercase "A" is reported as 65 by
   * all events.
   *
   * The event target of a key event is the currently focused element which is
   * processing the keyboard activity. This includes: `<input>`, `<textarea>`,
   * anything that is `contentEditable`, and anything else that can be
   * interacted with the keyboard, such as `<a>`, `<button>`, and `<summary>`.
   * If no suitable element is in focus, the event target will be the `<body>`
   * or the root. If not caught, the event `bubbles` up the DOM tree until
   * reaching `Document`.
   *
   * The event target might change between different key events. For example,
   * the `keydown` target for pressing the `Tab` key would be different from the
   * `keyup` target, because the focus has changed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keyup_event)
   */
  onKeyUp?(this: GlobalEventHandlers, event: KeyboardEvent): any,

  /**
   * The `lostpointercapture` event is fired when a
   * [captured pointer](https://developer.mozilla.org/docs/Web/API/Pointer_events#pointer_capture)
   * is released.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/lostpointercapture_event)
   */
  onLostPointerCapture?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `mousedown` event is fired at an `Element` when a pointing device
   * button is pressed while the pointer is inside the element.
   *
   * > **_NOTE:_**
   * This differs from the `click` event in that `click` is fired after a
   * full click action occurs; that is, the mouse button is pressed and released
   * while the pointer remains inside the same element. `mousedown` is fired the
   * moment the button is initially pressed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousedown_event)
   */
  onMouseDown?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `mouseenter` event is fired at an `Element` when a pointing device
   * (usually a mouse) is initially moved so that its hotspot is within the
   * element at which the event was fired.
   *
   * Note that "moving into an element" refers to the element's position in the
   * DOM tree, not to its visual position. For example, if a child element is
   * positioned so it is placed outside its parent, then moving into the child
   * element will trigger `mouseenter` on the parent element, even though the
   * pointer is still outside the bounds of the parent element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event)
   */
  onMouseEnter?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `mouseleave` event is fired at an `Element` when the cursor of a
   * pointing device (usually a mouse) is moved out of it.
   *
   * `mouseleave` and `mouseout` are similar but differ in that `mouseleave`
   * does not bubble and `mouseout` does. This means that `mouseleave` is fired
   * when the pointer has exited the element and all of its descendants,
   * whereas `mouseout` is fired when the pointer leaves the element or leaves
   * one of the element's descendants (even if the pointer is still within the
   * element).
   *
   * The `mouseleave` and `mouseout` events will not be triggered when the
   * element is replaced or removed from the DOM.
   *
   * Note that "moving out of an element" refers to the element's position in
   * the DOM tree, not to its visual position. For example, if two sibling
   * elements are positioned so one is placed inside the other, then moving
   * from the outer element into the inner element will trigger `mouseleave` on
   * the outer element, even though the pointer is still in the bounds of the
   * outer element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event)
   */
  onMouseLeave?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `mousemove` event is fired at an element when a pointing device
   * (usually a mouse) is moved while the cursor's hotspot is inside it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousemove_event)
   */
  onMouseMove?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `mouseout` event is fired at an `Element` when a pointing device
   * (usually a mouse) is used to move the cursor so that it is no longer
   * contained within the element or one of its children.
   *
   * `mouseout` is also delivered to an element if the cursor enters a child
   * element, because the child element obscures the visible area of the
   * element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseout_event)
   */
  onMouseOut?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `mouseover` event is fired at an `Element` when a pointing device
   * (such as a mouse or trackpad) is used to move the cursor onto the element
   * or one of its child elements.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseover_event)
   */
  onMouseOver?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The `mouseup` event is fired at an `Element` when a button on a pointing
   * device (such as a mouse or trackpad) is released while the pointer is
   * located inside it.
   *
   * `mouseup` events are the counterpoint to `mousedown` events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseup_event)
   */
  onMouseUp?(this: GlobalEventHandlers, event: MouseEvent): any,

  /**
   * The *obsolete* and *non-standard* `mousewheel` event is fired
   * asynchronously at an `Element` to provide updates while a mouse wheel or
   * similar device is operated. The `mousewheel` event was never part of any
   * standard, and while it was implemented by several browsers, it was never
   * implemented by Firefox.
   *
   * > **_NOTE:_**
   * Instead of this obsolete event, use the standard `wheel` event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousewheel_event)
   *
   * @deprecated
   */
  onMouseWheel?(this: GlobalEventHandlers, event: WheelEvent): any,

  /**
   * The `paste` event of the
   * [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API)
   * is fired when the user has initiated a "paste" action through the browser's
   * user interface.
   *
   * If the cursor is in an editable context (for example, in a `<textarea>` or
   * an element with `contenteditable` attribute set to `true`) then the default
   * action is to insert the contents of the clipboard into the document at the
   * cursor position.
   *
   * A handler for this event can access the clipboard contents by calling
   * `getData()` on the event's `clipboardData` property.
   *
   * To override the default behavior (for example to insert some different data
   * or a transformation of the clipboard contents) an event handler must cancel
   * the default action using `event.preventDefault()`, and then insert its
   * desired data manually.
   *
   * It's possible to construct and dispatch a synthetic `paste` event, but this
   * will not affect the document's contents.
   *
   * This event bubbles, is cancelable and is composed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/paste_event)
   */
  onPaste?(this: GlobalEventHandlers, event: ClipboardEvent): any,

  /**
   * The `pointercancel` event is fired when the browser determines that there
   * are unlikely to be any more pointer events, or if after the `pointerdown`
   * event is fired, the pointer is then used to manipulate the viewport by
   * panning, zooming, or scrolling.
   *
   * Some examples of situations that will trigger a `pointercancel` event:
   *
   * - A hardware event occurs that cancels the pointer activities. This may
   * include, for example, the user switching applications using an application
   * switcher interface or the "home" button on a mobile device.
   * - The device's screen orientation is changed while the pointer is active.
   * - The browser decides that the user started pointer input accidentally.
   * This can happen if, for example, the hardware supports palm rejection to
   * prevent a hand resting on the display while using a stylus from
   * accidentally triggering events.
   * - The `touch-action` CSS property prevents the input from continuing.
   * - When the user interacts with too many simultaneous pointers, the browser
   * can fire this event for all existing pointers (even if the user is still
   * touching the screen).
   *
   * > **_NOTE:_**
   * After the `pointercancel` event is fired, the browser will also send
   * `pointerout` followed by `pointerleave`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event)
   */
  onPointerCancel?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointerdown` event is fired when a pointer becomes active. For mouse,
   * it is fired when the device transitions from no buttons pressed to at least
   * one button pressed. For touch, it is fired when physical contact is made
   * with the digitizer. For pen, it is fired when the stylus makes physical
   * contact with the digitizer.
   *
   * > **_NOTE:_**
   * For touchscreen browsers that allow direct manipulation, a
   * pointerdown event triggers implicit pointer capture, which causes the
   * target to capture all subsequent pointer events as if they were occurring
   * over the capturing target. Accordingly, `pointerover`, `pointerenter`,
   * `pointerleave`, and `pointerout` will not fire as long as this capture is
   * set. The capture can be released manually by calling
   * `element.releasePointerCapture` on the target element, or it will be
   * implicitly released after a `pointerup` or `pointercancel` event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event)
   */
  onPointerDown?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointerenter` event fires when a pointing device is moved into the hit
   * test boundaries of an element or one of its descendants, including as a
   * result of a `pointerdown` event from a device that does not support hover
   * (see `pointerdown`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event)
   */
  onPointerEnter?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointerleave` event is fired when a pointing device is moved out of
   * the hit test boundaries of an element. For pen devices, this event is fired
   * when the stylus leaves the hover range detectable by the digitizer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event)
   */
  onPointerLeave?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointermove` event is fired when a pointer changes coordinates, and
   * the pointer has not been canceled by a browser touch-action.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointermove_event)
   */
  onPointerMove?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointerout` event is fired for several reasons including: pointing
   * device is moved out of the hit test boundaries of an element; firing the
   * `pointerup` event for a device that does not support hover
   * (see `pointerup`); after firing the `pointercancel` event
   * (see `pointercancel`); when a pen stylus leaves the hover
   * range detectable by the digitizer.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerout_event)
   */
  onPointerOut?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointerover` event is fired when a pointing device is moved into an
   * element's hit test boundaries.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerover_event)
   */
  onPointerOver?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `pointerup` event is fired when a pointer is no longer active.
   * Remember that it is possible to get a `pointercancel` event instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerup_event)
   */
  onPointerUp?(this: GlobalEventHandlers, event: PointerEvent): any,

  /**
   * The `scroll` event fires when an element has been scrolled. To detect when
   * scrolling has completed, see the `scrollend` event of `Element`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scroll_event)
   */
  onScroll?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `scrollend` event fires when element scrolling has completed.
   * Scrolling is considered completed when the scroll position has no more
   * pending updates and the user has completed their gesture.
   *
   * Scroll position updates include smooth or instant mouse wheel scrolling,
   * keyboard scrolling, scroll-snap events, or other APIs and gestures which
   * cause the scroll position to update. User gestures like touch panning or
   * trackpad scrolling aren't complete until pointers or keys have released.
   * If the scroll position did not change, then no scrollend event fires.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollend_event)
   */
  onScrollEnd?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `securitypolicyviolation` event is fired when a
   * [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP)
   * is violated.
   *
   * The event is fired on the element when there is a violation of the CSP
   * policy.
   *
   * This event bubbles and is composed. It is normally handled by an event
   * handler on the `Window` or `Document` object.
   *
   * > **_NOTE:_**
   * You should add the handler for this event to a top level object
   * (i.e. `Window` or `Document`). While the property exists in HTML elements,
   * you can't assign a handler to the property until the elements have been
   * loaded, by which time this event will already have fired.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/securitypolicyviolation_event)
   */
  onSecurityPolicyViolation?(
    this: GlobalEventHandlers,
    event: SecurityPolicyViolationEvent
  ): any,

  /**
   * The `touchcancel` event is fired when one or more touch points have been
   * disrupted in an implementation-specific manner.
   *
   * Some examples of situations that will trigger a `touchcancel` event:
   *
   * - A hardware event occurs that cancels the touch activities.
   * This may include, for example, the user switching applications using an
   * application switcher interface or the "home" button on a mobile device.
   * - The device's screen orientation is changed while the touch is active.
   * - The browser decides that the user started touch input accidentally.
   * This can happen if, for example, the hardware supports palm rejection
   * to prevent a hand resting on the display while using a stylus from
   * accidentally triggering events.
   * - The `touch-action` CSS property prevents the input from continuing.
   * - When the user interacts with too many fingers simultaneously, the
   * browser can fire this event for all existing pointers (even if the
   * user is still touching the screen).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchcancel_event)
   */
  onTouchCancel?(this: GlobalEventHandlers, event: TouchEvent): any,

  /**
   * The touchend event fires when one or more touch points are removed
   * from the touch surface. Remember that it is possible to get a
   * touchcancel event instead.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchend_event)
   */
  onTouchEnd?(this: GlobalEventHandlers, event: TouchEvent): any,

  /**
   * The `touchmove` event is fired when one or more touch points
   * are moved along the touch surface.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchmove_event)
   */
  onTouchMove?(this: GlobalEventHandlers, event: TouchEvent): any,

  /**
   * The `touchstart` event is fired when one or more touch points
   * are placed on the touch surface.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchstart_event)
   */
  onTouchStart?(this: GlobalEventHandlers, event: TouchEvent): any,

  /**
   * The `transitioncancel` event is fired when a
   * [CSS transition](https://developer.mozilla.org/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
   * is canceled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event)
   */
  onTransitionCancel?(this: GlobalEventHandlers, event: TransitionEvent): any,

  /**
   * The `transitionend` event is fired when a
   * [CSS transition](https://developer.mozilla.org/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
   * has completed. In the case where a transition is removed before completion,
   * such as if the `transition-property` is removed or `display` is set to
   * none, then the event will not be generated.
   *
   * The `transitionend` event is fired in both directions - as it finishes
   * transitioning to the transitioned state, and when it fully reverts to
   * the default or non-transitioned state. If there is no transition delay
   * or duration, if both are 0s or neither is declared, there is no
   * transition, and none of the transition events are fired.
   * If the `transitioncancel` event is fired, the `transitionend` event
   * will not fire.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)
   */
  onTransitionEnd?(this: GlobalEventHandlers, event: TransitionEvent): any,

  /**
   * The `transitionrun` event is fired when a
   * [CSS transition](https://developer.mozilla.org/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
   * is first created, i.e. before any `transition-delay` has begun.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event)
   */
  onTransitionRun?(this: GlobalEventHandlers, event: TransitionEvent): any,

  /**
   * The `transitionstart` event is fired when a
   * [CSS transition](https://developer.mozilla.org/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
   * has actually started, i.e., after any `transition-delay` has ended.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event)
   */
  onTransitionStart?(this: GlobalEventHandlers, event: TransitionEvent): any,

  /**
   * The `wheel` event fires when the user rotates a wheel button on a pointing
   * device (typically a mouse). It is also fired for related devices that
   * simulate wheel actions, such as trackpads and mouse balls.
   *
   * This event replaces the non-standard deprecated `mousewheel` event.
   *
   * Don't confuse the `wheel` event with the `scroll` event:
   *
   * - A `wheel` event doesn't necessarily dispatch a `scroll` event.
   * For example, the element may be unscrollable at all.
   * Zooming actions using the wheel or trackpad also fire `wheel` events.
   * - A `scroll` event isn't necessarily triggered by a `wheel` event.
   * Elements can also be scrolled by using the keyboard, dragging a scrollbar,
   * or using JavaScript.
   * - Even when the `wheel` event does trigger scrolling, the `delta*` values
   * in the `wheel` event don't necessarily reflect the content's scrolling direction.
   *
   * Therefore, do not rely on the `wheel` event's `delta*` properties to get
   * the scrolling direction. Instead, detect value changes of `scrollLeft` and
   * `scrollTop` of the target in the `scroll` event.
   *
   * The `wheel` event is cancelable. If the event is canceled, no scrolling
   * or zooming is performed. This may cause performance issues as the browser
   * has to wait for every wheel event to be processed before actually scrolling
   * the content. You can avoid this by setting `passive: true` when calling
   * `addEventListener()`, which may cause the browser to generate
   * non-cancelable wheel events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/wheel_event)
   */
  onWheel?(this: GlobalEventHandlers, event: WheelEvent): any,
}
