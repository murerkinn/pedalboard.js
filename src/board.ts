import { Connectable, IConnectable } from './connectable'
import dom from './lib/dom'
import { shadowMaker } from './shadow-maker'
import { Box } from './stomp'
import Component from './ui/component'

class Board extends Connectable {
  context: AudioContext
  protected pedals: Box[]
  output: IConnectable
  mediaStreamDestination: MediaStreamAudioDestinationNode
  mappings = {
    EMPTY: '.empty',
  }

  constructor(context: AudioContext) {
    super(context)

    this.context = context
    this.output = null
    this.mediaStreamDestination = null
    this.pedals = null
  }

  addPedals(pedals: Box[]) {
    this.addChildren(pedals)
  }

  doShadows() {
    this.getPedals().forEach(pedal => {
      shadowMaker(pedal.el, 40, 0.5, 0.7)

      pedal.pots.forEach(pot => {
        shadowMaker(pot.$(pot.mappings.KNOB_HOLDER), 10, 0.5, 4)
      })
    })
  }

  override addChildAt(child: Component, index: number, opt_render?: boolean) {
    super.addChildAt(child, index, opt_render)

    if (this.getPedals().length) dom.removeNode(this.$(this.mappings.EMPTY))

    this.routeInternal()

    if (this.rendered) this.doShadows()
  }

  addPedalAt(child: Box, index: number, opt_render?: boolean) {
    this.addChildAt(child, index, opt_render)
  }

  override remove_child(child: HTMLElement, opt_unrender?: boolean) {
    const el = super.remove_child(child, opt_unrender)

    if (this.getPedals().length == 0) this.el.innerHTML = this.templates_empty()

    this.routeInternal()
    return el
  }

  override onAfterRenderAsync() {
    super.onAfterRenderAsync()
    this.doShadows()
  }

  getPedals() {
    return this.getChildren() as Box[]
  }

  templates_empty() {
    return `
      <div class="empty">
        <div class="text">board is empty</div>
      </div>
    `
  }

  override template() {
    return `
      <div class="board">
        ${this.templates_empty()}
      </div>
    `
  }

  override connect(destination: IConnectable) {
    super.connect(destination)
    this.output = destination
    this.routeInternal()
  }

  routeInternal() {
    const fx = this.getPedals()

    this.getInput().disconnect()

    if (fx.length) {
      this.getInput().connect(fx[0].getInput())
      this.output && fx[fx.length - 1].connect(this.output)

      fx.forEach((pedal, i) => {
        pedal.disconnect()
        fx[i + 1] && pedal.connect(fx[i + 1])
      })
      this.output &&
        this.mediaStreamDestination &&
        fx[fx.length - 1].model.getOutput().connect(this.mediaStreamDestination)
    } else {
      this.getInput().connect(this.getOutput())
      this.mediaStreamDestination &&
        this.getInput().connect(this.mediaStreamDestination)
    }
  }

  setMediaStreamDestination(destination: MediaStreamAudioDestinationNode) {
    this.mediaStreamDestination = destination
  }
}

export default Board
