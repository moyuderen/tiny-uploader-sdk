export * from './type-test'
export * from './uid'
export * from './object'
export * from './blob'

export const sleep = (time = 600, mockError = false) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      mockError ? reject(false) : resolve(true)
    }, time)
  })
}

export const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  wait = 300
): ((...args: Parameters<T>) => void) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      // @ts-ignore
      fn.apply(this, args)
    }
  }
}
