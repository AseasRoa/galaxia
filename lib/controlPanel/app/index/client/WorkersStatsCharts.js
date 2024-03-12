import { Chart, registerables } from 'chart.js'
import { WorkerStatsChart } from './WorkerStatsChart.js'

Chart.register(...registerables)

class WorkersStatsCharts {
  /**
   * @type {Map<string, WorkerStatsChart>}
   */
  #charts = new Map()

  /**
   * @param {string} containerId
   * @param {string} chartId
   * @returns {WorkerStatsChart}
   * @throws
   */
  ensureChart(containerId, chartId) {
    const container = document.getElementById(containerId)

    if (!container) {
      throw new Error(`Container "#${containerId}" doesn't exist.`)
    }

    const chart = this.#charts.get(chartId)
      ?? new WorkerStatsChart(container, chartId)

    this.#charts.set(chartId, chart)

    return chart
  }
}

export { WorkersStatsCharts }
