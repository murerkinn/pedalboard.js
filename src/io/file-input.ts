import Input from './input'

class FileInput extends Input {
  constructor(context: AudioContext, url: string) {
    super(context)

    const that = this,
      request = new XMLHttpRequest()

    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = function () {
      context.decodeAudioData(request.response, function (buffer: AudioBuffer) {
        that.setSourceBuffer(buffer)
        that.emit('loaded')
      })
    }
    request.send()
  }
}

export default FileInput
