/**
 * An Array, used to create printf-like format string
 *
 * @see https://nodejs.org/api/util.html#utilformatformat-args
 */
export type FormatArray = (
  [string, ...Array<string|number|BigInt|Array<any>|Record<any, any>>]
)

export type Bindable<T> =
  T extends string
    // Note: FormatArray<T> somehow makes the callback to work
    // @ts-expect-error
    ? (T | FormatArray<T> | ((element: HTMLElement) => T))
    : (T | ((element: HTMLElement) => T))
export type Reactive<T> = T | (() => T)

/**
 * Types that can be turned into string when displaying string in HTML elements
 */
export type StringConvertible = (
  string|number|BigInt|undefined|null|FormatArray
)

type Child = (
  Error
  | HTMLElement
  | HTMLElement[]
  | Template
  | Reactive<StringConvertible>
  // The result of calling a function like this: (x) => void
  | void
  )
type Children = Child[]

type SVGChild = (
  Error
  | SVGElement
  | SVGElement[]
  | Template
  // The result of calling a function like this: (x) => void
  | void
  )
export type SVGChildren = SVGChild[]
