import { isArray, isFunction, isPlainObject } from './type-test'

// 定义支持的输入类型：数组或对象
type Eachable<T> = T[] | Record<string, T>

// 定义回调函数类型
type EachCallback<T> = (value: T, key: number | string, collection: Eachable<T>) => boolean | void

export function each<T>(collection: Eachable<T>, func: EachCallback<T>, context?: any) {
  if (isArray(collection)) {
    const arr = collection as T[]
    for (var i = 0, len = arr.length; i < len; i++) {
      if (func.call(context, arr[i], i, arr) === false) {
        break // 退出所有循序
      }
    }
  } else {
    const obj = collection as Record<string, T>
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (func.call(context, obj[key], key, obj) === false) {
          break
        }
      }
    }
  }
}

export function extend() {
  var options
  var name
  var src
  var copy
  var copyIsArray
  var clone
  var target = arguments[0] || {}
  var i = 1
  var length = arguments.length
  var force = false

  // 如果第一个参数为布尔,判定是否深拷贝
  if (typeof target === 'boolean') {
    force = target
    target = arguments[1] || {}
    i++
  }

  // 确保接受方为一个复杂的数据类型
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  // 如果只有一个参数，那么新成员添加于 extend 所在的对象上
  if (i === length) {
    // @ts-ignore
    // oxlint-disable-next-line no-this-alias
    target = this
    i--
  }

  for (; i < length; i++) {
    // 只处理非空参数
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止环引用
        if (target === copy) {
          continue
        }
        if (force && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          // @ts-ignore
          target[name] = extend(force, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}

export const parseData = <T extends Record<string, any>>(data: T | (() => T)): T => {
  if (typeof data === 'function') {
    return data() || {}
  }

  if (isPlainObject(data)) {
    return data
  }

  return {} as T
}
