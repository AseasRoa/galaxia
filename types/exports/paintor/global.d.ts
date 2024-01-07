/**
 * This file makes some of the types global (ambient),
 * so they can be used in the current module.
 *
 * @see https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules
 */

type Component = import('./types').Component
type State = import('./types').State
type States = import('./types').States
type Template = import('./types').Template
type TemplateTree = import('./types').TemplateTree
type Translation = import('./types').Translation
