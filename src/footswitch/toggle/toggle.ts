import Switch from '../switch/switch'
import ToggleModel from './toggle-model'

class Toggle extends Switch {
  constructor(opt_name?: string) {
    super(opt_name)
  }
}

Toggle.prototype.modelClass = ToggleModel

export default Toggle
