import EventEmitter from 'erste/src/lib/base/eventemitter3'

class SwitchModel extends EventEmitter {
  name: string
  nodes: AudioNode[][]
  state: boolean

  static EventType = {
    ON: 'on',
    OFF: 'off',
  }

  constructor(opt_name?: string) {
    super()
    this.name = opt_name
    this.nodes = [[], [], []]
    this.state = false
  }

  toggle() {
    const oldState = this.state

    this.state = !this.state

    if (this.state) this.turnOn()
    else this.turnOff()

    const eventType = this.state
      ? SwitchModel.EventType.ON
      : SwitchModel.EventType.OFF

    this.emit(eventType, this.state, oldState)
  }

  turnOn() {
    const work = function (nodes: AudioNode[]) {
      nodes[1].disconnect()
      if (nodes[0]) nodes[1].connect(nodes[0])
    }

    this.nodes.forEach(nodes => {
      if (nodes) {
        ;(nodes => {
          work(nodes)
          setTimeout(() => {
            work(nodes)
          }, 10)
        })(nodes)
      }
    })
  }

  turnOff() {
    const work = function (nodes: AudioNode[]) {
      nodes[1].disconnect()
      if (nodes[2]) nodes[1].connect(nodes[2])
    }

    this.nodes.forEach(nodes => {
      ;(nodes => {
        work(nodes)
        setTimeout(() => {
          work(nodes)
        }, 10)
      })(nodes)
    })
  }

  setNodes(nodes: AudioNode[][]) {
    this.nodes = nodes

    this.state = !this.state
    this.toggle()
  }
}

export default SwitchModel
