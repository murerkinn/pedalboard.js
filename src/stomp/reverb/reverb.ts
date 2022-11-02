import Conv from '../conv/conv'
import ReverbModel from './reverb-model'

class Reverb extends Conv {
  override name = 'reverb'

  constructor(context: AudioContext) {
    super(context)

    this.gainMultiplier = 1
  }
}

Reverb.prototype.modelClass = ReverbModel

export default Reverb
