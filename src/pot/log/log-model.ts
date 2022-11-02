import PotModel from '../pot/pot-model'

class LogModel extends PotModel {
  override processValue(newValue: number, oldValue: number) {
    newValue = Math.pow(newValue, 3.3)
    super.processValue(newValue, oldValue)
  }

  override getNormalizedValue() {
    let rv = super.getNormalizedValue()
    rv = Math.pow(rv, 1 / 3.3)
    return rv
  }
}

export default LogModel
