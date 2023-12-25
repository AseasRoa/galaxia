import actions from '../../routes/actions.js'

/**
 * @param {TemplateTree} $
 */
export function buttons($) {
  $.button({
    textContent: 'Restart',
    onClick: async() => actions.restart()
  })

  $.button({
    textContent: 'Shut Down',
    onClick: async() => actions.shutDownWorkers()
  })
}

/**
 * @param {TemplateTree} $
 */
export function charts($) {
  $.div(
    { id: 'perWorkerCharts', class: 'chartsContainer' },
    [
      $.div({ id: 'memoryUsage' }),
      $.div({ id: 'serverConnections' }),
      $.div({ id: 'serverRequestsPerMinute' })
    ]
  )
}
