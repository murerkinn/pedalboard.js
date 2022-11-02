import { Switch, SwitchModel } from './footswitch'
import Component from './ui/component'

class Led extends Component {
  state: boolean
  name: string
  footswitch: Switch

  constructor(opt_footswitch?: Switch, opt_name = '') {
    super()
    this.footswitch = opt_footswitch
    this.name = opt_name
    this.state = false

    this.bindModelEvents()
  }

  toggle() {
    this.state = !this.state
    this.updateUi()
  }

  updateUi() {
    if (this.rendered) {
      this.el.classList.toggle('on', this.state)
    }
  }

  override template() {
    return `<div class="led">
              <div class="nameHolder">
                <div class="name">${this.name}</div>
              </div>
            </div>`
  }

  override onAfterRender() {
    super.onAfterRender()
    this.updateUi()
  }

  override bindModelEvents() {
    if (this.footswitch) {
      this.footswitch.model.on(
        SwitchModel.EventType.ON,
        this.onSwitchValueChange,
        this
      )
      this.footswitch.model.on(
        SwitchModel.EventType.OFF,
        this.onSwitchValueChange,
        this
      )
    }
  }

  onSwitchValueChange(val: boolean) {
    this.state = val
    this.updateUi()
  }
}

export default Led
