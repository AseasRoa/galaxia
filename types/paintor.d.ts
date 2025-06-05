declare module "galaxia/paintor" {
  import 'types/paintor/global'

  export {
    default,
    css,
    fetchTranslations,
    isComposition, isTemplate,
    compose, state, style, template,
    onMount,
    on, off,
    paintor,
    Template
  } from 'types/paintor/index'
}
