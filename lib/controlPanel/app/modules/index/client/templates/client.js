import { template } from 'paintor'
import actions from '../../routes/actions.js'

export function Buttons() {
  return template((x) => {
    x.button({
      textContent: 'Restart',
      onClick: async() => actions.restart()
    })

    x.button({
      textContent: 'Shut Down',
      onClick: async() => actions.shutDownWorkers()
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
