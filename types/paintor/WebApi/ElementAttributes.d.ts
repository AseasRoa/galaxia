import { Combo } from './common'

type CommonAttributes = {
  /** @see https://www.w3schools.com/tags/att_script_crossorigin.asp */
  crossorigin? : Combo<'anonymous'|'use-credentials'>,

  /** @see https://www.w3schools.com/tags/att_button_formenctype.asp */
  enctype? : Combo<'application/x-www-form-urlencoded'|'multipart/form-data'|'text/plain'>,

  /** @see https://www.w3schools.com/tags/att_button_formmethod.asp */
  method? : Combo<'get'|'post'|'GET'|'POST'>,

  /** @see https://www.w3schools.com/tags/att_img_loading.asp */
  loading? : Combo<'eager'|'lazy'>,

  /** @see https://www.w3schools.com/tags/att_button_formtarget.asp */
  formtarget? : Combo<'_blank'|'_parent'|'_self'|'_top'|string>,

  /** @see https://www.w3schools.com/tags/att_audio_preload.asp */
  preload? : Combo<'auto'|'metadata'|'none'>,

  /** @see https://www.w3schools.com/tags/att_a_referrepolicy.asp */
  referrerpolicy? : Combo<'no-referrer'|'no-referrer-when-downgrade'|'origin'|'origin-when-cross-origin'
  |'same-origin' |'strict-origin-when-cross-origin'|'unsafe-url'>,

  /** @see https://www.w3schools.com/tags/att_a_target.asp */
  target? : Combo<'_blank'|'_parent'|'_self'|'_top'|string>,

  /** @see https://www.w3schools.com/tags/att_a_rel.asp */
  rel? : Combo<'alternate'|'author'|'bookmark'|'external'|'help'|'license'|'next'
  |'nofollow'|'noopener'|'noreferrer'|'prev'|'search'|''|'tag'>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types */
  imageMimeTypes? : Combo<string|'image/apng'|'image/avif'|'image/gif'|'image/jpeg'|'image/png'
  |'image/svg+xml'|'image/webp'|'image/bmp'|'image/x-icon'|'image/tiff'>,
}

/**
 * @see https://www.w3schools.com/tags/ref_standardattributes.asp
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
 * @see https://www.tutorialrepublic.com/html-reference/html5-global-attributes.php
 */
export type GlobalElementAttributes = {
  /**
   * Keyboard shortcut to activate or add focus to the element.
   *
   * @see https://www.w3schools.com/tags/att_global_accesskey.asp
   */
  accesskey? : Combo<string>,

  /**
   * Sets whether input is automatically capitalized when entered by user.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
   */
  autocapitalize? : Combo<'on'|'off'|'none'|'words'|'characters'|'sentences'>,

  /**
   * Often used with CSS to style elements with common properties.
   *
   * @see https://www.w3schools.com/html/html_classes.asp
   */
  class? : Combo<string>,

  /**
   * Indicates whether the element's content is editable.
   *
   * @see https://www.w3schools.com/tags/att_global_contenteditable.asp
   */
  contenteditable? : Combo<boolean>,

  /**
   * Defines the ID of a <menu> element which will serve as the element's context menu.
   *
   * @see https://www.w3schools.com/tags/att_global_contextmenu.asp
   */
  contextmenu? : Combo<string>,

  /**
   * Lets you attach custom data-* attributes to an HTML element.
   * Prefer to use lower case strings for the keys.
   */
  data? : Combo<Record<string, string | number | boolean>>,

  /**
   * Defines the text direction. Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left).
   *
   * @see https://www.w3schools.com/tags/att_global_dir.asp
   */
  dir? : Combo<'ltr'|'rtl'|'auto'>,

  /**
   * Defines whether the element can be dragged.
   *
   * @see https://www.w3schools.com/tags/att_global_draggable.asp
   */
  draggable? : Combo<boolean|'true'|'false'|'auto'>,

  /**
   * Specifies whether the dragged data is copied, moved, or linked, when dropped.
   *
   * @see https://www.w3schools.com/tags/att_dropzone.asp
   */
  dropzone? : Combo<'copy'|'move'|'link'>,

  /**
   * Prevents rendering of given element, while keeping child elements,
   * e.g. script elements, active.
   *
   * @see https://www.w3schools.com/tags/att_hidden.asp
   */
  hidden? : Combo<''|'hidden'>,

  /**
   * Often used with CSS to style a specific element.
   * The value of this attribute must be unique.
   *
   * @see https://www.w3schools.com/html/html_id.asp
   */
  id? : Combo<string>,

  /**
   * Used to add properties to an item.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop
   */
  itemprop? : Combo<string>,

  /**
   * Defines the language used in the element.
   *
   * @see https://www.w3schools.com/tags/att_global_lang.asp
   */
  lang? : Combo<string>,

  /**
   * Assigns a slot in a shadow DOM shadow tree to an element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot
   */
  slot? : Combo<string>,

  /**
   * Indicates whether spell checking is allowed for the element.
   *
   * @see https://www.w3schools.com/tags/att_global_spellcheck.asp
   */
  spellcheck? : Combo<boolean>,

  /**
   * Defines CSS styles which will override styles previously set.
   *
   * @see https://www.w3schools.com/tags/att_global_style.asp
   */
  style? : Combo<string|ElementCSSInlineStyle>,

  // Overrides the browser's default tab order and follows the one specified instead.
  tabindex? : Combo<number>,

  // Text to be displayed in a tooltip when hovering over the element.
  title? : Combo<string>,

  // Specify whether an element’s attribute values and the values of its
  // Text node children are to be translated when the page is localized,
  // or whether to leave them unchanged.
  translate? : Combo<string>,

  // Specifies the primary language for the element's text content, in XHTML documents.
  'xml:lang'? : Combo<string>,
}

/**
 * @see https://www.w3schools.com/tags/
 * Also see lib/lib.dom.d.ts of TypeScript
 */
export type ElementAttributes = {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   * @see https://www.w3schools.com/tags/tag_a.asp
   */
  a : {
    download? : Combo<string>,
    href? : Combo<string>,
    hreflang? : Combo<string>,
    media? : Combo<string>,
    ping? : Combo<string>,
    referrerpolicy? : Combo<CommonAttributes['referrerpolicy']>,
    rel? : Combo<CommonAttributes['rel']>,
    shape? : Combo<string>,
    target? : Combo<CommonAttributes['target']>,
    type? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
   * @see https://www.w3schools.com/tags/tag_abbr.asp
   */
  abbr : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
   * @see https://www.w3schools.com/tags/tag_address.asp
   */
  address : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/applet
   * @see https://www.w3schools.com/tags/tag_applet.asp
   * @deprecated
   */
  applet : {
    align? : Combo<'bottom'|'left'|'middle'|'right'|'top'|'absbottom'|'absmiddle'
    |'baseline'|'center'|'texttop'>,
    alt? : Combo<string>,
    archive? : Combo<string>,
    code? : Combo<string>,
    codebase? : Combo<string>,
    datafld? : Combo<string>,
    datasrc? : Combo<string>,
    height? : Combo<number>,
    hspace? : Combo<number>,
    mayscript? : Combo<string>,
    name? : Combo<string>,
    object? : Combo<string>,
    src? : Combo<string>,
    vspace? : Combo<number>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
   * @see https://www.w3schools.com/tags/tag_area.asp
   */
  area : {
    alt? : Combo<string>,
    coords? : Combo<string>,
    download? : Combo<string>,
    href? : Combo<string>,
    hreflang? : Combo<string>,
    media? : Combo<string>,
    ping? : Combo<string>,
    referrerpolicy? : Combo<CommonAttributes['referrerpolicy']>,
    rel? : Combo<CommonAttributes['rel']>,
    shape? : Combo<'default'|'rect'|'circle'|'poly'>,
    target? : Combo<CommonAttributes['target']>,
    type? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
   * @see https://www.w3schools.com/tags/tag_article.asp
   */
  article : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
   * @see https://www.w3schools.com/tags/tag_aside.asp
   */
  aside : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
   * @see https://www.w3schools.com/tags/tag_audio.asp
   */
  audio : {
    autoplay? : Combo<boolean>,
    buffered? : Combo<string>,
    controls? : Combo<boolean>,
    crossorigin? : Combo<CommonAttributes['crossorigin']>,
    loop? : Combo<boolean>,
    muted? : Combo<boolean>,
    preload? : Combo<CommonAttributes['preload']>,
    src? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
   * @see https://www.w3schools.com/tags/tag_b.asp
   */
  b : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
   * @see https://www.w3schools.com/tags/tag_base.asp
   */
  base : {
    href? : Combo<string>,
    target? : Combo<CommonAttributes['target']>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
   * @see https://www.w3schools.com/tags/tag_bdi.asp
   */
  bdi : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
   * @see https://www.w3schools.com/tags/tag_bdo.asp
   */
  bdo : {
    // Required. Specifies the text direction of the text inside the <bdo> element
    dir : Combo<'ltr'|'rtl'>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
   * @see https://www.w3schools.com/tags/tag_blockquote.asp
   */
  blockquote : {
    cite? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
   * @see https://www.w3schools.com/tags/tag_body.asp
   */
  body : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
   * @see https://www.w3schools.com/tags/tag_br.asp
   */
  br : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
   * @see https://www.w3schools.com/tags/tag_button.asp
   */
  button : {
    autofocus? : Combo<boolean>,
    disabled? : Combo<boolean>,
    form? : Combo<string>,
    formaction? : Combo<string>,
    formenctype? : Combo<CommonAttributes['enctype']>,
    formmethod? : Combo<CommonAttributes['method']>,
    formnovalidate? : Combo<boolean>,
    formtarget? : Combo<CommonAttributes['formtarget']>,
    name? : Combo<string>,
    type? : Combo<'button'|'reset'|'submit'>,
    value? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
   * @see https://www.w3schools.com/tags/tag_canvas.asp
   */
  canvas : {
    height? : Combo<number>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
   * @see https://www.w3schools.com/tags/tag_caption.asp
   */
  caption : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
   * @see https://www.w3schools.com/tags/tag_cite.asp
   */
  cite : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
   * @see https://www.w3schools.com/tags/tag_code.asp
   */
  code : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
   * @see https://www.w3schools.com/tags/tag_col.asp
   */
  col : {
    span? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
   * @see https://www.w3schools.com/tags/tag_colgroup.asp
   */
  colgroup : {
    span? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
   * @see https://www.w3schools.com/tags/tag_data.asp
   */
  data : {
    // Specifies the machine-readable translation of the content of the element
    value? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
   * @see https://www.w3schools.com/tags/tag_datalist.asp
   */
  datalist : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
   * @see https://www.w3schools.com/tags/tag_dd.asp
   */
  dd : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
   * @see https://www.w3schools.com/tags/tag_del.asp
   */
  del : {
    cite? : Combo<string>,
    datetime? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
   * @see https://www.w3schools.com/tags/tag_details.asp
   */
  details : {
    open? : Combo<boolean>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
   * @see https://www.w3schools.com/tags/tag_dfn.asp
   */
  dfn : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
   * @see https://www.w3schools.com/tags/tag_dialog.asp
   */
  dialog : {
    open? : Combo<boolean>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
   * @see https://www.w3schools.com/tags/tag_div.asp
   */
  div : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
   * @see https://www.w3schools.com/tags/tag_dl.asp
   */
  dl : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
   * @see @see https://www.w3schools.com/tags/tag_dt.asp
   */
  dt : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
   * @see https://www.w3schools.com/tags/tag_em.asp
   */
  em : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
   * @see https://www.w3schools.com/tags/tag_embed.asp
   */
  embed : {
    height? : Combo<number>,
    src? : Combo<string>,
    type? : Combo<string>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
   * @see https://www.w3schools.com/tags/tag_fieldset.asp
   */
  fieldset : {
    disabled? : Combo<boolean>,
    form? : Combo<string>,
    name? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
   * @see https://www.w3schools.com/tags/tag_figcaption.asp
   */
  figcaption : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
   * @see https://www.w3schools.com/tags/tag_figure.asp
   */
  figure : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
   * @see https://www.w3schools.com/tags/tag_footer.asp
   */
  footer : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
   * @see https://www.w3schools.com/tags/tag_form.asp
   */
  form : {
    'accept-charset'?: Combo<string>,
    action? : Combo<string>,
    autocomplete? : Combo<'on'|'off'>,
    enctype? : Combo<CommonAttributes['enctype']>,
    method? : Combo<CommonAttributes['method']>,
    name? : Combo<string>,
    novalidate? : Combo<boolean>,
    rel? : Combo<CommonAttributes['rel']>,
    target? : Combo<CommonAttributes['target']>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h1 : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h2 : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h3 : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h4 : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h5 : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h6 : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
   * @see https://www.w3schools.com/tags/tag_head.asp
   */
  head : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
   * @see https://www.w3schools.com/tags/tag_header.asp
   */
  header : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup
   * @see https://www.w3schools.com/tags/tag_hgroup.asp
   */
  hgroup: {},
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
   * @see https://www.w3schools.com/tags/tag_hr.asp
   */
  hr : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
   * @see https://www.w3schools.com/tags/tag_html.asp
   */
  html : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
   * @see https://www.w3schools.com/tags/tag_i.asp
   */
  i : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
   * @see https://www.w3schools.com/tags/tag_iframe.asp
   */
  iframe : {
    allow? : Combo<string|'fullscreen'|'payment'>,
    height? : Combo<number>,
    importance? : Combo<string>,
    loading? : Combo<CommonAttributes['loading']>,
    name? : Combo<string>,
    referrerpolicy? : Combo<CommonAttributes['referrerpolicy']>,
    sandbox? : Combo<''|'allow-forms'|'allow-modals'|'allow-orientation-lock'|'allow-pointer-lock'|'allow-popups'
    |'allow-popups-to-escape-sandbox'|'allow-presentation'|'allow-same-origin'|'allow-scripts'
    |'allow-top-navigation'|'allow-top-navigation-by-user-activation'>,
    src? : Combo<string>,
    srcdoc? : Combo<string>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
   * @see https://www.w3schools.com/tags/tag_img.asp
   */
  img : {
    src : Combo<string>,

    alt? : Combo<string>,
    border? : Combo<string>,
    crossorigin? : Combo<CommonAttributes['crossorigin']>,
    decoding? : Combo<'sync'|'async'|'auto'>,
    height? : Combo<boolean>,
    intrinsicsize? : Combo<string>,
    ismap? : Combo<boolean>,
    loading? : Combo<CommonAttributes['loading']>,
    referrerpolicy? : Combo<CommonAttributes['referrerpolicy']>,
    sizes? : Combo<string>,
    srcset? : Combo<string>,
    usemap? : Combo<string>,
    width? : Combo<boolean>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
   * @see https://www.w3schools.com/tags/tag_input.asp
   */
  input : {
    /** @see https://www.w3schools.com/tags/att_input_accept.asp */
    accept? : Combo<string>,
    alt? : Combo<string>,
    autocomplete? : Combo<'on'|'off'>,
    autofocus? : Combo<boolean>,
    checked? : Combo<boolean>,
    dirname? : Combo<string>,
    disabled? : Combo<boolean>,
    form? : Combo<string>,
    formaction? : Combo<string>,
    formenctype? : Combo<CommonAttributes['enctype']>,
    formmethod? : Combo<CommonAttributes['method']>,
    formnovalidate? : Combo<boolean>,
    formtarget? : Combo<CommonAttributes['formtarget']>,
    height? : Combo<number>,
    list? : Combo<string>,
    max? : Combo<number|string>,
    maxlength? : Combo<number>,
    minlength? : Combo<number>,
    min? : Combo<number|string>,
    multiple? : Combo<boolean>,
    name? : Combo<string>,
    pattern? : Combo<string>,
    placeholder? : Combo<string>,
    readonly? : Combo<boolean>,
    required? : Combo<boolean>,
    size? : Combo<number>,
    src? : Combo<string>,
    step? : Combo<number|any>,
    type? : Combo<'button'|'checkbox'|'color'|'date'|'datetime-local'|'email'|'file'|'hidden'|'image'|'month'|'number'
    |'password'|'radio'|'range'|'reset'|'search'|'submit'|'tel'|'text'|'time'|'url'|'week'>,
    value? : Combo<string>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
   * @see https://www.w3schools.com/tags/tag_ins.asp
   */
  ins : {
    cite? : Combo<string>,
    datetime? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
   * @see https://www.w3schools.com/tags/tag_kbd.asp
   */
  kbd : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
   * @see https://www.w3schools.com/tags/tag_label.asp
   */
  label : {
    for? : Combo<string>,
    form? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
   * @see https://www.w3schools.com/tags/tag_legend.asp
   */
  legend : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
   * @see https://www.w3schools.com/tags/tag_li.asp
   */
  li : {
    value? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
   * @see https://www.w3schools.com/tags/tag_link.asp
   */
  link : {
    crossorigin? : Combo<CommonAttributes['crossorigin']>,
    href? : Combo<string>,
    hreflang? : Combo<string>,
    media? : Combo<string>,
    referrerpolicy? : Combo<CommonAttributes['referrerpolicy']>,
    rel : Combo<CommonAttributes['rel']>,
    sizes? : Combo<string>,
    title? : Combo<string>,
    type? : Combo<string|'text/WebApi'|'text/css'>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
   * @see https://www.w3schools.com/tags/tag_main.asp
   */
  main : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
   * @see https://www.w3schools.com/tags/tag_map.asp
   */
  map : {
    name : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
   * @see https://www.w3schools.com/tags/tag_mark.asp
   */
  mark : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   * @see https://www.w3schools.com/tags/tag_meta.asp
   */
  meta : {
    charset? : Combo<string>,
    content? : Combo<string>,
    'http-equiv'? : Combo<'content-security-policy'|'content-type'|'default-style'|'refresh'>,
    name? : Combo<'application-name'|'author'|'description'|'generator'|'keywords'|'viewport'>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
   * @see https://www.w3schools.com/tags/tag_meter.asp
   */
  meter : {
    form? : Combo<string>,
    high? : Combo<number>,
    low? : Combo<number>,
    max? : Combo<number>,
    min? : Combo<number>,
    optimum? : Combo<number>,
    value : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
   * @see https://www.w3schools.com/tags/tag_nav.asp
   */
  nav : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
   * @see https://www.w3schools.com/tags/tag_noscript.asp
   */
  noscript : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
   * @see https://www.w3schools.com/tags/tag_object.asp
   */
  object : {
    data? : Combo<string>,
    form? : Combo<string>,
    height? : Combo<number>,
    name? : Combo<string>,
    type? : Combo<string>,
    typemustmatch? : Combo<boolean>,
    usemap? : Combo<string>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
   * @see https://www.w3schools.com/tags/tag_ol.asp
   */
  ol : {
    reversed? : Combo<boolean>,
    start? : Combo<number>,
    type? : Combo<'1'|'a'|'A'|'i'|'I'>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
   * @see https://www.w3schools.com/tags/tag_optgroup.asp
   */
  optgroup : {
    disabled? : Combo<boolean>,
    label? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
   * @see https://www.w3schools.com/tags/tag_option.asp
   */
  option : {
    disabled? : Combo<boolean>,
    label? : Combo<string>,
    selected? : Combo<boolean>,
    value? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
   * @see https://www.w3schools.com/tags/tag_output.asp
   */
  output : {
    // Specifies the relationship between the result of the calculation,
    // and the elements used in the calculation
    for? : Combo<string>,
    // Specifies which form the output element belongs to
    form? : Combo<string>,
    // Specifies a name for the output element
    name? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
   * @see https://www.w3schools.com/tags/tag_p.asp
   */
  p : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
   * @see https://www.w3schools.com/tags/tag_picture.asp
   */
  picture : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
   * @see https://www.w3schools.com/tags/tag_pre.asp
   */
  pre : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
   * @see https://www.w3schools.com/tags/tag_progress.asp
   */
  progress : {
    // Specifies how much work the task requires in total. Default value is 1
    max? : Combo<number>,
    // Specifies how much of the task has been completed
    value? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
   * @see https://www.w3schools.com/tags/tag_q.asp
   */
  q : {
    // Specifies the source URL of the quote
    cite? : Combo<string>,
  },

  // The HTML Ruby Fallback Parenthesis (<rp>) element is used to provide fall-back parentheses
  // for browsers that do not support display of ruby annotations using the <ruby> element.
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
   * @see https://www.w3schools.com/tags/tag_rp.asp
   */
  rp : {},

  // The HTML Ruby Text (<rt>) element specifies the ruby text component of a ruby annotation,
  // which is used to provide pronunciation, translation, or transliteration information for
  // East Asian typography. The <rt> element must always be contained within a <ruby> element.
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
   * @see https://www.w3schools.com/tags/tag_rt.asp
   */
  rt : {},

  // Represents small annotations that are rendered above, below, or next to base text,
  // usually used for showing the pronunciation of East Asian characters. It can also be
  // used for annotating other kinds of text, but this usage is less common.
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
   * @see https://www.w3schools.com/tags/tag_ruby.asp
   */
  ruby : {},

  // Mark up text that is no longer correct
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
   * @see https://www.w3schools.com/tags/tag_s.asp
   */
  s : {},

  // Define some text as sample output from a computer program in a document
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
   * @see https://www.w3schools.com/tags/tag_samp.asp
   */
  samp : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
   * @see https://www.w3schools.com/tags/tag_script.asp
   */
  script : {
    async? : Combo<boolean>,
    crossorigin? : Combo<CommonAttributes['crossorigin']>,
    defer? : Combo<boolean>,
    integrity? : Combo<string>,
    nomodule? : Combo<boolean>,
    referrerpolicy? : Combo<CommonAttributes['referrerpolicy']>,
    src? : Combo<string>,
    type? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
   * @see https://www.w3schools.com/tags/tag_section.asp
   */
  section : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @see https://www.w3schools.com/tags/tag_select.asp
   */
  select : {
    autocomplete? : Combo<boolean>,
    autofocus? : Combo<boolean>,
    disabled? : Combo<boolean>,
    form? : Combo<string>,
    multiple? : Combo<string>,
    name? : Combo<string>,
    required? : Combo<boolean>,
    size? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
   * @see https://www.w3schools.com/tags/tag_slot.asp
   */
  slot : {
    name? : Combo<string>
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
   * @see https://www.w3schools.com/tags/tag_small.asp
   */
  small : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
   * @see https://www.w3schools.com/tags/tag_source.asp
   */
  source : {
    media? : Combo<string>,
    sizes? : Combo<string>,
    src? : Combo<string>,
    srcset? : Combo<string>,
    type? : Combo<CommonAttributes['imageMimeTypes']>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
   * @see https://www.w3schools.com/tags/tag_span.asp
   */
  span : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
   * @see https://www.w3schools.com/tags/tag_strong.asp
   */
  strong : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
   * @see https://www.w3schools.com/tags/tag_style.asp
   */
  style : {
    media? : Combo<string>,
    type? : Combo<'text/css'|string>,
    nonce? : Combo<string>,
    title? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
   * @see https://www.w3schools.com/tags/tag_sub.asp
   */
  sub : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
   * @see https://www.w3schools.com/tags/tag_summary.asp
   */
  summary : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
   * @see https://www.w3schools.com/tags/tag_sup.asp
   */
  sup : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
   * @see https://www.w3schools.com/tags/tag_svg.asp
   */
  svg : {
    // The displayed height of the rectangular viewport. (Not the height of its coordinate system.)
    height? : Combo<number|string|'auto'>,
    //
    preserveAspectRatio? : Combo<'none'
    |'xMinYMin meet'|'xMidYMin meet'|'xMaxYMin meet'|'xMinYMid meet'|'xMidYMid meet'
    |'xMaxYMid meet'|'xMinYMax meet'|'xMidYMax meet'|'xMaxYMax meet'

    |'xMinYMin slice'|'xMidYMin slice'|'xMaxYMin slice'|'xMinYMid slice'|'xMidYMid slice'
    |'xMaxYMid slice'|'xMinYMax slice'|'xMidYMax slice'|'xMaxYMax slice'
    >,
    viewBox? : Combo<string|'none'>,
    width? : Combo<number|string|'auto'>,
    x? : Combo<number|string>,
    y? : Combo<number|string>,
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
   * @see https://www.w3schools.com/tags/tag_table.asp
   */
  table : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
   * @see https://www.w3schools.com/tags/tag_tbody.asp
   */
  tbody : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
   * @see https://www.w3schools.com/tags/tag_td.asp
   */
  td : {
    // Specifies the number of columns a cell should span
    colspan? : Combo<number>,
    // Specifies one or more header cells a cell is related to
    headers? : Combo<string>,
    // Sets the number of rows a cell should span
    rowspan? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
   * @see https://www.w3schools.com/tags/tag_template.asp
   */
  template : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
   * @see https://www.w3schools.com/tags/tag_textarea.asp
   */
  textarea : {
    autocomplete? : Combo<'on'|'off'>,
    autofocus? : Combo<boolean>,
    cols? : Combo<number>,
    dirname? : Combo<string>,
    disabled? : Combo<boolean>,
    form? : Combo<string>,
    maxlength? : Combo<string>,
    minlength? : Combo<string>,
    name? : Combo<string>,
    placeholder? : Combo<string>,
    readonly? : Combo<boolean>,
    required? : Combo<boolean>,
    rows? : Combo<number>,
    wrap? : Combo<'hard'|'soft'>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
   * @see https://www.w3schools.com/tags/tag_tfoot.asp
   */
  tfoot : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
   * @see https://www.w3schools.com/tags/tag_th.asp
   */
  th : {
    abbr? : Combo<string>,
    colspan? : Combo<number>,
    headers? : Combo<string>,
    rowspan? : Combo<number>,
    scope? : Combo<'col'|'colgroup'|'row'|'rowgroup'>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
   * @see https://www.w3schools.com/tags/tag_thead.asp
   */
  thead : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
   * @see https://www.w3schools.com/tags/tag_time.asp
   */
  time : {
    datetime? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
   * @see https://www.w3schools.com/tags/tag_title.asp
   */
  title : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
   * @see https://www.w3schools.com/tags/tag_tr.asp
   */
  tr : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
   * @see https://www.w3schools.com/tags/tag_track.asp
   */
  track : {
    // Specifies that the track is to be enabled if the user's preferences do not indicate
    // that another track would be more appropriate
    default? : Combo<boolean>,
    // Specifies the kind of text track
    kind? : Combo<'captions'|'chapters'|'descriptions'|'metadata'|'subtitles'>,
    // Specifies the title of the text track
    label? : Combo<string>,
    // Required. Specifies the URL of the track file
    src : Combo<string>,
    // Specifies the language of the track text data (required if kind="subtitles")
    srclang? : Combo<string>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
   * @see https://www.w3schools.com/tags/tag_u.asp
   */
  u : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
   * @see https://www.w3schools.com/tags/tag_ul.asp
   */
  ul : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
   * @see https://www.w3schools.com/tags/tag_var.asp
   */
  var : {},

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
   * @see https://www.w3schools.com/tags/tag_video.asp
   */
  video : {
    autoplay? : Combo<boolean>,
    controls? : Combo<boolean>,
    crossorigin? : Combo<CommonAttributes['crossorigin']>,
    height? : Combo<number>,
    loop? : Combo<boolean>,
    muted? : Combo<boolean>,
    poster? : Combo<string>,
    preload? : Combo<CommonAttributes['preload']>,
    src? : Combo<string>,
    width? : Combo<number>,
  },

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
   * @see https://www.w3schools.com/tags/tag_wbr.asp
   */
  wbr : {},
}
