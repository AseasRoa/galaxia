import { HTMLElementProps } from './HTMLElementProps'
import { Bindable } from '../common'

/**
 * [MDN Reference]([MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event))
 */
export interface HTMLMediaElementProps extends HTMLElementProps {
  /**
   * Specifies whether playback should automatically begin as soon as enough
   * media is available to do so without interruption.
   *
   * A media element whose source is a
   * [MediaStream](https://developer.mozilla.org/docs/Web/API/MediaStream)
   * and whose `autoPlay` property is true will begin playback when it becomes
   * active (that is, when `MediaStream.active` becomes true).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/autoplay)
   */
  autoPlay?: Bindable<boolean>,

  /**
   * Controls whether user interface controls for playing the media item
   * will be displayed.
   *
   * A boolean value. A value of `true` means controls will be displayed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/controls)
   */
  controls?: Bindable<boolean>,

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
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/crossOrigin)
   */
  crossOrigin?: Bindable<'anonymous'|'use-credentials'>,

  /**
   * Specifies the current playback time in seconds.
   *
   * Changing the value of `currentTime` seeks the media to the new time.
   *
   * A double-precision floating-point value indicating the current playback
   * time in seconds.
   *
   * If the media is not yet playing, the value of currentTime indicates the
   * time position within the media at which playback will begin once the
   * `play()` method is called.
   *
   * Setting `currentTime` to a new value seeks the media to the given time,
   * if the media is available.
   *
   * For media without a known duration—such as media being streamed live—it's
   * possible that the browser may not be able to obtain parts of the media
   * that have expired from the media buffer. Also, media whose timeline
   * doesn't begin at 0 seconds cannot be seeked to a time before its
   * timeline's earliest time.
   *
   * The length of the media in seconds can be determined using
   * the `duration` property.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/currentTime)
   */
  currentTime?: Bindable<number>,

  /**
   * Indicates whether the media element's audio output should be muted by
   * default. This property has no dynamic effect. To mute and unmute the
   * audio output, use the muted property.
   *
   * A boolean value. A value of true means that the audio output will be
   * muted by default.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/defaultMuted)
   */
  defaultMuted?: Bindable<boolean>,

  /**
   * Indicates the default playback rate for the media.
   *
   * A double. 1.0 is "normal speed". Values lower than 1.0 make the media play
   * slower than normal, higher values make it play faster.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/defaultPlaybackRate)
   */
  defaultPlaybackRate?: Bindable<number>,

  /**
   * Determines whether the media element is allowed to have a remote
   * playback UI.
   *
   * A boolean value indicating whether the media element may have a remote
   * playback UI. (`false` means "not disabled", which means "enabled")
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/disableRemotePlayback)
   */
  disableRemotePlayback?: Bindable<boolean>,

  /**
   * Controls whether the media element should start over when it reaches
   * the end.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loop)
   */
  loop?: Bindable<boolean>,

  /**
   * Indicates the name of the group of elements it belongs to.
   * A group of media elements shares a common controller.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/mediaGroup)
   * @deprecated
   */
  mediaGroup?: Bindable<string>,

  /**
   * Indicates whether the media element is muted.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/muted)
   */
  muted?: Bindable<boolean>,

  /**
   * Sets the rate at which the media is being played back. This is used to
   * implement user controls for fast forward, slow motion, and so forth.
   * The normal playback rate is multiplied by this value to obtain the
   * current rate, so a value of 1.0 indicates normal speed.
   *
   * A negative `playbackRate` value indicates that the media should be played
   * backwards, but support for this is not yet widespread.
   * (See browser compatibility for details.)
   *
   * The audio is muted when the fast forward or slow motion is outside
   * a useful range (for example, Gecko mutes the sound outside the
   * range 0.25 to 4.0).
   *
   * The pitch of the audio is corrected by default. You can disable pitch
   * correction using the `preservesPitch` property.
   *
   * A double. 1.0 is "normal speed". Values lower than 1.0 make the media play
   * slower than normal, higher values make it play faster. (Default: 1.0)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playbackRate)
   */
  playbackRate?: Bindable<number>,

  /**
   * A string that provides a hint to the browser about what the author thinks
   * will lead to the best user experience.
   *
   * Possible values are as follows:
   * - none - Indicates that the media should not be preloaded.
   * - metadata - Indicates that only media metadata (e.g. length) is fetched.
   * - auto - Indicates that the whole media file can be downloaded, even if
   * the user is not expected to use it.
   *
   * The default value is different for each browser. The spec advises
   * it to be set to metadata.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/preload)
   */
  preload?: Bindable<'none'|'metadata'|'auto'>,

  /**
   * Determines whether the browser should adjust the pitch of the audio to
   * compensate for changes to the playback rate made by setting `playbackRate`.
   *
   * A boolean value defaulting to `true`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/preservesPitch)
   */
  preservesPitch?: Bindable<boolean>,

  /**
   * The URL of a media resource to use in the element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/src)
   */
  src?: Bindable<string>,

  /**
   * Sets the object which serves as the source of the media associated with
   * the `HTMLMediaElement`, or `null` if not assigned.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/srcObject)
   */
  srcObject?: Bindable<MediaStream|MediaSource|Blob|File>,

  /**
   * Sets the volume at which the media will be played.
   *
   * A double values must fall between 0 and 1, where 0 is effectively muted
   * and 1 is the loudest possible value.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volume)
   */
  volume?: Bindable<number>,

  /**
   * The `abort` event is fired when the resource was not fully loaded, but not
   * as the result of an error.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event)
   */
  onAbort?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `canplay` event is fired when the user agent can play the media, but
   * estimates that not enough data has been loaded to play the media up to its
   * end without having to stop for further buffering of content.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event)
   */
  onCanPlay?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `canplaythrough` event is fired when the user agent can play the media,
   * and estimates that enough data has been loaded to play the media up to its
   * end without having to stop for further buffering of content.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event)
   */
  onCanPlayThrough?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `durationchange` event is fired when the duration attribute has been
   * updated.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event)
   */
  onDurationChange?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `emptied` event is fired when the media has become empty; for example,
   * this event is sent if the media has already been loaded (or partially
   * loaded), and the `load()` method is called to reload it.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event)
   */
  onEmptied?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `encrypted` event is fired when initialization data is found in the
   * media that indicates it is encrypted.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event)
   */
  onEncrypted?(this: GlobalEventHandlers, event: MediaEncryptedEvent): any,

  /**
   * The `ended` event is fired when playback or streaming has stopped because
   * the end of the media was reached or because no further data is available.
   *
   * This event occurs based upon `HTMLMediaElement` (`<audio>` and `<video>`)
   * fire `ended` when playback reaches the end of the media.
   *
   * This event is not cancelable and does not bubble.
   *
   * > **_NOTE:_**
   * The `ended` event doesn't fire if the `loop` property is true and
   * `playbackRate` is non-negative.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event)
   */
  onEnded?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `error` event is fired when the resource could not be loaded due to an error (for example, a network connectivity problem).
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/error_event)
   */
  onError?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `loadeddata` event is fired when the frame at the current playback
   * position of the media has finished loading; often the first frame.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event)
   */
  onLoadedData?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `loadedmetadata` event is fired when the metadata has been loaded.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event)
   */
  onLoadedMetadata?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `loadstart` event is fired when the browser has started to load a
   * resource.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadstart_event)
   */
  onLoadStart?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `pause` event is sent when a request to pause an activity is handled
   * and the activity has entered its paused state, most commonly after the
   * media has been paused through a call to the element's `pause()` method.
   *
   * The event is sent once the `pause()` method returns and after the media
   * element's `paused` property has been changed to `true`.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event)
   */
  onPause?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `play` event is fired when the `paused` property is changed from `true`
   * to `false`, as a result of the `play` method, or the `autoplay` attribute.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event)
   */
  onPlay?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `playing` event is fired after playback is first started, and whenever it is restarted. For example it is fired when playback resumes after having been paused or delayed due to lack of data.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event)
   */
  onPlaying?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `progress` event is fired periodically as the browser loads a resource.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/progress_event)
   */
  onProgress?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `ratechange` event is fired when the playback rate has changed.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event)
   */
  onRateChange?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `seeked` event is fired when a seek operation completed, the current
   * playback position has changed, and the Boolean `seeking` attribute is
   * changed to `false`.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event)
   */
  onSeeked?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `seeking` event is fired when a seek operation starts, meaning the
   * Boolean `seeking` attribute has changed to `true` and the media is seeking
   * a new position.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event)
   */
  onSeeking?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `stalled` event is fired when the user agent is trying to fetch media
   * data, but data is unexpectedly not forthcoming.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event)
   */
  onStalled?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `suspend` event is fired when media data loading has been suspended.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event)
   */
  onSuspend?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `timeupdate` event is fired when the time indicated by the
   * `currentTime` attribute has been updated.
   *
   * The event frequency is dependent on the system load, but will be thrown
   * between about 4Hz and 66Hz (assuming the event handlers don't take longer
   * than 250ms to run). User agents are encouraged to vary the frequency of
   * the event based on the system load and the average cost of processing the
   * event each time, so that the UI updates are not any more frequent than the
   * user agent can comfortably handle while decoding the video.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event)
   */
  onTimeUpdate?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `volumechange` event is fired when either the `volume` attribute or the
   * `muted` attribute has changed.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event)
   */
  onVolumeChange?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `waiting` event is fired when playback has stopped because
   * of a temporary lack of data.
   *
   * This event is not cancelable and does not bubble.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event)
   */
  onWaiting?(this: GlobalEventHandlers, event: Event): any,

  /**
   * The `waitingforkey` event is fired at a media element when it is first
   * unable to play because it needs a key to decode the following data,
   * and playback is stopped.
   *
   * If the video frame and/or audio data for the current playback position
   * have been decoded, `readyState` is set to `HAVE_CURRENT_DATA`.
   * Otherwise, including if the data was previously available but isn't
   * anymore, the `readyState` is set to `HAVE_METADATA`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waitingforkey_event)
   */
  onWaitingForKey?(this: GlobalEventHandlers, event: Event): any,
}
