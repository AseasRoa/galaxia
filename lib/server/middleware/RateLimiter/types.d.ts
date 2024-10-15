export type RequestsRateLimitsRule = {
  path: string | RegExp,
  maxRequests: number,
  secondsPeriod: number,
  methods?: string[]
}

export type RequestsUserAgentFilterRule = {
  path?: string | RegExp,
  allow?: RegExp,
  deny?: RegExp
}
