declare module 'eventemitter3'

declare class EventEmitter {
  addListener(): EventEmitter
  emit(
    event: string | symbol,
    a1?: any,
    a2?: any,
    a3?: any,
    a4?: any,
    a5?: any
  ): boolean
  on(event: string | symbol, fn: any, context?: any): EventEmitter
}

export default EventEmitter
