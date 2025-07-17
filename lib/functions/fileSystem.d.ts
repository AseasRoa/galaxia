type Buffer = import('node:buffer').Buffer
type FileSystemStats = import('node:fs').Stats
type ReadFileOptions = {
  encoding?: null | string,
  flag?: string,
  abortSignal?: AbortSignal
}
type WriteJsonOptions = {
  replacer?: (this: any, key: string, value: any) => any,
  spaces?: string | number,
}

/**
 * @param dir
 * @throws {Error}
 */
export function emptyDir(...dir: string[]): Promise<void>
/**
 * @param dir
 * @throws {Error}
 */
export function emptyDirSync(...dir: string[]): void

/**
 * @param file
 * @throws {Error}
 */
export function ensureFile(...file: string[]): Promise<void>
/**
 * @param file
 * @throws {Error}
 */
export function ensureFileSync(...file: string[]): void

/**
 * Ensures that the directory exists. If the directory structure
 * does not exist, it is created.
 *
 * @param dir The directory path that must be created
 * @throws {Error}
 */
export function ensureDir(...dir: string[]): Promise<void>
/**
 * Ensures that the directory exists. If the directory structure
 * does not exist, it is created.
 *
 * @param dir The directory path that must be created
 * @throws {Error}
 */
export function ensureDirSync(...dir: string[]): void

/**
 * @param dir
 */
export function dirExists(...dir: string[]): Promise<boolean>
/**
 * @param dir
 */
export function dirExistsSync(...dir: string[]): boolean

export function fileExists(...file: string[]): Promise<boolean>
export function fileExistsSync(...file: string[]): boolean

/**
 * Get the time of the newly modified file in a directory
 * or any of its subdirectories
 * @param dir
 * @throws {Error} If the directory doesn't exist
 */
export function dirMtimeDeep(...dir: string[]): Promise<Date>
/**
 * Get the time of the newly modified file in a directory
 * or any of its subdirectories
 * @param dir
 * @throws {Error} If the directory doesn't exist
 */
export function dirMtimeDeepSync(...dir: string[]): Date

/**
 * @param dir
 * @throws {Error} If the path is not a file
 */
export function dirStats(...dir: string[]): Promise<FileSystemStats>
/**
 * @param dir
 * @throws {Error} If the path is not a file
 */
export function dirStatsSync(...dir: string[]): FileSystemStats

/**
 * Get size of a file
 *
 * @param file
 * @throws {Error} If the path is not a file
 */
export function fileSize(...file: string[]): Promise<number>
/**
 * Get size of a file
 *
 * @param file
 * @throws {Error} If the path is not a file
 */
export function fileSizeSync(...file: string[]): number

/**
 * @param file
 * @throws {Error} If the path is not a file
 */
export function fileStats(...file: string[]): Promise<FileSystemStats>
/**
 * @param file
 * @throws {Error} If the path is not a file
 */
export function fileStatsSync(...file: string[]): FileSystemStats

export function isDir(...path: string[]): Promise<boolean>
export function isDirSync(...path: string[]): boolean

export function isFile(...path: string[]): Promise<boolean>
export function isFileSync(...path: string[]): boolean

/**
 * @param dir
 * @throws {Error}
 */
export function isDirEmpty(...dir: string[]): Promise<boolean>
/**
 * @param dir
 * @throws {Error}
 */
export function isDirEmptySync(...dir: string[]): boolean

/**
 * @param dir
 * @throws {Error}
 */
export function readDir(...dir: string[]): Promise<string[]>
/**
 * @param dir
 * @throws {Error}
 */
export function readDirSync(...dir: string[]): string[]

/**
 *
 * @param file
 * @param [options]
 * @throws {Error}
 */
export function readFile(
  file: string,
  options?: ReadFileOptions,
): Promise<Buffer | string>
/**
 *
 * @param file
 * @param [options]
 * @throws {Error}
 */
export function readFileSync(
  file: string,
  options?: ReadFileOptions,
): Buffer | string

/**
 * @param file
 * @param [options]
 * @throws {Error}
 */
export function readJson(
  file: string,
  options?: ReadFileOptions,
): Promise<any>
/**
 * @param file
 * @param [options]
 * @throws {Error}
 */
export function readJsonSync(
  file: string,
  options?: ReadFileOptions,
): any

/**
 * @param file
 * @param [options]
 * @throws {Error}
 */
export function readJson5(
  file: string,
  options?: ReadFileOptions,
): Promise<any>
/**
 * @param file
 * @param [options]
 * @throws {Error}
 */
export function readJson5Sync(
  file: string,
  options?: ReadFileOptions,
): any

/**
 * @param path
 * @throws {Error}
 */
export function remove(...path: string[]): Promise<void>
/**
 * @param path
 * @throws {Error}
 */
export function removeSync(...path: string[]): void

/**
 * @param path
 * @throws {Error}
 */
export function deleteDir(...path: string[]): Promise<void>
/**
 * @param path
 * @throws {Error}
 */
export function deleteDirSync(...path: string[]): void

/**
 * @param path
 * @throws {Error}
 */
export function deleteFile(...path: string[]): Promise<void>
/**
 * @param path
 * @throws {Error}
 */
export function deleteFileSync(...path: string[]): void

/**
 * @param file
 * @param data
 * @throws {Error}
 */
export function writeFile(file: string, data: string): Promise<void>
/**
 * @param file
 * @param data
 * @throws {Error}
 */
export function writeFileSync(file: string, data: string): void

/**
 * @param file
 * @param data
 * @param [options]
 * @throws {Error}
 */
export function writeJson(
  file: string,
  data: string,
  options?: WriteJsonOptions
): Promise<void>
/**
 * @param file
 * @param data
 * @param [options]
 * @throws {Error}
 */
export function writeJsonSync(
  file: string,
  data: string,
  options?: WriteJsonOptions
): void

/**
 * @param file
 * @param data
 * @throws {Error}
 */
export function writeJson5(file: string, data: string): Promise<void>
/**
 * @param file
 * @param data
 * @throws {Error}
 */
export function writeJson5Sync(file: string, data: string): void

/**
 * Change the file system timestamps of the object referenced by path.
 * - Values can be either numbers representing Unix epoch time in seconds,
 * Dates, or a numeric string like '123456789.0'.
 * - If the value can not be converted to a number, or is NaN, Infinity,
 * or -Infinity, an Error will be thrown.
 *
 * @param path
 * @param timeAccessed If number, it must be in seconds
 * @param timeModified If number, it must be in seconds
 * @throws {Error}
 */
export function setTimes(
  path: string,
  timeAccessed: number | string | Date,
  timeModified: number | string | Date,
): Promise<void>
/**
 * Change the file system timestamps of the object referenced by path.
 * - Values can be either numbers representing Unix epoch time in seconds,
 * Dates, or a numeric string like '123456789.0'.
 * - If the value can not be converted to a number, or is NaN, Infinity,
 * or -Infinity, an Error will be thrown.
 *
 * @param path
 * @param timeAccessed If number, it must be in seconds
 * @param timeModified If number, it must be in seconds
 * @throws {Error}
 */
export function setTimesSync(
  path: string,
  timeAccessed: number | string | Date,
  timeModified: number | string | Date,
): void
