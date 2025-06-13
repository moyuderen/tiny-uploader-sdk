import Uploader from './Uploader'
import { each, extend } from '../helper'

type Listener = {
  node: HTMLElement
  event: string
  handler: (e: Event) => void
}

export type UserAttributes = {
  /** 允许文件上传类型 */
  accept?: string

  /** 是否允许上传多个文件 */
  multiple?: boolean
}

class Container {
  uploader: Uploader
  listeners: Listener[]
  inputs: HTMLInputElement[]

  constructor(uploader: Uploader) {
    this.uploader = uploader
    this.listeners = [] // 存储事件监听器
    this.inputs = [] // 存储动态创建的 input 元素
  }

  assignBrowse(domNode: HTMLElement, attributes: UserAttributes = {}) {
    if (!domNode) {
      console.warn('DOM 节点不存在')
      return
    }

    const input = this.createOrGetInput(domNode)
    this.setInputAttributes(input, attributes)
    this.attachBrowseEvents(domNode, input)
  }

  assignDrop(domNode: HTMLElement) {
    if (!domNode) {
      console.warn('DOM 节点不存在')
      return
    }

    const preventEvent = (e: Event) => e.preventDefault()
    const eventHandlers = {
      dragover: preventEvent,
      dragenter: preventEvent,
      dragleave: preventEvent,
      drop: this.handleDrop.bind(this)
    }

    each(eventHandlers, (handler, event) => {
      domNode.addEventListener(event as keyof HTMLElementEventMap, handler, { passive: false })
      this.listeners.push({ node: domNode, event: event as string, handler })
    })
  }

  createOrGetInput(domNode: HTMLElement | HTMLInputElement) {
    if (domNode instanceof HTMLInputElement) {
      if (domNode.tagName === 'INPUT' && domNode.type === 'file') {
        return domNode
      }
    }

    const input = document.createElement('input')
    input.type = 'file'
    // @ts-ignore
    extend(input.style, {
      visibility: 'hidden',
      position: 'absolute',
      width: '1px',
      height: '1px'
    })
    domNode.appendChild(input)
    this.inputs.push(input)
    return input
  }

  setInputAttributes(input: HTMLInputElement, attributes: UserAttributes) {
    each(attributes, (value, key) => input.setAttribute(key as string, value as string))
    input.toggleAttribute('multiple', !!attributes.multiple)
  }

  attachBrowseEvents(domNode: HTMLElement, input: HTMLInputElement) {
    const clickHandler = () => input.click()
    const changeHandler = (e: Event) => {
      const eventTarget = e.target as any
      this.uploader.addFiles(eventTarget.files)
      eventTarget.value = ''
    }

    domNode.addEventListener('click', clickHandler, { passive: true })
    input.addEventListener('change', changeHandler, { passive: true })

    this.listeners.push(
      { node: domNode, event: 'click', handler: clickHandler },
      { node: input, event: 'change', handler: changeHandler }
    )
  }

  handleDrop(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    if (e instanceof DragEvent) {
      this.uploader.addFiles(e.dataTransfer?.files)
    }
  }

  destroy() {
    this.listeners.forEach(({ node, event, handler }) => {
      node.removeEventListener(event, handler)
    })
    this.listeners = []

    this.inputs.forEach((input) => {
      if (input.parentNode) {
        input.parentNode.removeChild(input)
      }
    })
    this.inputs = []

    return this
  }
}

export default Container
