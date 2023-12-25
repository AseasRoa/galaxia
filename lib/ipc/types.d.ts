type ChannelCallback = function(Cluster.Worker):any

type MessageCallback = function(any):any

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
