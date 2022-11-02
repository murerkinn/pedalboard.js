import { Output } from '../io'
import Component from '../ui/component'
import ConnectableModel from './connectable-model'

export interface IConnectable {
  connect(destination: IConnectable): void
  disconnect(): void
  setPrev(prev: IConnectable): void
  getInput(): AudioNode | AudioParam
  getOutput(): AudioNode | AudioParam
}

class Connectable extends Component {
  components: Component[]

  constructor(context: AudioContext) {
    super()
    this.setModel(new this.modelClass(context))
    this.createChildComponents()
    this.bindModelEvents()
    this.components = null
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createChildComponents() {
    this.components = []
  }

  getInput() {
    return this.model.getInput()
  }

  getOutput() {
    return this.model.getOutput()
  }

  setPrev(prev: IConnectable) {
    this.model.setPrev(prev.getOutput())
  }

  connect(destination: IConnectable | Output) {
    destination.setPrev(this)
    this.model.connect(destination.getInput())
  }

  disconnect() {
    this.model.disconnect()
  }
}

Connectable.prototype.modelClass = ConnectableModel

export default Connectable
