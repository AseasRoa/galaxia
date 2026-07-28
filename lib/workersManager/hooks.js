import { readFileSync } from 'node:fs'

/** @type { import('node:module').LoadHookSync } */
export function load(url, context, nextLoad) {
  if (url.endsWith('.css')) {
    const content = readFileSync(new URL(url))

    return {
      format: 'module',
      source: `export default ${JSON.stringify(content.toString())}`,
      shortCircuit: true
    }
  }

  return nextLoad(url, context)
}
