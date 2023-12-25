import json5 from 'json5'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { dirname, join, parse } from 'node:path'

/**
 * @typedef {import('fs').Stats} FileSystemStats
 */

/**
 * @typedef ReadFileOptions
 * @type {object}
 * @property {null | string} [encoding]
 * @property {string} [flag]
 * @property {AbortSignal} [abortSignal]
 */

/**
 * @typedef WriteJsonOptions
 * @type {object}
 * @property {(this: any, key: string, value: any) => any} [replacer]
 * @property {string | number} [spaces]
 */

/**
 * @see https://github.com/nodejs/node/issues/8987
 * @see https://github.com/libuv/libuv/pull/1088
 * @param {string} inputPath
 * @throws {Error} If the input path contains invalid characters
 */
function validatePath(inputPath) {
  if (process.platform === 'win32') {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/u.test(
      inputPath.replace(parse(inputPath).root, '')
    )

    if (pathHasInvalidWinCharacters) {
      const error = new Error(`Path contains invalid characters: ${inputPath}`)

      // @ts-ignore
      error.code = 'EINVAL'

      throw error
    }
  }
}

/**
 * @param {...string} dir
 * @throws {Error}
 */
export async function emptyDir(...dir) {
  const path = join(...dir)
  const items = await fsp.readdir(path)

  for (const item of items) {
    await fsp.rm(join(path, item), { recursive: true })
  }
}

/**
 * @param {...string} dir
 * @throws {Error}
 */
export function emptyDirSync(...dir) {
  const path = join(...dir)
  const items = fs.readdirSync(path)

  for (const item of items) {
    fs.rmSync(join(path, item), { recursive: true })
  }
}

/**
 * @param {...string} file
 * @throws {Error}
 */
export async function ensureFile(...file) {
  const path = join(...file)

  if (!(await fileExists(path))) {
    await writeFile(path, '')
  }
}

/**
 * @param {...string} file
 * @throws {Error}
 */
export function ensureFileSync(...file) {
  const path = join(...file)

  if (!fileExistsSync(path)) {
    writeFileSync(path, '')
  }
}

/**
 * Ensures that the directory exists. If the directory structure
 * does not exist, it is created.
 *
 * @param {...string} dir The directory path that must be created
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function ensureDir(...dir) {
  const path = join(...dir)

  validatePath(path)
  await fsp.mkdir(path, { recursive: true, mode: 0o777 })
}

/**
 * Ensures that the directory exists. If the directory structure
 * does not exist, it is created.
 *
 * @param {...string} dir The directory path that must be created
 * @throws {Error}
 */
export function ensureDirSync(...dir) {
  const path = join(...dir)

  validatePath(path)
  fs.mkdirSync(path, { recursive: true, mode: 0o777 })
}

/**
 * @param {...string} dir
 * @returns {Promise<boolean>}
 */
export async function dirExists(...dir) {
  const path = join(...dir)

  try {
    const stat = await fsp.stat(path)

    return stat.isDirectory()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} dir
 * @returns {boolean}
 */
export function dirExistsSync(...dir) {
  const path = join(...dir)

  try {
    const stat = fs.statSync(path)

    return stat.isDirectory()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} file
 * @returns {Promise<boolean>}
 */
export async function fileExists(...file) {
  const path = join(...file)

  try {
    const stat = await fsp.stat(path)

    return stat.isFile()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} file
 * @returns {boolean}
 */
export function fileExistsSync(...file) {
  const path = join(...file)

  try {
    const stat = fs.statSync(path)

    return stat.isFile()
  }
  catch (e) {
    return false
  }
}

/**
 * Get the time of the newly modified file in a directory
 * or any of its subdirectories
 *
 * @param {...string} dir
 * @returns {Promise<Date>}
 * @throws {Error} If the directory doesn't exist
 */
export async function dirMtimeDeep(...dir) {
  const path = join(...dir)
  let result = new Date(0)

  // get files from the current directory
  const list = await fsp.readdir(path)

  if (list.length === 0) {
    // directory is empty, get its mtime
    const stat = await fsp.stat(path)

    result = stat.mtime
  }
  else {
    // recursively check all files
    for (const name of list) {
      const dirOrFile = join(path, name)
      const stat = await fsp.stat(dirOrFile)
      const mtime = (stat.isDirectory())
        ? await dirMtimeDeep(dirOrFile)
        : stat.mtime

      if (mtime.getTime() > result.getTime()) {
        result = mtime
      }
    }
  }

  return result
}

/**
 * Get the time of the newly modified file in a directory
 * or any of its subdirectories
 *
 * @param {...string} dir
 * @returns {Date}
 * @throws {Error} If the directory doesn't exist
 */
export function dirMtimeDeepSync(...dir) {
  const path = join(...dir)
  let result = new Date(0)

  // get files from the current directory
  const list = fs.readdirSync(path)

  if (list.length === 0) {
    // directory is empty, get its mtime
    const stat = fs.statSync(path)

    result = stat.mtime
  }
  else {
    // recursively check all files
    for (const name of list) {
      const dirOrFile = join(path, name)
      const stat = fs.statSync(dirOrFile)
      const mtime = (stat.isDirectory())
        ? dirMtimeDeepSync(dirOrFile)
        : stat.mtime

      if (mtime.getTime() > result.getTime()) {
        result = mtime
      }
    }
  }

  return result
}

/**
 * @param {...string} dir
 * @returns {Promise<FileSystemStats>}
 * @throws {Error} If the path is not a file
 */
export async function dirStats(...dir) {
  const path = join(...dir)
  const stat = await fsp.stat(path)

  if (!stat.isDirectory()) {
    throw new Error(`The requested path (${path}) is not a directory.`)
  }

  return stat
}

/**
 * @param {...string} dir
 * @returns {FileSystemStats}
 * @throws {Error} If the path is not a file
 */
export function dirStatsSync(...dir) {
  const path = join(...dir)
  const stat = fs.statSync(path)

  if (!stat.isDirectory()) {
    throw new Error(`The requested path (${path}) is not a directory.`)
  }

  return stat
}

/**
 * Get size of a file
 *
 * @param {...string} file
 * @returns {Promise<number>}
 * @throws {Error} If the path is not a file
 */
export async function fileSize(...file) {
  const path = join(...file)
  const stat = await fsp.stat(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat.size
}

/**
 * Get size of a file
 *
 * @param {...string} file
 * @returns {number}
 * @throws {Error} If the path is not a file
 */
export function fileSizeSync(...file) {
  const path = join(...file)
  const stat = fs.statSync(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat.size
}

/**
 * @param {...string} file
 * @returns {Promise<FileSystemStats>}
 * @throws {Error} If the path is not a file
 */
export async function fileStats(...file) {
  const path = join(...file)
  const stat = await fsp.stat(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat
}

/**
 * @param {...string} file
 * @returns {FileSystemStats}
 * @throws {Error} If the path is not a file
 */
export function fileStatsSync(...file) {
  const path = join(...file)
  const stat = fs.statSync(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat
}

/**
 * @param {...string} path
 * @returns {Promise<boolean>}
 */
export async function isDir(...path) {
  try {
    const stat = await fsp.stat(join(...path))

    return stat.isDirectory()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} path
 * @returns {boolean}
 */
export function isDirSync(...path) {
  try {
    const stat = fs.statSync(join(...path))

    return stat.isDirectory()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} path
 * @returns {Promise<boolean>}
 */
export async function isFile(...path) {
  try {
    const stat = await fsp.stat(join(...path))

    return stat.isFile()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} path
 * @returns {boolean}
 */
export function isFileSync(...path) {
  try {
    const stat = fs.statSync(join(...path))

    return stat.isFile()
  }
  catch (e) {
    return false
  }
}

/**
 * @param {...string} dir
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
export async function isDirEmpty(...dir) {
  const path = join(...dir)
  const stat = await fsp.stat(path)

  if (!stat.isDirectory()) {
    throw new Error('Not a directory')
  }

  const items = await fsp.readdir(path)

  return items.length === 0
}

/**
 * @param {...string} dir
 * @returns {boolean}
 * @throws {Error}
 */
export function isDirEmptySync(...dir) {
  const path = join(...dir)
  const stat = fs.statSync(path)

  if (!stat.isDirectory()) {
    throw new Error('Not a directory')
  }

  const items = fs.readdirSync(path)

  return items.length === 0
}

/**
 * @param {...string} dir
 * @returns {Promise<string[]>}
 * @throws {Error}
 */
export async function readDir(...dir) {
  const path = join(...dir)
  const contents = await fsp.readdir(path)

  return contents
}

/**
 * @param {...string} dir
 * @returns {string[]}
 * @throws {Error}
 */
export function readDirSync(...dir) {
  const path = join(...dir)
  const contents = fs.readdirSync(path)

  return contents
}

/**
 * @param {string} file
 * @param {ReadFileOptions} [options]
 * @returns {Promise<Buffer | string>}
 * @throws {Error}
 */
export async function readFile(file, options) {
  // @ts-ignore
  return fsp.readFile(file, options)
}

/**
 * @param {string} file
 * @param {ReadFileOptions} [options]
 * @returns {Buffer | string}
 * @throws {Error}
 */
export function readFileSync(file, options) {
  // @ts-ignore
  return fs.readFileSync(file, options)
}

/**
 * @param {string} file
 * @param {ReadFileOptions} [options]
 * @returns {Promise<*>}
 * @throws {Error}
 */
export async function readJson(file, options) {
  // @ts-ignore
  const contents = await fsp.readFile(file, options)

  return JSON.parse(contents)
}

/**
 * @param {string} file
 * @param {ReadFileOptions} [options]
 * @returns {*}
 * @throws {Error}
 */
export function readJsonSync(file, options) {
  // @ts-ignore
  const contents = fs.readFileSync(file, options)

  return JSON.parse(contents)
}

/**
 * @param {string} file
 * @param {ReadFileOptions} [options]
 * @returns {Promise<*>}
 * @throws {Error}
 */
export async function readJson5(file, options) {
  // @ts-ignore
  const contents = await fsp.readFile(file, options)

  return json5.parse(contents)
}

/**
 * @param {string} file
 * @param {ReadFileOptions} [options]
 * @returns {*}
 * @throws {Error}
 */
export function readJson5Sync(file, options) {
  // @ts-ignore
  const contents = fs.readFileSync(file, options)

  return json5.parse(contents)
}

/**
 * @param {...string} path
 * @throws {Error}
 */
export async function remove(...path) {
  const dirOrFile = join(...path)

  // Remove a directory
  if (await isDir(dirOrFile)) {
    await emptyDir(dirOrFile)
    await fsp.rmdir(dirOrFile)

    return
  }

  // Remove a file
  await fsp.rm(dirOrFile, { force: true })
}

/**
 * @param {...string} path
 * @throws {Error}
 */
export async function deleteDir(...path) {
  return remove(...path)
}

/**
 * @param {...string} path
 * @throws {Error}
 */
export async function deleteFile(...path) {
  return remove(...path)
}

/**
 * @param {...string} path
 * @throws {Error}
 */
export function removeSync(...path) {
  const dirOrFile = join(...path)

  // Remove a directory
  if (isDirSync(dirOrFile)) {
    emptyDirSync(dirOrFile)
    fs.rmdirSync(dirOrFile)
  }
  else {
    // Remove a file
    fs.rmSync(dirOrFile, { force: true })
  }
}

/**
 * @param {...string} path
 * @throws {Error}
 */
export function deleteDirSync(...path) {
  removeSync(...path)
}

/**
 * @param {...string} path
 * @throws {Error}
 */
export function deleteFileSync(...path) {
  removeSync(...path)
}

/**
 * @param {string} file
 * @param {string} data
 * @throws {Error}
 */
export async function writeFile(file, data) {
  validatePath(file)
  await ensureDir(dirname(file))
  await fsp.writeFile(file, data)
}

/**
 * @param {string} file
 * @param {string} data
 * @throws {Error}
 */
export function writeFileSync(file, data) {
  validatePath(file)
  ensureDirSync(dirname(file))
  fs.writeFileSync(file, data)
}

/**
 * @param {string} file
 * @param {*} data
 * @param {WriteJsonOptions} [options]
 * @throws {Error}
 */
export async function writeJson(file, data, options) {
  const json = JSON.stringify(
    data,
    options?.replacer,
    options?.spaces
  )

  await writeFile(file, json)
}

/**
 * @param {string} file
 * @param {*} data
 * @param {WriteJsonOptions} [options]
 * @throws {Error}
 */
export function writeJsonSync(file, data, options) {
  const json = JSON.stringify(
    data,
    options?.replacer,
    options?.spaces
  )

  writeFileSync(file, json)
}

/**
 * @param {string} file
 * @param {*} data
 * @throws {Error}
 */
export async function writeJson5(file, data) {
  const json = json5.stringify(data)

  await writeFile(file, json)
}

/**
 * @param {string} file
 * @param {*} data
 * @throws {Error}
 */
export function writeJson5Sync(file, data) {
  const json = json5.stringify(data)

  writeFileSync(file, json)
}

/**
 * Change the file system timestamps of the object referenced by path.
 * - Values can be either numbers representing Unix epoch time in seconds,
 * Dates, or a numeric string like '123456789.0'.
 * - If the value can not be converted to a number, or is NaN, Infinity,
 * or -Infinity, an Error will be thrown.
 *
 * @param {string} path
 * @param {number | string | Date} timeAccessed
 * @param {number | string | Date} timeModified
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function setTimes(path, timeAccessed, timeModified) {
  return fsp.utimes(path, timeAccessed, timeModified)
}

/**
 * Change the file system timestamps of the object referenced by path.
 * - Values can be either numbers representing Unix epoch time in seconds,
 * Dates, or a numeric string like '123456789.0'.
 * - If the value can not be converted to a number, or is NaN, Infinity,
 * or -Infinity, an Error will be thrown.
 *
 * @param {string} path
 * @param {number | string | Date} timeAccessed
 * @param {number | string | Date} timeModified
 * @returns {void}
 * @throws {Error}
 */
export function setTimesSync(path, timeAccessed, timeModified) {
  fs.utimesSync(path, timeAccessed, timeModified)
}

export default {
  dirExists,
  dirExistsSync,
  emptyDir,
  emptyDirSync,
  ensureDir,
  ensureDirSync,
  ensureFile,
  ensureFileSync,
  fileExists,
  fileExistsSync,
  dirMtimeDeep,
  dirMtimeDeepSync,
  dirStats,
  dirStatsSync,
  fileSize,
  fileSizeSync,
  fileStats,
  fileStatsSync,
  isDir,
  isDirSync,
  isFile,
  isFileSync,
  isDirEmpty,
  isDirEmptySync,
  readDir,
  readDirSync,
  readFile,
  readFileSync,
  readJson,
  readJsonSync,
  readJson5,
  readJson5Sync,
  remove,
  deleteDir,
  deleteFile,
  removeSync,
  deleteDirSync,
  deleteFileSync,
  writeJson,
  writeJsonSync,
  writeJson5,
  writeJson5Sync,
  writeFile,
  writeFileSync,
  setTimes,
  setTimesSync
}
