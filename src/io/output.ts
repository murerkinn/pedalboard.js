import { IConnectable } from '../connectable'

class Output implements IConnectable {
  source: AudioDestinationNode
  prev: IConnectable

  constructor(context: AudioContext) {
    this.source = context.destination
    this.prev = null
  }

  getInput() {
    return this.source
  }

  setPrev(prev: IConnectable) {
    this.prev = prev
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  connect(destination: IConnectable) {}

  getOutput() {
    return this.source
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
}

export default Output
