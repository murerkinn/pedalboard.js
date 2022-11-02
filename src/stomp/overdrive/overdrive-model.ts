import BoxModel from '../box/box-model'

class OverdriveModel extends BoxModel {
  lowPassFreq: number
  lowPass: BiquadFilterNode
  waveShaper: WaveShaperNode
  wsCurve: Float32Array

  constructor(context: AudioContext) {
    super(context)

    this.lowPassFreq = 3000
    this.lowPass = this.context.createBiquadFilter()
    this.lowPass.type = 'lowpass'
    this.lowPass.frequency.value = this.lowPassFreq

    this.waveShaper = this.context.createWaveShaper()

    this.wsCurve = null

    this.effects = [this.waveShaper, this.lowPass, this.level]
  }

  createWSCurve(amount: number) {
    const k = amount
    const n_samples = 22050

    this.wsCurve = new Float32Array(n_samples)

    const deg = Math.PI / 180

    for (let i = 0; i < n_samples; i += 1) {
      const x = (i * 2) / n_samples - 1
      this.wsCurve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
    }
    this.waveShaper.curve = this.wsCurve
  }

  setDrive(newDrive: number) {
    this.createWSCurve(10 * newDrive)
  }

  setTone(newTone: number) {
    this.lowPass.frequency.value = 2000 + newTone
  }
}

export default OverdriveModel
