export interface IConnectableModel {
  connect(destination: AudioNode): void
  disconnect(): void
  setPrev(prev: AudioNode): void
  getInput(): AudioNode | AudioParam
  getOutput(): AudioNode | AudioParam
}

class ConnectableModel implements IConnectableModel {
  context: AudioContext
  prev: AudioNode
  next: AudioNode
  chain: AudioNode[]
  effects: AudioNode[]
  protected inputBuffer: GainNode
  protected outputBuffer: GainNode

  constructor(context: AudioContext) {
    this.context = context

    this.prev = null
    this.next = null

    this.chain = []
    this.effects = []

    this.inputBuffer = this.context.createGain()
    this.outputBuffer = this.context.createGain()
  }

  connect(destination: AudioNode) {
    this.next = destination
    this.chain = [].concat(
      this.inputBuffer,
      this.effects,
      this.outputBuffer,
      this.next
    )

    this.routeInternal()
  }

  getInput() {
    return this.inputBuffer
  }

  getOutput() {
    return this.outputBuffer
  }

  setPrev(prev: AudioNode) {
    this.prev = prev
  }

  routeInternal() {
    const chain = this.chain

    for (let i = 0, len = chain.length - 1; i < len; i++) {
      chain[i].connect(chain[i + 1])
    }
  }

  disconnect() {
    this.outputBuffer.disconnect()
  }

  disposeInternal() {
    this.disconnect()
  }
}

export default ConnectableModel
