import BoxModel from '../box/box-model'

class ConvModel extends BoxModel {
  conv: ConvolverNode
  convGain: GainNode
  iRPath?: string

  constructor(context: AudioContext) {
    super(context)

    this.conv = this.context.createConvolver()
    this.convGain = this.context.createGain()
    this.effects = [this.conv, this.convGain]

    this.iRPath && this.loadIR()
  }

  override routeInternal() {
    super.routeInternal()
    this.inputBuffer.connect(this.outputBuffer)
  }

  loadIR() {
    const that = this,
      request = new XMLHttpRequest()

    request.open('GET', this.iRPath, true)
    request.responseType = 'arraybuffer'

    request.onload = function () {
      that.context.decodeAudioData(request.response, buffer => {
        that.conv.buffer = buffer
      })
    }
    request.send()
  }
}

export default ConvModel
