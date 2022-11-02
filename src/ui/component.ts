import { Component as ErsteComponent } from 'erste'

class Component extends ErsteComponent {
  model: any
  modelClass: any
  children: Component[]

  constructor() {
    super()
    this.model = null
    this.children = []
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  bindModelEvents() {}

  setModel(model: any) {
    this.model = model
  }

  getChild(id: string): Component {
    return this.children.find(c => c.id == id)
  }

  getChildIds() {
    return this.children.map(child => child.id)
  }

  getChildren(): Component[] {
    const ids = this.getChildIds(),
      that = this

    return ids.map((id: string) => that.getChild(id))
  }

  addChild(child: Component, opt_render = true) {
    this.addChildAt(child, this.children.length, opt_render)
  }

  addChildAt(child: Component, index: number, opt_render = true) {
    this.children.splice(index, 0, child)

    if (opt_render != false) {
      opt_render = true

      if (index == 0) this.el.appendChild(child.el)
      else
        this.children[index - 1].el.insertAdjacentElement('afterend', child.el)
    }
  }

  addChildren(children: Component[], opt_render = true) {
    const that = this

    children.forEach(child => {
      that.addChild(child, opt_render)
    }, this)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove_child(child: HTMLElement, opt_unrender?: boolean) {
    this.children.filter(item => item.id !== child.id)
    this.el.removeChild(child)
  }

  disposeInternal() {
    super.dispose()

    this.model && this.model.dispose && this.model.dispose()
    this.model = null
  }
}

export default Component
