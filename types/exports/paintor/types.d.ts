import { CSSPropertiesJsStyle } from './WebApi/CSSProperties'
import { Elements } from './WebApi/Elements'
import { Statements } from './Statements'
import { SVGElements } from './WebApi/SVGElements'
import { MutualElements } from './WebApi/MutualElements'

export interface StyleRules extends CSSPropertiesJsStyle {}
export interface TemplateTree extends Elements, SVGElements, MutualElements, Statements {}
export type Template = (tree : TemplateTree) => (
  void
  | string // For HTML
  | HTMLElement | HTMLElement[]
  | Template | Template[]
)

export type Translation = Record<string, any>

export type TargetObject = (Array<any> | Record<keyof any, any>)
export type State = (Array<any> | Record<keyof any, any>)
export type States = Record<string, State>

export type Composable = Template | Component

export class Component {
  state?: State
  onMount?: () => void
  css?: () => CSSStyleSheet | string
  template: Template
}

export interface Composition {
  clear: () => void
  html: (options?: { indent?: string }) => string
  paint: (container: string | HTMLElement | HTMLElement[] | HTMLCollection) => void
  static: (on?: boolean) => Composition
  staticHtml: (options?: { indent?: string }) => string
  useTranslations : (...translations: Translation[]) => Composition
}

export type ObserverType = ('create'|'change'|'delete'|'set')
export type ObserverListener = (
  event: {
    key: keyof any,
    value: any,
    oldValue: any,
    target: TargetObject,
    state: State,
  }
) => void
