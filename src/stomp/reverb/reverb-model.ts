import ConvModel from '../conv/conv-model'

class ReverbModel extends ConvModel {
  constructor(context: AudioContext) {
    super(context)
    this.iRPath = 'audio/ir/reverb/pcm90cleanplate.wav'
  }
}

export default ReverbModel
