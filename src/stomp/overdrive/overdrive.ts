import { Log, Pot } from '../../pot'
import Box from '../box/box'
import OverdriveModel from './overdrive-model'

class Overdrive extends Box {
  override name = 'overdrive'
  drivePot: Log
  tonePot: Log

  override createPots() {
    super.createPots()

    const driveHandler = this.model.setDrive.bind(this.model)
    const toneHandler = this.model.setTone.bind(this.model)

    this.drivePot = new Log(driveHandler, 'drive', 2000)
    this.tonePot = new Log(toneHandler, 'tone', 3000, Pot.Size.SMALL)
    this.pots.push(this.drivePot, this.tonePot)
  }

  setDrive(newValue: number) {
    this.drivePot.setValue(newValue)
  }

  setTone(newValue: number) {
    this.tonePot.setValue(newValue)
  }
}

Overdrive.prototype.modelClass = OverdriveModel
Overdrive.prototype.drivePot = null
Overdrive.prototype.tonePot = null

export default Overdrive
