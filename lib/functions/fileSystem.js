import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { dirname, join, parse } from 'node:path'
import json5 from 'json5'

/**
 * @see https://github.com/nodejs/node/issues/8987
 * @see https://github.com/libuv/libuv/pull/1088
 * @param {string} inputPath
 * @throws {Error} If the input path contains invalid characters
 */
function validatePath(inputPath) {
  if (process.platform === 'win32') {
    // Characters \ and / are also invalid for a file name,
    // but part of dir paths
    const pathHasForbiddenWinCharacters = /[:*?"<>|]/u.test(
      inputPath.replace(parse(inputPath).root, '')
    )

    if (pathHasForbiddenWinCharacters) {
      const error = new Error(`Path contains forbidden characters: ${inputPath}`)

      // @ts-expect-error
      error.code = 'EINVAL'

      throw error
    }
  }
}

/** @type {import('./fileSystem.d.ts').emptyDir} */
export async function emptyDir(...dir) {
  const path = join(...dir)
  const items = await fsp.readdir(path)

  for (const item of items) {
    await fsp.rm(join(path, item), { recursive: true })
  }
}

/** @type {import('./fileSystem.d.ts').emptyDirSync} */
export function emptyDirSync(...dir) {
  const path = join(...dir)
  const items = fs.readdirSync(path)

  for (const item of items) {
    fs.rmSync(join(path, item), { recursive: true })
  }
}

/** @type {import('./fileSystem.d.ts').ensureFile} */
export async function ensureFile(...file) {
  const path = join(...file)

  if (!(await fileExists(path))) {
    await writeFile(path, '')
  }
}

/** @type {import('./fileSystem.d.ts').ensureFileSync} */
export function ensureFileSync(...file) {
  const path = join(...file)

  if (!fileExistsSync(path)) {
    writeFileSync(path, '')
  }
}

/** @type {import('./fileSystem.d.ts').ensureDir} */
export async function ensureDir(...dir) {
  const path = join(...dir)

  validatePath(path)
  await fsp.mkdir(path, { recursive: true, mode: 0o777 })
}

/** @type {import('./fileSystem.d.ts').ensureDirSync} */
export function ensureDirSync(...dir) {
  const path = join(...dir)

  validatePath(path)
  fs.mkdirSync(path, { recursive: true, mode: 0o777 })
}

/** @type {import('./fileSystem.d.ts').dirExists} */
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

/** @type {import('./fileSystem.d.ts').dirExistsSync} */
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

/** @type {import('./fileSystem.d.ts').fileExists} */
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

/** @type {import('./fileSystem.d.ts').fileExistsSync} */
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

/** @type {import('./fileSystem.d.ts').dirMtimeDeep} */
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

/** @type {import('./fileSystem.d.ts').dirMtimeDeepSync} */
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

/** @type {import('./fileSystem.d.ts').dirStats} */
export async function dirStats(...dir) {
  const path = join(...dir)
  const stat = await fsp.stat(path)

  if (!stat.isDirectory()) {
    throw new Error(`The requested path (${path}) is not a directory.`)
  }

  return stat
}

/** @type {import('./fileSystem.d.ts').dirStatsSync} */
export function dirStatsSync(...dir) {
  const path = join(...dir)
  const stat = fs.statSync(path)

  if (!stat.isDirectory()) {
    throw new Error(`The requested path (${path}) is not a directory.`)
  }

  return stat
}

/** @type {import('./fileSystem.d.ts').fileSize} */
export async function fileSize(...file) {
  const path = join(...file)
  const stat = await fsp.stat(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat.size
}

/** @type {import('./fileSystem.d.ts').fileSizeSync} */
export function fileSizeSync(...file) {
  const path = join(...file)
  const stat = fs.statSync(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat.size
}

/** @type {import('./fileSystem.d.ts').fileStats} */
export async function fileStats(...file) {
  const path = join(...file)
  const stat = await fsp.stat(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat
}

/** @type {import('./fileSystem.d.ts').fileStatsSync} */
export function fileStatsSync(...file) {
  const path = join(...file)
  const stat = fs.statSync(path)

  if (!stat.isFile()) {
    throw new Error(`The requested path (${path}) is not a file.`)
  }

  return stat
}

/** @type {import('./fileSystem.d.ts').isDir} */
export async function isDir(...path) {
  try {
    const stat = await fsp.stat(join(...path))

    return stat.isDirectory()
  }
  catch (e) {
    return false
  }
}

/** @type {import('./fileSystem.d.ts').isDirSync} */
export function isDirSync(...path) {
  try {
    const stat = fs.statSync(join(...path))

    return stat.isDirectory()
  }
  catch (e) {
    return false
  }
}

/** @type {import('./fileSystem.d.ts').isFile} */
export async function isFile(...path) {
  try {
    const stat = await fsp.stat(join(...path))

    return stat.isFile()
  }
  catch (e) {
    return false
  }
}

/** @type {import('./fileSystem.d.ts').isFileSync} */
export function isFileSync(...path) {
  try {
    const stat = fs.statSync(join(...path))

    return stat.isFile()
  }
  catch (e) {
    return false
  }
}

/** @type {import('./fileSystem.d.ts').isDirEmpty} */
export async function isDirEmpty(...dir) {
  const path = join(...dir)
  const stat = await fsp.stat(path)

  if (!stat.isDirectory()) {
    throw new Error('Not a directory')
  }

  const items = await fsp.readdir(path)

  return items.length === 0
}

/** @type {import('./fileSystem.d.ts').isDirEmptySync} */
export function isDirEmptySync(...dir) {
  const path = join(...dir)
  const stat = fs.statSync(path)

  if (!stat.isDirectory()) {
    throw new Error('Not a directory')
  }

  const items = fs.readdirSync(path)

  return items.length === 0
}

/** @type {import('./fileSystem.d.ts').readDir} */
export async function readDir(...dir) {
  const path = join(...dir)
  const contents = await fsp.readdir(path)

  return contents
}

/** @type {import('./fileSystem.d.ts').readDirSync} */
export function readDirSync(...dir) {
  const path = join(...dir)
  const contents = fs.readdirSync(path)

  return contents
}

/** @type {import('./fileSystem.d.ts').readFile} */
export function readFile(file, options) {
  // @ts-expect-error
  return fsp.readFile(file, options)
}

/** @type {import('./fileSystem.d.ts').readFileSync} */
export function readFileSync(file, options) {
  // @ts-expect-error
  return fs.readFileSync(file, options)
}

/** @type {import('./fileSystem.d.ts').readJson} */
export async function readJson(file, options) {
  // @ts-expect-error
  const contents = await fsp.readFile(file, options)

  return JSON.parse(contents)
}

/** @type {import('./fileSystem.d.ts').readJsonSync} */
export function readJsonSync(file, options) {
  // @ts-expect-error
  const contents = fs.readFileSync(file, options)

  return JSON.parse(contents)
}

/** @type {import('./fileSystem.d.ts').readJson5} */
export async function readJson5(file, options) {
  // @ts-expect-error
  const contents = await fsp.readFile(file, options)

  return json5.parse(contents)
}

/** @type {import('./fileSystem.d.ts').readJson5Sync} */
export function readJson5Sync(file, options) {
  // @ts-expect-error
  const contents = fs.readFileSync(file, options)

  return json5.parse(contents)
}

/** @type {import('./fileSystem.d.ts').remove} */
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

/** @type {import('./fileSystem.d.ts').removeSync} */
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

/** @type {import('./fileSystem.d.ts').deleteDir} */
export function deleteDir(...path) {
  return remove(...path)
}

/** @type {import('./fileSystem.d.ts').deleteDirSync} */
export function deleteDirSync(...path) {
  removeSync(...path)
}

/** @type {import('./fileSystem.d.ts').deleteFile} */
export function deleteFile(...path) {
  return remove(...path)
}

/** @type {import('./fileSystem.d.ts').deleteFileSync} */
export function deleteFileSync(...path) {
  removeSync(...path)
}

/** @type {import('./fileSystem.d.ts').writeFile} */
export async function writeFile(file, data) {
  validatePath(file)
  await ensureDir(dirname(file))
  await fsp.writeFile(file, data)
}

/** @type {import('./fileSystem.d.ts').writeFileSync} */
export function writeFileSync(file, data) {
  validatePath(file)
  ensureDirSync(dirname(file))
  fs.writeFileSync(file, data)
}

/** @type {import('./fileSystem.d.ts').writeJson} */
export async function writeJson(file, data, options) {
  const json = JSON.stringify(
    data,
    options?.replacer,
    options?.spaces
  )

  await writeFile(file, json)
}

/** @type {import('./fileSystem.d.ts').writeJsonSync} */
export function writeJsonSync(file, data, options) {
  const json = JSON.stringify(
    data,
    options?.replacer,
    options?.spaces
  )

  writeFileSync(file, json)
}

/** @type {import('./fileSystem.d.ts').writeJson5} */
export async function writeJson5(file, data) {
  const json = json5.stringify(data)

  await writeFile(file, json)
}

/** @type {import('./fileSystem.d.ts').writeJson5Sync} */
export function writeJson5Sync(file, data) {
  const json = json5.stringify(data)

  writeFileSync(file, json)
}

/** @type {import('./fileSystem.d.ts').setTimes} */
export function setTimes(path, timeAccessed, timeModified) {
  return fsp.utimes(path, timeAccessed, timeModified)
}

/** @type {import('./fileSystem.d.ts').setTimesSync} */
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
