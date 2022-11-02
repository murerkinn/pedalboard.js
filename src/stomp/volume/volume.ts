import Box from '../box/box'
import VolumeModel from './volume-model'

class Volume extends Box {
  override name = 'volume'

  constructor(context: AudioContext) {
    super(context)
    this.volumePot.setValue(1)
  }
}

Volume.prototype.modelClass = VolumeModel

export default Volume
