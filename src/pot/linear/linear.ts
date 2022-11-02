import Pot from '../pot/pot'
import LinearModel from './linear-model'

class Linear extends Pot {
  constructor(
    param: unknown,
    name: string,
    multiplier: number,
    opt_size?: string,
    opt_min?: number,
    opt_max?: number,
    opt_default?: number
  ) {
    super(param, name, multiplier, opt_size, opt_min, opt_max, opt_default)
  }
}

Linear.prototype.modelClass = LinearModel

export default Linear
