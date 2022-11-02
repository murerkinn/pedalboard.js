import math from '../../lib/math'

import EventEmitter from 'erste/src/lib/base/eventemitter3'

type CallbackFn = (value: number, oldValue: number) => void

class PotModel extends EventEmitter {
  static EventType = { VALUE_CHANGED: 'valueChanged' }

  minValue: number
  maxValue: number
  defaultValue: number
  name: string
  multiplier: number
  value: number
  callback: CallbackFn
  param: any

  constructor(
    param: unknown,
    name: string,
    multiplier: number,
    opt_min = 0,
    opt_max = 1,
    opt_default = 0.5
  ) {
    super()

    if (param instanceof Function) this.callback = param as CallbackFn
    else this.param = param

    this.minValue = opt_min
    this.maxValue = opt_max
    this.defaultValue = opt_default

    this.name = name
    this.multiplier = multiplier
    this.value = this.minValue

    this.setValue(this.defaultValue)
  }

  setValue(newValue: number) {
    const oldValue = this.value

    newValue = math.clamp(newValue, 0, 1)
    this.processValue(newValue, oldValue)

    if (this.param) this.param.value = this.value
    else this.callback(this.value, oldValue)

    this.emit(PotModel.EventType.VALUE_CHANGED, this.value, oldValue)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processValue(newValue: number, oldValue: number) {
    this.value =
      math.lerp(this.minValue, this.maxValue, newValue) * this.multiplier
  }

  getValue() {
    return this.value
  }

  getNormalizedValue() {
    let rv = this.value / this.multiplier
    rv = (rv - this.minValue) / (this.maxValue - this.minValue)
    return rv
  }
}

export default PotModel
