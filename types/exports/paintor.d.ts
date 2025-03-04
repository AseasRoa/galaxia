declare module "galaxia/paintor" {
  import 'types/exports/paintor/global'

  export {
    default,
    fetchTranslations,
    isComponent, isTemplate,
    component, state, style, template,
    on, off,
    paintor
  } from 'types/exports/paintor/index'
}
