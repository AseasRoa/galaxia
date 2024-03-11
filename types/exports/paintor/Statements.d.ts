/**
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

import { Template } from './types'

export interface Statements {
  if (
    condition: boolean | (() => boolean),
    handler: (() => void | Template) | Template,
    elseHandler?: (() => void | Template) | Template,
  ) : HTMLElement[]

  /**
   * Calls a callback function for each element in the input Object or Map.
   */
  forEach<
    Input extends (...args: any) => Array<>
  >(
    func : Input,
    handler : (
      value : ReturnType<Input>[number],
      key : string
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Object or Map.
   */
  forEach<
    Input extends (...args: any) => Set<>
  >(
    func : Input,
    handler : (
      value : ReturnType<Input> extends Set<infer V> ? V : never,
      key : number
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Object or Map.
   */
  forEach<
    Input extends (...args: any) => Map<>
  >(
    func : Input,
    handler : (
      value : ReturnType<Input> extends Map<any, infer V> ? V : never,
      key : ReturnType<Input> extends Map<infer K, any> ? K : never
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Object or Map.
   */
  forEach<
    Input extends (...args: any) => Object<>
  >(
    func : Input,
    handler : (
      value : ReturnType<Input> extends Object<PropertyKey, infer V> ? V : never,
      key : ReturnType<Input> extends Object<infer K, infer V> ? K : never
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Array.
   */
  forEach<
    Input extends Array<>
  >(
    array : Input,
    handler : (
      value : Input[number],
      key : string
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Set.
   */
  forEach<
    Input extends Set<>
  >(
    set : Input,
    handler : (value : Input extends Set<infer V> ? V : never, key : number) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Map.
   */
  forEach<
    Input extends Map<>,
    Key extends keyof Input
  >(
    map : Input,
    handler : (
      value : Input extends Map<any, infer V> ? V : never,
      key : Input extends Map<infer K, any> ? K : never
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the input Object.
   */
  forEach<
    Input extends Object<>,
    Key extends keyof Input
  >(
    object : Input,
    handler : (
      value : Input[Key],
      key : Key
    ) => boolean | any,
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the state,
   * when the state is an Array.
   */
  forState<
    Input extends Array<>
  >(
    array : Input,
    handler: Template | ((state: Input) => Template) | ((state: Input) => void),
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the state,
   * when the state is a Set.
   */
  forState<
    Input extends Set<>
  >(
    set : Input,
    handler: Template | ((state: Input) => Template) | ((state: Input) => void),
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the state,
   * when the state is a Map.
   */
  forState<
    Input extends Map<>,
    Key extends keyof Input
  >(
    map : Input,
    handler: Template | ((state: Input) => Template) | ((state: Input) => void),
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  /**
   * Calls a callback function for each element in the state,
   * when the state is an Object.
   */
  forState<
    Input extends Object<>,
    Key extends keyof Input
  >(
    object : Input,
    handler: Template | ((state: Input) => Template) | ((state: Input) => void),
    handlerOnEmpty?: () => void
  ) : HTMLElement[] | Error

  for(
    from : number | (() => number),
    to : number | (() => number),
    handler : (key: number) => boolean | any
  ) : HTMLElement[] | Error
}
