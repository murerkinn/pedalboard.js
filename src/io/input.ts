import { IConnectable } from '../connectable'

import EventEmitter from 'erste/src/lib/base/eventemitter3'

enum INPUT_STATE {
  NOT_STARTED = 'notStarted',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

class Input extends EventEmitter implements IConnectable {
  static State = INPUT_STATE

  source: AudioBufferSourceNode
  state: INPUT_STATE

  constructor(context: AudioContext) {
    super()

    this.source = context.createBufferSource()
    this.source.loop = true
    this.state = Input.State.NOT_STARTED
    this.source.addEventListener('ended', this.onEnded.bind(this))
  }

  play(opt_time = 0) {
    if (this.state === Input.State.NOT_STARTED) {
      this.source.start(opt_time)
      this.state = Input.State.PLAYING
    }
  }

  stop(opt_time = 0) {
    if (this.state === Input.State.PLAYING) {
      this.source.stop(opt_time)
      this.state = Input.State.FINISHED
    }
  }

  setSourceBuffer(sourceBuffer: AudioBufferSourceOptions['buffer']) {
    this.source.buffer = sourceBuffer
  }

  connect(destination: IConnectable) {
    destination.setPrev(this)
    this.source.connect(destination.getInput() as AudioNode)
  }

  disconnect() {
    this.source.disconnect()
  }

  getOutput() {
    return this.source
  }

  onEnded() {
    this.state = Input.State.FINISHED
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPrev() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getInput() {
    return this.source
  }
}

export default Input
