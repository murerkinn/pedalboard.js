import { ConnectableModel } from '../../connectable'
import math from '../../lib/math'

class BoxModel extends ConnectableModel {
  level: GainNode
  nodes: AudioNode[][]

  constructor(context: AudioContext) {
    super(context)

    this.level = this.context.createGain()
    this.effects.push(this.level)

    this.nodes = []
  }

  setLevel(newLevel: number) {
    newLevel = Math.min(newLevel, 10)
    newLevel = newLevel / 10
    this.level.gain.value = newLevel
  }

  override routeInternal() {
    const chain = this.chain

    for (let i = 0, len = chain.length - 1; i < len; i++) {
      chain[i].connect(chain[i + 1])
    }

    this.nodes = [
      [this.effects[0], this.inputBuffer, this.outputBuffer],
      [this.outputBuffer, math.peek(this.effects), null],
    ]
  }
}

export default BoxModel
