import MomentaryModel from './momentary-model'
import Switch from '../switch/switch'

class Momentary extends Switch {
  constructor(opt_name?: string) {
    super(opt_name)

    // this.state = false
  }
}

Momentary.prototype.modelClass = MomentaryModel

export default Momentary
