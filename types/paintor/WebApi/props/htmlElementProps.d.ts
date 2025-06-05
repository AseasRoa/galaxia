import { HTMLElementProps } from '../standard/HTMLElementProps'
import { HTMLMediaElementProps } from '../standard/HTMLMediaElementProps'
import { Bindable, StringConvertible } from '../common'

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement)
 */
export interface AnchorElementProps extends HTMLElementProps {
  /**
   * Specifies that you want the browser to send an
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header. On the server-side this is used to trigger sending an
   * [Attribution-Reporting-Register-Source](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Source)
   * header in the response, to register a
   * [navigation-based attribution source](https://developer.mozilla.org/docs/Web/API/Attribution_Reporting_API/Registering_sources#navigation-based_attribution_sources)
   * .
   *
   * The browser stores the source data associated with the navigation-based
   * attribution source (as provided in the
   * [Attribution-Reporting-Register-Source](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Source)
   * response header) when the user clicks the link.
   * See the
   * [Attribution Reporting API](https://developer.mozilla.org/docs/Web/API/Attribution_Reporting_API)
   * for more details.
   *
   * There are two versions of this attribute that you can set:
   *
   * - Boolean, i.e. just the attributionsrc name.
   * This specifies that you want the
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header sent to the same server as the href attribute points to.
   * This is fine when you are handling the attribution source
   * registration on the same server.
   *
   * - Value containing one or more URLs, for example:
   * ```html
   * attributionsrc="https://a.example/register-source
   * https://b.example/register-source"
   * ```
   *
   * This is useful in cases where the requested resource is not on a server
   * you control, or you just want to handle registering the attribution source
   * on a different server. In this case, you can specify one or more URLs as
   * the value of `attributionsrc`. When the resource request occurs, the
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header will be sent to the URL(s) specified in `attributionsrc` in addition
   * to the resource origin. These URLs can then respond with the
   * [Attribution-Reporting-Register-Source](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Source)
   * to complete registration.
   *
   * > **_NOTE:_**
   * Specifying multiple URLs means that multiple attribution sources can
   * be registered on the same feature. You might for example have different
   * campaigns that you are trying to measure the success of, which involve
   * generating different reports on different data.
   *
   * `<a>` elements cannot be used as attribution triggers, only sources.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/attributionSrc)
   */
  attributionSrc?: Bindable<string|boolean>,

  /**
   * A string indicating that the linked resource is intended to be downloaded
   * rather than displayed in the browser. The value, if any, specifies the
   * default file name for use in labeling the resource in a local file system.
   * If the name is not a valid file name in the underlying OS, the browser
   * will adjust it.
   *
   * > **_NOTE:_**
   * This value might not be used for download. This value cannot be used
   * to determine whether the download will occur.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/download)
   */
  download?: Bindable<string>,

  /**
   * A string containing the host, that is the hostname, and then, if the port
   * of the URL is nonempty, a `':'`, and the port of the URL.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/host)
   */
  host?: Bindable<string>,

  /**
   * The domain of the URL.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/hostname)
   */
  hostname?: Bindable<string>,

  /**
   * The URL that the hyperlink points to. Links are not restricted to
   * HTTP-based URLs — they can use any URL scheme supported by browsers:
   *
   * - Telephone numbers with `tel:` URLs
   * - Email addresses with `mailto:` URLs
   * - SMS text messages with `sms:` URLs
   * - Executable code with `javascript:` URLs
   * - While web browsers may not support other URL schemes, websites can with
   * `registerProtocolHandler()`
   *
   * Moreover other URL features can locate specific parts of the resource,
   * including:
   *
   * - Sections of a page with document fragments
   * - Specific text portions with [text fragments](https://developer.mozilla.org/docs/Web/URI/Fragment/Text_fragments)
   * - Pieces of media files with media fragments
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/href)
   */
  href?: Bindable<string>,

  /**
   * Hints at the human language of the linked URL. No built-in functionality.
   * Allowed values are the same as the global `lang` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/hreflang)
   */
  hreflang?: Bindable<string>,

  /**
   * The password specified before the domain name.
   *
   * If it is set without first setting the `username` property,
   * it silently fails.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/password)
   */
  password?: Bindable<string>,

  /**
   * A space-separated list of URLs. When the link is followed,
   * the browser will send `POST` requests with the body `PING`
   * to the URLs. Typically, for tracking.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/ping)
   */
  ping?: Bindable<string>,

  /**
   * A string containing the port number of the URL, or the empty string if
   * the port is the default for the protocol.
   *
   * > **_NOTE:_**
   * If the `HTMLAnchorElement` object refers to a URL that doesn't
   * contain an explicit port number (e.g., `https://localhost`) or contains
   * a port number that's the default port number corresponding to the protocol
   * part of the URL (e.g., `https://localhost:443`), then the `port` property
   * will be the empty string: `''`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/port)
   */
  port?: Bindable<string>,

  /**
   * A string representing the protocol scheme of the URL, including the final
   * `':'`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/protocol)
   */
  protocol?: Bindable<string>,

  /**
   * How much of the referrer to send when following the link.
   *
   * - `no-referrer`: The `Referer` header will not be sent.
   *
   * - `no-referrer-when-downgrade`: The `Referer` header will not be sent to
   * origins without TLS (HTTPS).
   *
   * - `origin`: The sent referrer will be limited to the origin of the
   * referring page: its scheme, host, and port.
   *
   * - `origin-when-cross-origin`: The referrer sent to other origins will
   * be limited to the scheme, the host, and the port. Navigations on the same
   * origin will still include the path.
   *
   * - `same-origin`: A referrer will be sent for same origin, but
   * cross-origin requests will contain no referrer information.
   *
   * - `strict-origin`: Only send the origin of the document as the referrer
   * when the protocol security level stays the same (HTTPS→HTTPS), but don't
   * send it to a less secure destination (HTTPS→HTTP).
   *
   * - `strict-origin-when-cross-origin` (default): Send a full URL when
   * performing a same-origin request, only send the origin when the protocol
   * security level stays the same (HTTPS→HTTPS), and send no header to a less
   * secure destination (HTTPS→HTTP).
   *
   * - `unsafe-url`: The referrer will include the origin and the path
   * (but not the fragment, password, or username). This value is unsafe,
   * because it leaks origins and paths from TLS-protected resources to
   * insecure origins.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/referrerPolicy)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,

  /**
   * The relationship of the linked URL as space-separated link types.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/rel)
   */
  rel?: Bindable<string>,

  /**
   * A search string, also called a *query string*, that is a string containing
   * a `'?'` followed by the parameters of the URL.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/search)
   */
  search?: Bindable<string>,

  /**
   * Where to display the linked URL, as the name for a browsing context
   * (a tab, window, or <iframe>). The following keywords have special
   * meanings for where to load the URL:
   *
   * - `_self`: The current browsing context. (Default)
   *
   * - `_blank`: Usually a new tab, but users can configure browsers to open
   * a new window instead.
   *
   * - `_parent`: The parent browsing context of the current one. If no parent,
   * behaves as `_self`.
   *
   * - `_top`: The topmost browsing context. To be specific, this means the
   * "highest" context that's an ancestor of the current one. If no ancestors,
   * behaves as `_self`.
   *
   * - `_unfencedTop`: Allows embedded fenced frames to navigate the top-level
   * frame (i.e. traversing beyond the root of the fenced frame, unlike
   * other reserved destinations). Note that the navigation will still
   * succeed if this is used outside of a fenced frame context, but it
   * will not act like a reserved keyword.
   *
   * > **_NOTE:_**
   * Setting `target="_blank"` on `<a>` elements implicitly provides
   * the same `rel` behavior as setting `rel="noopener"` which does
   * not set `window.opener`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/target)
   */
  target?: Bindable<
    string
    | '_self'
    | '_blank'
    | '_parent'
    | '_top'
    | '_unfencedTop'
  >,

  /**
   * The text inside the element. This property represents the same information
   * as `Node.textContent`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/text)
   */
  text?: Bindable<string>,

  /**
   * The MIME type of the linked resource.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/type)
   */
  type?: Bindable<string>,

  /**
   * The username specified before the domain name.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/username)
   */
  username?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement)
 */
export interface AreaElementProps extends HTMLElementProps {
  /**
   * A text string alternative to display on browsers that do not display
   * images. The text should be phrased so that it presents the user with
   * the same kind of choice as the image would offer when displayed without
   * the alternative text. This attribute is required only if the `href`
   * attribute is used.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/alt)
   */
  alt?: Bindable<string>,

  /**
   * The coords attribute details the coordinates of the `shape` attribute in
   * size, shape, and placement of an `<area>`. This attribute must not be used
   * if `shape` is set to `default`.
   *
   * - `rect`: the value is `x1,y1,x2,y2`. The value specifies the coordinates
   * of the top-left and bottom-right corner of the rectangle.
   * For example, in `<area shape="rect" coords="0,0,253,27" href="#" target="_blank" alt="Mozilla">`
   * the coordinates are `0,0` and `253,27`, indicating the top-left and
   * bottom-right corners of the rectangle, respectively.
   *
   * - `circle`: the value is `x,y,radius`. Value specifies the coordinates of
   * the circle center and the radius. For example:
   * `<area shape="circle" coords="130,136,60" href="#" target="_blank" alt="MDN">`
   *
   * - `poly`: the value is `x1,y1,x2,y2,..,xn,yn`. Value specifies the
   * coordinates of the edges of the polygon. If the first and last coordinate
   * pairs are not the same, the browser will add the last coordinate pair to
   * close the polygon
   *
   * The values are numbers of CSS pixels.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/coords)
   */
  coords?: Bindable<string>,

  /**
   * The download attribute specifies that the target (the file specified in the
   * `href` attribute) will be downloaded when a user clicks on the hyperlink.
   *
   * The optional value of the download attribute will be the new name of the
   * file after it is downloaded. There are no restrictions on allowed values,
   * and the browser will automatically detect the correct file extension and
   * add it to the file (.img, .pdf, .txt, .html, etc.).
   *
   * If the value is omitted, the original filename is used.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/download)
   */
  download?: Bindable<string>,

  /**
   * The host, that is the hostname, and then, if the port of the URL is
   * nonempty, a `':'`, and the port of the URL.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/host)
   */
  host?: Bindable<string>,

  /**
   * The domain of the URL associated with the area.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/hostname)
   */
  hostname?: Bindable<string>,

  /**
   * The password specified before the domain name.
   *
   * If it is set without first setting the `username` property,
   * it silently fails.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/password)
   */
  password?: Bindable<string>,

  /**
   * A string containing an initial `'/'`, followed by the path of the URL,
   * not including the query string or fragment (or the empty string if there
   * is no path).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/pathname)
   */
  pathname?: Bindable<string>,

  /**
   * A space-separated list of URLs. When the link is followed,
   * the browser will send `POST` requests with the body `PING`
   * to the URLs. Typically for tracking.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/ping)
   */
  ping?: Bindable<string>,

  /**
   * A string containing the port number of the URL, or the empty string if
   * the port is the default for the protocol.
   *
   * > **_NOTE:_**
   * If the `HTMLAreaElement` object refers to a URL that doesn't
   * contain an explicit port number (e.g., `https://localhost`) or contains
   * a port number that's the default port number corresponding to the protocol
   * part of the URL (e.g., `https://localhost:443`), then the `port` property
   * will be the empty string: `''`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/port)
   */
  port?: Bindable<string>,

  /**
   * A string representing the protocol scheme of the URL, including the final
   * `':'`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/protocol)
   */
  protocol?: Bindable<string>,

  /**
   * How much of the referrer to send when following the link.
   *
   * - `no-referrer`: The `Referer` header will not be sent.
   *
   * - `no-referrer-when-downgrade`: The `Referer` header will not be sent to
   * origins without TLS (HTTPS).
   *
   * - `origin`: The sent referrer will be limited to the origin of the
   * referring page: its scheme, host, and port.
   *
   * - `origin-when-cross-origin`: The referrer sent to other origins will
   * be limited to the scheme, the host, and the port. Navigations on the same
   * origin will still include the path.
   *
   * - `same-origin`: A referrer will be sent for same origin, but
   * cross-origin requests will contain no referrer information.
   *
   * - `strict-origin`: Only send the origin of the document as the referrer
   * when the protocol security level stays the same (HTTPS→HTTPS), but don't
   * send it to a less secure destination (HTTPS→HTTP).
   *
   * - `strict-origin-when-cross-origin` (default): Send a full URL when
   * performing a same-origin request, only send the origin when the protocol
   * security level stays the same (HTTPS→HTTPS), and send no header to a less
   * secure destination (HTTPS→HTTP).
   *
   * - `unsafe-url`: The referrer will include the origin and the path
   * (but not the fragment, password, or username). This value is unsafe,
   * because it leaks origins and paths from TLS-protected resources to
   * insecure origins.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/referrerPolicy)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,

  /**
   * The relationship of the linked URL as space-separated link types.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/rel)
   */
  rel?: Bindable<string>,

  /**
   * A search string, also called a *query string*, that is a string containing
   * a `'?'` followed by the parameters of the URL.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/search)
   */
  search?: Bindable<string>,

  /**
   * The shape of an image map area.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/shape)
   */
  shape?: Bindable<'rect'|'circle'|'poly'>,

  /**
   * A keyword or author-defined name of the browsing context to display
   * the linked resource. The following keywords have special meanings:
   *
   * - `_self`: Show the resource in the current browsing context.
   *
   * - `_blank`: Show the resource in a new, unnamed browsing context.
   *
   * - `_parent`: Show the resource in the parent browsing context
   * of the current one, if the current page is inside a frame.
   * If there is no parent, acts the same as `_self`.
   *
   * - `_top`: Show the resource in the topmost browsing context
   * (the browsing context that is an ancestor of the current one and
   * has no parent).
   * If there is no parent, acts the same as `_self`.
   *
   * Use this attribute only if the `href` attribute is present.
   *
   * > **_NOTE:_**
   * Setting `target="_blank"` on `<area>` elements implicitly provides
   * the same `rel` behavior as setting `rel="noopener"` which does
   * not set `window.opener`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/target)
   */
  target?: Bindable<
    string
    | '_self'
    | '_blank'
    | '_parent'
    | '_top'
    | '_unfencedTop'
  >,

  /**
   * The username specified before the domain name.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/username)
   */
  username?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAudioElement)
 */
export interface AudioElementProps extends HTMLMediaElementProps {}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBaseElement)
 */
export interface BaseElementProps extends HTMLElementProps {
  /**
   * The URL to use as the base for relative URLs.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBaseElement/href)
   */
  href?: Bindable<string>,

  /**
   * A keyword or author-defined name of the default browsing context to show the results of navigation from <a>, <area>, or <form> elements without explicit target attributes. The following keywords have special meanings:
   *
   * - `_self`: (default): Show the result in the current browsing context.
   *
   * - `_blank`: Show the result in a new, unnamed browsing context.
   *
   * - `_parent`: Show the result in the parent browsing context of
   * the current one, if the current page is inside a frame.
   * If there is no parent, acts the same as `_self`.
   * If there is no parent, acts the same as `_self`.
   *
   * - `_top`: Show the result in the topmost browsing context
   * (the browsing context that is an ancestor of the current one and has
   * no parent). If there is no parent, acts the same as `_self`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLBaseElement/target)
   */
  target?: Bindable<string|'_blank'|'_self'|'_parent'|'_top'>,
}

export interface BdoElementProps extends HTMLElementProps {
  /**
   * The direction in which text should be rendered in this
   * element's contents. Possible values are:
   *
   * ltr: Indicates that the text should go in a left-to-right direction.
   * rtl: Indicates that the text should go in a right-to-left direction.
   *
   * Required.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/bdo#dir)
   */
  dir?: Bindable<'ltr'|'rtl'>,
}

export interface BlockquoteElementProps extends HTMLElementProps {
  /**
   * A URL that designates a source document or message for the information
   * quoted. This attribute is intended to point to information explaining
   * the context or the reference for the quote.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/blockquote#cite)
   */
  cite?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement)
 */
export interface ButtonElementProps extends HTMLElementProps {
  /**
   * Sets the action to be performed on an element being controlled by this
   * button. For this to have an effect, `commandFor` must be set.
   *
   * The possible values are:
   *
   * - `show-modal`: The button will show a <dialog> as modal.
   * If the dialog is already modal, no action will be taken.
   *
   * - `close`: The button will close a <dialog> element.
   * If the dialog is already closed, no action will be taken.
   *
   * - `show-popover`: The button will show a hidden popover.
   * If you try to show an already showing popover, no action will be taken.
   * See Popover API for more details.
   *
   * - `hide-popover`: The button will hide a showing popover.
   * If you try to hide an already hidden popover, no action will be taken.
   * See Popover API for more details.
   *
   * - `toggle-popover`: The button will toggle a popover between showing
   * and hidden.
   * If the popover is hidden, it will be shown;
   * if the popover is showing, it will be hidden.
   * See Popover API for more details.
   *
   * - Custom values - This attribute can represent custom values that are prefixed with a two hyphen characters (--). Buttons with a custom value will dispatch the CommandEvent on the controlled element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/command)
   */
  command?: Bindable<'show-modal'|'close'|'show-popover'|'hide-popover'|'toggle-popover'|string>,

  /**
   * Sets the element to control via a button.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/commandForElement)
   */
  commandFor?: Bindable<string>,

  /**
   * Indicates whether the control is disabled, meaning that it
   * does not accept any clicks.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * The URL of the program that is executed on the server when the form that
   * owns this control is submitted.
   *
   * The value overrides the `action` property of the `HTMLFormElement`
   * interface if the form is submitted via the button. This property
   * can be retrieved or set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formAction)
   */
  formAction?: Bindable<string>,

  /**
   * The MIME type of the content sent to the server when the form is submitted.
   *
   * - `application/x-www-form-urlencoded` (default): All characters will
   * be encoded before sent.
   *
   * - `multipart/form-data`: This value is necessary if the user will upload a file through
   * the form.
   *
   * - *empty string*: Sends data without any encoding at all. Not recommended.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formEnctype)
   */
  formEnctype?: Bindable<'application/x-www-form-urlencoded'|'multipart/form-data'|'text/plain'|string>,

  /**
   * The HTTP method used to submit the `<form>` if the `<button>`
   * element is the control that submits the form.
   *
   * The value overrides the `method` property of the `HTMLFormElement`
   * interface if the form is submitted via the button. This property can
   * be retrieved or set. If set with an empty or invalid value, the invalid
   * default value is `get`. If not set at all, the value is the empty
   * string (`""`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formMethod)
   */
  formMethod?: Bindable<'post'|'get'|'dialog'|''>,

  /**
   * Indicating if the `<form>` will bypass constraint validation when
   * submitted via the `<button>`.
   *
   * Its value overrides the `noValidate` property of the `HTMLFormElement`
   * interface if the form is submitted via the button. This property can
   * be retrieved or set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formNoValidate)
   */
  formNoValidate?: Bindable<boolean>,

  /**
   * The tab, window, or iframe where the response of the submitted `<form>`
   * is to be displayed.
   *
   * The value overrides the `target` property of the `HTMLFormElement`
   * interface if the form is submitted via the button. This property
   * can be retrieved or set. If not set, the value is the empty string (`""`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/formTarget)
   */
  formTarget?: Bindable<string>,

  /**
   * Indicates the name of the `<button>` element or the empty string
   * if the element has no name.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/name)
   */
  name?: Bindable<string>,

  /**
   * Sets the action to be performed (`"hide"`, `"show"`, or `"toggle"`)
   * on a popover element being controlled by a button.
   *
   * Possible values are:
   *
   * - `hide`: The button will hide a shown popover. If you try to hide
   * an already hidden popover, no action will be taken.
   *
   * - `show`: The button will show a hidden popover. If you try to show
   * an already showing popover, no action will be taken.
   *
   * - `toggle`: The button will toggle a popover between showing and hidden.
   * If the popover is hidden, it will be shown; if the popover is showing,
   * it will be hidden. If `popoverTargetAction` is not set, `"toggle"` is
   * the default action that will be performed by the control button.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/popoverTargetAction)
   */
  popoverTargetAction?: Bindable<'hide'|'show'|'toggle'>,

  /**
   * Sets the popover element to control via a button.
   *
   * A reference to a popover element in the DOM.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/popoverTargetElement)
   */
  popoverTargetElement?: Bindable<string>,

  /**
   * Indicates the behavior type of the `<button>` element.
   *
   * Possible values are:
   *
   * - `submit`: The button submits the form. This is the default value
   * if the attribute is not specified, or if it is dynamically changed
   * to an empty or invalid value.
   *
   * - `reset`: The button resets the form.
   *
   * - `button`: The button does nothing.
   *
   * - `menu` (experimental): The button displays a menu.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/type)
   */
  type?: Bindable<'submit'|'reset'|'button'|'menu'>,

  /**
   * The value of the `<button>` element as a string, or the empty string
   * if no value is set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/value)
   */
  value?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement)
 */
export interface CanvasElementProps extends HTMLElementProps {
  /**
   * The height of the coordinate space in CSS pixels. Defaults to 150.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/height)
   */
  height?: Bindable<number>,

  /**
   * The width of the coordinate space in CSS pixels. Defaults to 300.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/width)
   */
  width?: Bindable<number>,

  /**
   * The `contextlost` event of the
   * [Canvas API](https://developer.mozilla.org/docs/Web/API/Canvas_API)
   * is fired if the user agent detects that the backing storage associated with
   * a [CanvasRenderingContext2D](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D)
   * context is lost. Contexts can be lost for several reasons like driver
   * crashes or the application runs out of memory, etc.
   *
   * By default, the user agent will attempt to restore the context and then fire
   * the `contextrestored` event. User code can prevent the context from being
   * restored by calling `Event.preventDefault()` during event handling.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/contextlost_event)
   */
  onContextLost?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `contextrestored` event of the
   * [Canvas API](https://developer.mozilla.org/docs/Web/API/Canvas_API)
   * is fired if the user agent restores the backing storage for a
   * [CanvasRenderingContext2D](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D).
   *
   * You can redraw, re-retrieve resources, and reinitialize the state of your context after receiving this event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/contextrestored_event)
   */
  onContextMenuRestored?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `webglcontextcreationerror` event of the WebGL API is fired if the user
   * agent is unable to create a `WebGLRenderingContext` context.
   *
   * This event has a `WebGLContextEvent.statusMessage` property, which can
   * contain a platform dependent string with more information about
   * the failure.
   *
   * This event does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/webglcontextcreationerror_event)
   */
  onWebGLContextCreationError?(
    this: GlobalEventHandlers,
    event: WebGLContextEvent
  ): any,

  /**
   * The `webglcontextlost` event of the WebGL API is fired if the user
   * agent detects that the drawing buffer associated with
   * a `WebGLRenderingContext` object has been lost.
   *
   * This event does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/webglcontextlost_event)
   */
  onWebGLContextLost?(
    this: GlobalEventHandlers,
    event: WebGLContextEvent
  ): any,

  /**
   * The `webglcontextrestored` event of the WebGL API is fired if the user
   * agent restores the drawing buffer for a `WebGLRenderingContext` object.
   *
   * Once the context is restored, WebGL resources such as textures and buffers
   * that were created before the context was lost are no longer valid.
   * You need to reinitialize the state of your WebGL application and
   * recreate resources.
   *
   * This event does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/webglcontextlost_event)
   */
  onWebGLContextRestored?(
    this: GlobalEventHandlers,
    event: WebGLContextEvent
  ): any,
}

export interface ColElementProps extends HTMLElementProps {
  /**
   * Specifies the number of consecutive columns the `<col>` element spans.
   * The value must be a positive integer greater than zero.
   * If not present, its default value is `1`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/col#span)
   */
  span?: Bindable<number>,
}

export interface ColgroupElementProps extends HTMLElementProps {
  /**
   * Specifies the number of consecutive columns the `<colgroup>` element
   * spans. The value must be a positive integer greater than zero.
   * If not present, its default value is `1`.
   *
   * > **_NOTE:_**
   * The `span` attribute is not permitted if there are one or more `<col>`
   * elements within the `<colgroup>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/colgroup#span)
   */
  span?: Bindable<number>,
}

export interface DataElementProps extends HTMLElementProps {
  /**
   * Specifies the machine-readable translation of the content of the element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/data#value)
   */
  value?: Bindable<string>,
}

export interface DelElementProps extends HTMLElementProps {
  /**
   * A URI for a resource that explains the change (for example,
   * meeting minutes).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/del#cite)
   */
  cite?: Bindable<string>,

  /**
   * This attribute indicates the time and date of the change and must be
   * a valid date string with an optional time. If the value cannot be parsed
   * as a date with an optional time string, the element does not have
   * an associated timestamp. For the format of the string without a time,
   * see Date strings. The format of the string if it includes both date
   * and time is covered in
   * [Local date and time strings](https://developer.mozilla.org/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings)
   * .
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/del#datetime)
   */
  datetime?: Bindable<string>,
}

export interface DetailsElementProps extends HTMLElementProps {
  /**
   * This Boolean attribute indicates whether the details — that is,
   * the contents of the `<details>` element — are currently visible.
   * The details are shown when this attribute exists, or hidden when
   * this attribute is absent. By default, this attribute is absent which
   * means the details are not visible.
   *
   * > **_NOTE:_**
   * You have to remove this attribute entirely to make the details hidden.
   * `open="false"` makes the details visible because this attribute is
   * Boolean.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/details#open)
   */
  open?: Bindable<boolean>,

  /**
   * This attribute enables multiple `<details>` elements to be connected,
   * with only one open at a time. This allows developers to easily create
   * UI features such as accordions without scripting.
   *
   * The name attribute specifies a group name — give multiple `<details>`
   * elements the same `name` value to group them. Only one of the grouped
   * `<details>` elements can be open at a time — opening one will cause
   * another to close. If multiple grouped `<details>` elements are given
   * the `open` attribute, only the first one in the source order will be
   * rendered open.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/details#name)
   */
  name?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement)
 */
export interface DialogElementProps extends HTMLElementProps {
  /**
   * Indicates that the dialog box is active and is available for interaction.
   * If the `open` attribute is not set, the dialog box will not be visible to
   * the user. It is recommended to use the `.show()` or `.showModal()` method
   * to render dialogs, rather than the `open` attribute. If a `<dialog>` is
   * opened using the `open` attribute, it is non-modal.
   *
   * > **_NOTE:_**
   * While you can toggle between the open and closed states of non-modal dialog
   * boxes by toggling the presence of the `open` attribute, this approach is
   * not recommended.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/open)
   */
  open?: Bindable<boolean>,

  /**
   * Sets the return value for the `<dialog>`, usually to indicate which button
   * the user pressed to close it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/returnValue)
   */
  returnValue?: Bindable<string>,

  /**
   * The `cancel` event fires on a `<dialog>` element when the user instructs
   * the browser that they wish to dismiss the current open dialog. The browser
   * fires this event when the user presses the `Esc` key.
   *
   * This event is cancelable but can not bubble.
   *
   * When a `<dialog>` is dismissed with the `Esc` key, both the `cancel` and
   * `close` events are fired.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event)
   */
  onCancel?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `close` event is fired on an `HTMLDialogElement` object when the
   * `<dialog>` it represents has been closed.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event)
   */
  onClose?(this: GlobalEventHandlers, event: Event): any,
}

export interface EmbedElementProps extends HTMLElementProps {
  /**
   * The displayed height of the resource, in CSS pixels. This must be an
   * absolute value; percentages are not allowed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/embed#height)
   */
  height?: Bindable<number>,

  /**
   * The URL of the resource being embedded.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/embed#src)
   */
  src?: Bindable<string>,

  /**
   * The MIME type to use to select the plug-in to instantiate.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/embed#type)
   */
  type?: Bindable<string>,

  /**
   * The displayed width of the resource, in CSS pixels. This must be an
   * absolute value; percentages are not allowed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/embed#width)
   */
  width?: Bindable<number>,
}

export interface FencedFrameProps extends HTMLElementProps {
  /**
   * Specifies a
   * [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy)
   * for the `<fencedframe>`, which defines what features are available to
   * the `<fencedframe>` based on the origin of the request.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFencedFrameElement/allow)
   */
  allow?: Bindable<string>,

  /**
   * A unitless integer representing the height of the fenced frame in
   * CSS pixels. The default is `150`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFencedFrameElement/height)
   */
  height?: Bindable<number>,

  /**
   * A unitless integer representing the width of the fenced frame in
   * CSS pixels. The default is `300`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFencedFrameElement/width)
   */
  width?: Bindable<number>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement)
 */
export interface FieldSetElementProps extends HTMLElementProps {
  /**
   * If set, all form controls that are descendants of the `<fieldset>`, are disabled,
   * meaning they are not editable and won't be submitted along with the `<form>`.
   * They won't receive any browsing events, like mouse clicks or focus-related events.
   * By default, browsers display such controls grayed out. Note that form elements
   * inside the `<legend>` element won't be disabled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * This attribute takes the value of the `id` attribute of a `<form>` element
   * you want the `<fieldset>` to be part of, even if it is not inside the form.
   * Please note that usage of this is confusing — if you want the `<input>`
   * elements inside the `<fieldset>` to be associated with the form, you need
   * to use the form attribute directly on those elements. You can check which
   * elements are associated with a form via JavaScript, using
   * `HTMLFormElement.elements`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/form)
   */
  form?: Bindable<string>,

  /**
   * The name associated with the group.
   *
   * > **_NOTE:_**
   * The caption for the fieldset is given by the first <legend> element nested inside it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement/name)
   */
  name?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement)
 */
export interface FormElementProps extends HTMLElementProps {
  /**
   * The character encoding accepted by the server. The specification allows
   * a single case-insensitive value of "UTF-8", reflecting the ubiquity
   * of this encoding (historically multiple character encodings could
   * be specified as a comma-separated or space-separated list).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/acceptCharset)
   */
  acceptCharset?: Bindable<string>,

  /**
   * The URL that processes the form submission. This value can be overridden
   * by a `formaction` attribute on a `<button>`, `<input type="submit">`,
   * or `<input type="image">` element. This attribute is ignored when
   * `method="dialog"` is set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/action)
   */
  action?: Bindable<string>,

  /**
   * Indicates whether input elements can by default have their values
   * automatically completed by the browser. `autoComplete` attributes
   * on form elements override it on <form>. Possible values:
   *
   * - `off`: The browser may not automatically complete entries.
   * (Browsers tend to ignore this for suspected login forms;
   * see Managing autofill for login fields.)
   * - `on`: The browser may automatically complete entries.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: Bindable<'off'|'on'>,

  /**
   * An alternative name for `enctype`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/encoding)
   */
  encoding?: Bindable<
    'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'
  >,

  /**
   * If the value of the `method` attribute is `post`, `enctype` is the
   * [MIME type](https://en.wikipedia.org/wiki/Mime_type)
   * of the form submission. Possible values:
   *
   * - `application/x-www-form-urlencoded`: The default value.
   *
   * - `multipart/form-data`: Use this if the form contains `<input>` elements
   * with `type=file`.
   *
   * - `text/plain`: Useful for debugging purposes.
   *
   * This value can be overridden by `formenctype` attributes on `<button>`,
   * `<input type="submit">`, or `<input type="image">` elements.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/enctype)
   */
  enctype?: Bindable<
    'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'
  >,

  /**
   * The HTTP method to submit the form with. The only allowed methods/values
   * are (case insensitive):
   *
   * - `post`: The `POST` method; form data sent as the request body.
   *
   * - `get` (default): The GET; form data appended to the `action` URL with
   * a `?` separator. Use this method when the form has no side effects.
   *
   * - `dialog`: When the form is inside a <dialog>, closes the dialog
   * and causes a `submit` event to be fired on submission, without
   * submitting data or clearing the form.
   *
   * This value is overridden by `formmethod` attributes on `<button>`,
   * `<input type="submit">`, or `<input type="image">` elements.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/method)
   */
  method?: Bindable<'post'|'get'|'dialog'>,

  /**
   * The name of the form. The value must not be the empty string,
   * and must be unique among the form elements in the forms
   * collection that it is in, if any.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/name)
   */
  name?: Bindable<string>,

  /**
   * Indicates that the form shouldn't be validated when submitted.
   * If this attribute is not set (and therefore the form is validated),
   * it can be overridden by a `formnovalidate` attribute on a `<button>`,
   * `<input type="submit">`, or `<input type="image">` element belonging
   * to the form.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/noValidate)
   */
  noValidate?: Bindable<boolean>,

  /**
   * Indicates where to display the response after submitting the form.
   * It is a name/keyword for a browsing context (for example, tab, window,
   * or iframe). The following keywords have special meanings:
   *
   * - `_self` (default) - Load into the same browsing context as
   * the current one.
   *
   * - `_blank`: Load into a new unnamed browsing context.
   * This provides the same behavior as setting `rel="noopener"`
   * which does not set `window.opener`.
   *
   * - `_parent`: Load into the parent browsing context of the current one.
   * If no parent, behaves the same as `_self`.
   *
   * - `_top`: Load into the top-level browsing context (i.e., the browsing
   * context that is an ancestor of the current one and has no parent).
   * If no parent, behaves the same as `_self`.
   *
   * - `_unfencedTop`: Load the response from a form inside an embedded
   * fenced frame into the top-level frame (i.e., traversing beyond
   * the root of the fenced frame, unlike other reserved destinations).
   * Only available inside fenced frames.
   *
   * This value can be overridden by a `formtarget` attribute on a `<button>`,
   * `<input type="submit">`, or `<input type="image">` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/target)
   */
  target?: Bindable<'_self'|'_blank'|'_parent'|'_top'|'_unfencedTop'>,

  /**
   * The `formdata` event fires after the entry list representing the form's
   * data is constructed. This happens when the form is submitted, but can also
   * be triggered by the invocation of a `FormData()` constructor.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event)
   */
  onFormData?(this : GlobalEventHandlers, event : FormDataEvent): any,

  /**
   * The `reset` event fires when a <form> is reset.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event)
   */
  onReset?(this : GlobalEventHandlers, event : Event): any,

  /**
   * The `submit` event fires when a `<form>` is submitted.
   *
   * Note that the `submit` event fires on the `<form>` element itself, and not
   * on any `<button>` or `<input type="submit">` inside it. However, the
   * `SubmitEvent` which is sent to indicate the form's submit action has been
   * triggered includes a submitter property, which is the button that was
   * invoked to trigger the submit request.
   *
   * The `submit` event fires when:
   *
   * - the user clicks a submit button,
   * - the user presses `Enter` while editing a field
   * (e.g. `<input type="text">`) in a form,
   * - a script calls the `form.requestSubmit()` method
   *
   * However, the event is not sent to the form when a script calls the
   * `form.submit()` method directly.
   *
   * > **_NOTE:_**
   * Trying to submit a form that does not pass validation triggers an
   * `invalid` event. In this case, the validation prevents form submission,
   * and thus there is no `submit` event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event)
   */
  onSubmit?(this: GlobalEventHandlers, event: SubmitEvent): any,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIElement)
 */
export interface IFrameElementProps extends HTMLElementProps {
  /**
   * Specifies a
   * [Permissions Policy](https://developer.mozilla.org/docs/Web/HTTP/Permissions_Policy)
   * for the `<iframe>`. The policy defines what features are available to
   * the `<iframe>` (for example, access to the microphone, camera, battery,
   * web-share, etc.) based on the origin of the request.
   *
   * > **_NOTE:_**
   * A Permissions Policy specified by the `allow` attribute implements
   * a further restriction on top of the policy specified in the
   * [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Permissions-Policy)
   * header. It doesn't replace it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/allow)
   */
  allow?: Bindable<string>,

  /**
   * Set to `true` if the `<iframe>` can activate fullscreen mode by calling
   * the `requestFullscreen()` method.
   *
   * > **_NOTE:_**
   * This attribute is considered a legacy attribute and redefined as
   * `allow="fullscreen"`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/allowFullscreen)
   */
  allowFullscreen?: Bindable<boolean>,

  /**
   * A boolean attribute that, if present, specifies that the selected topics
   * for the current user should be sent with the request for the `<iframe>`'s
   * source. See
   * [Using the Topics API](https://developer.mozilla.org/docs/Web/API/Topics_API/Using)
   * for more details.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/browsingTopics)
   */
  browsingTopics?: Bindable<boolean>,

  /**
   * Set to `true` to make the `<iframe>` credentialless, meaning that its
   * content will be loaded in a new, ephemeral context. It doesn't have access
   * to the network, cookies, and storage data associated with its origin.
   * It uses a new context local to the top-level document lifetime. In return,
   * the
   * [Cross-Origin-Embedder-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
   * (COEP) embedding rules can be lifted, so documents with COEP set can embed
   * third-party documents that do not. See
   * [IFrame credentialless](https://developer.mozilla.org/docs/Web/Security/IFrame_credentialless)
   * for more details.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/credentialless)
   */
  credentialless?: Bindable<boolean>,

  /**
   * A
   * [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP)
   * enforced for the embedded resource.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/csp)
   */
  csp?: Bindable<string>,

  /**
   * The height of the frame in CSS pixels. Default is 150.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/height)
   */
  height?: Bindable<number>,

  /**
   * Indicates when the browser should load the iframe:
   *
   * - `eager`: Load the iframe immediately on page load (this is the default
   * value).
   *
   * - `lazy`: Defer loading of the iframe until it reaches a calculated
   * distance from the visual viewport, as defined by the browser. The intent
   * is to avoid using the network and storage bandwidth required to fetch
   * the frame until the browser is reasonably certain that it will be needed.
   * This improves the performance and cost in most typical use cases,
   * in particular by reducing initial page load times.
   *
   * > **_NOTE:_**
   * Loading is only deferred when JavaScript is enabled. This is an anti-tracking measure.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/loading)
   */
  loading?: Bindable<'eager'|'lazy'>,

  /**
   * A targetable name for the embedded browsing context. This can be used in
   * the `target` attribute of the `<a>`, `<form>`, or `<base>` elements;
   * the `formtarget` attribute of the `<input>` or `<button>` elements;
   * or the `windowName` parameter in the `window.open()` method.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/name)
   */
  name?: Bindable<string>,

  /**
   * Indicates which referrer to send when fetching the frame's resource:
   *
   * - `no-referrer`: The `Referer` header will not be sent.
   *
   * - `no-referrer-when-downgrade`: The `Referer` header will not be sent to
   * origins without TLS (HTTPS).
   *
   * - `origin`: The sent referrer will be limited to the origin of the
   * referring page: its scheme, host, and port.
   *
   * - `origin-when-cross-origin`: The referrer sent to other origins will be
   * limited to the scheme, the host, and the port. Navigations on the same
   * origin will still include the path.
   *
   * - `same-origin`: A referrer will be sent for same origin, but cross-origin
   * requests will contain no referrer information.
   *
   * - `strict-origin`: Only send the origin of the document as the referrer
   * when the protocol security level stays the same (HTTPS→HTTPS), but don't
   * send it to a less secure destination (HTTPS→HTTP).
   *
   * - `strict-origin-when-cross-origin` (default): Send a full URL when
   * performing a same-origin request, only send the origin when the protocol
   * security level stays the same (HTTPS→HTTPS), and send no header to a less
   * secure destination (HTTPS→HTTP).
   *
   * - `unsafe-url`: The referrer will include the origin and the path (but not
   * the fragment, password, or username). This value is unsafe, because it
   * leaks origins and paths from TLS-protected resources to insecure origins.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/referrerPolicy)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,

  /**
   * Controls the restrictions applied to the content embedded in the
   * `<iframe>`. The value of the attribute can either be empty to apply all
   * restrictions, or space-separated tokens to lift particular restrictions:
   *
   * - `allow-downloads`: Allows downloading files through an `<a>` or `<area>`
   * element with the `download` attribute, as well as through the navigation
   * that leads to a download of a file. This works regardless of whether the
   * user clicked on the link, or JS code initiated it without user interaction.
   *
   * - `allow-forms`: Allows the page to submit forms. If this keyword is not
   * used, a form will be displayed as normal, but submitting it will not
   * trigger input validation, send data to a web server, or close a dialog.
   *
   * - `allow-modals`: Allows the page to open modal windows by
   * `Window.alert()`, `Window.confirm()`, `Window.print()` and
   * `Window.prompt()`, while opening a `<dialog>` is allowed
   * regardless of this keyword. It also allows the page to
   * receive `BeforeUnloadEvent` event.
   *
   * - `allow-orientation-lock`: Lets the resource lock the screen orientation.
   *
   * - `allow-pointer-lock`: Allows the page to use the Pointer Lock API.
   *
   * - `allow-popups`: Allows popups (like from `Window.open()`,
   * `target="_blank"`, `Window.showModalDialog()`).
   * If this keyword is not used, that functionality will silently fail.
   *
   * - `allow-popups-to-escape-sandbox`: Allows a sandboxed document to open
   * a new browsing context without forcing the sandboxing flags upon it.
   * This will allow, for example, a third-party advertisement to be safely
   * sandboxed without forcing the same restrictions upon the page the ad
   * links to. If this flag is not included, a redirected page, popup window,
   * or new tab will be subject to the same sandbox restrictions as the
   * originating `<iframe>`.
   *
   * - `allow-presentation`: Allows embedders to have control over whether
   * an iframe can start a presentation session.
   *
   * - `allow-same-origin`: If this token is not used, the resource is treated
   * as being from a special origin that always fails the same-origin policy
   * (potentially preventing access to data storage/cookies and some JavaScript
   * APIs).
   *
   * - `allow-scripts`: Allows the page to run scripts (but not create pop-up
   * windows). If this keyword is not used, this operation is not allowed.
   *
   * - `allow-storage-access-by-user-activation` (experimental): Allows
   * a document loaded in the `<iframe>` to use the
   * [Storage Access API](https://developer.mozilla.org/docs/Web/API/Storage_Access_API)
   * to request access to unpartitioned cookies.
   *
   * - `allow-top-navigation`: Lets the resource navigate the top-level
   * browsing context (the one named _top).
   *
   * - `allow-top-navigation-by-user-activation`: Lets the resource navigate
   * the top-level browsing context, but only if initiated by a user gesture.
   *
   * - `allow-top-navigation-to-custom-protocols`: Allows navigations to
   * non-http protocols built into browser or registered by a website.
   * This feature is also activated by allow-popups or allow-top-navigation
   * keyword.
   *
   * > **_NOTE:_**
   * - When the embedded document has the same origin as the embedding page,
   * it is **strongly discouraged** to use both `allow-scripts` and
   * `allow-same-origin`, as that lets the embedded document remove the
   * `sandbox` attribute — making it no more secure than not using the
   * `sandbox` attribute at all.
   * - Sandboxing is useless if the attacker can display content outside
   * a sandboxed `iframe` — such as if the viewer opens the frame in a new tab.
   * Such content should be also served from a separate origin to limit
   * potential damage.
   *
   * > **_NOTE:_**
   * When redirecting the user, opening a popup window, or opening a new tab
   * from an embedded page within an `<iframe>` with the `sandbox` attribute,
   * the new browsing context is subject to the same `sandbox` restrictions.
   * This can create issues — for example, if a page embedded within an
   * `<iframe>` without a `sandbox="allow-forms"` or
   * `sandbox="allow-popups-to-escape-sandbox"` attribute set on it opens a new
   * site in a separate tab, form submission in that new browsing context will
   * silently fail.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/iframe#sandbox)
   */
  sandbox?: Bindable<
    'allow-downloads'
    | 'allow-forms'
    | 'allow-modals'
    | 'allow-orientation-lock'
    | 'allow-pointer-lock'
    | 'allow-popups'
    | 'allow-popups-to-escape-sandbox'
    | 'allow-presentation'
    | 'allow-same-origin'
    | 'allow-scripts'
    | 'allow-storage-access-by-user-activation'
    | 'allow-top-navigation'
    | 'allow-top-navigation-by-user-activation'
    | 'allow-top-navigation-to-custom-protocols'
  >,

  /**
   * The URL of the page to embed. Use a value of `about:blank` to embed
   * an empty page that conforms to the same-origin policy.
   *
   * > **_NOTE:_**
   * The `about:blank` page uses the embedding document's URL as its base URL
   * when resolving any relative URLs, such as anchor links.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/src)
   */
  src?: Bindable<string>,

  /**
   * Inline HTML to embed, overriding the `src` attribute. Its content should
   * follow the syntax of a full HTML document, which includes the doctype
   * directive, `<html>`, `<body>` tags, etc., although most of them can be
   * omitted, leaving only the body content. This doc will have `about:srcdoc`
   * as its location. If a browser does not support the `srcdoc` attribute,
   * it will fall back to the URL in the `src` attribute.
   *
   * > **_NOTE:_**
   * The `about:srcdoc` page uses the embedding document's URL as its base URL
   * when resolving any relative URLs, such as anchor links.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/srcdoc)
   */
  srcdoc?: Bindable<string>,

  /**
   * The width of the frame in CSS pixels. Default is 300.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/width)
   */
  width?: Bindable<number>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
 */
export interface ImageElementProps extends HTMLElementProps {
  /**
   * Indicates how to position the image relative to its container.
   *
   * You should instead use the CSS property `vertical-align`, which does
   * in fact also work on images despite its name. You can also use the
   * `float` property to float the image to the left or right margin.
   *
   * These three values specify the alignment of the element relative
   * to the text baseline. These should be replaced by using the CSS
   * `vertical-align` property.
   *
   * - `bottom`: The bottom edge of the image is to be aligned vertically
   * with the current text baseline. Default value.
   *
   * - `middle`: The center of the object should be aligned vertically
   * with the current baseline.
   *
   * - `top`: The top edge of the object should be aligned vertically
   * with the current baseline.
   *
   * The `left` and `right` properties don't affect the baseline-relative
   * alignment. Instead, they cause the image to "float" to the left or
   * right margin, allowing the following text to flow around the image.
   * You should instead use the CSS `float` property, specifying as
   * the value either `left` or `right`.
   *
   * - `left`: Floats the image over to place the left edge flush against
   * the current margin. Any text that follows will flow against the image's
   * right edge.
   *
   * - `right`: Floats the image to place its right edge flush against
   * the right margin. Subsequent text will flow along the image's left edge.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/align)
   *
   * @deprecated
   */
  align?: Bindable<'bottom'|'middle'|'top'|'left'|'right'>,

  /**
   * Provides fallback (alternate) text to display when the image specified
   * by the `<img>` element is not loaded.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/alt)
   */
  alt?: Bindable<string>,

  /**
   * Specifies that you want the browser to send an
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header along with the image request.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/attributionSrc)
   */
  attributionSrc?: Bindable<string>,

  /**
   * Specifies the number of pixels thick the border surrounding the image
   * should be. A value of 0, the default, indicates that no border should
   * be drawn.
   *
   * You should *not* use this property! Instead, you should use CSS to style
   * the border. The `border` property or its longhand properties to not only
   * set the thickness of the border but to potentially apply a wide variety
   * of other styling options to it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/border)
   *
   * @deprecated
   */
  border?: Bindable<number|string>,

  /**
   * Specifies the Cross-Origin Resource Sharing (CORS) setting to use when
   * retrieving the resource.
   *
   * - `anonymous`: Requests sent by this element will use the `cors`
   * [mode](https://developer.mozilla.org/docs/Web/API/Request/mode)
   * and the `same-origin`
   * [credentials](https://developer.mozilla.org/docs/Web/API/Request/credentials)
   * mode. This means that CORS is enabled and credentials are sent if
   * the resource is fetched from the same origin from which the
   * document was loaded.
   *
   * - `use-credentials`: Requests sent by this element will use the cors
   * [mode](https://developer.mozilla.org/docs/Web/API/Request/mode)
   * and the include
   * [credentials](https://developer.mozilla.org/docs/Web/API/Request/credentials)
   * mode. All resources requests by the element will use CORS, regardless of
   * what domain the fetch is from.
   *
   * If the `crossOrigin` property is specified with any other value,
   * it is the same as specifying as the `anonymous`.
   *
   * If the `crossOrigin` property is not specified, the resource is fetched
   * without CORS (the no-cors mode and the same-origin credentials mode).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/crossOrigin)
   */
  crossOrigin?: Bindable<'anonymous'|'use-credentials'>,

  /**
   * The URL of the image which is currently presented in the `<img>` element
   * it represents.
   *
   * This is useful when you provide multiple image options using the sizes
   * and/or `srcset` properties. `currentSrc` lets you
   * determine which image from the set of provided images was selected
   * by the browser.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/currentSrc)
   */
  currentSrc?: Bindable<string>,

  /**
   * A hint to the browser as to how it should decode the image.
   * More specifically, whether it should wait for the image to be decoded
   * before presenting other content updates or not.
   *
   * - `sync`: Decode the image synchronously for atomic presentation with
   * other content.
   *
   * - `async`: Decode the image asynchronously and allow other content
   * to be rendered before this completes.
   *
   * - `auto`: No preference for the decoding mode; the browser decides
   * what is best for the user. This is the default value, but different
   * browsers have different defaults:
   *
   * > **_NOTE:_**
   * - Chromium defaults to `sync`.
   * - Firefox defaults to `async`.
   * - Safari defaults to `sync` except in a small number of circumstances.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/decoding)
   */
  decoding?: Bindable<'sync'|'async'|'auto'>,

  /**
   * A hint to the browser indicating how it should prioritize fetching
   * a particular image relative to other images.
   *
   * The property allows a developer to signal that fetching a particular
   * image early in the loading process has more or less impact on user
   * experience than a browser can reasonably infer when assigning
   * an internal priority. This in turn allows the browser to increase
   * or decrease the priority, and potentially load the image earlier
   * or later than it would otherwise. The property should be used
   * sparingly, as excessive or incorrect prioritization can degrade
   * performance.
   *
   * The fetch priority can be used to complement preloading, allowing
   * a developer to boost the priority ahead of less-impactful resources
   * that have a higher default priority.
   *
   * - `high`: Fetch the image at a high priority relative to other images
   * with the same internal prioritization.
   *
   * - `low`: Fetch the image at a low priority relative to other images
   * with the same internal prioritization.
   *
   * - `auto`: Don't set a user preference for the fetch priority.
   * This is the default. It is used if no value is set or if
   * an invalid value is set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority)
   */
  fetchPriority?: Bindable<'high'|'low'|'auto'>,

  /**
   * The height at which the image is drawn, in CSS pixels if the image is
   * being drawn or rendered to any visual medium such as the screen or
   * a printer; otherwise, it's the natural, pixel density corrected
   * height of the image.
   *
   * An integer value indicating the height of the image. The terms in which
   * the height is defined depends on whether the image is being rendered
   * to a visual medium or not.
   *
   * - If the image is being rendered to a visual medium such as a screen
   * or printer, the height is expressed in CSS pixels.
   * - Otherwise, the image's height is represented using its natural
   * (intrinsic) height, adjusted for the display density as indicated
   * by `naturalHeight`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/height)
   */
  height?: Bindable<number>,

  /**
   * The number of pixels of empty space to leave empty on the left and right
   * sides of the `<img>` element when laying out the page.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/hspace)
   *
   * @deprecated
   */
  hspace?: Bindable<number>,

  /**
   * Indicates that the image is to be used by a server-side image map.
   * This may only be used on images located within an `<a>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/isMap)
   */
  isMap?: Bindable<boolean>,

  /**
   * Provides a hint to the user agent on how to handle the loading of
   * the image which is currently outside the window's visual viewport.
   *
   * This helps to optimize the loading of the document's contents by
   * postponing loading the image until it's expected to be needed,
   * rather than immediately during the initial page load.
   *
   * - `eager`: The default behavior, eager tells the browser to load
   * the image as soon as the `<img>` element is processed.
   *
   * - `lazy`: Tells the user agent to hold off on loading the image
   * until the browser estimates that it will be needed imminently.
   * For instance, if the user is scrolling through the document,
   * a value of `lazy` will cause the image to only be loaded shortly
   * before it will appear in the window's visual viewport.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/loading)
   */
  loading?: Bindable<'eager'|'lazy'>,

  /**
   * The URL of a text or HTML file which contains a long-form description
   * of the image. This can be used to provide optional added details beyond
   * the short description provided in the `title` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/longDesc)
   *
   * @deprecated
   */
  longDesc?: Bindable<string>,

  /**
   * A name for the element. This has been replaced by the `id` property
   * available on all elements.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/name)
   *
   * @deprecated
   */
  name?: Bindable<string>,

  /**
   * Defining which referrer is sent when fetching the resource.
   *
   * - `no-referrer`: The Referer header will be omitted entirely.
   * No referrer information is sent along with requests.
   *
   * - `no-referrer-when-downgrade`: The URL is sent as a referrer when
   * the protocol security level stays the same (e.g.HTTP→HTTP, HTTPS→HTTPS),
   * but isn't sent to a less secure destination (e.g. HTTPS→HTTP).
   *
   * - `origin`: Only send the origin of the document as the referrer in
   * all cases. The document `https://example.com/page.html` will send
   * the referrer `https://example.com/`.
   *
   * - `origin-when-cross-origin`: Send a full URL when performing
   * a same-origin request, but only send the origin of the document
   * for other cases.
   *
   * - `same-origin`: A referrer will be sent for same-site origins,
   * but cross-origin requests will contain no referrer information.
   *
   * - `strict-origin`: Only send the origin of the document as the referrer
   * when the protocol security level stays the same (e.g. HTTPS→HTTPS),
   * but don't send it to a less secure destination (e.g. HTTPS→HTTP).
   *
   * - `strict-origin-when-cross-origin` (default): This is the user agent's
   * default behavior if no policy is specified. Send a full URL when performing
   * a same-origin request, only send the origin when the protocol security
   * level stays the same (e.g. HTTPS→HTTPS), and send no header to a less
   * secure destination (e.g. HTTPS→HTTP).
   *
   * - `unsafe-url`: Send a full URL when performing a same-origin or
   * cross-origin request. This policy will leak origins and paths from
   * TLS-protected resources to insecure origins. Carefully consider
   * the impact of this setting.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/referrerPolicy)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,

  /**
   * Specify the layout width of the image for each of a list of media
   * conditions. This provides the ability to automatically select among
   * different images—even images of different orientations or aspect
   * ratios—as the document state changes to match different media conditions.
   *
   * Each condition is specified using the same conditional format used by
   * [media queries](https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries)
   * .
   *
   * A string containing a comma-separated list of source size descriptors
   * followed by an optional fallback size. Each source size descriptor
   * is comprised of a media condition, then at least one whitespace
   * character, then the source size value to use for the image
   * when the media condition evaluates to true.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes)
   */
  sizes?: Bindable<string>,

  /**
   * Specifies the image to display in the `<img>` element.
   *
   * When providing only a single image, rather than a set of images from which
   * the browser selects the best match for the viewport size and display pixel
   * density, the `src` attribute is a string specifying the URL of the desired
   * image. This can be set either within the HTML itself using the `src`
   * content attribute, or programmatically by setting the element's `src`
   * property.
   *
   * If you use the `srcset` content attribute to provide multiple image options
   * for different display pixel densities, the URL specified by the `src`
   * attribute is used in one of two ways:
   *
   * - as a fallback for browsers that don't support `srcset`.
   * - as an equivalent for specifying an image in `srcset` with the size
   * multiplier `1x`; that is, the image specified by `src` is used on
   * low-density screens (such as typical 72 DPI or 96 DPI displays).
   *
   * Additionally, if you use `src` along with both sizes (or the corresponding
   * sizes content attribute) and `srcset` in order to choose an image based
   * on the viewport size, the `src` attribute is only used as a fallback
   * for browsers that don't support `sizes` and `srcset`; otherwise, it's
   * not used at all.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/src)
   */
  src?: Bindable<string>,

  /**
   * Identifies one or more image candidate strings, separated using commas
   * (`,`) each specifying image resources to use under given circumstances.
   *
   * Each image candidate string contains an image URL and an optional width
   * or pixel density descriptor that indicates the conditions under which
   * that candidate should be used instead of the image specified by the
   * `src` property.
   *
   * The `srcset` property, along with the `sizes` property, are a crucial
   * component in designing responsive websites, as they can be used together
   * to make pages that use appropriate images for the rendering situation.
   *
   * > **_NOTE:_**
   * If the `srcset` attribute uses width descriptors, the `sizes`
   * attribute must also be present, or the `srcset` itself will be ignored.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset)
   */
  srcset?: Bindable<string>,

  /**
   * A string providing the page-local URL (that is, a URL that begins with
   * the hash or pound symbol, `#`) of the `<map>` element which defines
   * the image map to apply to the image.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/useMap)
   */
  useMap?: Bindable<string>,

  /**
   * The number of pixels of empty space to leave empty on the top and bottom
   * of the `<img>` element when laying out the page.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/vspace)
   *
   * @deprecated
   */
  vspace?: Bindable<number>,

  /**
   * The width at which an image is drawn in CSS pixels if it's being drawn
   * or rendered to any visual medium such as a screen or printer.
   * Otherwise, it's the natural, pixel density-corrected width of the image.
   *
   * An integer value indicating the width of the image. The way the width
   * is defined depends on whether or not the image is being rendered to
   * a visual medium, such as a screen or printer:
   *
   * - If the image is being rendered to a visual medium, the width is
   * expressed in CSS pixels.
   * - If the image is not being rendered to a visual medium, its width
   * is represented using the image's natural (intrinsic) width,
   * adjusted for the display density as indicated by naturalWidth.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/width)
   */
  width?: Bindable<number>,

  /**
   * The x-coordinate of the `<img>` element's left border edge relative
   * to the root element's origin.
   *
   * The `x` and `y` properties are only valid for an image if its `display`
   * property has the computed value `table-column` or `table-column-group`.
   * In other words: it has either of those values set explicitly on it,
   * or it has inherited it from a containing element, or by being located
   * within a column described by either `<col>` or `<colgroup>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/x)
   */
  x?: Bindable<number>,

  /**
   * The y-coordinate of the `<img>` element's top border edge relative
   * to the root element's origin.
   *
   * The `x` and `y` properties are only valid for an image if its `display`
   * property has the computed value `table-column` or `table-column-group`.
   * In other words: it has either of those values set explicitly on it,
   * or it has inherited it from a containing element, or by being located
   * within a column described by either `<col>` or `<colgroup>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/y)
   */
  y?: Bindable<number>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement)
 */
export interface InputElementProps extends HTMLElementProps {
  /**
   * Valid for the `file` input type only, the `accept` attribute defines
   * which file types are selectable in a `file` upload control.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/accept)
   */
  accept?: Bindable<string>,

  /**
   * Valid for the `image` button only, the `alt` attribute provides alternative
   * text for the image, displaying the value of the attribute if the image
   * `src` is missing or otherwise fails to load.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/alt)
   */
  alt?: Bindable<string>,

  /**
   * The `autoComplete` attribute takes as its value a space-separated string
   * that describes what, if any, type of auto-complete functionality the input
   * should provide. A typical implementation of auto-complete recalls previous
   * values entered in the same input field, but more complex forms of
   * auto-complete can exist. For instance, a browser could integrate
   * with a device's contacts list to auto-complete email addresses
   * in an `email` input field.
   *
   * The `autoComplete` attribute is valid on `hidden`, `text`, `search`,
   * `url`, `tel`, `email`, `date`, `month`, `week`, `time`, `datetime-local`,
   * `number`, `range`, `color`, and `password`. This attribute has no effect
   * on input types that do not return numeric or text data, being valid for
   * all input types except checkbox, `radio`, `file`, or any of the button
   * types.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: Bindable<boolean|'on'|'off'|string>,

  /**
   * Introduced in the HTML Media Capture specification and valid for the `file`
   * input type only, the `capture` attribute defines which media—microphone,
   * video, or camera—should be used to capture a new file for upload with
   * `file` upload control in supporting scenarios.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/capture)
   */
  capture?: Bindable<'user'|'environment'|string>,

  /**
   * Valid for both `radio` and `checkbox` types, `checked` is a Boolean
   * attribute. If present on a radio type, it indicates that the radio button
   * is the currently selected one in the group of same-named radio buttons.
   * If present on a `checkbox` type, it indicates that the checkbox is checked
   * by default (when the page loads). It does *not* indicate whether this
   * checkbox is currently checked: if the checkbox's state is changed,
   * this content attribute does not reflect the change.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/checked)
   */
  checked?: Bindable<boolean>,

  /**
   * Specifies the default checkedness state of the element. This property
   * reflects the `<input>` element's `checked` attribute.
   *
   * Valid for the `radio` (`<input type="radio">`) and `checkbox`
   * (`<input type="checkbox">`) input types.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/defaultChecked)
   */
  defaultChecked?: Bindable<boolean>,

  /**
   * Indicates the original (or default) value of the `<input>` element.
   * It reflects the element's `value` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/defaultValue)
   */
  defaultValue?: Bindable<string>,

  /**
   * Valid for hidden, `text`, `search`, `url`, `tel`, and `email` input types,
   * the `dirname` attribute enables the submission of the directionality of
   * the element. When included, the form control will submit with two
   * `name`/`value` pairs: the first being the `name` and `value`,
   * and the second being the value of the `dirname` attribute as the name,
   * with a value of `ltr` or `rtl` as set by the browser.
   *
   * ```html
   * <form action="page.html" method="post">
   *   <label>
   *     Fruit:
   *     <input type="text" name="fruit" dirname="fruit-dir" value="cherry" />
   *   </label>
   *   <input type="submit" />
   * </form>
   * <!-- page.html?fruit=cherry&fruit-dir=ltr -->
   * ```
   *
   * When the form above is submitted, the input cause both the `name`/`value`
   * pair of `fruit=cherry` and the `dirname` / direction pair of
   * `fruit-dir=ltr` to be sent.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/input#dirname)
   */
  dirname?: Bindable<string>,

  /**
   * Reflects the `disabled` HTML attribute, which indicates whether the control
   * is disabled. If it is disabled, it does not accept clicks.
   * A disabled element is unusable and un-clickable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * The `<form>` element with which the input is associated (that is, its
   * form owner). This string's value, if present, must match the `id` of a
   * `<form>` element in the same document. If this attribute isn't specified,
   * the `<input>` element is associated with the nearest containing form,
   * if any.
   *
   * The `form` attribute lets you place an input anywhere in the document
   * but have it included with a form elsewhere in the document.
   *
   * > **_NOTE:_**
   * An input can only be associated with one form.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#form)
   */
  form?: Bindable<string>,

  /**
   * The URL of the program that is executed on the server when the form that
   * owns this control is submitted.
   *
   * This property is valid only for `submit` and `image` `<input>` elements.
   *
   * Its value overrides the `action` property of the `HTMLFormElement`
   * interface if the form is submitted via the input.
   * This property can be retrieved or set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formAction)
   */
  formAction?: Bindable<string>,

  /**
   * The MIME type of the content sent to the server when the `<input>` with
   * the `formEnctype` is the method of form submission.
   *
   * This property is valid only for submit and image `<input>` elements.
   *
   * Its value overrides the `enctype` property of the `HTMLFormElement`
   * interface if the form is submitted via the input.
   * This property can be retrieved or set.
   * If not set, the value is the empty string (`""`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formEnctype)
   */
  formEnctype?: Bindable<string>,

  /**
   * The HTTP method used to submit the `<form>` if the `<input>` element
   * is the control that submits the form.
   *
   * This property is valid only for `submit` and `image` `<input>` elements.
   *
   * The value overrides the method property of the `HTMLFormElement`
   * interface if the form is submitted via the input.
   * This property can be retrieved or set.
   * If set with an empty or invalid value, the invalid default value
   * is `"get"`. If not set at all, the value is the empty string (`""`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formMethod)
   */
  formMethod?: Bindable<string>,

  /**
   * Indicating if the `<form>` will bypass constraint validation when submitted
   * via the `<input>`.
   *
   * This property is valid only for `submit` and `image` `<input>` elements.
   *
   * Its value overrides the `noValidate` property of the `HTMLFormElement`
   * interface if the form is submitted via the input.
   * This property can be retrieved or set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formNoValidate)
   */
  formNoValidate?: Bindable<boolean>,

  /**
   * The tab, window, or iframe where the response of the submitted `<form>`
   * is to be displayed.
   *
   * This property is valid only for `submit` and `image` `<input>` elements.
   *
   * Its value overrides the `target` property of the `HTMLFormElement`
   * interface if the form is submitted via the input.
   * This property can be retrieved or set.
   * If not set, the value is the empty string (`""`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/formTarget)
   */
  formTarget?: Bindable<string>,

  /**
   * Valid for the `image` input button only, the `height` is the height
   * of the image file to display to represent the graphical submit button.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/height)
   */
  height?: Bindable<string>,

  /**
   * Indicates whether the checkbox is in the *indeterminate* state.
   * For example, a "select all/deselect all" checkbox may be in the
   * indeterminate state when some but not all of its sub-controls are checked.
   * The `indeterminate` state can only be set via JavaScript and is only
   * relevant to `checkbox` controls.
   *
   * It is unrelated to the `checked` property, and an indeterminate checkbox
   * can be either checked or unchecked. Being indeterminate only affects
   * the checkbox's appearance (see example below), not its presence
   * when submitted (which is controlled by the checkedness).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/indeterminate)
   */
  indeterminate?: Bindable<boolean>,

  // inputMode // in HTMLElement

  /**
   * The `id` of a `<datalist>` element located in the same document.
   * The `<datalist>` provides a list of predefined values to suggest to the
   * user for this input. Any values in the list that are not compatible with
   * the `type` are not included in the suggested options. The values provided
   * are suggestions, not requirements: users can select from this predefined
   * list or provide a different value.
   *
   * It is valid on `text`, `search`, `url`, `tel`, `email`, `date`, `month`,
   * `week`, `time`, `datetime-local`, `number`, `range`, and `color`.
   *
   * Per the specifications, the `list` attribute is not supported by the
   * `hidden`, `password`, `checkbox`, `radio`, `file`, or any of the button
   * types.
   *
   * Depending on the browser, the user may see a custom color palette
   * suggested, tic marks along a range, or even an input that opens
   * like a `<select>` but allows for non-listed values.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/max)
   */
  list?: Bindable<''>,

  /**
   * Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`,
   * and `range`, it defines the greatest value in the range of permitted
   * values. If the value entered into the element exceeds this, the element
   * fails constraint validation. If the value of the `max` attribute isn't
   * a number, then the element has no maximum value.
   *
   * There is a special case: if the data type is periodic (such as for dates
   * or times), the value of `max` may be lower than the value of `min`, which
   * indicates that the range may wrap around; for example, this allows
   * you to specify a time range from 10 PM to 4 AM.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/max)
   */
  max?: Bindable<number>,

  /**
   * Valid for `text`, `search`, `url`, `tel`, `email`, and `password`,
   * it defines the maximum string length (measured in UTF-16 code units)
   * that the user can enter into the field. This must be an integer value
   * of 0 or higher. If no `maxlength` is specified, or an invalid value
   * is specified, the field has no maximum length. This value must also
   * be greater than or equal to the value of `minlength`.
   *
   * The input will fail constraint validation if the length of the text
   * entered into the field is greater than `maxlength` UTF-16 code units
   * long. By default, browsers prevent users from entering more characters
   * than allowed by the `maxlength` attribute. Constraint validation is only
   * applied when the value is changed by the user. See
   * [Client-side validation](https://developer.mozilla.org/docs/Web/HTML/Element/input#client-side_validation)
   * for more information.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/maxLength)
   */
  maxLength?: Bindable<number>,

  /**
   * Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`,
   * and `range`, it defines the most negative value in the range of permitted
   * values. If the value entered into the element is less than this,
   * the element fails constraint validation. If the value of the `min`
   * attribute isn't a number, then the element has no minimum value.
   *
   * This value must be less than or equal to the value of the `max` attribute.
   * If the `min` attribute is present but is not specified or is invalid,
   * no `min` value is applied. If the `min` attribute is valid and a non-empty
   * value is less than the minimum allowed by the `min` attribute, constraint
   * validation will prevent form submission.
   *
   * There is a special case: if the data type is periodic (such as for dates
   * or times), the value of `max` may be lower than the value of `min`, which
   * indicates that the range may wrap around; for example, this allows
   * you to specify a time range from 10 PM to 4 AM.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/min)
   */
  min?: Bindable<number>,

  /**
   * Valid for `text`, `search`, `url`, `tel`, `email`, and `password`,
   * it defines the minimum string length (measured in UTF-16 code units)
   * that the user can enter into the entry field. This must be a non-negative
   * integer value smaller than or equal to the value specified by `maxlength`.
   * If no `minlength` is specified, or an invalid value is specified,
   * the input has no minimum length.
   *
   * The input will fail constraint validation if the length of the text
   * entered into the field is fewer than `minlength` UTF-16 code units long,
   * preventing form submission. Constraint validation is only applied when
   * the value is changed by the user.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/minLength)
   */
  minLength?: Bindable<number>,

  /**
   * If set, means the user can enter comma separated email addresses in
   * the email widget or can choose more than one file with the `file` input.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/multiple)
   */
  multiple?: Bindable<boolean>,

  /**
   * A string specifying a name for the input control. This name is submitted
   * along with the control's value when the form data is submitted.
   *
   * Consider the `name` a required attribute (even though it's not).
   * If an input has no `name` specified, or `name` is empty, the input's
   * value is not submitted with the form! (Disabled controls, unchecked
   * radio buttons, unchecked checkboxes, and reset buttons are also not sent.)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/name)
   */
  name?: Bindable<string>,

  /**
   * Valid for `text`, `search`, `url`, `tel`, `email`, and `password`,
   * the pattern attribute is used to compile a regular expression that
   * the input's `value` must match in order for the value to pass
   * constraint validation. It must be a valid JavaScript regular expression,
   * as used by the `RegExp` type. No forward slashes should be specified
   * around the pattern text. When compiling the regular expression:
   *
   * - the pattern will be implicitly wrapped with `^(?:` and `)$`,
   * such that the match is required against the entire input value,
   * i.e., `^(?:<pattern>)$`.
   * - the `'v'` flag is specified so that the pattern is treated
   * as a sequence of Unicode code points, instead of as ASCII.
   *
   * If the pattern attribute is present but is not specified or is invalid,
   * no regular expression is applied and this attribute is ignored completely.
   * If the pattern attribute is valid and a non-empty value does not match
   * the pattern, constraint validation will prevent form submission.
   * If the `multiple` is present, the compiled regular expression is matched
   * against each comma separated value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/pattern)
   */
  pattern?: Bindable<string>,

  /**
   * Valid for `text`, `search`, `url`, `tel`, `email`, `password`,
   * and `number`, the placeholder attribute provides a brief hint to the user
   * as to what kind of information is expected in the field. It should bea word
   * or short phrase that provides a hint as to the expected type of data,
   * rather than an explanation or prompt. The text must not include carriage
   * returns or line feeds. So for example if a field is expected to capture
   * a user's first name, and its label is "First Name", a suitable placeholder
   * might be "e.g. Mustafa".
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/placeholder)
   */
  placeholder?: Bindable<string>,

  /**
   * Specifies the action to be performed on a popover element being controlled
   * by a control `<input type="button">`. Possible values are:
   *
   * - `hide`: The button will hide a shown popover. If you try to hide
   * an already hidden popover, no action will be taken.
   *
   * - `show`: The button will show a hidden popover. If you try to show
   * an already showing popover, no action will be taken.
   *
   * - `toggle`: The button will toggle a popover between showing and hidden.
   * If the popover is hidden, it will be shown; if the popover is showing,
   * it will be hidden. If `popovertargetaction` is omitted, `"toggle"` is
   * the default action that will be performed by the control button.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/popoverTargetAction)
   */
  popoverTargetAction?: Bindable<'hide'|'show'|'toggle'>,

  /**
   * Sets the popover element to control via an `<input>`
   * element of `type="button"`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/popoverTargetElement)
   */
  popoverTargetElement?: Bindable<string>,

  /**
   * Indicates that the user should not be able to edit the value of the input.
   * It is supported by the `text`, `search`, `url`, `tel`, `email`, `date`,
   * `month`, `week`, `time`, `datetime-local`, `number`, and `password`
   * input types.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/readOnly)
   */
  readOnly?: Bindable<boolean>,

  /**
   * Indicates that the user must specify a value for the input before
   * the owning form can be submitted. The required attribute is supported
   * by `text`, `search`, `url`, `tel`, `email`, `date`, `month`, `week`,
   * `time`, `datetime-local`, `number`, `password`, `checkbox`, `radio`,
   * and `file` inputs.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/required)
   */
  required?: Bindable<boolean>,

  /**
   * The number of visible characters displayed. It reflects the `<input>`
   * element's size attribute.
   *
   * The size property is relevant to the `text`, `search`, `tel`, `email`,
   * `url`, and `password` input type only. The value is a non-negative integer
   * greater than zero. If omitted or invalid, the value is 20.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/size)
   */
  size?: Bindable<number>,

  /**
   * Valid for the `image` input button only, the `src` is string specifying
   * the URL of the image file to display to represent the graphical
   * submit button.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/src)
   */
  src?: Bindable<string>,

  /**
   * Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`,
   * and `range`, the `step` attribute is a number that specifies
   * the granularity that the value must adhere to.
   *
   * If not explicitly included:
   *
   * - `step` defaults to 1 for `number` and `range`.
   *
   * - Each date/time input type has a default `step` value appropriate
   * for the type; see the individual input pages: `date`, `datetime-local`,
   * `month`, `time`, and `week`.
   *
   * The value must be a positive number—integer or float—or the special value
   * `any`, which means no stepping is implied, and any value is allowed
   * (barring other constraints, such as `min` and `max`).
   *
   * If `any` is not explicitly set, valid values for the `number`,
   * date/time input types, and `range` input types are equal to the basis
   * for stepping — the `min` value and increments of the step value,
   * up to the `max` value, if specified.
   *
   * For example, if you have `<input type="number" min="10" step="2">`,
   * then any even integer, `10` or greater, is valid. If omitted,
   * `<input type="number">`, any integer is valid, but floats (like `4.2`)
   * are not valid, because `step` defaults to `1`. For `4.2` to be valid,
   * `step` would have had to be set to `0.1`, `0.2`, or `any`, the `min` value
   * would have had to be a number ending in `.2`, such as
   * `<input type="number" min="-5.2">`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/step)
   */
  step?: Bindable<'any'|string|number>,

  // tabIndex // in HTMLElement

  // title // in HTMLElement

  /**
   * The `<input>` type.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/type)
   */
  type?: Bindable<
    string
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  >,

  /**
   * The input control's value. When specified in the HTML, this is the initial
   * value, and from then on it can be altered or retrieved at any time.
   * The `value` attribute is always optional, though should be considered
   * mandatory for `checkbox`, `radio`, and `hidden`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/input#value)
   */
  value?: Bindable<StringConvertible>,

  /**
   * Valid for the image `input` button only, the width is the `width` of
   * the image file to display to represent the graphical submit button.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/width)
   */
  width?: Bindable<number>,

  /**
   * The `cancel` event fires on an `<input>` element when the user cancels
   * the file picker dialog via the Esc key or the cancel button and when
   * the user re-selects the same files that were previously selected
   * of `type="file"`.
   *
   * This event is not cancelable but can bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/cancel_event)
   */
  onCancel?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `invalid` event fires when a submittable element has been checked for
   * validity and doesn't satisfy its constraints.
   *
   * This event can be useful for displaying a summary of the problems with a
   * form on submission. When a form is submitted, `invalid` events are fired at
   * each form control that is invalid. The validity of submittable elements is
   * checked before submitting their owner `<form>`, or after the
   * `checkValidity()` method of the element or its owner `<form>` is called.
   *
   * It is not checked on `blur`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/invalid_event)
   */
  onInvalid?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `search` event is fired when a search is initiated using an `<input>`
   * element of `type="search"`.
   *
   * There are several ways a search can be initiated, such as by pressing
   * `Enter` while the `<input>` is focused, or, if the `incremental` attribute
   * is present, after a UA-defined timeout elapses since the most recent
   * keystroke (with new keystrokes resetting the timeout so the firing
   * of the event is debounced).
   *
   * Current UA implementations of `<input type="search">` have an additional
   * control to clear the field. Using this control also fires the `search`
   * event. In that case the `value` of the `<input>` element will be the
   * empty string.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/search_event)
   */
  onSearch?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `select` event fires when some text has been selected.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event)
   */
  onSelect?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `selectionchange` event of the
   * [Selection API](https://developer.mozilla.org/docs/Web/API/Selection)
   * is fired when the text selection within an `<input>` element is changed.
   * This includes both changes in the selected range of characters, or if the
   * caret moves.
   *
   * This event is not cancelable.
   *
   * The event is usually processed by adding an event listener on the
   * `<input>`, and in the handler function read by the `HTMLInputElement`
   * `selectionStart`, `selectionEnd` and `selectionDirection` properties.
   *
   * It is also possible to add a listener on the `onselectionchange` event
   * handler, and within the handler function use `Document.getSelection()`
   * to get the `Selection`. However, this is not very useful for getting
   * changes to text selections.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/selectionchange_event)
   */
  onSelectionChange?(this: GlobalEventHandlers, event: Event): any,
}

export interface InsElementProps extends HTMLElementProps {
  /**
   * This attribute defines the URI of a resource that explains the change,
   * such as a link to meeting minutes or a ticket in a troubleshooting system.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ins#cite)
   */
  cite?: Bindable<string>,

  /**
   * This attribute indicates the time and date of the change and must be
   * a valid date with an optional time string. If the value cannot be parsed
   * as a date with an optional time string, the element does not have an
   * associated timestamp. For the format of the string without a time, see
   * [Format of a valid date string](https://developer.mozilla.org/docs/Web/HTML/Date_and_time_formats#date_strings)
   * .
   * The format of the string if it includes both date and time is covered in
   * [Format of a valid local date and time string](https://developer.mozilla.org/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings)
   * .
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ins#datetime)
   */
  datetime?: Bindable<string>,
}

export interface LabelElementProps extends HTMLElementProps {
  /**
   * The value of the `for` attribute must be a single `id` for a labelable
   * form-related element in the same document as the `<label>` element.
   * So, any given label element can be associated with only one form control.
   *
   * The first element in the document with an `id` attribute matching the
   * value of the `for` attribute is the labeled control for this `label`
   * element — if the element with that id is actually a labelable element.
   * If it is not a labelable element, then the `for` attribute has no effect.
   * If there are other elements that also match the `id` value, later in the
   * document, they are not considered.
   *
   * Multiple `label` elements can be given the same value for their `for`
   * attribute; doing so causes the associated form control (the form control
   * that `for` value references) to have multiple labels.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLabelElement/htmlFor)
   */
  for?: Bindable<string>,
}

export interface LiElementProps extends HTMLElementProps {
  /**
   * This integer attribute indicates the current ordinal value of the list
   * item as defined by the `<ol>` element. The only allowed value for this
   * attribute is a number, even if the list is displayed with Roman numerals
   * or letters. List items that follow this one continue numbering from the
   * value set. This attribute has no meaning for unordered lists (`<ul>`)
   * or for menus (`<menu>`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLIElement/value)
   */
  value?: Bindable<number>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLinkElement)
 */
export interface LinkElementProps extends HTMLElementProps {
  /**
   * A string representing the type of content to be preloaded
   * by a link element.
   *
   * The `as` property must have a value for link elements when `rel="preload"`,
   * or the resource will not be fetched. It may also be applied to link
   * elements where `rel="modulepreload"`, but if omitted, will default
   * to `script`. The property should not be set for other types of
   * link elements, such as `rel="prefetch"`.
   *
   * Here is a list of the valid values for this attribute and the elements
   * or resources they apply to:
   *
   * - `audio`: `<audio>` elements
   *
   * - `document`: `<iframe>` and `<frame>` elements
   *
   * - `fetch`: fetch, XHR. Note that this value also requires `<link>` to
   * contain the `crossorigin` attribute, see
   * [CORS-enabled fetches](https://developer.mozilla.org/docs/Web/HTML/Attributes/rel/preload#cors-enabled_fetches)
   * .
   *
   * - `font`: CSS @font-face. Note that this value also requires `<link>` to
   * contain the `crossorigin` attribute, see
   * [CORS-enabled fetches](https://developer.mozilla.org/docs/Web/HTML/Attributes/rel/preload#cors-enabled_fetches)
   * .
   *
   * - `image`: `<img>` and `<picture>` elements with `srcset` or `imageset`
   * attributes, SVG `<image>` elements, CSS `*-image` rules
   *
   * - `object`: `<object>` elements
   *
   * - `script`: `<script>` elements, Worker `importScripts`
   *
   * - `style`: `<link rel=stylesheet>` elements, CSS `@import`
   *
   * - `track`: `<track>` elements
   *
   * - `video`: `<video>` elements
   *
   * - `worker`: Worker, SharedWorker
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/as)
   */
  as?: Bindable<
    'audio'
    | 'document'
    | 'embed'
    | 'fetch'
    | 'font'
    | 'image'
    | 'object'
    | 'script'
    | 'style'
    | 'track'
    | 'video'
    | 'worker'
  >,

  /**
   * Specifies the Cross-Origin Resource Sharing (CORS) setting to use when
   * retrieving the resource.
   *
   * - `anonymous`: Requests sent by this element will use the `cors`
   * [mode](https://developer.mozilla.org/docs/Web/API/Request/mode)
   * and the `same-origin`
   * [credentials](https://developer.mozilla.org/docs/Web/API/Request/credentials)
   * mode. This means that CORS is enabled and credentials are sent if
   * the resource is fetched from the same origin from which the
   * document was loaded.
   *
   * - `use-credentials`: Requests sent by this element will use the cors
   * [mode](https://developer.mozilla.org/docs/Web/API/Request/mode)
   * and the include
   * [credentials](https://developer.mozilla.org/docs/Web/API/Request/credentials)
   * mode. All resources requests by the element will use CORS, regardless of
   * what domain the fetch is from.
   *
   * If the `crossOrigin` property is specified with any other value,
   * it is the same as specifying as the `anonymous`.
   *
   * If the `crossOrigin` property is not specified, the resource is fetched
   * without CORS (the no-cors mode and the same-origin credentials mode).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/crossOrigin)
   */
  crossOrigin?: Bindable<'anonymous'|'use-credentials'>,

  /**
   * For `rel="stylesheet"` only, the `disabled` Boolean attribute indicates
   * whether the described stylesheet should be loaded and applied to
   * the document.
   * If `disabled` is specified in the HTML when it is loaded, the stylesheet
   * will not be loaded during page load. Instead, the stylesheet will be
   * loaded on-demand, if and when the `disabled` attribute is changed
   * to `false` or removed.
   *
   * Setting the `disabled` property in the DOM causes the stylesheet to be
   * removed from the document's `Document.styleSheets` list.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * Provides a hint of the relative priority to use when fetching a resource
   * of a particular type. Allowed values:
   *
   * - `high`: Fetch the resource at a high priority relative to other
   * resources of the same type.
   *
   * - `low`: Fetch the resource at a low priority relative to other
   * resources of the same type.
   *
   * - `auto`: Don't set a preference for the fetch priority.
   * This is the default. It is used if no value or an invalid value is set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/fetchPriority)
   */
  fetchPriority?: Bindable<'high'|'low'|'auto'>,

  /**
   * This attribute specifies the URL of the linked resource. A URL can be
   * absolute or relative.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/href)
   */
  href?: Bindable<string>,

  /**
   * This attribute indicates the language of the linked resource.
   * It is purely advisory. Allowed values are specified by
   * [RFC 5646: Tags for Identifying Languages (also known as BCP 47)](https://datatracker.ietf.org/doc/html/rfc5646)
   * . Use this attribute only if the `href` attribute is present.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/hreflang)
   */
  hreflang?: Bindable<string>,

  /**
   * For `rel="preload"` and `as="image"` only, this attribute has similar
   * syntax and semantics as the `sizes` attribute that indicates to
   * preload the appropriate resource used by an `img` element with
   * corresponding values for its `srcset` and `sizes` attributes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/link#imagesizes)
   */
  imageSizes?: Bindable<string>,

  /**
   * For `rel="preload"` and `as="image"` only, this attribute has similar
   * syntax and semantics as the `srcset` attribute that indicates to
   * preload the appropriate resource used by an `img` element with
   * corresponding values for its `srcset` and `sizes` attributes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/link#imagesrcset)
   */
  imageSrcset?: Bindable<string>,

  /**
   * Contains inline metadata — a base64-encoded cryptographic hash of the
   * resource (file) you're telling the browser to fetch. The browser can use
   * this to verify that the fetched resource has been delivered without
   * unexpected manipulation. The attribute must only be specified when
   * the `rel` attribute is specified to `stylesheet`, `preload`,
   * or `modulepreload`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/integrity)
   */
  integrity?: Bindable<string>,

  /**
   * This attribute specifies the media that the linked resource applies to.
   * Its value must be a media type /
   * [media query](https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries)
   * . This attribute is mainly useful when linking to external
   * stylesheets — it allows the user agent to pick the best
   * adapted one for the device it runs on.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/media)
   */
  media?: Bindable<string>,

  /**
   * How much of the referrer to send when fetching the resource.
   *
   * - `no-referrer`: The `Referer` header will be omitted entirely.
   * No referrer information is sent along with requests.
   *
   * - `no-referrer-when-downgrade`: The URL is sent as a referrer when
   * the protocol security level stays the same (e.g.HTTP→HTTP, HTTPS→HTTPS),
   * but isn't sent to a less secure destination (e.g. HTTPS→HTTP).
   *
   * - `origin`: Only send the origin of the document as the referrer in all
   * cases. The document `https://example.com/page.html` will send the referrer
   * `https://example.com/`.
   *
   * - `origin-when-cross-origin`: Send a full URL when performing
   * a same-origin request, but only send the origin of the document
   * for other cases.
   *
   * - `same-origin`: A referrer will be sent for same-site origins,
   * but cross-origin requests will contain no referrer information.
   *
   * - `strict-origin`: Only send the origin of the document as the referrer
   * when the protocol security level stays the same (e.g. HTTPS→HTTPS),
   * but don't send it to a less secure destination (e.g. HTTPS→HTTP).
   *
   * - `strict-origin-when-cross-origin` (default): This is the user agent's
   * default behavior if no policy is specified. Send a full URL when performing
   * a same-origin request, only send the origin when the protocol security
   * level stays the same (e.g. HTTPS→HTTPS), and send no header to a less
   * secure destination (e.g. HTTPS→HTTP).
   *
   * - `unsafe-url`: Send a full URL when performing a same-origin or
   * cross-origin request. This policy will leak origins and paths from
   * TLS-protected resources to insecure origins. Carefully consider
   * the impact of this setting.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAreaElement/referrerPolicy)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,

  /**
   * This attribute names a relationship of the linked document to the current
   * document. The attribute must be a space-separated list of
   * [link type values](https://developer.mozilla.org/docs/Web/HTML/Attributes/rel)
   * .
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/rel)
   */
  rel?: Bindable<string>,

  /**
   * This attribute defines the sizes of the icons for visual media contained
   * in the resource. It must be present only if the `rel` contains a value of
   * `icon` or a non-standard type such as Apple's `apple-touch-icon`.
   * It may have the following values:
   *
   * - `any`, meaning that the icon can be scaled to any size as it is in
   * a vector format, like `image/svg+xml`.
   * a white-space separated list of sizes, each in the format
   * `<width in pixels>x<height in pixels>`
   * or `<width in pixels>X<height in pixels>`.
   * Each of these sizes must be contained in the resource.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/link#sizes)
   */
  sizes?: Bindable<string>,

  /**
   * The title attribute has special semantics on the `<link>` element.
   * When used on a `<link rel="stylesheet">` it defines a
   * [default or an alternate stylesheet](https://developer.mozilla.org/docs/Web/CSS/Alternative_style_sheets)
   * .
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/link#title)
   */
  title?: Bindable<string>,

  /**
   * This attribute is used to define the type of the content linked to.
   * The value of the attribute should be a MIME type such as `text/html`,
   * `text/css`, and so on. The common use of this attribute is to define
   * the type of stylesheet being referenced (such as text/css), but given
   * that CSS is the only stylesheet language used on the web, not only is
   * it possible to omit the `type` attribute, but is actually now recommended
   * practice. It is also used on `rel="preload"` link types, to make sure the
   * browser only downloads file types that it supports.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLLinkElement/type)
   */
  type?: Bindable<string>,
}

export interface MapElementProps extends HTMLElementProps {
  /**
   * The `name` attribute gives the map a name so that it can be referenced.
   * The attribute must be present and must have a non-empty value with no
   * space characters. The value of the `name` attribute must not be equal
   * to the value of the name attribute of another `<map>` element in the
   * same document. If the `id` attribute is also specified, both attributes
   * must have the same value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMapElement/name)
   */
  name?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMetaElement)
 */
export interface MetaElementProps extends HTMLElementProps {
  /**
   * This attribute declares the document's character encoding. If the attribute
   * is present, its value must be an ASCII case-insensitive match for the
   * string `"utf-8"`, because UTF-8 is the only valid encoding for HTML5
   * documents. `<meta>` elements which declare a character encoding must
   * be located entirely within the first 1024 bytes of the document.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/meta#charset)
   */
  charset?: Bindable<string>,

  /**
   * This attribute contains the value for the `http-equiv` or `name` attribute,
   * depending on which is used.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMetaElement/content)
   */
  content?: Bindable<string>,

  /**
   * Defines a pragma directive. The attribute's name, short for
   * http-equivalent, is because all the allowed values are names of particular
   * HTTP headers:
   *
   * - `content-security-policy`: Allows page authors to define a content
   * policy for the current page. Content policies mostly specify allowed
   * server origins and script endpoints which help guard against cross-site
   * scripting attacks.
   *
   * Also see
   * [Content-Security-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy)
   * .
   *
   * - `content-type`: Declares the MIME type and the document's character
   * encoding. The `content` attribute must have the value
   * `"text/html; charset=utf-8"` if specified. This is equivalent to a `<meta>`
   * element with the `charset` attribute specified and carries the same
   * restriction on placement within the document. Note: Can only be used in
   * documents served with a `text/html` — not in documents served with
   * an XML MIME type.
   *
   * Also see
   * [Content-Type](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Type)
   * .
   *
   * - `default-style`: Sets the name of the default CSS style sheet set.
   *
   * - `x-ua-compatible`: If specified, the `content` attribute must have
   * the value `"IE=edge"`. User agents are required to ignore this pragma.
   *
   * - `refresh`: This instruction specifies:
   *   - **The number of seconds until the page should be reloaded**: If the
   *   `content` attribute's value is a non-negative integer.
   *   - **The number of seconds until the page should redirect to another**: If
   *   the `content` attribute's value is a non-negative integer followed by
   *   `;url=` and a valid URL.
   *
   * The timer starts when the page is completely loaded, which is after
   * the load and pageshow events have both fired.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMetaElement/httpEquiv)
   */
  httpEquiv?: Bindable<
    'content-security-policy'
    | 'content-type'
    | 'default-style'
    | 'refresh'
    | 'x-ua-compatible'
  >,

  /**
   * The `media` attribute defines which media the theme color defined in
   * the `content` attribute should be applied to. Its value is a media query,
   * which defaults to `all` if the attribute is missing. This attribute is only
   * relevant when the element's `name` attribute is set to `theme-color`.
   * Otherwise, it has no effect, and should not be included.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMetaElement/media)
   */
  media?: Bindable<string>,

  /**
   * The `name` and `content` attributes can be used together to provide
   * document metadata in terms of name-value pairs, with the `name` attribute
   * giving the metadata name, and the `content` attribute giving the value.
   *
   * The HTML specification defines the following set of standard metadata names:
   *
   * - `application-name`: The name of the application running in the web page.
   *
   * - `author`: The name of the document's author.
   *
   * - `description`: A short and accurate summary of the content of the page.
   *
   * - `generator`: The identifier of the software that generated the page.
   *
   * - `keywords`: Words relevant to the page's content separated by commas.
   *
   * - `referrer`: Controls the HTTP Referer header of requests sent from
   * the document.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMetaElement/media)
   */
  name?: Bindable<'application-name'|'author'|'description'|'generator'|'keywords'|'viewport'>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement)
 */
export interface MeterElementProps extends HTMLElementProps {
  /**
   * The lower numeric bound of the high end of the measured range. This must be
   * less than the maximum value (`max` attribute), and it also must be greater
   * than the low value and minimum value (`low` attribute and `min` attribute,
   * respectively), if any are specified. If unspecified, or if greater than the
   * maximum value, the `high` value is equal to the maximum value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/high)
   */
  high?: Bindable<number>,

  /**
   * The upper numeric bound of the low end of the measured range. This must be
   * greater than the minimum value (`min` attribute), and it also must be less
   * than the high value and maximum value (`high` attribute and `max`
   * attribute, respectively), if any are specified. If unspecified, or if less
   * than the minimum value, the `low` value is equal to the minimum value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/low)
   */
  low?: Bindable<number>,

  /**
   * The upper numeric bound of the measured range. This must be greater than
   * the minimum value (`min` attribute), if specified. If unspecified,
   * the maximum value is `1`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/max)
   */
  max?: Bindable<number>,

  /**
   * The lower numeric bound of the measured range. This must be less than
   * the maximum value (`max` attribute), if specified. If unspecified,
   * the minimum value is `0`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/min)
   */
  min?: Bindable<number>,

  /**
   * This attribute indicates the optimal numeric value. It must be within the
   * range (as defined by the `min` attribute and `max` attribute). When used
   * with the low attribute and high attribute, it gives an indication where
   * along the range is considered preferable. For example, if it is between
   * the `min` attribute and the `low` attribute, then the lower range is
   * considered preferred. The browser may color the meter's bar differently
   * depending on whether the value is less than or equal to the optimum value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/optimum)
   */
  optimum?: Bindable<number>,

  /**
   * The current numeric value. This must be between the minimum and maximum
   * values (`min` attribute and `max` attribute) if they are specified.
   * If unspecified or malformed, the value is `0`. If specified, but not within
   * the range given by the `min` attribute and `max` attribute, the value is
   * equal to the nearest end of the range.
   *
   * > **_NOTE:_**
   * Unless the `value` attribute is between `0` and `1` (inclusive), the `min`
   * and `max` attributes should define the range so that the `value`
   * attribute's value is within it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMeterElement/value)
   */
  value?: Bindable<number>,

  /**
   * This optional attribute is used to explicitly set a `<form>` owner for
   * the `<meter>` element. If omitted, the `<meter>` is associated with its
   * ancestor `<form>` element or the form association set by the form
   * attribute on another ancestor element, such as on a `<fieldset>`,
   * if any. If included, the value must be the `id` of a `<form>` in
   * the same tree.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/meter#form)
   */
  form?: Bindable<string>,
}

export interface ObjectElementProps extends HTMLElementProps {
  /**
   * The address of the resource as a valid URL.
   * At least one of data and type must be defined.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#data)
   */
  data?: Bindable<string>,

  /**
   * The `<form>` element, if any, that the object element is associated with
   * (its *form owner*). The value of the attribute must be an ID of
   * a `<form>` element in the same document.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#form)
   */
  form?: Bindable<string>,

  /**
   * The height of the displayed resource, in CSS pixels. — (Absolute values
   * only. NO percentages)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#height)
   */
  height?: Bindable<number>,

  /**
   * The name of valid browsing context (HTML5),
   * or the name of the control (HTML 4).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#name)
   */
  name?: Bindable<string>,

  /**
   * The content type of the resource specified by `data`.
   * At least one of `data` and `type` must be defined.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#type)
   */
  type?: Bindable<string>,

  /**
   * The width of the display resource, in CSS pixels. — (Absolute values
   * only. NO percentages)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object#width)
   */
  width?: Bindable<number>,
}

export interface OlElementProps extends HTMLElementProps {
  /**
   * Specifies that the list's items are in reverse order. Items will be
   * numbered from high to low.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement/reversed)
   */
  reversed?: Bindable<boolean>,

  /**
   * An integer to start counting from for the list items. Always an Arabic
   * numeral (1, 2, 3, etc.), even when the numbering `type` is letters or
   * Roman numerals. For example, to start numbering elements from the letter
   * "d" or the Roman numeral "iv," use `start="4"`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement/start)
   */
  start?: Bindable<number>,

  /**
   * Sets the numbering type:
   *
   * - `a` for lowercase letters
   * - `A` for uppercase letters
   * - `i` for lowercase Roman numerals
   * - `I` for uppercase Roman numerals
   * - `1` for numbers (default)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOListElement/type)
   */
  type?: Bindable<'1'|'a'|'A'|'i'|'I'>,
}

export interface OptgroupElementProps extends HTMLElementProps {
  /**
   * If `true`, none of the items in this option group is selectable.
   * Often browsers grey out such control, and it won't receive any browsing
   * events, like mouse clicks or focus-related ones.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * The name of the group of options, which the browser can use when labeling
   * the options in the user interface. This attribute is mandatory if this
   * element is used.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement/label)
   */
  label?: Bindable<string>,
}

export interface OptionElementProps extends HTMLElementProps {
  /**
   * The default selected state of the element. This property reflects the
   * `<option>` element's `selected` attribute. The presence of the `selected`
   * attribute sets the `defaultSelected` property to `true`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/defaultSelected)
   */
  defaultSelected?: Bindable<boolean>,

  /**
   * If `true`, this option is not checkable. Often browsers grey out such
   * control, and it won't receive any browsing event, like mouse clicks or
   * focus-related ones. If this attribute is not set, the element can still
   * be disabled if one of its ancestors is a disabled `<optgroup>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * This attribute is text for the label indicating the meaning of
   * the option. If the `label` attribute isn't defined, its value
   * is that of the element text content.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/label)
   */
  label?: Bindable<string>,

  /**
   * If present, this Boolean attribute indicates that the option is initially
   * selected. If the `<option>` element is the descendant of a `<select>`
   * element whose `multiple` attribute is not set, only one single
   * `<option>` of this `<select>` element may have the `selected` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/selected)
   */
  selected?: Bindable<boolean>,

  /**
   * Represents the text inside the `<option>` element.
   * This property represents the same information as `Node.textContent`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/text)
   */
  text?: Bindable<StringConvertible>,

  /**
   * The content of this attribute represents the value to be submitted with
   * the form, should this option be selected. If this attribute is omitted,
   * the value is taken from the text content of the option element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOptionElement/value)
   */
  value?: Bindable<StringConvertible>,
}

export interface OutputElementProps extends HTMLElementProps {
  /**
   * The default text content of this element. Getting and setting
   * this value is equivalent to getting and setting `textContent`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/defaultValue)
   */
  defaultValue?: Bindable<StringConvertible>,

  /**
   * The `<form>` element to associate the output with (its *form owner*).
   * The value of this attribute must be the `id` of a `<form>` in the same
   * document. (If this attribute is not set, the `<output>` is associated
   * with its ancestor `<form>` element, if any.)
   *
   * This attribute lets you associate `<output>` elements to `<form>`s
   * anywhere in the document, not just inside a `<form>`. It can also
   * override an ancestor `<form>` element. The `<output>` element's name
   * and content are not submitted when the form is submitted.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/output#form)
   */
  form?: Bindable<string>,

  /**
   * A space-separated list of other elements' ids, indicating that those
   * elements contributed input values to (or otherwise affected)
   * the calculation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/htmlFor)
   */
  for?: Bindable<string>,

  /**
   * The element's name. Used in the `form.elements` API.
   *
   * NOT submitted during form submission.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/name)
   */
  name?: Bindable<string>,

  /**
   * The value of the element as a string, or the empty string if no value is
   * set. It returns or sets the contents of the element, similar to the
   * `textContent` property.
   *
   * NOT submitted during form submission.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLOutputElement/value)
   */
  value?: Bindable<StringConvertible>,
}

export interface ProgressElementProps extends HTMLElementProps {
  /**
   * This attribute describes how much work the task indicated by the
   * `progress` element requires. The `max` attribute, if present,
   * must have a value greater than `0` and be a valid floating
   * point number. The default value is `1`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLProgressElement/max)
   */
  max?: Bindable<number>,

  /**
   * This attribute specifies how much of the task that has been completed.
   * It must be a valid floating point number between `0` and `max`,
   * or between `0` and `1` if `max` is omitted. If there is no `value`
   * attribute, the progress bar is indeterminate; this indicates that
   * an activity is ongoing with no indication of how long it is expected
   * to take.
   *
   * > **_NOTE:_**
   * Unlike the `<meter>` element, the minimum value is always `0`, and the
   * `min` attribute is not allowed for the `<progress>` element.
   *
   * > **_NOTE:_**
   * The `:indeterminate` pseudo-class can be used to match against
   * indeterminate progress bars. To change the progress bar to
   * indeterminate after giving it a value you must remove the
   * value attribute with `element.removeAttribute('value')`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLProgressElement/max)
   */
  value?: Bindable<number>,
}

export interface QElementProps extends HTMLElementProps {
  /**
   * The value of this attribute is a URL that designates a source
   * document or message for the information quoted. This attribute
   * is intended to point to information explaining the context or
   * the reference for the quote.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/q)
   */
  cite?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement)
 */
export interface ScriptElementProps extends HTMLElementProps {
  /**
   * For classic scripts, if the `async` attribute is present, then the classic
   * script will be fetched in parallel to parsing and evaluated as soon as it
   * is available.
   *
   * For module scripts, if the `async` attribute is present then the scripts
   * and all their dependencies will be fetched in parallel to parsing and
   * evaluated as soon as they are available.
   *
   * > **_WARNING:_**
   * This attribute must not be used if the `src` attribute is absent (i.e. for
   * inline scripts) for classic scripts, in this case it would have no effect.
   *
   * This attribute allows the elimination of *parser-blocking JavaScript* where
   * the browser would have to load and evaluate scripts before continuing to
   * parse. `defer` has a similar effect in this case.
   *
   * If the attribute is specified with the `defer` attribute, the element will
   * act as if only the `async` attribute is specified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/async)
   */
  async?: Bindable<boolean>,

  /**
   * Specifies that you want the browser to send an
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header along with the script resource request. On the server-side this is
   * used to trigger sending an
   * [Attribution-Reporting-Register-Source](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Source)
   * or
   * [Attribution-Reporting-Register-Trigger](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Trigger)
   * header in the response, to register a JavaScript-based
   * [attribution source](https://developer.mozilla.org/docs/Web/API/Attribution_Reporting_API/Registering_sources#javascript-based_event_sources)
   * or
   * [attribution trigger](https://developer.mozilla.org/docs/Web/API/Attribution_Reporting_API/Registering_triggers#javascript-based_attribution_triggers)
   * , respectively. Which response header should be sent back depends on the
   * value of the `Attribution-Reporting-Eligible` header that triggered the
   * registration.
   *
   * There are two versions of this attribute that you can set:
   *
   * - Boolean. This specifies that you want the
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header sent to the same server as the `src` attribute points to. This is
   * fine when you are handling the attribution source or trigger registration
   * on the same server. When registering an attribution trigger this property
   * is optional, and an empty string value will be used if it is omitted.
   *
   * - Value containing one or more URLs, for example:
   * ```html
   * <script
   *   src="myscript.js"
   *   attributionsrc="https://a.example/register-source https://b.example/register-source">
   * </script>
   * ```
   * This is useful in cases where the requested resource is not on a server you
   * control, or you just want to handle registering the attribution source on a
   * different server. In this case, you can specify one or more URLs as the
   * value of attributionSrc. When the resource request occurs the
   * [Attribution-Reporting-Eligible](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Eligible)
   * header will be sent to the URL(s) specified in attributionSrc in addition
   * to the resource origin. These URLs can then respond with a
   * [Attribution-Reporting-Register-Source](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Source)
   * or
   * [Attribution-Reporting-Register-Trigger](https://developer.mozilla.org/docs/Web/HTTP/Headers/Attribution-Reporting-Register-Trigger)
   * header as appropriate to complete registration.
   *
   * > **_NOTE:_**
   * Specifying multiple URLs means that multiple attribution sources can be
   * registered on the same feature. You might for example have different
   * campaigns that you are trying to measure the success of, which involve
   * generating different reports on different data.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/attributionSrc)
   */
  attributionSrc?: Bindable<boolean|string>,

  /**
   * This attribute explicitly indicates that certain operations should be
   * blocked on the fetching of the script. The operations that are to be
   * blocked must be a space-separated list of blocking tokens listed below.
   *
   * - `render`: The rendering of content on the screen is blocked.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/blocking)
   */
  blocking?: Bindable<'render'>,

  /**
   * Specifies the Cross-Origin Resource Sharing (CORS) setting for the
   * `<script>` element. For classic scripts from other origins, this controls
   * if full error information will be exposed. For module scripts, it controls
   * the script itself and any script it imports.
   *
   * - `anonymous`: Requests sent by this element will use the `cors`
   * [mode](https://developer.mozilla.org/docs/Web/API/Request/mode)
   * and the `same-origin`
   * [credentials](https://developer.mozilla.org/docs/Web/API/Request/credentials)
   * mode. This means that CORS is enabled and credentials are sent if
   * the resource is fetched from the same origin from which the
   * document was loaded.
   *
   * - `use-credentials`: Requests sent by this element will use the cors
   * [mode](https://developer.mozilla.org/docs/Web/API/Request/mode)
   * and the include
   * [credentials](https://developer.mozilla.org/docs/Web/API/Request/credentials)
   * mode. All resources requests by the element will use CORS, regardless of
   * what domain the fetch is from.
   *
   * If the `crossOrigin` property is specified with any other value,
   * it is the same as specifying as the `anonymous`.
   *
   * If the `crossOrigin` property is not specified, the resource is fetched
   * without CORS (the no-cors mode and the same-origin credentials mode).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/crossOrigin)
   */
  crossOrigin?: Bindable<'anonymous'|'use-credentials'>,

  /**
   * Indicates to the browser that the script is meant to be executed after the
   * document has been parsed, but before firing `DOMContentLoaded` event.
   *
   * Scripts with the `defer` attribute will prevent the `DOMContentLoaded`
   * event from firing until the script has loaded and finished evaluating.
   *
   * > **_WARNING:_**
   * This attribute must not be used if the `src` attribute is absent (i.e. for
   * inline scripts) for classic scripts, in this case it would have no effect.
   * The `defer` attribute has no effect on module scripts — they defer by
   * default.
   *
   * Scripts with the `defer` attribute will execute in the order in which they
   * appear in the document.
   *
   * This attribute allows the elimination of *parser-blocking JavaScript* where
   * the browser would have to load and evaluate scripts before continuing to
   * parse. `async` has a similar effect in this case.
   *
   * If the attribute is specified with the `async` attribute, the element will
   * act as if only the `async` attribute is specified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/defer)
   */
  defer?: Bindable<boolean>,

  /**
   * Provides a hint of the relative priority to use when  fetching an external
   * script. Allowed values:
   *
   * - `high`: Fetch the external script at a high priority relative to other
   * external scripts.
   *
   * - `low`: Fetch the external script at a low priority relative to other
   * external scripts.
   *
   * - `auto`: Don't set a preference for the fetch priority.
   * This is the default. It is used if no value or an invalid value is set.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/fetchPriority)
   */
  fetchPriority?: Bindable<'high'|'low'|'auto'>,

  /**
   * This attribute contains inline metadata that a user agent can use to verify
   * that a fetched resource has been delivered without unexpected manipulation.
   * The attribute must not be specified when the `src` attribute is not
   * specified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/integrity)
   */
  integrity?: Bindable<string>,

  /**
   * Indicates that the script should not be executed in browsers that support
   * ES modules — in effect, this can be used to serve fallback scripts to older
   * browsers that do not support modular JavaScript code.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/noModule)
   */
  noModule?: Bindable<boolean>,

  /**
   * A cryptographic nonce ("number used once") which can be used by
   * [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP)
   * to determine whether a given fetch will be allowed to proceed
   * for a given element.
   *
   * The nonce attribute is useful to allowlist specific elements, such as
   * a particular inline script or style elements. It can help you to avoid
   * using the CSP `unsafe-inline` directive, which would allowlist all
   * inline scripts or styles.
   *
   * > **_NOTE:_**
   * Only use nonce for cases where you have no way around using unsafe inline
   * script or style contents. If you don't need `nonce`, don't use it.
   * If your script is static, you could also use a CSP hash instead.
   * Always try to take full advantage of CSP protections and avoid
   * nonces or unsafe inline scripts whenever possible.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/nonce)
   */
  nonce?: Bindable<string>,

  /**
   * Indicates which referrer to send when fetching the script, or resources
   * fetched by the script:
   *
   * - `no-referrer`: The `Referer` header will not be sent.
   *
   * - `no-referrer-when-downgrade`: The `Referer` header will not be sent to
   * origins without TLS (HTTPS).
   *
   * - `origin`: The sent referrer will be limited to the origin of the
   * referring page: its scheme, host, and port.
   *
   * - `origin-when-cross-origin`: The referrer sent to other origins will
   * be limited to the scheme, the host, and the port. Navigations on the same
   * origin will still include the path.
   *
   * - `same-origin`: A referrer will be sent for same origin, but
   * cross-origin requests will contain no referrer information.
   *
   * - `strict-origin`: Only send the origin of the document as the referrer
   * when the protocol security level stays the same (HTTPS→HTTPS), but don't
   * send it to a less secure destination (HTTPS→HTTP).
   *
   * - `strict-origin-when-cross-origin` (default): Send a full URL when
   * performing a same-origin request, only send the origin when the protocol
   * security level stays the same (HTTPS→HTTPS), and send no header to a less
   * secure destination (HTTPS→HTTP).
   *
   * - `unsafe-url`: The referrer will include the origin and the path
   * (but not the fragment, password, or username). This value is unsafe,
   * because it leaks origins and paths from TLS-protected resources to
   * insecure origins.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/referrerPolicy)
   */
  referrerPolicy?: Bindable<
    'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,

  /**
   * This attribute specifies the URI of an external script; this can be used
   * as an alternative to embedding a script directly within a document.
   *
   * @example
   * ```html
   * <script id="script-with-src" type="module" src="/main.js"></script>
   * <script id="script-without-src" type="module"></script>
   * ```
   * ```js
   * const script_with_src = document.getElementById("script-with-src");
   * console.log(script_with_src.src); // Output: "https://example.com/main.js"
   * const script_without_src = document.getElementById("script-without-src");
   * console.log(script_without_src.src); // Output: ""
   * ```
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/src)
   */
  src?: Bindable<string>,

  /**
   * Reflects the text content inside the `<script>` element. It acts the same
   * way as the `Node.textContent` property.
   *
   * @example
   * ```html
   * <script id="el" type="text/javascript">
   *   const num = 10;
   *   console.log(num);
   * </script>
   * ```
   * ```js
   * const el = document.getElementById("el");
   * console.log(el.text); // Output: "\n  const num = 10;\n  console.log(num);\n"
   * console.log(el.textContent); // Output: "\n  const num = 10;\n  console.log(num);\n"
   *
   * el.text = "console.log(10);";
   * console.log(el.text); // Output: "console.log(10);"
   * console.log(el.textContent); // Output: "console.log(10);"
   * ```
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/text)
   */
  text?: Bindable<string>,

  /**
   * This attribute indicates the type of script represented. The value of this
   * attribute will be one of the following:
   *
   * - **Attribute is not set (default), an empty string, or a JavaScript MIME
   * type** - Indicates that the script is a "classic script", containing
   * JavaScript code. Authors are encouraged to omit the attribute if the
   * script refers to JavaScript code rather than specify a MIME type.
   *
   * - `importmap`: This value indicates that the body of the element contains
   * an import map. The import map is a JSON object that developers can use to
   * control how the browser resolves module specifiers when importing
   * JavaScript modules.
   *
   * - `module`: This value causes the code to be treated as a JavaScript
   * module. The processing of the script contents is deferred. The `charset`
   * and `defer` attributes have no effect. Unlike classic scripts, module
   * scripts require the use of the CORS protocol for cross-origin fetching.
   *
   * - `speculationrules` (experimental): This value indicates that the body
   * of the element contains speculation rules. Speculation rules take the form
   * of a JSON object that determine what resources should be prefetched or
   * prerendered by the browser. This is part of the
   * [Speculation Rules API](https://developer.mozilla.org/docs/Web/API/Speculation_Rules_API)
   * .
   *
   * - **Any other value**: The embedded content is treated as a data block,
   * and won't be processed by the browser. Developers must use a valid MIME
   * type that is not a JavaScript MIME type to denote data blocks.
   * All the other attributes will be ignored, including the `src` attribute.
   *
   * @example
   * ```html
   * <script id="el" type="text/javascript"></script>
   * ```
   * ```js
   * const el = document.getElementById("el");
   * console.log(el.type); // Output: "text/javascript"
   * ```
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLScriptElement/type)
   */
  type?: Bindable<string|'importmap'|'module'|'speculationrules'>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement)
 */
export interface SelectElementProps extends HTMLElementProps {
  /**
   * A string providing a hint for a user agent's auto-complete feature.
   * (`"on"`, `"off"`, or a
   * [<token-list>](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete#token_list_tokens)
   * ) or the empty string (`""`)
   * if unspecified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: Bindable<boolean|string|'on'|'off'|''>,

  /**
   * Lets you specify that a form control should have input focus when
   * the page loads. Only one form element in a document can have
   * the `autoFocus` attribute.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/select#autofocus)
   */
  autoFocus?: Bindable<boolean>,

  /**
   * Indicates that the user cannot interact with the control. If not specified,
   * the control inherits its setting from the containing element, for example
   * `<fieldset>`; if there is no containing element with the disabled attribute
   * set, then the control is enabled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * The `<form>` element to associate the `<select>` with (its *form owner*).
   * The value of this attribute must be the `id` of a `<form>` in the same
   * document. (If this attribute is not set, the `<select>` is associated
   * with its ancestor `<form>` element, if any.)
   *
   * This attribute lets you associate `<select>` elements to `<form>`s anywhere
   * in the document, not just inside a `<form>`. It can also override an
   * ancestor `<form>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/select#form)
   */
  form?: Bindable<string>,

  /**
   * Specifies the number of `<option>` elements in the `<select>` element.
   * It represents the number of nodes in the options collection.
   * On setting, it acts as (`HTMLOptionsCollection.length`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/length)
   */
  length?: Bindable<number>,

  /**
   * Indicates that multiple options can be selected in the list.
   * If not specified, then only one option can be selected at a time.
   * When specified, most browsers will show a scrolling list box instead
   * of a single line dropdown.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/multiple)
   */
  multiple?: Bindable<boolean>,

  /**
   * The name of the `<select>` element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/name)
   */
  name?: Bindable<string>,

  /**
   * A Boolean attribute indicating that an option with
   * a non-empty string value must be selected.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/required)
   */
  required?: Bindable<boolean>,

  /**
   * If the `<select>` is presented as a scrolling list box (e.g. when
   * `multiple` is specified), this attribute represents the number of
   * rows in the list that should be visible at one time. Browsers are
   * not required to present a select element as a scrolled list box.
   * The default value is `0`.
   *
   * > **_NOTE:_**
   * According to the HTML specification, the default value for size should be
   * `1`; however, in practice, this has been found to break some websites,
   * and no other browser currently does that, so Mozilla has opted to
   * continue to return `0` for the time being with Firefox.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/size)
   */
  size?: Bindable<number>,
}

export interface SlotElementProps extends HTMLElementProps {
  /**
   * Sets the slot name. A slot is a placeholder inside a web component that
   * users can fill with their own markup.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/name)
   */
  name?: Bindable<string>,

  /**
   * The `slotchange` event is fired on an `HTMLSlotElement` instance
   * (`<slot>` element) when the node(s) contained in that slot change.
   *
   * > **_NOTE:_**
   * The `slotchange` event doesn't fire if the children of a slotted
   * node change — only if you change (e.g. add or delete) the actual nodes
   * themselves.
   *
   * In order to trigger a `slotchange` event, one has to set or remove the
   * `slot` attribute.
   *
   * This event is not cancelable.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event)
   */
  onSlotChange?(this : GlobalEventHandlers, event : Event): any,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement)
 */
export interface SourceElementProps extends HTMLElementProps {
  /**
   * Specifies the intrinsic height of the image in pixels.
   * Allowed if the parent is a `<picture>`.
   * Not allowed if the parent is `<audio>` or `<video>`.
   *
   * The height value must be an integer without any units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/height)
   */
  height?: Bindable<number>,

  /**
   * The intended destination medium for the resource. The value is a
   * [media query](https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries)
   * , which is a comma separated list of media-types, media-features,
   * and logical operators.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/media)
   */
  media?: Bindable<string>,

  /**
   * Specifies a list of source sizes that describe the final rendered width
   * of the image. Allowed if the parent is `<picture>`.
   * Not allowed if the parent is `<audio>` or `<video>`.
   *
   * The list consists of source sizes separated by commas.
   * Each source size is media condition-length pair.
   * Before laying the page out, the browser uses this information
   * to determine which image defined in `srcset` to display.
   * Note that `sizes` will take effect only if width descriptors are
   * provided with `srcset`, not pixel density descriptors
   * (i.e., `200w` should be used instead of `2x`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/sizes)
   */
  sizes?: Bindable<string>,

  /**
   * Specifies the URL of the media resource.
   * Required if the parent is `<audio>` or `<video>`.
   * Not allowed if the parent is `<picture>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/src)
   */
  src?: Bindable<string>,

  /**
   * Specifies a comma-separated list of one or more image URLs and their
   * descriptors.
   * Required if the parent `<picture>`.
   * Not allowed if the parent is `<audio>` or `<video>`.
   *
   * The list consists of strings separated by commas, indicating a set of
   * possible images for the browser to use. Each string is composed of:
   *
   * - A URL specifying an image location.
   *
   * - An optional width descriptor—a positive integer directly
   * followed by `"w"`, such as `300w`.
   *
   * - An optional pixel density descriptor—a positive floating
   * number directly followed by `"x"`, such as `2x`.
   *
   * - Each string in the list must have either a width descriptor
   * or a pixel density descriptor to be valid. These two descriptors
   * should not be used together; only one should be used consistently
   * throughout the list. The value of each descriptor in the list must
   * be unique. The browser chooses the most adequate image to display
   * at a given point of time based on these descriptors.
   * If the descriptors are not specified, the default value used is `1x`.
   * If the `sizes` attribute is also present, then each string must include
   * a width descriptor. If the browser does not support `srcset`,
   * then `src` will be used for the default image source.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/srcset)
   */
  srcset?: Bindable<string>,

  /**
   * Specifies the
   * [MIME media type of the image](https://developer.mozilla.org/docs/Web/Media/Guides/Formats/Image_types)
   * or
   * [other media type](https://developer.mozilla.org/docs/Web/Media/Guides/Formats/Containers)
   * ,
   * optionally including a
   * [codecs parameter](https://developer.mozilla.org/docs/Web/Media/Guides/Formats/codecs_parameter)
   * .
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/type)
   */
  type?: Bindable<string>,

  /**
   * Specifies the intrinsic width of the image in pixels.
   * Allowed if the parent is a `<picture>`.
   * Not allowed if the parent is `<audio>` or `<video>`.
   *
   * The width value must be an integer without any units.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSourceElement/width)
   */
  width?: Bindable<number>,
}

export interface StyleElementProps extends HTMLElementProps {
  /**
   * This attribute explicitly indicates that certain operations should be
   * blocked on the fetching of critical subresources. `@import`-ed
   * stylesheets are generally considered as critical subresources,
   * whereas `background-image` and fonts are not. The operations
   * that are to be blocked must be a space-separated list of
   * blocking tokens listed below.
   *
   * - `render`: The rendering of content on the screen is blocked.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement/blocking)
   */
  blocking?: Bindable<'render'>,

  /**
   * Set whether the stylesheet is disabled (`true`) or not (`false`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * This attribute defines which media the style should be applied to.
   * Its value is a
   * [media query](https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries)
   * , which defaults to `all` if the attribute is missing.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement/media)
   */
  media?: Bindable<string>,

  /**
   * A cryptographic nonce ("number used once") which can be used by
   * [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP)
   * to determine whether a given fetch will be allowed to proceed
   * for a given element.
   *
   * The nonce attribute is useful to allowlist specific elements, such as
   * a particular inline script or style elements. It can help you to avoid
   * using the CSP `unsafe-inline` directive, which would allowlist all
   * inline scripts or styles.
   *
   * > **_NOTE:_**
   * Only use nonce for cases where you have no way around using unsafe inline
   * script or style contents. If you don't need `nonce`, don't use it.
   * If your script is static, you could also use a CSP hash instead.
   * Always try to take full advantage of CSP protections and avoid
   * nonces or unsafe inline scripts whenever possible.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/nonce)
   */
  nonce?: Bindable<string>,

  /**
   * This attribute specifies
   * [alternative style sheet](https://developer.mozilla.org/docs/Web/CSS/Alternative_style_sheets)
   * sets.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/style#title)
   */
  title?: Bindable<string>,
}

export interface TdElementProps extends HTMLElementProps {
  /**
   * Indicates an abbreviation associated with the cell. If the cell does not
   * represent a header cell `<th>`, it is ignored.
   *
   * It reflects the `abbr` attribute of the `<th>` element.
   *
   * > **_NOTE:_**
   * This property doesn't have a visual effect in browsers.
   * It adds information to help assistive technology like
   * screen readers that can use this abbreviation
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/abbr)
   *
   * @deprecated
   */
  abbr?: Bindable<StringConvertible>,

  /**
   * Contains a non-negative integer value that indicates how many columns
   * the data cell spans or extends. The default value is `1`.
   * User agents dismiss values higher than 1000 as incorrect,
   * setting to the default value (`1`).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/colSpan)
   */
  colSpan?: Bindable<number>,

  /**
   * Contains a list of space-separated strings, each corresponding
   * to the `id` attribute of the `<th>` elements that provide
   * headings for this table cell.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/headers)
   */
  headers?: Bindable<string>,

  /**
   * Contains a non-negative integer value that indicates for how many rows
   * the data cell spans or extends. The default value is `1`; if its value
   * is set to `0`, it extends until the end of the table grouping section
   * (`<thead>`, `<tbody>`, `<tfoot>`, even if implicitly defined), that
   * the cell belongs to. Values higher than `65534` are clipped to `65534`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/rowSpan)
   */
  rowSpan?: Bindable<number>,

  /**
   * Header cells can be configured, using the `scope` attribute, to apply to
   * a specified row or column, or to the not-yet-scoped cells within the
   * current row group (that is, the same ancestor `<thead>`, `<tbody>`,
   * or `<tfoot>` element). If no value is specified for `scope`, the header
   * is not associated directly with cells in this way. Permitted values for scope are:
   *
   * - `col`: The header cell applies to the following cells in the same
   * column (or columns, if `colSpan` is used as well), until either the
   * end of the column or another `<th>` in the column establishes
   * a new scope.
   *
   * - `colgroup`: The header cell applies to all cells in the current
   * column group that do not already have a scope applied to them.
   * This value is only allowed if the cell is in a column group.
   *
   * - `row`: The header cell applies to the following cells in the same
   * row (or rows, if `rowSpan` is used as well), until either the end
   * of the row or another `<th>` in the same row establishes a new scope.
   *
   * - `rowgroup`: The header cell applies to all cells in the current
   * row group that do not already have a scope applied to them.
   * This value is only allowed if the cell is in a row group.
   *
   * - *empty string* (`""`): The header cell has no predefined scope;
   * the user agent will establish the scope based on contextual clues.
   *
   * > **_NOTE:_**
   * This property doesn't have a visual effect in browsers.
   * It adds semantic information to help assistive technology
   * like screen readers to present the table in a more coherent way.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement/scope)
   */
  scope?: Bindable<'col'|'colgroup'|'row'|'rowgroup'|''>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement)
 */
export interface TextAreaElementProps extends HTMLElementProps {
  /**
   * Controls whether inputted text is automatically capitalized and, if so,
   * in what manner.
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
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize)
   */
  // autoCapitalize?: Bindable<'off'|'on'|'sentences'|'words'|'characters'>,

  /**
   * Controls whether entered text can be automatically completed
   * by the browser. Possible values are:
   *
   * - `off`: The user must explicitly enter a value into this field for every
   * use, or the document provides its own auto-completion method; the browser
   * does not automatically complete the entry.
   *
   * - `on`: The browser can automatically complete the value based on values
   * that the user has entered during previous uses.
   *
   * - *<token-list>*: An ordered set of space-separated autofill detail
   * tokens, optionally preceded by a sectioning token, a billing or shipping
   * grouping token, and/or a token identifying the type of recipient.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: Bindable<boolean|string|'on'|'off'>,

  /**
   * Controls whether automatic spelling correction and processing of text is enabled while the user is editing this textarea. Permitted values are:
   *
   * - `on`: Enable automatic spelling correction and text substitutions.
   *
   * - `off`: Disable automatic spelling correction and text substitutions.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocorrect)
   */
  // autoCorrect?: Bindable<boolean|'on'|'off'>,

  /**
   * Lets you specify that a form control should have input focus when the page
   * loads. Only one form-associated element in a document can have this
   * attribute specified.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autofocus)
   */
  autoFocus?: Bindable<boolean>,

  /**
   * The visible width of the text control, in average character widths.
   * If it is specified, it must be a positive integer.
   * If it is not specified, the default value is `20`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/cols)
   */
  cols?: Bindable<number>,

  /**
   * Represents the default text content of this text area. Getting and setting
   * this value is equivalent to getting and setting `textContent`
   * on the `<textarea>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/defaultValue)
   */
  defaultValue?: Bindable<string>,

  /**
   * This attribute is used to indicate the text directionality
   * of the element contents.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Attributes/dirname)
   */
  dirname?: Bindable<string>,

  /**
   * When `true`, makes the element not mutable, focusable, or even submitted
   * with the form. The user can neither edit nor focus on the control,
   * nor its form control descendants.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled)
   */
  disabled?: Bindable<boolean>,

  /**
   * The form element that the `<textarea>` element is associated with
   * (its "form owner"). The value of the attribute must be the `id`
   * of a form element in the same document. If this attribute is
   * not specified, the `<textarea>` element must be a descendant
   * of a form element. This attribute enables you to place
   * `<textarea>` elements anywhere within a document, not
   * just as descendants of form elements.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/textarea#form)
   */
  form?: Bindable<string>,

  /**
   * The maximum string length (measured in UTF-16 code units)
   * that the user can enter. If this value isn't specified,
   * the user can enter an unlimited number of characters.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/maxLength)
   */
  maxlength?: Bindable<number>,

  /**
   * The minimum string length (measured in UTF-16 code units)
   * required that the user should enter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/minLength)
   */
  minlength?: Bindable<number>,

  /**
   * The name of the control.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/name)
   */
  name?: Bindable<string>,

  /**
   * A hint to the user of what can be entered in the control. Carriage returns
   * or line-feeds within the placeholder text must be treated as line breaks
   * when rendering the hint.
   *
   * > **_NOTE:_**
   * Placeholders should only be used to show an example of the type of data
   * that should be entered into a form; they are not a substitute for a proper
   * `<label>` element tied to the input. See `<input>` `labels` for a full
   * explanation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/placeholder)
   */
  placeholder?: Bindable<StringConvertible>,

  /**
   * Indicates that the user cannot modify the value of the control. Unlike the
   * `disabled` attribute, the `readOnly` attribute does not prevent the user
   * from clicking or selecting in the control. The value of a read-only
   * control is still submitted with the form.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/readOnly)
   */
  readOnly?: Bindable<boolean>,

  /**
   * This attribute specifies that the user must fill in a value before
   * submitting a form.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/required)
   */
  required?: Bindable<boolean>,

  /**
   * The number of visible text lines for the control. If it is specified,
   * it must be a positive integer. If it is not specified,
   * the default value is `2`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/rows)
   */
  rows?: Bindable<number>,

  /**
   * Sets the raw value contained in the `<textarea>`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/value)
   */
  value?: Bindable<StringConvertible>,

  /**
   * Indicates how the control should wrap the value for form submission.
   * Possible values are:
   *
   * - `hard`: The browser automatically inserts line breaks (CR+LF) so that
   * each line is no longer than the width of the control; the `cols` attribute
   * must be specified for this to take effect
   *
   * - `soft`: The browser ensures that all line breaks in the entered value
   * are a CR+LF pair, but no additional line breaks are added to the value.
   *
   * - `off`: Non-standard: Like soft but changes appearance to
   * `white-space: pre` so line segments exceeding `cols` are not
   * wrapped and the `<textarea>` becomes horizontally scrollable.
   *
   * If this attribute is not specified, `soft` is its default value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement/wrap)
   */
  wrap?: Bindable<'hard'|'soft'|'off'>,
}

export interface ThElementProps extends HTMLElementProps {
  /**
   * A short, abbreviated description of the header cell's content provided
   * as an alternative label to use for the header cell when referencing
   * the cell in other contexts. Some user-agents, such as speech readers,
   * may present this description before the content itself.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th#abbr)
   */
  abbr?: Bindable<StringConvertible>,

  /**
   * A non-negative integer value indicating how many columns the header
   * cell spans or extends. The default value is `1`. User agents dismiss
   * values higher than `1000` as incorrect, defaulting such values to `1`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th#colspan)
   */
  colSpan?: Bindable<number>,

  /**
   * A list of space-separated strings corresponding to the `id` attributes
   * of the `<th>` elements that provide the headers for this header cell.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th#headers)
   */
  headers?: Bindable<string>,

  /**
   * A non-negative integer value indicating how many rows the header cell
   * spans or extends. The default value is `1`; if its value is set to `0`,
   * the header cell will extend to the end of the table grouping section
   * (`<thead>`, `<tbody>`, `<tfoot>`, even if implicitly defined), that
   * the `<th>` belongs to. Values higher than `65534` are clipped at `65534`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th#rowspan)
   */
  rowSpan?: Bindable<number>,

  /**
   * Defines the cells that the header (defined in the `<th>`) element
   * relates to. Possible values are:
   *
   * - `row`: the header relates to all cells of the row it belongs to;
   *
   * - `col`: the header relates to all cells of the column it belongs to;
   *
   * - `rowgroup`: the header belongs to a rowgroup and relates to all of its cells;
   *
   * - `colgroup`: the header belongs to a colgroup and relates to all of its cells.
   *
   * If the `scope` attribute is not specified, or its value is not `row`,
   * `col`, `rowgroup`, or `colgroup`, then browsers automatically select
   * the set of cells to which the header cell applies.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th#scope)
   */
  scope?: Bindable<'col'|'colgroup'|'row'|'rowgroup'>,
}

export interface TimeElementProps extends HTMLElementProps {
  /**
   * A machine-readable form of the element's date and time value.
   * For valid string formats, see the
   * [datetime valid values](https://developer.mozilla.org/docs/Web/HTML/Element/time#valid_datetime_values)
   * .
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTimeElement/dateTime)
   */
  dateTime?: Bindable<string>,
}

export interface TrackElementProps extends HTMLElementProps {
  /**
   * This attribute indicates that the track should be enabled unless
   * the user's preferences indicate that another track is more
   * appropriate. This may only be used on one `track` element
   * per media element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/default)
   */
  default?: Bindable<boolean>,

  /**
   * How the text track is meant to be used. If omitted the default kind is
   * `subtitles`. If the attribute contains an invalid value, it will use
   * `metadata`. The following keywords are allowed:
   *
   * - `subtitles`
   *   - Subtitles provide translation of content that cannot be understood
   *   by the viewer. For example speech or text that is not English in an
   *   English language film.
   *   - Subtitles may contain additional content, usually extra background
   *   information. For example the text at the beginning of the Star Wars
   *   films, or the date, time, and location of a scene.
   *
   * - `captions`
   *   - Closed captions provide a transcription and possibly a translation
   *   of audio.
   *   - It may include important non-verbal information such as music cues
   *   or sound effects. It may indicate the cue's source (e.g. music, text,
   *   character).
   *   - Suitable for users who are deaf or when the sound is muted.
   *
   * - `chapters`
   *   - Chapter titles are intended to be used when the user is navigating
   *   the media resource.
   *
   * - `metadata`
   *   - Tracks used by scripts. Not visible to the user.
   *
   * - `descriptions`
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/kind)
   */
  kind?: Bindable<'subtitles'|'captions'|'chapters'|'metadata'|'descriptions'>,

  /**
   * A user-readable title of the text track which is used by the browser
   * when listing available text tracks.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/label)
   */
  label?: Bindable<string>,

  /**
   * Address of the track (`.vtt` file). Must be a valid URL. This attribute
   * must be specified and its URL value must have the same origin as the
   * document — unless the `<audio>` or `<video>` parent element of the
   * track element has a `crossOrigin` attribute.
   *
   * Required.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/src)
   */
  src?: Bindable<string>,

  /**
   * Language of the track text data. It must be a valid
   * [BCP 47](https://r12a.github.io/app-subtags/)
   * language tag. If the kind attribute is set to `subtitles`,
   * then `srcLang` must be defined.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/srclang)
   */
  srcLang?: Bindable<string>,
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
 */
export interface VideoElementProps extends HTMLMediaElementProps {
  /**
   * Prevents the browser from suggesting a Picture-in-Picture context menu
   * or to request Picture-in-Picture automatically in some cases.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video#disablepictureinpicture)
   */
  disablePictureInPicture?: Bindable<boolean>,

  /**
   * The height of the video's display area, in CSS pixels.
   * Absolute values only, no percentages.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video#height)
   */
  height?: Bindable<number>,

  /**
   * A Boolean attribute indicating that the video is to be played "inline",
   * that is, within the element's playback area. Note that the absence of
   * this attribute does not imply that the video will always be played in
   * fullscreen.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video#playsinline)
   */
  playsInline?: Bindable<boolean>,

  /**
   * A URL for an image to be shown while the video is downloading.
   * If this attribute isn't specified, nothing is displayed until
   * the first frame is available, then the first frame is shown
   * as the poster frame.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video#poster)
   */
  poster?: Bindable<string>,

  /**
   * The width of the video's display area, in CSS pixels.
   * Absolute values only, no percentages.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video#width)
   */
  width?: Bindable<number>,

  /**
   * The `enterpictureinpicture` event is fired when the `HTMLVideoElement`
   * enters picture-in-picture mode successfully.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/resize_event)
   */
  onEnterPictureInPicture?(
    this: GlobalEventHandlers,
    event: PictureInPictureEvent
  ): any,

  /**
   * The `leavepictureinpicture` event is fired when the `HTMLVideoElement`
   * leaves picture-in-picture mode successfully.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/leavepictureinpicture_event)
   */
  onLeavePictureInPicture?(
    this: GlobalEventHandlers,
    event: PictureInPictureEvent
  ): any,

  /**
   * The `resize` event of the `HTMLVideoElement` interface fires when one or
   * both of the `videoWidth` and `videoHeight` properties have just been
   * updated.
   *
   * This event is not cancelable but may bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/resize_event)
   */
  onResize?(this: GlobalEventHandlers, event: Event): any,
}
