/**
 * The GlobalEventHandlers mixin describes the event handlers common to several
 * interfaces like HTMLElement, Document, or Window. Each of these interfaces
 * can, of course, add more event handlers in addition to the ones listed below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
 */

export type EventHandlers = {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onabort */
  onAbort? : GlobalEventHandlers['onabort'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationcancel */
  onAnimationCancel? : GlobalEventHandlers['onanimationcancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationend */
  onAnimationEnd? : GlobalEventHandlers['onanimationend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationiteration */
  onAnimationIteration? : GlobalEventHandlers['onanimationiteration'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onanimationstart */
  onAnimationStart? : GlobalEventHandlers['onanimationstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onauxclick */
  onAuxClick? : GlobalEventHandlers['onauxclick'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur */
  onBlur? : GlobalEventHandlers['onblur'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror */
  onError? : GlobalEventHandlers['onerror'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onfocus */
  onFocus? : GlobalEventHandlers['onfocus'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncancel */
  // @ts-ignore
  onCancel? : GlobalEventHandlers['oncancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncanplay */
  onCanPlay? : GlobalEventHandlers['oncanplay'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncanplaythrough */
  onCanPlaythrough? : GlobalEventHandlers['oncanplaythrough'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange */
  onChange? : GlobalEventHandlers['onchange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick */
  onClick? : GlobalEventHandlers['onclick'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclose */
  onClose? : GlobalEventHandlers['onclose'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncontextmenu */
  onContextMenu? : GlobalEventHandlers['oncontextmenu'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncuechange */
  onCueChange? : GlobalEventHandlers['oncuechange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondblclick */
  onDblClick? : GlobalEventHandlers['ondblclick'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondrag */
  onDrag? : GlobalEventHandlers['ondrag'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragend */
  onDragEnd? : GlobalEventHandlers['ondragend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragenter */
  onDragEnter? : GlobalEventHandlers['ondragenter'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragleave */
  onDragLeave? : GlobalEventHandlers['ondragleave'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragover */
  onDragOver? : GlobalEventHandlers['ondragover'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondragstart */
  onDragStart? : GlobalEventHandlers['ondragstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondrop */
  onDrop? : GlobalEventHandlers['ondrop'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondurationchange */
  onDurationChange? : GlobalEventHandlers['ondurationchange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onemptied */
  onEmptied? : GlobalEventHandlers['onemptied'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onended */
  onEnded? : GlobalEventHandlers['onended'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onformdata */
  onFormData? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ongotpointercapture */
  onGotPointerCapture? : GlobalEventHandlers['ongotpointercapture'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput */
  onInput? : GlobalEventHandlers['oninput'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninvalid */
  onInvalid? : GlobalEventHandlers['oninvalid'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeydown */
  onKeyDown? : GlobalEventHandlers['onkeydown'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeypress
   * @deprecated
   */
  onKeyPress? : GlobalEventHandlers['onkeypress'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeyup */
  onKeyUp? : GlobalEventHandlers['onkeyup'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload */
  onLoad? : GlobalEventHandlers['onload'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadeddata */
  onLoadedData? : GlobalEventHandlers['onloadeddata'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadedmetadata */
  onLoadedMetadata? : GlobalEventHandlers['onloadedmetadata'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadend */
  onLoadEnd? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadstart */
  onLoadStart? : GlobalEventHandlers['onloadstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onlostpointercapture */
  onLostPointerCapture? : GlobalEventHandlers['onlostpointercapture'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousedown */
  onMouseDown? : GlobalEventHandlers['onmousedown'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseenter */
  onMouseEnter? : GlobalEventHandlers['onmouseenter'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseleave */
  onMouseLeave? : GlobalEventHandlers['onmouseleave'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousemove */
  onMouseMove? : GlobalEventHandlers['onmousemove'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseout */
  onMouseOut? : GlobalEventHandlers['onmouseout'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseover */
  onMouseOver? : GlobalEventHandlers['onmouseover'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseup */
  onMouseUp? : GlobalEventHandlers['onmouseup'],

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousewheel
   * @deprecated
   */
  onMouseWheel? : (this : HTMLElement, mouseWheelEvent : WheelEvent) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onwheel */
  onWheel? : GlobalEventHandlers['onwheel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpause */
  onPause? : GlobalEventHandlers['onpause'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onplay */
  onPlay? : GlobalEventHandlers['onplay'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onplaying */
  onPlaying? : GlobalEventHandlers['onplaying'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerdown */
  onPointerDown? : GlobalEventHandlers['onpointerdown'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointermove */
  onPointerMove? : GlobalEventHandlers['onpointermove'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerup */
  onPointerUp? : GlobalEventHandlers['onpointerup'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointercancel */
  onPointerCancel? : GlobalEventHandlers['onpointercancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerover */
  onPointerOver? : GlobalEventHandlers['onpointerover'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerout */
  onPointerOut? : GlobalEventHandlers['onpointerout'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerenter */
  onPointerEnter? : GlobalEventHandlers['onpointerenter'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerleave */
  onPointerLeave? : GlobalEventHandlers['onpointerleave'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerlockchange */
  onPointerLockChange? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerlockerror */
  onPointerLockError? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onprogress */
  onProgress? : GlobalEventHandlers['onprogress'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onratechange */
  onRateChange? : GlobalEventHandlers['onratechange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onreset */
  onReset? : GlobalEventHandlers['onreset'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onresize */
  onResize? : GlobalEventHandlers['onresize'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onscroll */
  onScroll? : GlobalEventHandlers['onscroll'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onseeked */
  onSeeked? : GlobalEventHandlers['onseeked'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onseeking */
  onSeeking? : GlobalEventHandlers['onseeking'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onselect */
  onSelect? : GlobalEventHandlers['onselect'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onselectstart */
  onSelectStart? : GlobalEventHandlers['onselectstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onselectionchange */
  onSelectionChange? : GlobalEventHandlers['onselectionchange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onshow */
  onShow? : (this : GlobalEventHandlers, event : Event) => any,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onstalled */
  onStalled? : GlobalEventHandlers['onstalled'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsubmit */
  onSubmit? : GlobalEventHandlers['onsubmit'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsuspend */
  onSuspend? : GlobalEventHandlers['onsuspend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontimeupdate */
  onTimeUpdate? : GlobalEventHandlers['ontimeupdate'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onvolumechange */
  onVolumeChange? : GlobalEventHandlers['onvolumechange'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchcancel */
  onTouchCancel? : GlobalEventHandlers['ontouchcancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchend */
  onTouchEnd? : GlobalEventHandlers['ontouchend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchmove */
  onTouchMove? : GlobalEventHandlers['ontouchmove'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchstart */
  onTouchStart? : GlobalEventHandlers['ontouchstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitioncancel */
  onTransitionCancel? : GlobalEventHandlers['ontransitioncancel'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionend */
  onTransitionEnd? : GlobalEventHandlers['ontransitionend'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionrun */
  onTransitionRun? : GlobalEventHandlers['ontransitionrun'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionstart */
  onTransitionStart? : GlobalEventHandlers['ontransitionstart'],

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontransitionstart */
  onWaiting? : GlobalEventHandlers['onwaiting'],
}
