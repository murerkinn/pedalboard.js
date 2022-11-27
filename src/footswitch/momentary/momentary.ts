import MomentaryModel from './momentary-model'
import Switch from '../switch/switch'

class Momentary extends Switch {
  constructor(opt_name?: string) {
    super(opt_name)

    // this.state = false
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override ['click .button']() {}

  ['mousedown .button']() {
    this.toggle()
  }

  ['mouseup .button']() {
    this.toggle()
  }
}

Momentary.prototype.modelClass = MomentaryModel

export default Momentary
