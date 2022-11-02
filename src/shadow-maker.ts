import color, { RGB } from './lib/color'
import style from './lib/style'
import dom from './lib/dom'

function shadowTemplate(
  hslArray: number[],
  x: number,
  y: number,
  blur: number,
  a: number,
  opt_d = 0
) {
  const d = `${opt_d}px`
  return `${x}px ${y}px ${blur}px ${d} hsl(${hslArray[0]}, ${
    hslArray[1] * 100
  }%, ${a}%)`
}

export function shadowMaker(
  element: HTMLElement,
  length: number,
  darkness: number,
  weight: number,
  opt_before?: string[],
  opt_after?: string[]
) {
  opt_before = opt_before || []
  opt_after = opt_after || []

  const elStyle = document.defaultView.getComputedStyle(element, null)
  const colorText = elStyle.getPropertyValue('background-color')
  const hslArray = color.hexToHsl(color.parse(colorText).hex)

  darkness = darkness || 1

  hslArray[2] = hslArray[2] * darkness

  let shadows = []
  const xAngle =
    (window.innerWidth / 2 -
      style.getPageOffset(element).x -
      element.offsetWidth / 2) /
    30
  const yAngle =
    (window.innerHeight -
      style.getPageOffset(element).y -
      element.offsetHeight / 2) /
    80
  const yConDist = (yAngle * length) / 10

  const con = length

  while (length--) {
    const xDist = (xAngle * length) / con
    const yDist = (yConDist * length * 2) / con //yAngle * Math.sqrt(length) * length / con;

    shadows.push(
      shadowTemplate(
        hslArray,
        xDist,
        yDist,
        0,
        hslArray[2] * 100 - (hslArray[2] * 100 * (length + 5)) / con / 1.6
      )
    )
  }

  shadows.splice(
    0,
    0,
    shadowTemplate(hslArray, xAngle, yConDist * 2, con * 4, 0, 0),
    //shadowTemplate(xAngle / weight, yConDist * 2, con / 2, 0,  con / 4 / weight),
    shadowTemplate(
      hslArray,
      xAngle / weight / 8,
      yConDist * 3,
      con * 4,
      30,
      con / 12
    ),
    shadowTemplate(
      hslArray,
      xAngle / weight / 8,
      yConDist * 2,
      con,
      0,
      con / 4 / weight
    ),
    shadowTemplate(
      hslArray,
      xAngle / weight / 8,
      yConDist * 2.55,
      con * 2,
      5,
      con / 3 / weight
    )
  )

  shadows = [].concat(opt_before, shadows.reverse(), opt_after)
  element.style['boxShadow'] = shadows.join(', ')
  element.style['left'] = `-${xAngle / 2}px`
}

export function textShadowMaker(
  element: HTMLElement,
  length: number,
  before: string[],
  after: string[],
  invertY: boolean,
  invertX: number
) {
  before = before || []
  after = after || []

  const elStyle = document.defaultView.getComputedStyle(element, null)
  const colorText = elStyle.getPropertyValue('color')
  const hslArray = color.hexToHsl(color.parse(colorText).hex)

  let shadows = []
  const xAngle =
    (window.innerWidth / 2 -
      style.getPageOffset(element).x -
      element.offsetWidth / 2) /
    30
  const yAngle =
    (window.innerHeight -
      style.getPageOffset(element).y -
      element.offsetHeight / 2) /
    30

  const yConDist = (yAngle * length) / 10

  const con = length

  while (length--) {
    let xDist = (xAngle * length) / con
    let yDist = (yConDist * length * 2) / con //yAngle * Math.sqrt(length) * length / con;
    if (invertY) yDist = -yDist
    if (invertX) xDist = -xDist * Math.pow(invertX, 4)
    shadows.push(
      shadowTemplate(
        hslArray,
        xDist,
        yDist,
        0,
        hslArray[2] * 100 - (hslArray[2] * 100 * (length + 5)) / con / 1.6
      )
    )
  }
  shadows.splice(
    0,
    0,
    shadowTemplate(hslArray, xAngle, 0, con * 2, 0),
    shadowTemplate(hslArray, xAngle, yConDist * 1.8, con / 2, 0),
    shadowTemplate(hslArray, xAngle, yConDist * 2.5, con * 2, 0)
  )

  shadows = [].concat(before, shadows.reverse(), after)

  element.style.textShadow = shadows.join(', ')
}

export function textShadowMakerDom(element: HTMLElement, length: number) {
  element.style.position = 'absolute'

  const elStyle = document.defaultView.getComputedStyle(element, null)
  const colorText = elStyle.getPropertyValue('color')
  const rgbArray = color.hexToRgb(color.parse(colorText).hex)

  for (let i = 0; i < length; i++) {
    const el = element.cloneNode(true) as any
    el.style.position = 'absolute'
    el.style.webkitTransform = `translateZ(-${i}px)`

    el.style.color = color.rgbArrayToHex(
      color.darken(rgbArray as RGB, (i / length) * 0.8 + 0.2) as RGB
    )
    dom.insertSiblingBefore(el, element)

    if (i == length - 1)
      el.style.textShadow =
        '0 0 10px black,0 0 20px black,0 0 30px black,0 0 40px black,0 0 50px black'
  }
}
