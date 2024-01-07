/**
 * The GlobalEventHandlers mixin describes the event handlers common to several
 * interfaces like HTMLElement, Document, or Window. Each of these interfaces
 * can, of course, add more event handlers in addition to the ones listed below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
 */

export type EventHandlersLowercase = {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onabort */
  onabort? : GlobalEventHandlers['onabort'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationcancel */
  onanimationcancel? : GlobalEventHandlers['onanimationcancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationend */
  onanimationend? : GlobalEventHandlers['onanimationend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationiteration */
  onanimationiteration? : GlobalEventHandlers['onanimationiteration'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationstart */
  onanimationstart? : GlobalEventHandlers['onanimationstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onauxclick */
  onauxclick? : GlobalEventHandlers['onauxclick'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur */
  onblur? : GlobalEventHandlers['onblur'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror */
  onerror? : GlobalEventHandlers['onerror'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onfocus */
  onfocus? : GlobalEventHandlers['onfocus'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncancel */
  // @ts-ignore
  oncancel? : GlobalEventHandlers['oncancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncanplay */
  oncanplay? : GlobalEventHandlers['oncanplay'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncanplaythrough */
  oncanplaythrough? : GlobalEventHandlers['oncanplaythrough'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange */
  onchange? : GlobalEventHandlers['onchange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick */
  onclick? : GlobalEventHandlers['onclick'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclose */
  onclose? : GlobalEventHandlers['onclose'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncontextmenu */
  oncontextmenu? : GlobalEventHandlers['oncontextmenu'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncuechange */
  oncuechange? : GlobalEventHandlers['oncuechange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondblclick */
  ondblclick? : GlobalEventHandlers['ondblclick'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondrag */
  ondrag? : GlobalEventHandlers['ondrag'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragend */
  ondragend? : GlobalEventHandlers['ondragend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragenter */
  ondragenter? : GlobalEventHandlers['ondragenter'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragleave */
  ondragleave? : GlobalEventHandlers['ondragleave'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragover */
  ondragover? : GlobalEventHandlers['ondragover'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragstart */
  ondragstart? : GlobalEventHandlers['ondragstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondrop */
  ondrop? : GlobalEventHandlers['ondrop'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondurationchange */
  ondurationchange? : GlobalEventHandlers['ondurationchange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onemptied */
  onemptied? : GlobalEventHandlers['onemptied'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onended */
  onended? : GlobalEventHandlers['onended'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onformdata */
  onformdata? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ongotpointercapture */
  ongotpointercapture? : GlobalEventHandlers['ongotpointercapture'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput */
  oninput? : GlobalEventHandlers['oninput'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninvalid */
  oninvalid? : GlobalEventHandlers['oninvalid'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeydown */
  onkeydown? : GlobalEventHandlers['onkeydown'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeypress
   * @deprecated
   */
  onkeypress? : GlobalEventHandlers['onkeypress'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeyup */
  onkeyup? : GlobalEventHandlers['onkeyup'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload */
  onload? : GlobalEventHandlers['onload'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadeddata */
  onloadeddata? : GlobalEventHandlers['onloadeddata'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadedmetadata */
  onloadedmetadata? : GlobalEventHandlers['onloadedmetadata'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadend */
  onloadend? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadstart */
  onloadstart? : GlobalEventHandlers['onloadstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onlostpointercapture */
  onlostpointercapture? : GlobalEventHandlers['onlostpointercapture'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousedown */
  onmousedown? : GlobalEventHandlers['onmousedown'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseenter */
  onmouseenter? : GlobalEventHandlers['onmouseenter'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseleave */
  onmouseleave? : GlobalEventHandlers['onmouseleave'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousemove */
  onmousemove? : GlobalEventHandlers['onmousemove'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseout */
  onmouseout? : GlobalEventHandlers['onmouseout'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseover */
  onmouseover? : GlobalEventHandlers['onmouseover'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseup */
  onmouseup? : GlobalEventHandlers['onmouseup'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousewheel
   * @deprecated
   */
  onmousewheel? : (this : HTMLElement, mouseWheelEvent : WheelEvent) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onwheel */
  onwheel? : GlobalEventHandlers['onwheel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpause */
  onpause? : GlobalEventHandlers['onpause'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onplay */
  onplay? : GlobalEventHandlers['onplay'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onplaying */
  onplaying? : GlobalEventHandlers['onplaying'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerdown */
  onpointerdown? : GlobalEventHandlers['onpointerdown'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointermove */
  onpointermove? : GlobalEventHandlers['onpointermove'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerup */
  onpointerup? : GlobalEventHandlers['onpointerup'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointercancel */
  onpointercancel? : GlobalEventHandlers['onpointercancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerover */
  onpointerover? : GlobalEventHandlers['onpointerover'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerout */
  onpointerout? : GlobalEventHandlers['onpointerout'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerenter */
  onpointerenter? : GlobalEventHandlers['onpointerenter'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerleave */
  onpointerleave? : GlobalEventHandlers['onpointerleave'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerlockchange */
  onpointerlockchange? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerlockerror */
  GlobalEventHandlers? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onprogress */
  onprogress? : GlobalEventHandlers['onprogress'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onratechange */
  onratechange? : GlobalEventHandlers['onratechange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onreset */
  onreset? : GlobalEventHandlers['onreset'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onresize */
  onresize? : GlobalEventHandlers['onresize'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onscroll */
  onscroll? : GlobalEventHandlers['onscroll'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onseeked */
  onseeked? : GlobalEventHandlers['onseeked'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onseeking */
  onseeking? : GlobalEventHandlers['onseeking'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onselect */
  onselect? : GlobalEventHandlers['onselect'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onselectstart */
  onselectstart? : GlobalEventHandlers['onselectstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onselectionchange */
  onselectionchange? : GlobalEventHandlers['onselectionchange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onshow */
  onshow? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onstalled */
  onstalled? : GlobalEventHandlers['onstalled'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsubmit */
  onsubmit? : GlobalEventHandlers['onsubmit'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsuspend */
  onsuspend? : GlobalEventHandlers['onsuspend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontimeupdate */
  ontimeupdate? : GlobalEventHandlers['ontimeupdate'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onvolumechange */
  onvolumechange? : GlobalEventHandlers['onvolumechange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchcancel */
  ontouchcancel? : GlobalEventHandlers['ontouchcancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchend */
  ontouchend? : GlobalEventHandlers['ontouchend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchmove */
  ontouchmove? : GlobalEventHandlers['ontouchmove'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchstart */
  ontouchstart? : GlobalEventHandlers['ontouchstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitioncancel */
  ontransitioncancel? : GlobalEventHandlers['ontransitioncancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionend */
  ontransitionend? : GlobalEventHandlers['ontransitionend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionrun */
  ontransitionrun? : GlobalEventHandlers['ontransitionrun'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionstart */
  ontransitionstart? : GlobalEventHandlers['ontransitionstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionstart */
  onwaiting? : GlobalEventHandlers['onwaiting'],
}
