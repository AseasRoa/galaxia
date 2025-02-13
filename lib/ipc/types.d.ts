type ChannelCallback = (worker: Cluster.Worker) => void

type MessageCallback = (response: unknown) => void

type ChannelRequest = {
  type: 'channelRequest',
  channel: string,
  callbackId: string,
  message: any
}

type ChannelResponse = {
  type: 'channelResponse',
  callbackId: string,
  response: any
}
