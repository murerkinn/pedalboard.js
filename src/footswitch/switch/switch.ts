import Component from '../../ui/component'
import SwitchModel from './switch-model'

class Switch extends Component {
  mappings = {
    BUTTON: '.button',
  }

  constructor(opt_name?: string) {
    super()

    this.setModel(new this.modelClass(opt_name))
  }

  ['click .button']() {
    this.toggle()
  }

  setNodes(nodes: AudioNode[][]) {
    this.model.setNodes(nodes)
  }

  getState() {
    return this.model.state
  }

  toggle() {
    this.model.toggle()
  }

  override template() {
    return `<div class="switch">
              <div class="button"></div>
              ${this.templates_name()}
            </div>`
  }

  templates_name() {
    return this.model.name ? `<div class="name">${this.model.name}</div>` : ''
  }
}

Switch.prototype.modelClass = SwitchModel

export default Switch
