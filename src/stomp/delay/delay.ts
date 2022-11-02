import { Linear, Log } from '../../pot'
import Box from '../box/box'
import DelayModel from './delay-model'

class Delay extends Box {
  override name = 'delay'
  delayTimerPot: Log
  feedbackGainPot: Linear

  override createPots() {
    super.createPots()

    const delayTimeHandler = this.model.setDelayTimer.bind(this.model)
    const feedbackGainHandler = this.model.setFeedbackGain.bind(this.model)

    this.delayTimerPot = new Log(delayTimeHandler, 'delay time', 5)
    this.feedbackGainPot = new Linear(
      feedbackGainHandler,
      'feedback gain',
      0.95
    )
    this.pots.push(this.delayTimerPot, this.feedbackGainPot)
  }

  setDelayTimer(newTimer: number) {
    this.delayTimerPot.setValue(newTimer)
  }

  setFeedbackGain(newGain: number) {
    this.feedbackGainPot.setValue(newGain)
  }
}

Delay.prototype.modelClass = DelayModel
Delay.prototype.delayTimerPot = null
Delay.prototype.feedbackGainPot = null

export default Delay
