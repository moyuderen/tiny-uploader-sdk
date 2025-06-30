# Props

## accept

`<input type="file" accept='video/*'>`[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) attribute

- **Type** `string | string[]`
- **Default** `*`
- **Using**

  1. Can be configured when initializing

  ```js
  const uploader = new Uploader({
    accept: '.jpg'
  })
  ```

  2. Can be configured when calling `assignBrowse` method, which will override the initial configuration

  ```js
  uploader.assignBrowse(domNode, { accept: ['.png'] })
  ```

## multiple

`<input type="file" multiple>`[multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple) attribute

- **Type** `boolean`
- **Default** `true`

## fileList

Default file list

- **Type** [`UserFile[]`](/sdk/interface.md#user-file),
- **Default** `[]`

## limit

Upload file limit max count

- **Type** `number`
- **Default** `10`

> [!NOTE]
> if value is `0`, will not limit count

## autoUpload

auto upload after select file

- **Type** `boolean`
- **Default** `true`

## customGenerateUid

file uid generate function, if not function, will use sdk own function

**Type** `function | null`

**Params** `file`, [FileContext](./instance.md#file-context)

**Default** `null`

**Example**

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

size of chunk when upload file, unit is `bit`, for example `1024 * 1024 * 4` means `4M`

**Type** `number`

**Default** `1024 * 1024 * 2`

## addFailToRemove

if add file failed, will remove file from fileList

**Type** `boolean`

**Default** `true`

## fakeProgress

show max progress value when upload file, because when chunk upload failed, chunk progress will be 0, so the file progress will have a back and forth jittering

**Type** `boolean`

**Default** `true`


## withHash

是否通过`spark-md5`生成文件的`hash`值

**类型** `boolean`
**默认值** `true`

## useWebWoker <Badge type="danger" text=" 2.2.0之前名称computedhashInWorker" />

计算文件`hash`值时使用[`Web Workers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)计算，为`false`时在 js 线程中计算

**类型** `boolean`
**默认值** `true`

## beforeAdd

所有上传动作开始上传前的钩子, 返回`false` 或者 返回 `Promise` 且被 `reject` 则停止上传，参数是 `file`, 停止后会从`fileList`中删除，并且触发`Callbacks.FileRemove`回调

**类型** `function`

**默认值** `const beforeAdd = (file) => true`

**示例**

```js
// 同步代码
const uploader = new Uploader({
  beforeAdd(file) {
    if (file.size > 1024 * 1024 * 10) {
      return false
    }
  }
})

// 异步代码 校验图片的宽高
const uploader = new Uploader({
  beforeAdd(file) {
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

**默认值** `const beforeRemove = (file) => true`

**示例**

```js
// 返回true或者false
const uploader = new Uploader({
  beforeRemove(file) {
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

## withCredentials

[XMLHttpRequest：withCredentials 属性](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

**类型** `boolean`

**默认值** `true`

## headers

上传接口携带自定义 headers

**类型** `object`

**默认值** `{} | Function`

## data

上传接口携带自定义参数

**类型** `object`

**默认值** `{} | Function`

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

**类型** `function`

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

校验文件，秒传，断点续传。使用时保证 withHash 开启，因为校验时会用到 hash 去后端校验。参数是 file

**类型** `function`

**默认值**

```js{3}
const checkRequest = (file) => {
  return {
    status: CheckStatus.None
  }
}
```

> [!NOTE]
>
> [CheckStatus.None](./enum.md#check-status)

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

**类型** `function`

**默认值** `const mergeRequest = (file) => true`

**示例**

```js
const mergeFileApi = (hash) => {
  // ...
}

const mergeRequest = async (file, query, headers) => {
  const { data } = await mergeFileApi(file)
  file.path = 'http://baidu.com' // [!code --]   // 2.2.0默认会设置url
  return data.url
}
const uploader = new Uploader({
  mergeRequest
})
```

## customRequest

自定义上传接口, 默认为null,使用内置的[request](/sdk/interface.md#request)请求

**类型** `null | function`

**默认值** `null`

> [!WARNING]
> 如果自定义customRequest, 需要返回一个`abort`方法来取消请求

**示例** [CustomRequestOption](/sdk/interface.md#custom-request-option)

```ts
const customRequest = (options: CustomRequestOption) => {
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
    // error: '1',
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
    .then((res) => {
      onSuccess(action, res)
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
