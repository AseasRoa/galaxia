declare module "galaxia/paintor" {
  import './paintor/global.d.ts'

  export {
    default,
    fetchTranslations,
    isComponent, isTemplate,
    component, state, style, template,
    on, off,
    paintor
  } from './paintor/index.d.ts'
}
