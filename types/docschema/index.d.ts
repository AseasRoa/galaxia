/**
 * This file contains types, exported and used by other modules.
 */

import { docSchema } from './types'
import './global'

export default docSchema
export {
  docSchema,
  DocSchema,
  DocSchemaParser,
  DocSchemaValidator,
  ValidationError
} from './types'
