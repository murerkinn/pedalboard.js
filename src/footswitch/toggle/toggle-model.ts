import SwitchModel from '../switch/switch-model'

class ToggleModel extends SwitchModel {
  constructor(opt_name?: string) {
    super(opt_name)
    this.state = true
  }
}

export default ToggleModel
