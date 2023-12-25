import { join } from 'node:path'
import { fileExists } from '../../functions/fileSystem.js'

/**
 * @param {string} dir
 * @param {string} indexFileName
 * @param {string[]} indexFileExtensions
 * @returns {Promise<string>}
 * The path to the index file on success, or an empty string on failure
 * @protected
 */
export async function findIndexFile(dir, indexFileName, indexFileExtensions) {
  let indexFile = ''

  for (const ext of indexFileExtensions) {
    const file = join(dir, `${indexFileName}${ext}`)

    if (await fileExists(file)) {
      indexFile = file

      break
    }
  }

  return indexFile
}
