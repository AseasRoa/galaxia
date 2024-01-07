import './paintor/global.d.ts'

declare module "galaxia/paintor" {
  export {
    default,
    fetchTranslations, isComponent, isTemplate, component, state, template,
    paintor
  } from './paintor/index.d.ts'
}
