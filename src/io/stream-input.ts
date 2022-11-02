import Input from './input'

class StreamInput extends Input {
  constructor(context: AudioContext) {
    super(context)

    const that = this

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: false,
          // googEchoCancellation: false,
          // googEchoCancellation2: false,
          // googAutoGainControl: false,
          // googNoiseSuppression: false,
          // googNoiseSuppression2: false,
        },
      })
      .then(stream => {
        that.disconnect()
        ;(that.source as any) = context.createMediaStreamSource(stream)
        that.emit('loaded')
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  override stop() {
    this.source.disconnect()
  }
}

export default StreamInput
