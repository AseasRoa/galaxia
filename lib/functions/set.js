/**
 * @template T
 * @param {Set<T>} set
 * @param {number} index
 * @returns {T | undefined}
 */
export function setGetValueByIndex(set, index) {
  let i = -1

  for (const item of set) {
    i += 1

    if (i === index) {
      return item
    }
  }

  return undefined
}

/**
 * @param {Set<string>} set
 * @param {string} [separator]
 * @returns {string}
 */
export function setJoin(set, separator = '') {
  return Array.from(set).join(separator)
}
