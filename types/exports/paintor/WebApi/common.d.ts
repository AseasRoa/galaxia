// Combine the type with a function that returns the same type
export type Combo<T> = T | { (element:HTMLElement & Node): T }

export type EventsCombo<T> = T | { (event:Event): T }
