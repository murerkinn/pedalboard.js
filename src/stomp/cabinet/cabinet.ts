import Conv from '../conv/conv'
import CabinetModel from './cabinet-model'

class Cabinet extends Conv {
  override name = 'cabinet'
  override gainMultiplier = 10

  constructor(context: AudioContext) {
    super(context)

    this.volumePot.setValue(1)
  }
}

Cabinet.prototype.modelClass = CabinetModel

export default Cabinet
