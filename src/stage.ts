import Board from './board'
import { Input, FileInput, Output } from './io'
import Component from './ui/component'

class Stage extends Component {
  protected context: AudioContext
  input: Input
  output: Output
  board: Board
  mediaStreamDestination: MediaStreamAudioDestinationNode

  constructor() {
    super()

    this.input = null
    this.output = null
    this.board = null
    this.mediaStreamDestination = null

    this.context = new AudioContext()
    this.initIO()
  }

  getContext() {
    return this.context
  }

  initIO() {
    this.input = new Input(this.context)
    this.output = new Output(this.context)
  }

  setBoard(board: Board) {
    this.board && this.board.dispose()

    this.board = board
    this.mediaStreamDestination &&
      this.board.setMediaStreamDestination(this.mediaStreamDestination)

    this.route()

    this.addChild(this.board)
  }

  route() {
    this.input.disconnect()
    this.input.connect(this.board)
    this.board.connect(this.output)
  }

  setMediaStreamDestination(destination: MediaStreamAudioDestinationNode) {
    this.mediaStreamDestination = destination
    this.board.setMediaStreamDestination(this.mediaStreamDestination)
  }

  play(url: string) {
    this.input.disconnect()
    this.input = new FileInput(this.context, url)
    this.route()
    this.input.on('loaded', () => {
      this.input.play(0)
    })
  }

  stop() {
    this.input.stop()
  }

  override template() {
    return `<div class="stage"></div>`
  }
}

export default Stage
