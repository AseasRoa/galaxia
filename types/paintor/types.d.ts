type Elements = import('./WebApi/Elements').Elements
type Statements = import('./Statements').Statements

export type TemplateTree = Elements & Statements
export type Template = (tree : TemplateTree) => (
  void
  | string
  | HTMLElement | HTMLElement[]
  | Component | Component[]
  | Template | Template[]
)

export type Translation = Record<string, any>

export type State = Record<any, any> | Array<any> | Set<any> | Map<any, any>
export type States = Record<string, State>

export interface Component {
  clear: () => void,
  html: (options?: { indent?:string }) => string,
  paint: (container: string | HTMLElement | HTMLElement[] | HTMLCollection) => void,
  static: (on?: boolean) => Component,
  staticHtml: (options?: { indent?:string }) => string,
  template: Template,
  useTranslations : (...translations: Translation[]) => Component,
}
