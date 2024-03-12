import { Chart } from 'chart.js'

/**
 * @typedef ChartDataset
 * @type {import ('chart.js').ChartDataset}
 */

/**
 * @typedef NewDataItem
 * @type {object}
 * @property {string} label
 * @property {number} value
 */

/**
 * @typedef NewData
 * @type {NewDataItem[]}
 */

class WorkerStatsChart {
  /** @type {Chart} */
  #chart

  #chartId = ''

  /** @type {HTMLElement} */
  #container

  /**
   * @param {HTMLElement} container
   * @param {string} chartId
   * @throws An error if the container element doesn't exist
   */
  constructor(container, chartId) {
    if (!container) {
      throw new Error('You must specify a container.')
    }

    this.#container = container
    this.#chartId = chartId
    this.#chart = this.#createChart()
  }

  /**
   * @returns {Chart}
   * @throws
   */
  #createChart() {
    const canvas = document.createElement('canvas')

    canvas.width = 2
    canvas.height = 2
    canvas.dataset['id'] = this.#chartId

    this.#container.appendChild(canvas)

    const ctx = canvas.getContext('2d')

    if (ctx === null) {
      throw new Error('Could not create context')
    }

    return new Chart(ctx, {
      type: 'line',

      data: {
        datasets: [],
        labels: []
      },

      options: {
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },

        animation: false,
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: this.#chartId
          }
        },

        scales: {
          x: {
            beginAtZero: false
          },
          y: {
            stacked: false,
            beginAtZero: true
          }
        }
      }
    })
  }

  /**
   * @param {NewData} newData
   * @param {number} [dataCount]
   */
  #datasetsInit(newData, dataCount = 60) {
    const colors = [
      'rgb(0,0,255,0.3)',
      'rgb(255,0,0,0.3)',
      'rgb(0,255,0,0.3)',
      'rgb(255,0,255,0.3)'
    ]

    for (const value of newData) {
      const { label } = value
      let datasetExists = false

      let counter = 0

      for (const dataset of this.#chart.data.datasets) {
        dataset.borderColor = colors[counter] ?? ''
        dataset.backgroundColor = colors[counter] ?? ''

        counter += 1

        if (dataset.label === label) {
          datasetExists = true
        }
      }

      if (!datasetExists) {
        this.#chart.data.labels = []

        /** @type {ChartDataset} */
        const dataset = {
          data: [],
          fill: false,
          label: label
        }

        for (let i = dataCount; i >= 0; i--) {
          this.#chart.data.labels.push(i)
          dataset.data.push(0)
        }

        this.#chart.data.datasets.push(dataset)
      }
    }
  }

  /**
   * @param {NewData} newData
   */
  addData(newData) {
    const chart = this.#chart

    if (!chart) return

    const { data } = chart

    this.#datasetsInit(newData, 60)

    data.datasets = data.datasets.filter((dataset) => {
      let abandoned = true

      for (const value of newData) {
        if (value.label === dataset.label) {
          abandoned = false
        }
      }

      return !abandoned
    })

    for (const value of newData) {
      const workerId = value.label

      for (const dataset of data.datasets) {
        if (dataset.label === workerId) {
          dataset.data.shift()
          dataset.data.push(value.value)
        }
      }
    }

    chart.update()
  }
}

export { WorkerStatsChart }
