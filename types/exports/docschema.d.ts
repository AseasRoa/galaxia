import './docschema/global.d.ts'

declare module 'galaxia/docschema' {
  export {
    default,
    docSchema,
    DocSchema,
    ValidationError
  } from './docschema/index.d.ts'
}
