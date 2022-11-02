class Coordinate {
  x: number
  y: number

  constructor(opt_x = 0, opt_y = 0) {
    this.x = opt_x
    this.y = opt_y
  }
}

const peek = <T>(array: T[]): T => {
  return array[array.length - 1]
}

const lerp = (a: number, b: number, x: number) => {
  return a + x * (b - a)
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

export default {
  Coordinate,
  peek,
  lerp,
  clamp,
}
