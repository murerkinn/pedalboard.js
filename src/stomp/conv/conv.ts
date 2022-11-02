import { Pot } from '../../pot'
import Box from '../box/box'
import ConvModel from './conv-model'

class Conv extends Box {
  override name = 'convo'
  gainMultiplier: number

  constructor(context: AudioContext) {
    super(context)
    this.gainMultiplier = 1
  }

  override createPots() {
    this.volumePot = new Pot(
      this.model.convGain.gain,
      'effect',
      this.gainMultiplier
    )
    this.pots = [].concat(this.volumePot)
  }
}

Conv.prototype.modelClass = ConvModel

export default Conv
