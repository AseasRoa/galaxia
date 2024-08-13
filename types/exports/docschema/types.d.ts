export declare class DocSchema {
  approves(
    value: any
  ): boolean

  check(
    value: any
  ): CheckResult

  /**
   * @template T
   * @param {T} value Input value
   * @returns {T} The input value, if it's valid
   * @throws {ValidationError}
   */
  validate<T>(value: T): T
}

export declare class DocSchemaParser {
  parseComments(
    code: string,
    file?: string
  ): Promise<Ast[]>

  parseFile(
    file: string
  ): Promise<Ast[]>

  removeFileFromCache(
    file: string
  ): void
}

export declare class DocSchemaValidator {
  validateFunctionArguments(
    ast: Ast,
    args: any,
    throwOnError?: boolean,
    forceStrict?: boolean
  ): CheckResult

  validateParams(
    name: 'param' | 'property',
    ast: Ast,
    args: any,
    throwOnError?: boolean,
    forceStrict?: boolean
  ): CheckResult

  validateTag(
    tagName: 'enum' | 'type' | 'returns' | 'yields',
    ast: Ast,
    value: any,
    throwOnError?: boolean,
    forceStrict?: boolean
  ): CheckResult

  validateTypedef(
    ast: Ast,
    value: any,
    throwOnError?: boolean,
    forceStrict?: boolean
  ) : CheckResult
}

export declare class ValidationError extends Error {
  expectedType: string
  filter: undefined | {
    name: '' | keyof Filters,
    value: boolean | number | string | RegExp
  }
  kind: 'type' | 'filter' | 'strict' | ''
  message: string
  pass: boolean
  tag: string
  value: any
  valuePath: PropertyKey[]
}

/**
 * @returns {DocSchema}
 * @throws {Error}
 */
export declare function docSchema(): DocSchema
