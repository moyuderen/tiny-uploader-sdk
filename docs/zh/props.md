# 配置

## accept

`<input type="file" accept='video/*'>`，[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) 属性

- **类型** `string | string[]`
- **默认值** `*`
- **使用示例**

  1. 在初始化实例时配置

  ```ts
  const uploader = new Uploader({
    accept: '.jpg'
  })
  ```

  2. 调用`assignBrowse`方法时配置，会覆盖初始化时的配置

  ```ts
  uploader.assignBrowse(domNode, { accept: ['.png'] })
  ```

## multiple

`<input type="file" multiple>`，[multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple) 属性

- **类型** `boolean`
- **默认值** `true`

## fileList

默认文件列表

- **类型** [`UserFile[]`](/zh/interface.md#user-file),
- **默认值** `[]`

## limit

上传文件限制最大数量

- **类型** `number`
- **默认值** `10`

> [!NOTE]
> 如果设置为`0`，则不限制数量

## autoUpload

选择文件后是否自动上传

- **类型** `boolean`
- **默认值** `true`

## customGenerateUid

自定义文件id生成函数，如果不是函数或者没有返回值，会使用默认的生成函数

**类型** `function | null`

**参数** `file`, [FileContext](/zh/instance.md#file-context)

**默认值** `null`

**使用示例**

```ts
let id = 0
const customGenerateUid = (file: FileContext) => {
  return Date.now + file.name + id++
}
const uploader = new Uploader({
  customGenerateUid
})
```

## chunkSize

文件分片大小，单位是`bit`，例如`1024 * 1024 * 4` 表示`4M`

**类型** `number`

**默认值** `1024 * 1024 * 2`

## addFailToRemove

添加文件失败后是否从文件列表中移除

**类型** `boolean`

**默认值** `true`

## fakeProgress

是否展示文件最大上传进度

**类型** `boolean`

**默认值** `true`

> [!NOTE]
> 如果值为`false`, 某个chunk上传失败时，该chunk的进度会重置为0，导致文件进度条抖动或者回退

## withHash

是否开启通过`spark-md5`生成文件的`hash`计算

**类型** `boolean`

**默认值** `true`

> [!NOTE]
> 默认使用了[`hashion`](https://www.npmjs.com/package/hashion)的`Spark`插件

## useWebWoker <Badge type="danger" text=" 2.2.0之前名称computedhashInWorker" />

计算文件`hash`值时使用[`Web Workers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)计算，为`false`时在 js 线程中计算

**类型** `boolean`

**默认值** `true`

> [!IMPORTANT]
> 如果要开启`useWebWoker`，需要安装使用[`hashion`](https://www.npmjs.com/package/hashion)的`SparkWorker`插件

**使用`SparkWorker`插件**
```ts
import { SparkWorker } from 'hashion/sparkWorker'

uploader.use(SparkWorker)

```

## beforeAdd

所有上传动作开始上传前的钩子, 返回`false` 或者 返回 `Promise` 且被 `reject` 则停止上传，参数是 [`file`](/zh/instance.md#file-context)， 停止后会从`fileList`中删除，并且触发[`Callbacks.FileRemove`](/zh/callbacks.md#fileremove)回调

**类型** `function`

**默认值** `const beforeAdd = (file) => true`

**示例**

```ts
// 同步代码
const uploader = new Uploader({
  beforeAdd(file: FileContext) {
    if (file.size > 1024 * 1024 * 10) {
      return false
    }
  }
})

// 异步代码 校验图片的宽高
const uploader = new Uploader({
  beforeAdd(file: FileContext) {
    return new Promise((resolve, reject) => {
      const _URL = window.URL || window.webkitURL
      const image = new Image()
      image.src = _URL.createObjectURL(file)
      image.onload = () => {
        const isValid = image.width === 100 && image.height === 100
        if (isValid) {
          resolve()
        } else {
          reject(file)
        }
      }
    })
  }
})
```

## beforeRemove

删除文件前的钩子, 返回`false` 或者 返回 `Promise` 且被 `reject` 则不会删除

**类型** `function`

**默认值** `const beforeRemove = (file: FileContext) => true`

**示例**

```js
// 返回true或者false
const uploader = new Uploader({
  beforeRemove(file: FileContext) {
    if (file.name === 'hah') {
      return true
    }
    return false
  }
})

// 返回Promise
const uploader = new Uploader({
  beforeRemove(file) {
    return new Promise((resolve, reject) => {
      if (file.name === 'hah') {
        resolve()
      } else {
        reject()
      }
    })
  }
})
```

## name

上传二进制文件数据，参数名称

- **类型** `string`
- **默认值** `file`

## action

上传文件的接口地址

- **类型** `string`

- **默认值** `''`

## [withCredentials](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

**类型** `boolean`

**默认值** `true`

## headers

上传接口携带自定义 headers

**类型** `object | Function`

**默认值** `{}`

## data

上传接口携带自定义参数

**类型** `object | Function`

**默认值** `{}`

## processData

处理自定义的data参数

**类型** `Function`

**默认值** `(data, processType: ProcessType) => data`, [ProcessType](./enum.md#process-type)

## maxRetries

上传中 chunk 上传失败时的重试次数

**类型** `number`

**默认值** `3`

## retryInterval

上传中 chunk 上传失败时的重试的间隔时间，单位是`ms`

**类型** `number`

**默认值** `1000`

## maxConcurrency

上传中 chunk 最大并发数，防止过多请求

**类型** `number`

**默认值** `6`

## requestSucceed

校验是否上传成功，根据接口定义，通过 http 的 `status` 或者 `code` 判断，参数是`xhr` 对象

**类型** `(xhr: any) => boolean`

**默认值**

```js
const requestSucceed = (xhr) => {
  return [200, 201, 202].includes(xhr.status)
}
```

> [!NOTE]
> xhr 属性参考 -> [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

**示例**

```js{2-3}
const requestSucceed = (xhr) => {
  const { code } = xhr.response
  return code === '00000' // 代码接口成功
}

const uploader = new Uploader({
  requestSucceed
})
```

## checkRequest <Badge type="danger" text=" 2.2.0之前名称checkFileRequest" />

校验文件，秒传，断点续传。使用时保证`withHash`开启，因为校验时会用到 hash 去后端校验。参数是 [`file`](/zh/instance.md#file-context)

**类型** [`CheckRequest`](/zh/interface.md#check-request)

**默认值**

```js{3}
const checkRequest = (file: FileContext, data?: Record<string, any>, headers?: Record<string, string>) => {
  return {
    status: CheckStatus.None
  }
}
```

> [!NOTE]
>
> [CheckStatus](./enum.md#check-status)

**示例**

```js{15,22-25,32-35}
const CheckStatus = {
  Part: 'part', // 部分上传成功
  WaitMerge: 'waitMerge', // 准备合并
  Success: 'success', // 全部上传成功
  None: 'none' // 没有上传
}

const checkFileApi = (hash) => {
  // ...
}

// 情况一；默认不校验
async checkRequest(file, query, headers) {
  const hash = file.hash
  const { data } = await checkFileApi(hash)
  return { status: CheckStatus.None }
}

// 情况二；根据文件hash,文件已经上传
async checkRequest(file, query, headers) {
  const hash = file.hash
  const { data } = await checkFileApi(hash)
  return {
    status: CheckStatus.Success,
    data: 'http://baidu.com' // data是一个上传成功文件的url地址
  }
}

// 情况三；根据文件hash,文件部分上传成功
async checkRequest(file, query, headers) {
  const hash = file.hash
  const { data } = await checkFileApi(hash)
  return {
    status: CheckStatus.Part,
    data: [0, 2, 4, 6, 8, 10] // data是已经上传成功chunk的chunkIndex
  }
}

const uploader = new Uploader({
  checkRequest
})
```

## mergeRequest

所有 chunk 上传成功之后调用的 merge 通知后端合并文件的函数, 参数 file，一般后端会返回一个文件的 obs 地址。 返回`false` 或者 返回 `Promise` 且被 `reject`则合并失败

**类型** [`MergeRequest`](/zh/interface.md#merge-request)

**默认值** `const mergeRequest = (file) => true`

**示例**

```ts
const mergeRequest = async (file, query, headers) => {
  const { data } = await mergeFileApi(file)
  file.path = 'http://baidu.com'  // 2.2.0默认会设置url // [!code --]  
  return data.url
}
const uploader = new Uploader({
  mergeRequest
})
```

## customRequest

自定义上传接口, 默认为null,使用内置的[request](/zh/interface.md#request)请求

**类型** `null | Request`

**默认值** `null`

> [!WARNING]
> 如果自定义customRequest, 需要返回一个`abort`方法来取消请求

**示例** [RequestOptions](/zh/interface.md#request)

```ts
const customRequest = (options: RequestOptions) => {
  const { action, data, query, headers, name, withCredentials, onSuccess, onFail, onProgress } =
    options
  const realData = {
    fileHashCode: data.hash,
    uploadId: data.fileId,
    chunkNumber: data.index + 1,
    chunkSize: data.size,
    totalChunks: data.totalChunks,
    [name]: data[name],
    hash: data.hash,
    filename: data.filename,
    index: data.index,
    ...query
  }
  const formData = new FormData()

  Object.keys(realData).forEach((key) => {
    formData.append(key, realData[key])
  })
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  axios({
    url: `${BASE_URL}/upload`,
    method: 'POST',
    data: formData,
    headers: headers,
    cancelToken: source.token,
    withCredentials: withCredentials,
    onUploadProgress: onProgress
  })
    .then((response) => {
      onSuccess(action, response)
    })
    .catch((e) => {
      onFail(e)
    })

  return {
    abort() {
      source.cancel('Operation canceled by the user.')
    }
  }
}
```
