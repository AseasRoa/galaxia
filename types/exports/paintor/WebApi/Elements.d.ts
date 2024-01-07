import { ElementAttributes } from './ElementAttributes'
import { GlobalElementAttributes } from './ElementAttributes'
import { GlobalProperties } from './ElementProperties'

type Children = Array<any // Added any, because it shows error when using two children -> string and array of strings
| Error | HTMLElement | HTMLElement[] | string | Component | void>

export interface Elements {
  /**
   * A function to create a custom HTML element
   */
  createElement(
    tagName : string,
    properties? : GlobalProperties,
    ...children : Children
  ) : HTMLElement;

  /**
   * A special function to parse JS template strings, containing HTML code
   */
  html(string : TemplateStringsArray | string, ...keys : any[]) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   * @see https://www.w3schools.com/tags/tag_a.asp
   */
  a(
    properties : ElementAttributes['a'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  a(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  a(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
   * @see https://www.w3schools.com/tags/tag_abbr.asp
   */
  abbr(
    properties : ElementAttributes['abbr'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  abbr(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  abbr(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
   * @see https://www.w3schools.com/tags/tag_address.asp
   */
  address(
    properties : ElementAttributes['address'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  address(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  address(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
   * @see https://www.w3schools.com/tags/tag_area.asp
   */
  area(
    properties : ElementAttributes['area'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  area(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  area(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
   * @see https://www.w3schools.com/tags/tag_article.asp
   */
  article(
    properties : ElementAttributes['article'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  article(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  article(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
   * @see https://www.w3schools.com/tags/tag_aside.asp
   */
  aside(
    properties : ElementAttributes['aside'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  aside(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  aside(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
   * @see https://www.w3schools.com/tags/tag_audio.asp
   */
  audio(
    properties : ElementAttributes['audio'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  audio(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  audio(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
   * @see https://www.w3schools.com/tags/tag_b.asp
   */
  b(
    properties : ElementAttributes['b'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  b(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  b(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
   * @see https://www.w3schools.com/tags/tag_base.asp
   */
  base(
    properties : ElementAttributes['base'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  base(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  base(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
   * @see https://www.w3schools.com/tags/tag_bdi.asp
   */
  bdi(
    properties : ElementAttributes['bdi'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  bdi(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  bdi(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
   * @see https://www.w3schools.com/tags/tag_bdo.asp
   */
  bdo(
    properties : ElementAttributes['bdo'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  bdo(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  bdo(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
   * @see https://www.w3schools.com/tags/tag_blockquote.asp
   */
  blockquote(
    properties : ElementAttributes['blockquote'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  blockquote(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  blockquote(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
   * @see https://www.w3schools.com/tags/tag_body.asp
   */
  body(
    properties : ElementAttributes['body'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  body(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  body(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
   * @see https://www.w3schools.com/tags/tag_br.asp
   */
  br(
    properties : ElementAttributes['br'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  br(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  br(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
   * @see https://www.w3schools.com/tags/tag_button.asp
   */
  button(
    properties : ElementAttributes['button'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  button(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  button(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
   * @see https://www.w3schools.com/tags/tag_canvas.asp
   */
  canvas(
    properties : ElementAttributes['canvas'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  canvas(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  canvas(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
   * @see https://www.w3schools.com/tags/tag_caption.asp
   */
  caption(
    properties : ElementAttributes['caption'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  caption(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  caption(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
   * @see https://www.w3schools.com/tags/tag_cite.asp
   */
  cite(
    properties : ElementAttributes['cite'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  cite(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  cite(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
   * @see https://www.w3schools.com/tags/tag_code.asp
   */
  code(
    properties : ElementAttributes['code'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  code(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  code(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
   * @see https://www.w3schools.com/tags/tag_col.asp
   */
  col(
    properties : ElementAttributes['col'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  col(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  col(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
   * @see https://www.w3schools.com/tags/tag_colgroup.asp
   */
  colgroup(
    properties : ElementAttributes['colgroup'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  colgroup(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  colgroup(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
   * @see https://www.w3schools.com/tags/tag_data.asp
   */
  data(
    properties : ElementAttributes['data'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  data(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  data(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
   * @see https://www.w3schools.com/tags/tag_datalist.asp
   */
  datalist(
    properties : ElementAttributes['datalist'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  datalist(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  datalist(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
   * @see https://www.w3schools.com/tags/tag_dd.asp
   */
  dd(
    properties : ElementAttributes['dd'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  dd(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  dd(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
   * @see https://www.w3schools.com/tags/tag_del.asp
   */
  del(
    properties : ElementAttributes['del'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  del(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  del(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
   * @see https://www.w3schools.com/tags/tag_details.asp
   */
  details(
    properties : ElementAttributes['details'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  details(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  details(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
   * @see https://www.w3schools.com/tags/tag_dfn.asp
   */
  dfn(
    properties : ElementAttributes['dfn'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  dfn(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  dfn(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
   * @see https://www.w3schools.com/tags/tag_dialog.asp
   */
  dialog(
    properties : ElementAttributes['dialog'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  dialog(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  dialog(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
   * @see https://www.w3schools.com/tags/tag_div.asp
   */
  div(
    properties : ElementAttributes['div'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  div(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  div(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
   * @see https://www.w3schools.com/tags/tag_dl.asp
   */
  dl(
    properties : ElementAttributes['dl'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  dl(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  dl(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
   * @see @see https://www.w3schools.com/tags/tag_dt.asp
   */
  dt(
    properties : ElementAttributes['dt'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  dt(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  dt(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
   * @see https://www.w3schools.com/tags/tag_em.asp
   */
  em(
    properties : ElementAttributes['em'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  em(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  em(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
   * @see https://www.w3schools.com/tags/tag_embed.asp
   */
  embed(
    properties : ElementAttributes['embed'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  embed(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  embed(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
   * @see https://www.w3schools.com/tags/tag_fieldset.asp
   */
  fieldset(
    properties : ElementAttributes['fieldset'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  fieldset(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  fieldset(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
   * @see https://www.w3schools.com/tags/tag_figcaption.asp
   */
  figcaption(
    properties : ElementAttributes['figcaption'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  figcaption(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  figcaption(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
   * @see https://www.w3schools.com/tags/tag_figure.asp
   */
  figure(
    properties : ElementAttributes['figure'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  figure(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  figure(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
   * @see https://www.w3schools.com/tags/tag_footer.asp
   */
  footer(
    properties : ElementAttributes['footer'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  footer(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  footer(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
   * @see https://www.w3schools.com/tags/tag_form.asp
   */
  form(
    properties : ElementAttributes['form'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  form(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  form(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h1(
    properties : ElementAttributes['h1'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  h1(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  h1(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h2(
    properties : ElementAttributes['h2'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  h2(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  h2(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h3(
    properties : ElementAttributes['h3'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  h3(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  h3(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h4(
    properties : ElementAttributes['h4'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  h4(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  h4(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h5(
    properties : ElementAttributes['h5'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  h5(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  h5(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6
   * @see https://www.w3schools.com/tags/tag_hn.asp
   */
  h6(
    properties : ElementAttributes['h6'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  h6(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  h6(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
   * @see https://www.w3schools.com/tags/tag_head.asp
   */
  head(
    properties : ElementAttributes['head'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  head(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  head(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
   * @see https://www.w3schools.com/tags/tag_header.asp
   */
  header(
    properties : ElementAttributes['header'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  header(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  header(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup
   * @see https://www.w3schools.com/tags/tag_hgroup.asp
   */
  hgroup(
    properties : ElementAttributes['hgroup'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  hgroup(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  hgroup(...children : Children) : HTMLElement;


  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
   * @see https://www.w3schools.com/tags/tag_hr.asp
   */
  hr(
    properties : ElementAttributes['hr'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  hr(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  hr(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
   * @see https://www.w3schools.com/tags/tag_i.asp
   */
  abbr(
    properties : ElementAttributes['i'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  i(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  i(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
   * @see https://www.w3schools.com/tags/tag_iframe.asp
   */
  iframe(
    properties : ElementAttributes['iframe'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  iframe(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  iframe(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
   * @see https://www.w3schools.com/tags/tag_img.asp
   */
  img(
    properties : ElementAttributes['img'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  img(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  img(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
   * @see https://www.w3schools.com/tags/tag_input.asp
   */
  input(
    properties : ElementAttributes['input'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  input(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  input(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
   * @see https://www.w3schools.com/tags/tag_ins.asp
   */
  ins(
    properties : ElementAttributes['ins'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  ins(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  ins(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
   * @see https://www.w3schools.com/tags/tag_kbd.asp
   */
  kbd(
    properties : ElementAttributes['kbd'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  kbd(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  kbd(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
   * @see https://www.w3schools.com/tags/tag_label.asp
   */
  label(
    properties : ElementAttributes['label'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  label(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  label(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
   * @see https://www.w3schools.com/tags/tag_legend.asp
   */
  legend(
    properties : ElementAttributes['legend'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  legend(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  legend(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
   * @see https://www.w3schools.com/tags/tag_li.asp
   */
  li(
    properties : ElementAttributes['li'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  li(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  li(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
   * @see https://www.w3schools.com/tags/tag_link.asp
   */
  link(
    properties : ElementAttributes['link'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  link(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  link(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
   * @see https://www.w3schools.com/tags/tag_main.asp
   */
  main(
    properties : ElementAttributes['main'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  main(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  main(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
   * @see https://www.w3schools.com/tags/tag_map.asp
   */
  map(
    properties : ElementAttributes['map'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  map(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  map(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
   * @see https://www.w3schools.com/tags/tag_mark.asp
   */
  mark(
    properties : ElementAttributes['mark'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  mark(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  mark(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   * @see https://www.w3schools.com/tags/tag_meta.asp
   */
  meta(
    properties : ElementAttributes['meta'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  meta(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  meta(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
   * @see https://www.w3schools.com/tags/tag_meter.asp
   */
  meter(
    properties : ElementAttributes['meter'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  meter(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  meter(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
   * @see https://www.w3schools.com/tags/tag_nav.asp
   */
  nav(
    properties : ElementAttributes['nav'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  nav(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  nav(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
   * @see https://www.w3schools.com/tags/tag_noscript.asp
   */
  noscript(
    properties : ElementAttributes['noscript'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  noscript(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  noscript(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
   * @see https://www.w3schools.com/tags/tag_object.asp
   */
  object(
    properties : ElementAttributes['object'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  object(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  object(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
   * @see https://www.w3schools.com/tags/tag_ol.asp
   */
  ol(
    properties : ElementAttributes['ol'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  ol(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  ol(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
   * @see https://www.w3schools.com/tags/tag_optgroup.asp
   */
  optgroup(
    properties : ElementAttributes['optgroup'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  optgroup(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  optgroup(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
   * @see https://www.w3schools.com/tags/tag_option.asp
   */
  option(
    properties : ElementAttributes['option'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  option(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  option(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
   * @see https://www.w3schools.com/tags/tag_output.asp
   */
  output(
    properties : ElementAttributes['output'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  output(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  output(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
   * @see https://www.w3schools.com/tags/tag_p.asp
   */
  p(
    properties : ElementAttributes['p'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  p(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  p(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
   * @see https://www.w3schools.com/tags/tag_picture.asp
   */
  picture(
    properties : ElementAttributes['picture'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  picture(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  picture(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
   * @see https://www.w3schools.com/tags/tag_pre.asp
   */
  pre(
    properties : ElementAttributes['pre'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  pre(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  pre(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
   * @see https://www.w3schools.com/tags/tag_progress.asp
   */
  progress(
    properties : ElementAttributes['progress'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  progress(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  progress(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
   * @see https://www.w3schools.com/tags/tag_q.asp
   */
  q(
    properties : ElementAttributes['q'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  q(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  q(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
   * @see https://www.w3schools.com/tags/tag_rp.asp
   */
  rp(
    properties : ElementAttributes['rp'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  rp(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  rp(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
   * @see https://www.w3schools.com/tags/tag_rt.asp
   */
  rt(
    properties : ElementAttributes['rt'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  rt(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  rt(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
   * @see https://www.w3schools.com/tags/tag_ruby.asp
   */
  ruby(
    properties : ElementAttributes['ruby'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  ruby(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  ruby(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
   * @see https://www.w3schools.com/tags/tag_s.asp
   */
  s(
    properties : ElementAttributes['s'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  s(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  s(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
   * @see https://www.w3schools.com/tags/tag_samp.asp
   */
  samp(
    properties : ElementAttributes['samp'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  samp(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  samp(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
   * @see https://www.w3schools.com/tags/tag_script.asp
   */
  script(
    properties : ElementAttributes['script'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  script(
    clientCode : () => void,
    ...children : Children
  ) : HTMLElement;
  script(
    properties : ElementAttributes['script'] & (GlobalElementAttributes | GlobalProperties),
    clientCode : () => void,
    ...children : Children
  ) : HTMLElement;
  script(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  script(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
   * @see https://www.w3schools.com/tags/tag_section.asp
   */
  section(
    properties : ElementAttributes['section'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  section(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  section(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @see https://www.w3schools.com/tags/tag_select.asp
   */
  select(
    properties : ElementAttributes['select'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  select(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  select(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
   * @see https://www.w3schools.com/tags/tag_slot.asp
   */
  slot(
    properties : ElementAttributes['slot'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  slot(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  slot(...children : Children) : HTMLElement;


  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
   * @see https://www.w3schools.com/tags/tag_small.asp
   */
  small(
    properties : ElementAttributes['small'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  small(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  small(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
   * @see https://www.w3schools.com/tags/tag_source.asp
   */
  source(
    properties : ElementAttributes['source'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  source(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  source(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
   * @see https://www.w3schools.com/tags/tag_span.asp
   */
  span(
    properties : ElementAttributes['span'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  span(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  span(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
   * @see https://www.w3schools.com/tags/tag_strong.asp
   */
  strong(
    properties : ElementAttributes['strong'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  strong(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  strong(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
   * @see https://www.w3schools.com/tags/tag_style.asp
   */
  style(
    properties : ElementAttributes['style'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  style(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  style(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
   * @see https://www.w3schools.com/tags/tag_sub.asp
   */
  sub(
    properties : ElementAttributes['sub'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  sub(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  sub(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
   * @see https://www.w3schools.com/tags/tag_summary.asp
   */
  summary(
    properties : ElementAttributes['summary'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  summary(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  summary(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
   * @see https://www.w3schools.com/tags/tag_sup.asp
   */
  sup(
    properties : ElementAttributes['sup'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  sup(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  sup(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
   * @see https://www.w3schools.com/tags/tag_svg.asp
   */
  svg(
    properties : ElementAttributes['svg'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  svg(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  svg(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
   * @see https://www.w3schools.com/tags/tag_table.asp
   */
  table(
    properties : ElementAttributes['table'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  table(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  table(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
   * @see https://www.w3schools.com/tags/tag_tbody.asp
   */
  tbody(
    properties : ElementAttributes['tbody'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  tbody(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  tbody(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
   * @see https://www.w3schools.com/tags/tag_td.asp
   */
  td(
    properties : ElementAttributes['td'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  td(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  td(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
   * @see https://www.w3schools.com/tags/tag_template.asp
   */
  template(
    properties : ElementAttributes['template'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  template(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  template(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
   * @see https://www.w3schools.com/tags/tag_textarea.asp
   */
  textarea(
    properties : ElementAttributes['textarea'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  textarea(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  textarea(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
   * @see https://www.w3schools.com/tags/tag_tfoot.asp
   */
  tfoot(
    properties : ElementAttributes['tfoot'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  tfoot(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  tfoot(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
   * @see https://www.w3schools.com/tags/tag_th.asp
   */
  th(
    properties : ElementAttributes['th'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  th(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  th(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
   * @see https://www.w3schools.com/tags/tag_thead.asp
   */
  thead(
    properties : ElementAttributes['thead'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  thead(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  thead(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
   * @see https://www.w3schools.com/tags/tag_time.asp
   */
  time(
    properties : ElementAttributes['time'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  time(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  time(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
   * @see https://www.w3schools.com/tags/tag_title.asp
   */
  title(
    properties : ElementAttributes['title'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  title(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  title(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
   * @see https://www.w3schools.com/tags/tag_tr.asp
   */
  tr(
    properties : ElementAttributes['tr'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  tr(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  tr(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
   * @see https://www.w3schools.com/tags/tag_track.asp
   */
  track(
    properties : ElementAttributes['track'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  track(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  track(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
   * @see https://www.w3schools.com/tags/tag_u.asp
   */
  u(
    properties : ElementAttributes['u'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  u(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  u(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
   * @see https://www.w3schools.com/tags/tag_ul.asp
   */
  ul(
    properties : ElementAttributes['ul'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  ul(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  ul(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
   * @see https://www.w3schools.com/tags/tag_var.asp
   */
  var(
    properties : ElementAttributes['var'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  var(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  var(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
   * @see https://www.w3schools.com/tags/tag_video.asp
   */
  video(
    properties : ElementAttributes['video'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  video(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  video(...children : Children) : HTMLElement;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
   * @see https://www.w3schools.com/tags/tag_wbr.asp
   */
  wbr(
    properties : ElementAttributes['wbr'] & (GlobalElementAttributes | GlobalProperties),
    ...children : Children
  ) : HTMLElement;
  wbr(textContent : string | Array<string | number>, ...children : Children) : HTMLElement;
  wbr(...children : Children) : HTMLElement;
}
