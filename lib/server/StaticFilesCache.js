/**
 * @typedef CacheRecord
 * @type {object}
 * @property {Date} mtime
 * @property {import('node:http').OutgoingHttpHeaders} headers
 * @property {Buffer|string} data
 * @property {number} size
 */

/**
 * The cache is one for all
 *
 * @type {Map<string, Map<string, CacheRecord>>}
 */
const CACHE = new Map()

class StaticFilesCache {
  /**
   * @param {string} index
   */
  clean(index) {
    CACHE.delete(index)
  }

  /**
   * @param {string} index
   * @param {string} compressionMethod
   * @param {Date} mtime
   * @returns {CacheRecord | undefined}
   */
  get(index, compressionMethod, mtime) {
    this.#deleteModifiedRecord(index, compressionMethod, mtime)

    return CACHE.get(index)?.get(compressionMethod)
  }

  /**
   * @param {string} index
   * @param {string} compressionMethod
   * @param {CacheRecord} record
   */
  set(index, compressionMethod, record) {
    if (!CACHE.has(index)) {
      CACHE.set(index, new Map())
    }

    CACHE.get(index)?.set(compressionMethod, record)
  }

  /**
   * @param {string} index
   * @param {string} compressionMethod
   * @param {Date} mtime
   * @returns {boolean}
   */
  #deleteModifiedRecord(index, compressionMethod, mtime) {
    let deleted = false

    if (
      CACHE
        .get(index)
        ?.get(compressionMethod)?.mtime
        .getTime() !== mtime.getTime()
    ) {
      CACHE.get(index)?.delete(compressionMethod)

      deleted = true
    }

    return deleted
  }
}

export { StaticFilesCache }
