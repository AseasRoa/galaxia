class RequestsCounter {
  /** @type {number} */
  #accumulatingCount = 0

  /** @type {number[]} */
  #accumulator = []

  /** @type {number} */
  #accumulatorLastUsedIndex = 0

  /**
   * @param {number} secondsPeriod Interval period in seconds
   */
  constructor(secondsPeriod) {
    this.#accumulator = new Array(secondsPeriod).fill(0)

    this.#startProcessingData()
  }

  /**
   * @returns {void}
   */
  addRequest() {
    this.#accumulatingCount += 1
  }

  /**
   * @returns {number}
   * The count of requests registered for the period of seconds
   */
  getCount() {
    let totalCount = 0

    for (const count of this.#accumulator) {
      totalCount += count
    }

    return totalCount
  }

  /**
   * @returns {void}
   */
  #startProcessingData() {
    setInterval(() => {
      let index = this.#accumulatorLastUsedIndex + 1

      if (index >= this.#accumulator.length) index = 0

      this.#accumulator[index] = this.#accumulatingCount
      this.#accumulatorLastUsedIndex = index
      this.#accumulatingCount = 0
    }, 1000)
  }
}

export { RequestsCounter }
