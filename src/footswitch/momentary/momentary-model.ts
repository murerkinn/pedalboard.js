import SwitchModel from '../switch/switch-model'

class MomentaryModel extends SwitchModel {
  constructor(opt_name?: string) {
    super(opt_name)
    this.state = false
  }
}

export default MomentaryModel
