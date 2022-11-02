import math from './math'

export type RGB = [number, number, number]

const names = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
}

const hexTripletRe = /#(.)(.)(.)/
const validHexColorRe = /^#(?:[0-9a-f]{3}){1,2}$/i
const rgbColorRe =
  /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i

const isValidRgbColor = (str: string) => {
  const regExpResultArray = str.match(rgbColorRe)

  if (!regExpResultArray) return []

  const r = Number(regExpResultArray[1])
  const g = Number(regExpResultArray[2])
  const b = Number(regExpResultArray[3])

  if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255)
    return [r, g, b]
}

const isValidHexColor = (str: string) => {
  return validHexColorRe.test(str)
}

const normalizeHex = (hexColor: string) => {
  if (!isValidHexColor(hexColor))
    throw Error(`${hexColor}' is not a valid hex color`)

  if (hexColor.length == 4)
    // of the form #RGB
    hexColor = hexColor.replace(hexTripletRe, '#$1$1$2$2$3$3')

  return hexColor.toLowerCase()
}

const prependHashIfNecessaryHelper = (str: string) => {
  return str.charAt(0) == '#' ? str : '#' + str
}

const parse = (str: string) => {
  str = String(str)

  const maybeHex = prependHashIfNecessaryHelper(str)

  if (isValidHexColor(maybeHex))
    return {
      type: 'hex',
      hex: normalizeHex(maybeHex),
    }

  const rgb = isValidRgbColor(str)

  if (rgb.length)
    return {
      type: 'rgb',
      hex: rgbArrayToHex(rgb as RGB),
    }

  if (str.toLowerCase() in names)
    return {
      type: 'named',
      hex: names[str.toLowerCase() as keyof typeof names],
    }

  throw Error(`${str} is not a valid color string`)
}

const rgbToHex = (r: number, g: number, b: number) => {
  r = Number(r)
  g = Number(g)
  b = Number(b)

  if (r != (r & 255) || g != (g & 255) || b != (b & 255))
    throw Error(`(${r}, ${g}, ${b}) is not a valid RGB color`)

  const rgb = (r << 16) | (g << 8) | b

  if (r < 0x10) return `#${(0x1000000 | rgb).toString(16).substring(1)}`

  return `#${rgb.toString(16)}`
}

const rgbArrayToHex = (rgb: RGB) => {
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

const rgbToHsl = (r: number, g: number, b: number) => {
  // First must normalize r, g, b to be between 0 and 1.
  const normR = r / 255
  const normG = g / 255
  const normB = b / 255
  const max = Math.max(normR, normG, normB)
  const min = Math.min(normR, normG, normB)
  let h = 0
  let s = 0

  // Luminosity is the average of the max and min rgb color intensities.
  const l = 0.5 * (max + min)

  // The hue and saturation are dependent on which color intensity is the max.
  // If max and min are equal, the color is gray and h and s should be 0.
  if (max != min) {
    if (max == normR) {
      h = (60 * (normG - normB)) / (max - min)
    } else if (max == normG) {
      h = (60 * (normB - normR)) / (max - min) + 120
    } else if (max == normB) {
      h = (60 * (normR - normG)) / (max - min) + 240
    }

    if (0 < l && l <= 0.5) {
      s = (max - min) / (2 * l)
    } else {
      s = (max - min) / (2 - 2 * l)
    }
  }

  // Make sure the hue falls between 0 and 360.
  return [Math.round(h + 360) % 360, s, l]
}

const hexToRgb = (hex: string) => {
  const rgb = parseInt(hex.substring(1), 16)
  const r = rgb >> 16
  const g = (rgb >> 8) & 255
  const b = rgb & 255

  return [r, g, b]
}

const hexToHsl = (hex: string) => {
  const rgb = hexToRgb(hex)
  return rgbToHsl(rgb[0], rgb[1], rgb[2])
}

const blend = (rgb1: RGB, rgb2: RGB, factor: number) => {
  factor = math.clamp(factor, 0, 1)

  return [
    Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0])),
    Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1])),
    Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2])),
  ]
}

const darken = (rgb: RGB, factor: number) => {
  const black: RGB = [0, 0, 0]
  return blend(black, rgb, factor)
}

export default {
  isValidRgbColor,
  isValidHexColor,
  prependHashIfNecessaryHelper,
  rgbToHex,
  rgbArrayToHex,
  rgbToHsl,
  hexToRgb,
  hexToHsl,
  blend,
  darken,
  parse,
}
