import { Combo } from './common'
import { CSSColors } from './CSSColors'

export type Positions = string
|'left top'|'left center'|'left bottom'
|'right top'|'right center'|'right bottom'
|'center top'|'center center'|'center bottom'
|'x% y%'|'0px 0px'

type CSSGeneral = 'initial'|'inherit'|'revert'|'unset'

type CSSPropertiesJsStyle = {
  /** @see https://www.w3schools.com/cssref/css3_pr_align-content.asp */
  alignContent? : Combo<'stretch'|'center'|'flex-start'|'flex-end'|'space-between'|'space-around'
  |'space-evenly'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_align-items.asp */
  alignItems? : Combo<'stretch'|'center'|'flex-start'|'flex-end'|'baseline'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_align-self.asp */
  alignSelf? : Combo<'auto'|'stretch'|'center'|'flex-start'|'flex-end'|'baseline'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_all.asp */
  all? : Combo<CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation.asp */
  animation? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-delay.asp */
  animationDelay? : Combo<'time'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-direction.asp */
  animationDirection? : Combo<'normal'|'reverse'|'alternate'|'alternate-reverse'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-duration.asp */
  animationDuration? : Combo<'time'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-fill-mode.asp */
  animationFillMode? : Combo<'none'|'forwards'|'backwards'|'both'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-iteration-count.asp */
  animationIterationCount? : Combo<number>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-name.asp */
  animationName? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-play-state.asp */
  animationPlayState? : Combo<'paused'|'running'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp */
  animationTimingFunction? : Combo<string|'linear'|'ease'|'ease-in'|'ease-out'|'ease-in-out'
  |'step-start'|'step-end'|CSSGeneral|'steps(int,start|end)'|'cubic-bezier(n,n,n,n)'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_backface-visibility.asp */
  backfaceVisibility? : Combo<'visible'|'hidden'|CSSGeneral|boolean>,

  /** @see https://www.w3schools.com/cssref/css3_pr_background.asp */
  background? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/pr_background-attachment.asp */
  backgroundAttachment? : Combo<'scroll'|'fixed'|'local'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_background-blend-mode.asp */
  backgroundBlendMode? : Combo<'normal'|'multiply'|'screen'|'overlay'|'darken'|'lighten'|'color-dodge'
  |'saturation'|'color'|'luminosity'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_background-clip.asp */
  backgroundClip? : Combo<'border-box'|'padding-box'|'content-box'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_background-color.asp */
  backgroundColor? : Combo<'transparent'|CSSColors|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_background-image.asp */
  backgroundImage? : Combo<string|'none'|CSSGeneral|'url()'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_background-origin.asp */
  backgroundOrigin? : Combo<string|'padding-box'|'border-box'|'content-box'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_background-position.asp */
  backgroundPosition? : Combo<string|Positions|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_background-repeat.asp */
  backgroundRepeat? : Combo<'repeat'|'repeat-x'|'repeat-y'|'no-repeat'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_background-size.asp */
  backgroundSize? : Combo<string|'auto'|'cover'|'contain'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border.asp */
  border? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/pr_border-bottom.asp */
  borderBottom? : Combo<string|CSSGeneral|'5px solid red'>,

  /** @see https://www.w3schools.com/cssref/pr_border-bottom_color.asp */
  borderBottomColor? : Combo<CSSColors|'transparent'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-bottom-left-radius.asp */
  borderBottomLeftRadius? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-bottom-right-radius.asp */
  borderBottomRightRadius? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-bottom_style.asp */
  borderBottomStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-bottom_width.asp */
  borderBottomWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-collapse.asp */
  borderCollapse? : Combo<'separate'|'collapse'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-color.asp */
  borderColor? : Combo<CSSColors|'transparent'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-image.asp */
  borderImage? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-image-outset.asp */
  borderImageOutset? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-image-repeat.asp */
  borderImageRepeat? : Combo<'stretch'|'repeat'|'round'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-image-slice.asp */
  borderImageSlice? : Combo<string|number|'fill'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-image-source.asp */
  borderImageSource? : Combo<string|'none'|CSSGeneral|'url()'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-image-width.asp */
  borderImageWidth? : Combo<string|number|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-left.asp */
  borderLeft? : Combo<string|CSSGeneral|'5px solid red'>,

  /** @see https://www.w3schools.com/cssref/pr_border-left_color.asp */
  borderLeftColor? : Combo<CSSColors|'transparent'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-left_style.asp */
  borderLeftStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-left_width.asp */
  borderLeftWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-radius.asp */
  borderRadius? : Combo<string|CSSGeneral|'25px'>,

  /** @see https://www.w3schools.com/cssref/pr_border-right.asp */
  borderRight? : Combo<string|CSSGeneral|'5px solid red'>,

  /** @see https://www.w3schools.com/cssref/pr_border-right_color.asp */
  borderRightColor? : Combo<CSSColors|'transparent'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-right_style.asp */
  borderRightStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-right_width.asp */
  borderRightWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-spacing.asp */
  borderSpacing? : Combo<string|CSSGeneral|'15px'>,

  /** @see https://www.w3schools.com/cssref/pr_border-style.asp */
  borderStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-top.asp */
  borderTop? : Combo<string|CSSGeneral|'5px solid red'>,

  /** @see https://www.w3schools.com/cssref/pr_border-top_color.asp */
  borderTopColor? : Combo<CSSColors|'transparent'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-top-left-radius.asp */
  borderTopLeftRadius? : Combo<string|CSSGeneral|'25px'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_border-top-right-radius.asp */
  borderTopRightRadius? : Combo<string|CSSGeneral|'25px'>,

  /** @see https://www.w3schools.com/cssref/pr_border-top_style.asp */
  borderTopStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-top_width.asp */
  borderTopWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_border-width.asp */
  borderWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_pos_bottom.asp */
  bottom? : Combo<string|'auto'|CSSGeneral|'10px'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_box-decoration-break.asp */
  'box-decoration-break'? : Combo<'slice'|'clone'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_box-shadow.asp */
  boxShadow? : Combo<string|'inset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_box-sizing.asp */
  boxSizing? : Combo<'content-box'|'border-box'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_break-after.asp */
  breakAfter? : Combo<'auto'|'all'|'always'|'avoid'|'avoid-column'|'avoid-page'|'avoid-region'|'column'
  |'left'|'page'|'recto'|'region'|'right'|'verso'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_break-before.asp */
  breakBefore? : Combo<'auto'|'all'|'always'|'avoid'|'avoid-column'|'avoid-page'|'avoid-region'|'column'
  |'left'|'page'|'recto'|'region'|'right'|'verso'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_break-inside.asp */
  breakInside? : Combo<'auto'|'all'|'always'|'avoid'|'avoid-column'|'avoid-page'|'avoid-region'|'column'
  |'left'|'page'|'recto'|'region'|'right'|'verso'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_tab_caption-side.asp */
  captionSide? : Combo<'top'|'bottom'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_caret-color.asp */
  caretColor? : Combo<CSSColors|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_class_clear.asp */
  clear? : Combo<'none'|'left'|'right'|'both'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_pos_clip.asp */
  clip? : Combo<string|'auto'|CSSGeneral|'rect(0px,25px,25px,0px)'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_clip-path.asp */
  clipPath? : Combo<string|'margin-box'|'border-box'|'padding-box'|'content-box'|'fill-box'
  |'stroke-box'|'view-box'|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_color.asp */
  color? : Combo<CSSColors|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-count.asp */
  columnCount? : Combo<number|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-fill.asp */
  columnFill? : Combo<'balance'|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-gap.asp */
  columnGap? : Combo<string|'normal'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-rule.asp */
  columnRule? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-rule-color.asp */
  columnRuleColor? : Combo<CSSColors|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-rule-style.asp */
  columnRuleStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-rule-width.asp */
  columnRuleWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-span.asp */
  columnSpan? : Combo<'none'|'all'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_column-width.asp */
  columnWidth? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_columns.asp */
  columns? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_gen_content.asp */
  content? : Combo<'normal'|'none'|'counter'|string|'open-quote'|'close-quote'
  |'no-open-quote'|'no-close-quote'|CSSGeneral|'attr()'|'url()'>,

  /** @see https://www.w3schools.com/cssref/pr_gen_counter-increment.asp */
  counterIncrement? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_gen_counter-reset.asp */
  counterReset? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_class_cursor.asp */
  cursor? : Combo<string|'alias'|'all-scroll'|'auto'|'cell'|'context-menu'|'col-resize'|'copy'|'crosshair'
  |'default'|'e-resize'|'ew-resize'|'grab'|'grabbing'|'help'|'move'|'n-resize'|'ne-resize'|'nesw-resize'|'ns-resize'
  |'nw-resize'|'nwse-resize'|'no-drop'|'none'|'not-allowed'|'pointer'|'progress'|'row-resize'|'s-resize'|'se-resize'
  |'sw-resize'|'text'|'vertical-text'|'w-resize'|'wait'|'zoom-in'|'zoom-out'|CSSGeneral|'url(myCursor.cur),auto'>,

  /** @see https://www.w3schools.com/cssref/pr_text_direction.asp */
  direction? : Combo<'ltr'|'rtl'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_class_display.asp */
  display? : Combo<'inline'|'block'|'contents'|'flex'|'grid'|'inline-block'|'inline-flex'|'inline-grid'
  |'inline-table'|'list-item'|'run-in'|'table'|'table-caption'|'table-column-group'|'table-header-group'
  |'table-footer-group'|'table-row-group'|'table-cell'|'table-column'|'table-row'|'none'|CSSGeneral|boolean>,

  /** @see https://www.w3schools.com/cssref/pr_tab_empty-cells.asp */
  emptyCells? : Combo<'show'|'hide'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_filter.asp */
  filter? : Combo<string|'none'|CSSGeneral|'blur(px)'|'brightness(%)'|'contrast(%)'
  |'drop-shadow(h-shadow v-shadow blur spread color)'|'grayscale(%)'|'hue-rotate(deg)'|'invert(%)'|'opacity(%)'
  |'saturate(%)'|'sepia(%)'|'url()'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex.asp */
  flex? : Combo<0|1|'auto'|CSSGeneral|boolean>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex-basis.asp */
  flexBasis? : Combo<string|number|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex-direction.asp */
  flexDirection? : Combo<'row'|'row-reverse'|'column'|'column-reverse'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex-flow.asp */
  flexFlow? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex-grow.asp */
  flexGrow? : Combo<number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex-shrink.asp */
  flexShrink? : Combo<number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_flex-wrap.asp */
  flexWrap? : Combo<'nowrap'|'wrap'|'wrap-reverse'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_class_float.asp */
  float? : Combo<'none'|'left'|'right'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_font_font.asp */
  font? : Combo<string|'caption'|'icon'|'menu'|'message-box'|'small-caption'|'status-bar'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_font_font-family.asp */
  fontFamily? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_font-feature-settings.asp */
  fontFeatureSettings? : Combo<string|'normal'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_font-kerning.asp */
  fontKerning? : Combo<'auto'|'normal'|'none'>,

  /** @see https://www.w3schools.com/cssref/pr_font_font-size.asp */
  fontSize? : Combo<string|'medium'|'xx-small'|'x-small'|'small'|'large'|'x-large'|'xx-large'
  |'smaller'|'larger'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_font-size-adjust.asp */
  fontSizeAdjust? : Combo<number|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_font-stretch.asp */
  fontStretch? : Combo<'ultra-condensed'|'extra-condensed'|'condensed'|'semi-condensed'|'normal'
  |'semi-expanded'|'expanded'|'extra-expanded'|'ultra-expanded'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_font_font-style.asp */
  fontStyle? : Combo<'normal'|'italic'|'oblique'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis */
  fontSynthesis? : Combo<'none'|'weight'|'style'|'weight style'>,

  /** @see https://www.w3schools.com/cssref/pr_font_font-variant.asp */
  fontVariant? : Combo<'normal'|'small-caps'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_font-variant-caps.asp */
  fontVariantCaps? : Combo<'normal'|'small-caps'|'all-small-caps'|'petite-caps'|'all-petite-caps'|'unicase'
  |'titling-caps'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian */
  fontVariantEastAsian? : Combo<string|'normal'|'ruby'|'jis78'|'jis83'|'jis90'|'jis04'|'simplified'
  |'traditional'|'full-width'|'proportional-width'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures */
  fontVariantLigatures? : Combo<'normal'|'none'|'common-ligatures'|'no-common-ligatures'
  |'discretionary-ligatures'|'no-discretionary-ligatures'|'historical-ligatures'|'no-historical-ligatures'
  |'contextual'|'no-contextual'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric */
  fontVariantNumeric? : Combo<'normal'|'ordinal'|'slashed-zero'|'lining-nums'|'oldstyle-nums'
  |'proportional-nums'|'tabular-nums'|'diagonal-fractions'|'stacked-fractions'|'oldstyle-nums stacked-fractions'
  |CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position */
  fontVariantPosition? : Combo<'normal'|'sub'|'super'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_font_weight.asp */
  fontWeight? : Combo<'normal'|'bold'|'bolder'|'lighter'|number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_gap.asp */
  gap? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/pr_grid.asp */
  grid? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_grid-area.asp */
  gridArea? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/pr_grid-auto-columns.asp */
  gridAutoColumns? : Combo<string|'auto'|'max-content'|'min-content'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-auto-flow.asp */
  gridAutoFlow? : Combo<'row'|'column'|'dense'|'row dense'|'column dense'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-auto-rows.asp */
  gridAutoRows? : Combo<string|'auto'|'max-content'|'min-content'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-column.asp */
  gridColumn? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/pr_grid-column-end.asp */
  gridColumnEnd? : Combo<string|number|'auto'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-column-gap.asp */
  gridColumnGap? : Combo<string|number>,

  /** @see https://www.w3schools.com/cssref/pr_grid-column-start.asp */
  gridColumnStart? : Combo<string|number|'auto'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-gap.asp */
  gridGap? : Combo<string|number>,

  /** @see https://www.w3schools.com/cssref/pr_grid-row.asp */
  gridRow? : Combo<string>,

  /** @see https://www.w3schools.com/cssref/pr_grid-row-end.asp */
  gridRowEnd? : Combo<string|number|'auto'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-row-gap.asp */
  gridRowGap? : Combo<string|number>,

  /** @see https://www.w3schools.com/cssref/pr_grid-row-start.asp */
  gridRowStart? : Combo<number|'auto'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-template.asp */
  gridTemplate? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_grid-template-areas.asp */
  gridTemplateAreas? : Combo<string|'none'>,

  /** @see https://www.w3schools.com/cssref/pr_grid-template-columns.asp */
  gridTemplateColumns? : Combo<string|'none'|'auto'|'max-content'|'min-content'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_grid-template-rows.asp */
  gridTemplateRows? : Combo<string|'none'|'auto'|'max-content'|'min-content'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_hanging-punctuation.asp */
  hangingPunctuation? : Combo<'none'|'first'|'last'|'allow-end'|'force-end'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_height.asp */
  height? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_hyphens.asp */
  hyphens? : Combo<'none'|'manual'|'auto'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering */
  imageRendering? : Combo<'auto'|'crisp-edges'|'pixelated'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_isolation.asp */
  isolation? : Combo<'auto'|'isolate'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_justify-content.asp */
  justifyContent? : Combo<'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_pos_left.asp */
  left? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_letter-spacing.asp */
  letterSpacing? : Combo<string|'normal'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-break */
  lineBreak? : Combo<'auto'|'loose'|'normal'|'strict'|'anywhere'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_line-height.asp */
  lineHeight? : Combo<string|'normal'|number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_list-style.asp */
  listStyle? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_list-style-image.asp */
  listStyleImage? : Combo<string|'none'|CSSGeneral|'url()'>,

  /** @see https://www.w3schools.com/cssref/pr_list-style-position.asp */
  listStylePosition? : Combo<'inside'|'outside'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_list-style-type.asp */
  listStyleType? : Combo<'disc'|'armenian'|'circle'|'cjk-ideographic'|'decimal'|'decimal-leading-zero'
  |'georgian'|'hebrew'|'hiragana'|'hiragana-iroha'|'katakana'|'katakana-iroha'|'lower-alpha'|'lower-greek'
  |'lower-latin'|'lower-roman'|'none'|'square'|'upper-alpha'|'upper-greek'|'upper-latin'|'upper-roman'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_margin.asp */
  margin? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_margin-bottom.asp */
  marginBottom? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_margin-left.asp */
  marginLeft? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_margin-right.asp */
  marginRight? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_margin-top.asp */
  marginTop? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/mask */
  mask? : Combo<string|'none'|CSSGeneral|'url()'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_mask-image.asp */
  maskImage? : Combo<string|'none'|CSSGeneral|'url()'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_mask-mode.asp */
  maskMode? : Combo<string|'match-source'|'luminance'|'alpha'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_mask-origin.asp */
  maskOrigin? : Combo<string
  |'border-box'|'content-box'|'padding-box'|'margin-box'|'fill-box'|'stroke-box'|'view-box'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_mask-position.asp */
  maskPosition? : Combo<string|Positions|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_mask-repeat.asp */
  maskRepeat? : Combo<string|'repeat'|'repeat-x'|'repeat-y'|'space'|'round'|'no-repeat'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_mask-size.asp */
  maskSize? : Combo<string|'auto'|'contain'|'cover'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type */
  maskType? : Combo<'luminance'|'alpha'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_max-height.asp */
  maxHeight? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_max-width.asp */
  maxWidth? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_min-height.asp */
  minHeight? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_min-width.asp */
  minWidth? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_mix-blend-mode.asp */
  mixBlendMode? : Combo<'normal'|'multiply'|'screen'|'overlay'|'darken'|'lighten'|'color-dodge'|'color-burn'
  |'difference'|'exclusion'|'hue'|'saturation'|'color'|'luminosity'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_object-fit.asp */
  objectFit? : Combo<'fill'|'contain'|'cover'|'scale-down'|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_object-position.asp */
  objectPosition? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_opacity.asp */
  opacity? : Combo<number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_order.asp */
  order? : Combo<number|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/orphans */
  orphans? : Combo<number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_outline.asp */
  outline? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_outline-color.asp */
  outlineColor? : Combo<CSSColors|'invert'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_outline-offset.asp */
  outlineOffset? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_outline-style.asp */
  outlineStyle? : Combo<'none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'
  |'inset'|'outset'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_outline-width.asp */
  outlineWidth? : Combo<string|'medium'|'thin'|'thick'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_pos_overflow.asp */
  overflow? : Combo<'visible'|'hidden'|'scroll'|'auto'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap */
  overflowWrap? : Combo<'normal'|'break-word'|'anywhere'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_overflow-x.asp */
  overflowX? : Combo<'visible'|'hidden'|'scroll'|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_overflow-y.asp */
  overflowY? : Combo<'visible'|'hidden'|'scroll'|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_padding.asp */
  padding? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_padding-bottom.asp */
  paddingBottom? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_padding-left.asp */
  paddingLeft? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_padding-right.asp */
  paddingRight? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_padding-top.asp */
  paddingTop? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_print_pageba.asp */
  pageBreakAfter? : Combo<'auto'|'always'|'avoid'|'left'|'right'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_print_pagebb.asp */
  pageBreakBefore? : Combo<'auto'|'always'|'avoid'|'left'|'right'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_print_pagebi.asp */
  pageBreakInside? : Combo<'auto'|'avoid'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_perspective.asp */
  perspective? : Combo<string|'none'>,

  /** @see https://www.w3schools.com/cssref/css3_pr_perspective-origin.asp */
  perspectiveOrigin? : Combo<string
  |'top left'|'top'|'top right'
  |'left'|'center'|'right'
  |'bottom left'|'bottom'|'bottom right'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_pointer-events.asp */
  pointerEvents? : Combo<'auto'|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_class_position.asp */
  position? : Combo<'static'|'absolute'|'fixed'|'relative'|'sticky'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_gen_quotes.asp */
  quotes? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_resize.asp */
  resize? : Combo<'none'|'both'|'horizontal'|'vertical'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_pos_right.asp */
  right? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_row-gap.asp */
  rowGap? : Combo<string|'normal'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_scroll-behavior.asp */
  scrollBehavior? : Combo<'auto'|'smooth'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_tab-size.asp */
  tabSize? : Combo<number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_tab_table-layout.asp */
  tableLayout? : Combo<'auto'|'fixed'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_text-align.asp */
  textAlign? : Combo<'left'|'right'|'center'|'justify'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-align-last.asp */
  textAlignLast? : Combo<'auto'|'left'|'right'|'center'|'justify'|'start'|'end'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright */
  textCombineUpright? : Combo<string|'none'|'all'|'digits'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_text-decoration.asp */
  textDecoration? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-decoration-color.asp */
  textDecorationColor? : Combo<CSSColors|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-decoration-line.asp */
  textDecorationLine? : Combo<'none'|'underline'|'overline'|'line-through'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-decoration-style.asp */
  textDecorationStyle? : Combo<'solid'|'double'|'dotted'|'dashed'|'wavy'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_text-indent.asp */
  textIndent? : Combo<string|number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-justify.asp */
  textJustify? : Combo<'auto'|'inter-word'|'inter-character'|'none'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation */
  textOrientation? : Combo<'mixed'|'upright'|'sideways-right'|'sideways'|'use-glyph-orientation'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
  textOverflow? : Combo<string|'clip'|'ellipsis'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_text-shadow.asp */
  textShadow? : Combo<string|CSSColors|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_text-transform.asp */
  textTransform? : Combo<'none'|'capitalize'|'uppercase'|'lowercase'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position */
  textUnderlinePosition? : Combo<'auto'|'from-font'|'under'|'left'|'right'|'under left'|'right under'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_pos_top.asp */
  top? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transform.asp */
  transform? : Combo<string|'none'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transform-origin.asp */
  transformOrigin? : Combo<string
  |'top left'|'top'|'top right'
  |'left'|'center'|'right'
  |'bottom left'|'bottom'|'bottom right'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transform-style.asp */
  transformStyle? : Combo<'flat'|'preserve-3d'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transition.asp */
  transition? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transition-delay.asp */
  transitionDelay? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transition-duration.asp */
  transitionDuration? : Combo<string|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transition-property.asp */
  transitionProperty? : Combo<string|'none'|'all'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp */
  transitionTimingFunction? : Combo<'linear'|'ease'|'ease-in'|'ease-out'|'ease-in-out'
  |'step-start'|'step-end'|'steps(int,start|end)' |'cubic-bezier(n,n,n,n)'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_unicode-bidi.asp */
  unicodeBidi? : Combo<'normal'|'embed'|'bidi-override'|'isolate'|'isolate-override'|'plaintext'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_user-select.asp */
  userSelect? : Combo<'auto'|'none'|'text'|'all'>,

  /** @see https://www.w3schools.com/cssref/pr_pos_vertical-align.asp */
  verticalAlign? : Combo<string|'baseline'|'sub'|'super'|'top'|'text-top'|'middle'|'bottom'|'text-bottom'
  |CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_class_visibility.asp */
  visibility? : Combo<'visible'|'hidden'|'collapse'|CSSGeneral|boolean>,

  /** @see https://www.w3schools.com/cssref/pr_text_white-space.asp */
  whiteSpace? : Combo<'normal'|'nowrap'|'pre'|'pre-line'|'pre-wrap'|CSSGeneral>,

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/widows */
  widows? : Combo<number|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_dim_width.asp */
  width? : Combo<string|'auto'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_word-break.asp */
  wordBreak? : Combo<'normal'|'break-all'|'keep-all'|'break-word'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/pr_text_word-spacing.asp */
  wordSpacing? : Combo<string|'normal'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_word-wrap.asp */
  wordWrap? : Combo<'normal'|'break-word'|CSSGeneral>,

  /** @see https://www.w3schools.com/cssref/css3_pr_writing-mode.asp */
  writingMode? : Combo<'horizontal-tb'|'vertical-rl'|'vertical-lr'>,

  /** @see https://www.w3schools.com/cssref/pr_pos_z-index.asp */
  zIndex? : Combo<number|'auto'|CSSGeneral>,
}

type CSSPropertiesHyphenStyle = {
  'align-content'? : CSSPropertiesJsStyle['alignContent'],
  'align-items'? : CSSPropertiesJsStyle['alignItems'],
  'align-self'? : CSSPropertiesJsStyle['alignSelf'],
  'animation-delay'? : CSSPropertiesJsStyle['animationDelay'],
  'animation-direction'? : CSSPropertiesJsStyle['animationDirection'],
  'animation-duration'? : CSSPropertiesJsStyle['animationDuration'],
  'animation-fill-mode'? : CSSPropertiesJsStyle['animationFillMode'],
  'animation-iteration-count'? : CSSPropertiesJsStyle['animationIterationCount'],
  'animation-name'? : CSSPropertiesJsStyle['animationName'],
  'animation-play-state'? : CSSPropertiesJsStyle['animationPlayState'],
  'animation-timing-function'? : CSSPropertiesJsStyle['animationTimingFunction'],
  'backface-visibility'? : CSSPropertiesJsStyle['backfaceVisibility'],
  'background-attachment'? : CSSPropertiesJsStyle['backgroundAttachment'],
  'background-blend-mode'? : CSSPropertiesJsStyle['backgroundBlendMode'],
  'background-clip'? : CSSPropertiesJsStyle['backgroundClip'],
  'background-color'? : CSSPropertiesJsStyle['backgroundColor'],
  'background-image'? : CSSPropertiesJsStyle['backgroundImage'],
  'background-origin'? : CSSPropertiesJsStyle['backgroundOrigin'],
  'background-position'? : CSSPropertiesJsStyle['backgroundPosition'],
  'background-repeat'? : CSSPropertiesJsStyle['backgroundRepeat'],
  'background-size'? : CSSPropertiesJsStyle['backgroundSize'],
  'border-bottom'? : CSSPropertiesJsStyle['borderBottom'],
  'border-bottom-color'? : CSSPropertiesJsStyle['borderBottomColor'],
  'border-bottom-left-radius'? : CSSPropertiesJsStyle['borderBottomLeftRadius'],
  'border-bottom-right-radius'? : CSSPropertiesJsStyle['borderBottomRightRadius'],
  'border-bottom-style'? : CSSPropertiesJsStyle['borderBottomStyle'],
  'border-bottom-width'? : CSSPropertiesJsStyle['borderBottomWidth'],
  'border-collapse'? : CSSPropertiesJsStyle['borderCollapse'],
  'border-color'? : CSSPropertiesJsStyle['borderColor'],
  'border-image'? : CSSPropertiesJsStyle['borderImage'],
  'border-image-outset'? : CSSPropertiesJsStyle['borderImageOutset'],
  'border-image-repeat'? : CSSPropertiesJsStyle['borderImageRepeat'],
  'border-image-slice'? : CSSPropertiesJsStyle['borderImageSlice'],
  'border-image-source'? : CSSPropertiesJsStyle['borderImageSource'],
  'border-image-width'? : CSSPropertiesJsStyle['borderImageWidth'],
  'border-left'? : CSSPropertiesJsStyle['borderLeft'],
  'border-left-color'? : CSSPropertiesJsStyle['borderLeftColor'],
  'border-left-style'? : CSSPropertiesJsStyle['borderLeftStyle'],
  'border-left-width'? : CSSPropertiesJsStyle['borderLeftWidth'],
  'border-radius'? : CSSPropertiesJsStyle['borderRadius'],
  'border-right'? : CSSPropertiesJsStyle['borderRight'],
  'border-right-color'? : CSSPropertiesJsStyle['borderRightColor'],
  'border-right-style'? : CSSPropertiesJsStyle['borderRightStyle'],
  'border-right-width'? : CSSPropertiesJsStyle['borderRightWidth'],
  'border-spacing'? : CSSPropertiesJsStyle['borderSpacing'],
  'border-style'? : CSSPropertiesJsStyle['borderStyle'],
  'border-top'? : CSSPropertiesJsStyle['borderTop'],
  'border-top-color'? : CSSPropertiesJsStyle['borderTopColor'],
  'border-top-left-radius'? : CSSPropertiesJsStyle['borderTopLeftRadius'],
  'border-top-right-radius'? : CSSPropertiesJsStyle['borderTopRightRadius'],
  'border-top-style'? : CSSPropertiesJsStyle['borderTopStyle'],
  'border-top-width'? : CSSPropertiesJsStyle['borderTopWidth'],
  'border-width'? : CSSPropertiesJsStyle['borderWidth'],
  'box-shadow'? : CSSPropertiesJsStyle['boxShadow'],
  'box-sizing'? : CSSPropertiesJsStyle['boxSizing'],
  'break-after'? : CSSPropertiesJsStyle['breakAfter'],
  'break-before'? : CSSPropertiesJsStyle['breakBefore'],
  'break-inside'? : CSSPropertiesJsStyle['breakInside'],
  'caption-side'? : CSSPropertiesJsStyle['captionSide'],
  'caret-color'? : CSSPropertiesJsStyle['caretColor'],
  'clip-path'? : CSSPropertiesJsStyle['clipPath'],
  'column-count'? : CSSPropertiesJsStyle['columnCount'],
  'column-fill'? : CSSPropertiesJsStyle['columnFill'],
  'column-gap'? : CSSPropertiesJsStyle['columnGap'],
  'column-rule'? : CSSPropertiesJsStyle['columnRule'],
  'column-rule-color'? : CSSPropertiesJsStyle['columnRuleColor'],
  'column-rule-style'? : CSSPropertiesJsStyle['columnRuleStyle'],
  'column-rule-width'? : CSSPropertiesJsStyle['columnRuleWidth'],
  'column-span'? : CSSPropertiesJsStyle['columnSpan'],
  'column-width'? : CSSPropertiesJsStyle['columnWidth'],
  'counter-increment'? : CSSPropertiesJsStyle['counterIncrement'],
  'counter-reset'? : CSSPropertiesJsStyle['counterReset'],
  'empty-cells'? : CSSPropertiesJsStyle['emptyCells'],
  'flex-basis'? : CSSPropertiesJsStyle['flexBasis'],
  'flex-direction'? : CSSPropertiesJsStyle['flexDirection'],
  'flex-flow'? : CSSPropertiesJsStyle['flexFlow'],
  'flex-grow'? : CSSPropertiesJsStyle['flexGrow'],
  'flex-shrink'? : CSSPropertiesJsStyle['flexShrink'],
  'flex-wrap'? : CSSPropertiesJsStyle['flexWrap'],
  'font-family'? : CSSPropertiesJsStyle['fontFamily'],
  'font-feature-settings'? : CSSPropertiesJsStyle['fontFeatureSettings'],
  'font-kerning'? : CSSPropertiesJsStyle['fontKerning'],
  'font-size'? : CSSPropertiesJsStyle['fontSize'],
  'font-size-adjust'? : CSSPropertiesJsStyle['fontSizeAdjust'],
  'font-stretch'? : CSSPropertiesJsStyle['fontStretch'],
  'font-style'? : CSSPropertiesJsStyle['fontStyle'],
  'font-variant'? : CSSPropertiesJsStyle['fontVariant'],
  'font-variant-caps'? : CSSPropertiesJsStyle['fontVariantCaps'],
  'font-weight'? : CSSPropertiesJsStyle['fontWeight'],
  'grid-area'? : CSSPropertiesJsStyle['gridArea'],
  'grid-auto-columns'? : CSSPropertiesJsStyle['gridAutoColumns'],
  'grid-auto-flow'? : CSSPropertiesJsStyle['gridAutoFlow'],
  'grid-auto-rows'? : CSSPropertiesJsStyle['gridAutoRows'],
  'grid-column'? : CSSPropertiesJsStyle['gridColumn'],
  'grid-column-end'? : CSSPropertiesJsStyle['gridColumnEnd'],
  'grid-column-gap'? : CSSPropertiesJsStyle['gridColumnGap'],
  'grid-column-start'? : CSSPropertiesJsStyle['gridColumnStart'],
  'grid-gap'? : CSSPropertiesJsStyle['gridGap'],
  'grid-row'? : CSSPropertiesJsStyle['gridRow'],
  'grid-row-end'? : CSSPropertiesJsStyle['gridRowEnd'],
  'grid-row-gap'? : CSSPropertiesJsStyle['gridRowGap'],
  'grid-row-start'? : CSSPropertiesJsStyle['gridRowStart'],
  'grid-template'? : CSSPropertiesJsStyle['gridTemplate'],
  'grid-template-areas'? : CSSPropertiesJsStyle['gridTemplateAreas'],
  'grid-template-columns'? : CSSPropertiesJsStyle['gridTemplateColumns'],
  'grid-template-rows'? : CSSPropertiesJsStyle['gridTemplateRows'],
  'hanging-punctuation'? : CSSPropertiesJsStyle['hangingPunctuation'],
  'justify-content'? : CSSPropertiesJsStyle['justifyContent'],
  'letter-spacing'? : CSSPropertiesJsStyle['letterSpacing'],
  'line-height'? : CSSPropertiesJsStyle['lineHeight'],
  'list-style'? : CSSPropertiesJsStyle['listStyle'],
  'list-style-image'? : CSSPropertiesJsStyle['listStyleImage'],
  'list-style-position'? : CSSPropertiesJsStyle['listStylePosition'],
  'list-style-type'? : CSSPropertiesJsStyle['listStyleType'],
  'margin-bottom'? : CSSPropertiesJsStyle['marginBottom'],
  'margin-left'? : CSSPropertiesJsStyle['marginLeft'],
  'margin-right'? : CSSPropertiesJsStyle['marginRight'],
  'margin-top'? : CSSPropertiesJsStyle['marginTop'],
  'mask'? : CSSPropertiesJsStyle['mask'],
  'mask-image'? : CSSPropertiesJsStyle['maskImage'],
  'mask-mode'? : CSSPropertiesJsStyle['maskMode'],
  'mask-origin'? : CSSPropertiesJsStyle['maskOrigin'],
  'mask-position'? : CSSPropertiesJsStyle['maskPosition'],
  'mask-repeat'? : CSSPropertiesJsStyle['maskRepeat'],
  'mask-size'? : CSSPropertiesJsStyle['maskSize'],
  'mask-type'? : CSSPropertiesJsStyle['maskType'],
  'max-height'? : CSSPropertiesJsStyle['maxHeight'],
  'max-width'? : CSSPropertiesJsStyle['maxWidth'],
  'min-height'? : CSSPropertiesJsStyle['minHeight'],
  'min-width'? : CSSPropertiesJsStyle['minWidth'],
  'mix-blend-mode'? : CSSPropertiesJsStyle['mixBlendMode'],
  'object-fit'? : CSSPropertiesJsStyle['objectFit'],
  'object-position'? : CSSPropertiesJsStyle['objectPosition'],
  'outline-color'? : CSSPropertiesJsStyle['outlineColor'],
  'outline-offset'? : CSSPropertiesJsStyle['outlineOffset'],
  'outline-style'? : CSSPropertiesJsStyle['outlineStyle'],
  'outline-width'? : CSSPropertiesJsStyle['outlineWidth'],
  'overflow-x'? : CSSPropertiesJsStyle['overflowX'],
  'overflow-y'? : CSSPropertiesJsStyle['overflowY'],
  'padding-bottom'? : CSSPropertiesJsStyle['paddingBottom'],
  'padding-left'? : CSSPropertiesJsStyle['paddingLeft'],
  'padding-right'? : CSSPropertiesJsStyle['paddingRight'],
  'padding-top'? : CSSPropertiesJsStyle['paddingTop'],
  'page-break-after'? : CSSPropertiesJsStyle['pageBreakAfter'],
  'page-break-before'? : CSSPropertiesJsStyle['pageBreakBefore'],
  'page-break-inside'? : CSSPropertiesJsStyle['pageBreakInside'],
  'perspective-origin'? : CSSPropertiesJsStyle['perspectiveOrigin'],
  'pointer-events'? : CSSPropertiesJsStyle['pointerEvents'],
  'row-gap'? : CSSPropertiesJsStyle['rowGap'],
  'scroll-behavior'? : CSSPropertiesJsStyle['scrollBehavior'],
  'tab-size'? : CSSPropertiesJsStyle['tabSize'],
  'table-layout'? : CSSPropertiesJsStyle['tableLayout'],
  'text-align'? : CSSPropertiesJsStyle['textAlign'],
  'text-align-last'? : CSSPropertiesJsStyle['textAlignLast'],
  'text-decoration'? : CSSPropertiesJsStyle['textDecoration'],
  'text-decoration-color'? : CSSPropertiesJsStyle['textDecorationColor'],
  'text-decoration-line'? : CSSPropertiesJsStyle['textDecorationLine'],
  'text-decoration-style'? : CSSPropertiesJsStyle['textDecorationStyle'],
  'text-indent'? : CSSPropertiesJsStyle['textIndent'],
  'text-justify'? : CSSPropertiesJsStyle['textJustify'],
  'text-overflow'? : CSSPropertiesJsStyle['textOverflow'],
  'text-shadow'? : CSSPropertiesJsStyle['textShadow'],
  'text-transform'? : CSSPropertiesJsStyle['textTransform'],
  'transform-origin'? : CSSPropertiesJsStyle['transformOrigin'],
  'transform-style'? : CSSPropertiesJsStyle['transformStyle'],
  'transition-delay'? : CSSPropertiesJsStyle['transitionDelay'],
  'transition-duration'? : CSSPropertiesJsStyle['transitionDuration'],
  'transition-property'? : CSSPropertiesJsStyle['transitionProperty'],
  'transition-timing-function'? : CSSPropertiesJsStyle['transitionTimingFunction'],
  'unicode-bidi'? : CSSPropertiesJsStyle['unicodeBidi'],
  'user-select'? : CSSPropertiesJsStyle['userSelect'],
  'vertical-align'? : CSSPropertiesJsStyle['verticalAlign'],
  'white-space'? : CSSPropertiesJsStyle['whiteSpace'],
  'width'? : CSSPropertiesJsStyle['width'],
  'word-break'? : CSSPropertiesJsStyle['wordBreak'],
  'word-spacing'? : CSSPropertiesJsStyle['wordSpacing'],
  'word-wrap'? : CSSPropertiesJsStyle['wordWrap'],
  'writing-mode'? : CSSPropertiesJsStyle['writingMode'],
  'z-index'? : CSSPropertiesJsStyle['zIndex'],
}

export type CSSProperties = CSSPropertiesJsStyle & CSSPropertiesHyphenStyle
