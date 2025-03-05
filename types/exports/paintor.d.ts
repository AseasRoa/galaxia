declare module "galaxia/paintor" {
  import 'types/exports/paintor/global'

  export {
    default,
    fetchTranslations,
    isComposition, isTemplate,
    compose, state, style, template,
    onMount,
    on, off,
    paintor
  } from 'types/exports/paintor/index'
}
