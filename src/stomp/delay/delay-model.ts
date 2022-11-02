import BoxModel from '../box/box-model'

class DelayModel extends BoxModel {
  delayer: DelayNode
  feedbackGain: GainNode

  constructor(context: AudioContext) {
    super(context)

    this.delayer = this.context.createDelay(5.0)
    this.delayer.delayTime.value = 0.4

    this.feedbackGain = this.context.createGain()
    this.feedbackGain.gain.value = 0.9

    this.effects = [this.delayer, this.feedbackGain, this.level]
  }

  setDelayTimer(newTimer: number) {
    this.delayer.delayTime.value = newTimer
  }

  setFeedbackGain(newGain: number) {
    this.feedbackGain.gain.value = newGain
  }

  override routeInternal() {
    super.routeInternal()

    this.feedbackGain.connect(this.delayer)
    this.inputBuffer.connect(this.outputBuffer)
  }
}

export default DelayModel
