import ConvModel from '../conv/conv-model'

class CabinetModel extends ConvModel {
  constructor(context: AudioContext) {
    super(context)

    this.iRPath = 'audio/ir/speaker/AK-SPKRS_VinUs_002.wav'
  }
}

export default CabinetModel
