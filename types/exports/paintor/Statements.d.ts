/**
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

import { Reactive } from './common'
import { Template } from './types'

export interface Statements {
  $if: {
    (
      condition: Reactive<boolean>,
      handler: Template,
      elseHandler?: Template,
    ): HTMLElement[]
  }

  $each: {
    /**
     * Calls the handler function for each element in the input Object or Map.
     */
    <
      Input extends (...args: any[]) => Array<any>
    >(
      func: Input,
      handler: (
        value: ReturnType<Input>[number],
        key: string
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
     * Calls the handler function for each element in the input Object or Map.
     */
    <
      Input extends (...args: any[]) => Set<any>
    >(
      func: Input,
      handler: (
        value: ReturnType<Input> extends Set<infer V> ? V : never,
        key: number
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
     * Calls the handler function for each element in the input Object or Map.
     */
      <
        Input extends (...args: any[]) => Map<any, any>
      >(
      func: Input,
      handler: (
        value: ReturnType<Input> extends Map<any, infer V> ? V : never,
        key: ReturnType<Input> extends Map<infer K, any> ? K : never
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
     * Calls the handler function for each element in the input Object or Map.
     */
      <
        Input extends (...args: any[]) => Record<keyof any, any>
      >(
      func: Input,
      handler: (
        value: ReturnType<Input> extends Record<PropertyKey, infer V> ? V : never,
        key: ReturnType<Input> extends Record<infer K, infer V> ? K : never
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
      * Calls the handler function for each element in the input Array.
      */
    <
      Input extends Array<any>
    >(
      array: Input,
      handler: (
        value: Input[number],
        key: string
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
      * Calls the handler function for each element in the input Set.
      */
    <
      Input extends Set<any>
    >(
      set: Input,
      handler: (
        value: Input extends Set<infer V> ? V : never,
        key: number
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
      * Calls the handler function for each element in the input Map.
      */
    <
      Input extends Map<any, any>,
      Key extends keyof Input
    >(
      map: Input,
      handler: (
        value: Input extends Map<any, infer V> ? V : never,
        key: Input extends Map<infer K, any> ? K : never
      ) => boolean | any,
      handlerOnEmpty?: () => void
    ): HTMLElement[] | Error

    /**
      * Calls the handler function for each element in the input Object.
      */
    <
      Input extends Record<keyof any, any>,
      Key extends keyof Input
    >(
      object: Input,
      handler: ((value: Input[Key], key: Key) => (boolean | any)),
      handlerOnEmpty?: () => void,
    ): (HTMLElement[]|Error)
  }

  $state: {
    /**
      * Calls the handler function initially, and then every time
      * the input state changes.
      */
    <Input extends Array<any>>(
      arrayState: Input,
      handler: ((state: Input) => (Template|void)),
      handlerOnEmpty?: () => void,
    ): (HTMLElement[]|Error)

    <Input extends Array<any>>(
      arrayState: Input,
      handler: Template,
      handlerOnEmpty?: () => void,
    ): (HTMLElement[]|Error)

    <Input extends Record<keyof any, any>>(
      objectState: Input,
      handler: ((state: Input) => (Template|void)),
      handlerOnEmpty?: () => void,
    ): (HTMLElement[]|Error)

    <Input extends Record<keyof any, any>>(
      objectState: Input,
      handler: Template,
      handlerOnEmpty?: () => void,
    ): (HTMLElement[]|Error)
  }

  /**
   * Run the handler repeatedly for each number between "from"
   * and "to", including "from" and "to".
   */
  $repeat(
    from: Reactive<number>,
    to: Reactive<number>,
    handler: (key: number) => boolean | any
  ): (HTMLElement[]|Error)

  $css(sheet: CSSStyleSheet | string | string[]): void

  $html(htmlString: string): HTMLElement[];

  $html(str: TemplateStringsArray, ...keys: any[]): HTMLElement[];
}
