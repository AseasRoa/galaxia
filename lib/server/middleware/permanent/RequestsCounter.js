class RequestsCounter {
  /** @type {number} */
  #collectedCount = 0

  /** @type {number[]} */
  #collector = []

  /** @type {number} */
  #collectorLastUsedIndex = 0

  /**
   * @param {number} secondsPeriod Interval period in seconds
   */
  constructor(secondsPeriod) {
    this.#collector = new Array(secondsPeriod).fill(0)

    this.#startProcessingData()
  }

  /**
   * @returns {boolean}
   */
  addRequest() {
    this.#collectedCount += 1

    return true
  }

  /**
   * @returns {number}
   * The count of requests registered for the period of seconds
   */
  getCount() {
    let totalCount = 0

    for (const count of this.#collector) {
      totalCount += count
    }

    return totalCount
  }

  /**
   * @returns {void}
   */
  #startProcessingData() {
    setInterval(() => {
      let index = this.#collectorLastUsedIndex + 1

      if (index >= this.#collector.length) index = 0

      this.#collector[index] = this.#collectedCount
      this.#collectorLastUsedIndex = index
      this.#collectedCount = 0
    }, 1000)
  }
}

export { RequestsCounter }
export default RequestsCounter
