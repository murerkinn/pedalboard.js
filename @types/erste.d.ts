declare module 'erste'

export class EventEmitter {
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

export class Component extends EventEmitter {
  id: string
  el: HTMLElement
  $$(selector: string): HTMLElement[]
  $(selector: string): HTMLElement
  rendered: boolean
  onAfterRender(): void
  onAfterRenderAsync(): void
  template(): string
  dispose(): void
}
