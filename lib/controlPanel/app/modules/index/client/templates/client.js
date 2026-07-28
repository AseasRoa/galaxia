import { template } from 'paintor'
import { restart, shutDownWorkers } from '../../routes/actions.js'

export function Buttons() {
  return template((x) => {
    x.button({
      textContent: 'Restart',
      onClick: () => restart()
    })

    x.button({
      textContent: 'Shut Down',
      onClick: () => shutDownWorkers()
    })
  })
}

export function Charts() {
  return template((x) => {
    x.div(
      { id: 'perWorkerCharts', class: 'chartsContainer' },
      [
        x.div({ id: 'memoryUsage' }),
        x.div({ id: 'serverConnections' }),
        x.div({ id: 'serverRequestsPerMinute' })
      ]
    )
  })
}
