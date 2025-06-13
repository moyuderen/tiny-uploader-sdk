export type RequestOptions = {
  /** http method类型 */
  method?: 'POST' | 'GET' | 'PUT'
  /** 是否该使用类似 cookie、Authorization 标头 */
  withCredentials?: boolean
  /** 响应的数据类型 */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text' | ''
  /** 上传接口endpoint */
  action: string
  /** 自定义上传参数 */
  data: Record<string, any>
  /** 上传接口headers */
  headers: Record<string, string>
  /** 文后端接收文件name */
  name: string
  /** 自定义data 包括file上自定义的data */
  query: Record<string, any>
  /** 响应成功回调 */
  onSuccess?: (e: any, request: any) => void
  /** 响应失败回调 */
  onFail?: (e: any, request: any) => void
  /** 上传进度回调 */
  onProgress?: (e: ProgressEvent) => void
}
export type Request = typeof request

export type RequestResult = {
  abort: () => void
  canceled?: boolean
}

export function request(options: RequestOptions): RequestResult {
  const {
    method = 'POST',
    withCredentials = true,
    responseType = 'json',
    action,
    data,
    // query,
    headers,
    onSuccess,
    onFail,
    onProgress
  } = options

  let xhr = new XMLHttpRequest()
  xhr.responseType = responseType
  xhr.withCredentials = withCredentials
  xhr.open(method, action, true)

  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value))

  // 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED
  if ('setRequestHeader' in xhr) {
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))
  }

  xhr.addEventListener('timeout', () => {
    if (onFail) {
      onFail(new Error('Request timed out'), xhr)
    }
  })
  xhr.upload.addEventListener('progress', (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
    if (onProgress) {
      onProgress(e)
    }
  })
  xhr.addEventListener(
    'error',
    (e) => {
      if (onFail) {
        onFail(e, xhr)
      }
    },
    false
  )
  xhr.addEventListener('readystatechange', (e) => {
    if (xhr.readyState !== 4) return
    if (xhr.status < 200 || xhr.status >= 300) {
      if (onFail) {
        onFail(new Error(`xhr: status === ${xhr.status}`), xhr)
      }
      return
    }
    if (onSuccess) onSuccess(e, xhr)
  })
  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
      // @ts-ignore
      xhr = null
    }
  }
}
