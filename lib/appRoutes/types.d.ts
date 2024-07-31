type ClassElement = {
  name: string,
  isPrivate: boolean,
  isPublic: boolean,
  modifiers: number[]
}

type ExportData = {
  isDefault: boolean,
  exportKind: symbol,
  name: string,
  classElements: {
    name: string,
    fields: ClassElement[],
    methods: ClassElement[],
    modifiers: import('typescript').SyntaxKind[]
  } | null,
  exportObjectLiteralElements?: string[]
}
