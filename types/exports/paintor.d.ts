declare module "galaxia/paintor" {
  import './paintor/global.d.ts'

  export {
    default,
    fetchTranslations, isComponent, isTemplate, component, state, template,
    paintor
  } from './paintor/index.d.ts'
}
