import Component from '../../ui/component'
import PotModel from './pot-model'

class Pot extends Component {
  static Size = { SMALL: 'small', REGULAR: 'regular' }

  mappings = {
    KNOB: '.knob',
    KNOB_HOLDER: '.knobHolder',
  }
  angle: number
  size: string
  flag: boolean
  oldY: number

  constructor(
    param: unknown,
    name: string,
    multiplier: number,
    opt_size?: string,
    opt_min?: number,
    opt_max?: number,
    opt_default?: number
  ) {
    super()

    this.setModel(
      new this.modelClass(
        param,
        name,
        multiplier || 1,
        opt_min,
        opt_max,
        opt_default
      )
    )

    this.angle = 260

    this.size = opt_size || Pot.Size.REGULAR
    this.bindModelEvents()
  }

  ['mousedown .knob'](e: MouseEvent) {
    this.flag = true
    this.oldY = e.clientY

    const mousemove = (e: MouseEvent) => {
      if (this.flag) {
        this.setValue(
          this.model.getNormalizedValue() - (e.clientY - this.oldY) / 100
        )
        this.oldY = e.clientY
      }
    }

    const mouseup = () => {
      this.flag = false
      document.body.removeEventListener('mousemove', mousemove, false)
      document.body.removeEventListener('mouseup', mouseup, false)
    }

    document.body.addEventListener('mouseup', mouseup, false)
    document.body.addEventListener('mousemove', mousemove, false)
  }

  setValue(newValue: number) {
    this.model.setValue(newValue)
  }

  updateUi() {
    if (this.rendered) {
      const newStyle = `rotateZ(${
        this.model.getNormalizedValue() * this.angle
      }deg)`
      this.$(this.mappings.KNOB).style['transform'] = newStyle
      this.$(this.mappings.KNOB).style['webkitTransform'] = newStyle
    }
  }

  override template() {
    return `<div class="pot ${this.size}">
              <div class="knobHolder">
                <div class="knob"></div>
              </div>
              <div class="nameHolder">
                <div class="name">${this.model.name}</div>
              </div>
            </div>`
  }

  override onAfterRender() {
    super.onAfterRender()
    this.updateUi()
  }

  override bindModelEvents() {
    this.model.on(PotModel.EventType.VALUE_CHANGED, this.updateUi, this)
  }
}

Pot.prototype.modelClass = PotModel

export default Pot
