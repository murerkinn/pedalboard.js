import { Connectable, IConnectable } from '../../connectable'
import { Switch, SwitchModel, Toggle } from '../../footswitch'
import Led from '../../led'
import { Linear, Pot } from '../../pot'

import BoxModel from './box-model'

class Box extends Connectable {
  name = 'pb'
  mappings = {
    POTS: '.pots',
    SWITCHES: '.switches',
    LEDS: '.leds',
  }
  pots: Pot[]
  leds: Led[]
  switches: Switch[]
  volumePot: Pot
  bypassSwitch: Switch
  led: Led

  override createChildComponents() {
    super.createChildComponents()

    this.pots = []
    this.leds = []
    this.switches = []
    this.volumePot = null
    this.bypassSwitch = null
    this.led = null

    this.createPots()
    this.createSwitches()
  }

  createPots() {
    this.volumePot = new Linear(this.model.level.gain, 'volume', 1)
    this.volumePot.setValue(1)

    this.pots.push(this.volumePot)
  }

  createSwitches() {
    this.bypassSwitch = new Toggle()
    this.led = new Led(this.bypassSwitch)
    this.leds.push(this.led)
    this.switches.push(this.bypassSwitch)

    this.bypassSwitch.model.on(SwitchModel.EventType.ON, () => {
      this.model.routeInternal()
      setTimeout(() => {
        this.model.routeInternal()
      }, 10)
    })
  }

  override connect(destination: IConnectable) {
    super.connect(destination)
    this.bypassSwitch.setNodes(this.model.nodes)
  }

  setLevel(newLevel: number) {
    this.volumePot.setValue(newLevel)
  }

  override template() {
    const className = this.name.replace(/\s/g, '-').toLowerCase()

    return `
        <div class="box ${className}">
          <div class="pots">${this.pots.join('')}</div>
          <div class="name">${this.name}</div>
          <div class="leds">${this.leds.join('')}</div>
          <div class="switches">${this.switches.join('')}</div>
        </div>`
  }
}

Box.prototype.modelClass = BoxModel

export default Box
