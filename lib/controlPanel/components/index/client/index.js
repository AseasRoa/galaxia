import { component } from 'paintor'
import actions from '../routes/actions.js'
import { buttons, charts } from './templates/client.js'
import { WorkersStatsCharts } from './WorkersStatsCharts.js'

component(buttons, charts).paint('#container')

const workersStatsChart = new WorkersStatsCharts()

/**
 * @param {WorkerStats[]} workersStats
 */
function drawPerWorkerCharts(workersStats) {
  workersStats.forEach((stats) => {
    const chart = workersStatsChart.ensureChart(
      'memoryUsage',
      `Worker #${stats.workerId} (pid ${stats.workerPid}) Memory Usage`
    )

    chart.addData([
      { label: 'RSS', value: stats.memoryUsage.rss / 1024 },
      { label: 'Heap Total', value: stats.memoryUsage.heapTotal / 1024 },
      { label: 'Heap Used', value: stats.memoryUsage.heapUsed / 1024 },
      { label: 'External', value: stats.memoryUsage.external / 1024 },
      { label: 'Array Buffers', value: stats.memoryUsage.arrayBuffers / 1024 }
    ])
  })

  workersStats.forEach((stats) => {
    const chart = workersStatsChart.ensureChart(
      'serverConnections',
      `Worker #${stats.workerId} (pid ${stats.workerPid}) Server Connections`
    )

    chart.addData([
      { label: 'All Connections', value: stats.server.connectionsCount },
      { label: 'HTTP.1 Connections', value: stats.server.connectionsCountHttp1 },
      { label: 'HTTP.2 Connections', value: stats.server.connectionsCountHttp2 }
    ])
  })

  workersStats.forEach((stats) => {
    const chart = workersStatsChart.ensureChart(
      'serverRequestsPerMinute',
      `Worker #${stats.workerId} (pid ${stats.workerPid}) Requests Per Minute`
    )

    chart.addData([
      { label: 'Requests', value: stats.server.requestsCount }
    ])
  })
}

/**
 * @param {WorkerStats[]} workersStats
 */
function drawSummarizedCharts(workersStats) {
  /** @type {WorkerStats} */
  const summarizedStats = {
    workerId: 0,

    workerPid: 0,

    cpuUsage: { system: 0, user: 0 },

    memoryUsage: {
      arrayBuffers: 0,
      external: 0,
      heapTotal: 0,
      heapUsed: 0,
      rss: 0
    },

    server: {
      connectionsCount: 0,
      connectionsCountHttp1: 0,
      connectionsCountHttp2: 0,
      requestsCount: 0
    }
  }

  workersStats.forEach((stats) => {
    summarizedStats.cpuUsage.system += stats.cpuUsage.system
    summarizedStats.cpuUsage.user += stats.cpuUsage.user

    summarizedStats.memoryUsage.arrayBuffers += stats.memoryUsage.arrayBuffers
    summarizedStats.memoryUsage.external += stats.memoryUsage.external
    summarizedStats.memoryUsage.heapTotal += stats.memoryUsage.heapTotal
    summarizedStats.memoryUsage.heapUsed += stats.memoryUsage.heapUsed
    summarizedStats.memoryUsage.rss += stats.memoryUsage.rss

    summarizedStats.server.connectionsCount += stats.server.connectionsCount
    summarizedStats.server.connectionsCountHttp1
      += stats.server.connectionsCountHttp1
    summarizedStats.server.connectionsCountHttp2
      += stats.server.connectionsCountHttp2
    summarizedStats.server.requestsCount += stats.server.requestsCount
  })

  const chart = workersStatsChart.ensureChart(
    'memoryUsage',
    'Memory Usage'
  )

  chart.addData([
    { label: 'RSS', value: summarizedStats.memoryUsage.rss / 1024 },
    { label: 'Heap Total', value: summarizedStats.memoryUsage.heapTotal / 1024 },
    { label: 'Heap Used', value: summarizedStats.memoryUsage.heapUsed / 1024 },
    { label: 'External', value: summarizedStats.memoryUsage.external / 1024 },
    { label: 'Array Buffers', value: summarizedStats.memoryUsage.arrayBuffers / 1024 }
  ])

  const chart2 = workersStatsChart.ensureChart(
    'serverConnections',
    'Server Connections'
  )

  chart2.addData([
    { label: 'All Connections', value: summarizedStats.server.connectionsCount },
    {
      label: 'HTTP.1 Connections',
      value: summarizedStats.server.connectionsCountHttp1
    },
    {
      label: 'HTTP.2 Connections',
      value: summarizedStats.server.connectionsCountHttp2
    }
  ])

  const chart3 = workersStatsChart.ensureChart(
    'serverRequestsPerMinute',
    'Requests Per Minute'
  )

  chart3.addData([
    { label: 'Requests', value: summarizedStats.server.requestsCount }
  ])
}

setInterval(async() => {
  const workersStats = await actions.workersStats()

  if (!workersStats) {
    return
  }

  drawSummarizedCharts(workersStats)

  if (workersStats.length > 1) {
    drawPerWorkerCharts(workersStats)
  }
}, 1000)
