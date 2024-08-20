export declare class DocSchema {
  ast: Ast

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
  check(
    ast: Ast,
    value: any,
    forceStrict?: boolean
  ): CheckResult

  validate(
    ast: Ast,
    value: any,
    forceStrict?: boolean
  ): CheckResult

  checkFunctionArguments(
    ast: Ast,
    args: any[],
    forceStrict?: boolean
  ): CheckResult

  validateFunctionArguments(
    ast: Ast,
    args: any[],
    forceStrict?: boolean
  ): CheckResult

  checkReturns(
    ast: Ast,
    value: any,
    forceStrict?: boolean
  ): CheckResult

  validateReturns(
    ast: Ast,
    value: any,
    forceStrict?: boolean
  ): CheckResult
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
