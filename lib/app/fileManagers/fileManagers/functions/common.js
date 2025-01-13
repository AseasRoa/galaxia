import {
  dirMtimeDeep,
  fileStats,
  isDir,
  isFile
} from '../../../../functions/fileSystem.js'

/**
 * If the path is an existing dir or a file, return its UTC time
 * in milliseconds. Otherwise, return 0,
 *
 * @param {string} path
 * @returns {Promise<number>}
 */
export async function getPathMtime(path) {
  if (await isFile(path)) {
    return (await fileStats(path)).mtimeMs
  }

  if (await isDir(path)) {
    return (await dirMtimeDeep(path)).getTime()
  }

  return 0
}
