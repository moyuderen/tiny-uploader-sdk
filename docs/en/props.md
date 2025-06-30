# Configuration

## accept

Equivalent to `<input type="file" accept='video/*'>`. See the [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) attribute.

- **Type:** `string | string[]`
- **Default:** `*`
- **Usage examples:**

  1. Set during instance initialization:

  ```ts
  const uploader = new Uploader({
    accept: '.jpg'
  })
  ```

  2. Set when calling the `assignBrowse` method (overrides initial config):

  ```ts
  uploader.assignBrowse(domNode, { accept: ['.png'] })
  ```

## multiple

Equivalent to `<input type="file" multiple>`. See the [multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple) attribute.

- **Type:** `boolean`
- **Default:** `true`

## fileList

Default list of files.

- **Type:** [`UserFile[]`](/en/interface.md#user-file)
- **Default:** `[]`

## limit

Maximum number of files allowed to upload.

- **Type:** `number`
- **Default:** `10`

> [!NOTE]  
> Set to `0` for unlimited files.

## autoUpload

Whether to automatically start uploading after selecting files.

- **Type:** `boolean`
- **Default:** `true`

## customGenerateUid

Custom function to generate file IDs. If not a function or no value is returned, a default function is used.

- **Type:** `function | null`
- **Params:** `file`, see [FileContext](/en/instance.md#file-context)
- **Default:** `null`

**Example:**

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

File chunk size in bits. For example, `1024 * 1024 * 4` means 4MB.

- **Type:** `number`
- **Default:** `1024 * 1024 * 2`

## addFailToRemove

Whether to remove files from the list if adding fails.

- **Type:** `boolean`
- **Default:** `true`

## fakeProgress

Whether to show the maximum progress of file upload.

- **Type:** `boolean`
- **Default:** `true`

> [!NOTE]  
> If set to `false`, a failed chunk will reset its progress to 0, which may cause the progress bar to flicker or regress.

## withHash

Whether to enable `hash` calculation via `spark-md5`.

- **Type:** `boolean`
- **Default:** `true`

> [!NOTE]  
> Uses the `Spark` plugin from [`hashion`](https://www.npmjs.com/package/hashion) by default.

## useWebWoker <Badge type="danger" text="Previously named computedhashInWorker in 2.2.0" />

Whether to use a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to compute file hash. If `false`, hash is computed in the JS thread.

- **Type:** `boolean`
- **Default:** `true`

> [!IMPORTANT]  
> To enable `useWebWoker`, install and use the `SparkWorker` plugin from `hashion`.

**Using the `SparkWorker` plugin:**

```ts
import { SparkWorker } from 'hashion/sparkWorker'

uploader.use(SparkWorker)
```

## beforeAdd

Hook executed before uploading starts. Return `false` or a `Promise` that rejects to cancel the upload. The parameter is a [`file`](/en/instance.md#file-context). Cancelled files will be removed from `fileList` and trigger the [`Callbacks.FileRemove`](/en/callbacks.md#fileremove) callback.

- **Type:** `function`
- **Default:** `const beforeAdd = (file) => true`

**Examples:**

```ts
// Synchronous
const uploader = new Uploader({
  beforeAdd(file: FileContext) {
    return file.size <= 1024 * 1024 * 10
  }
})

// Asynchronous: Validate image dimensions
const uploader = new Uploader({
  beforeAdd(file: FileContext) {
    return new Promise((resolve, reject) => {
      const _URL = window.URL || window.webkitURL
      const image = new Image()
      image.src = _URL.createObjectURL(file)
      image.onload = () => {
        const isValid = image.width === 100 && image.height === 100
        isValid ? resolve() : reject(file)
      }
    })
  }
})
```

## beforeRemove

Hook before deleting a file. Return `false` or a `Promise` that rejects to cancel deletion.

- **Type:** `function`
- **Default:** `const beforeRemove = (file: FileContext) => true`

**Examples:**

```js
// Return true or false
const uploader = new Uploader({
  beforeRemove(file: FileContext) {
    return file.name === 'hah'
  }
})

// Return Promise
const uploader = new Uploader({
  beforeRemove(file) {
    return new Promise((resolve, reject) => {
      file.name === 'hah' ? resolve() : reject()
    })
  }
})
```

## name

The field name for the binary file data sent to the backend.

- **Type:** `string`
- **Default:** `file`

## action

The endpoint URL for file uploads.

- **Type:** `string`
- **Default:** `''`

## [withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)

- **Type:** `boolean`
- **Default:** `true`

## headers

Custom headers for upload requests.

- **Type:** `object | Function`
- **Default:** `{}`

## data

Custom data to send with the upload request.

- **Type:** `object | Function`
- **Default:** `{}`

## processData

Custom handler to process the `data` parameter.

- **Type:** `Function`
- **Default:** `(data, processType: ProcessType) => data`, see [ProcessType](./enum.md#process-type)

## maxRetries

Maximum number of retry attempts for a failed chunk upload.

- **Type:** `number`
- **Default:** `3`

## retryInterval

Interval (in ms) between retries for a failed chunk upload.

- **Type:** `number`
- **Default:** `1000`

## maxConcurrency

Maximum number of concurrent chunk uploads to avoid excessive requests.

- **Type:** `number`
- **Default:** `6`

## requestSucceed

Function to validate if the upload request succeeded, based on `xhr`. Must return a `boolean`.

- **Type:** `(xhr: any) => boolean`
- **Default:**

```js
const requestSucceed = (xhr) => {
  return [200, 201, 202].includes(xhr.status)
}
```

> [!NOTE]  
> Refer to [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) for available properties.

**Custom Example:**

```js
const requestSucceed = (xhr) => {
  const { code } = xhr.response
  return code === '00000'
}

const uploader = new Uploader({
  requestSucceed
})
```

## checkRequest <Badge type="danger" text="Previously named checkFileRequest in 2.2.0" />

Verifies file upload status for instant uploads and resuming uploads. Requires `withHash` to be enabled. The parameter is a [`file`](/en/instance.md#file-context).

- **Type:** [`CheckRequest`](/en/interface.md#check-request)
- **Default:**

```js
const checkRequest = (file: FileContext, data?: Record<string, any>, headers?: Record<string, string>) => {
  return {
    status: CheckStatus.None
  }
}
```

> [!NOTE]  
> See [CheckStatus](./enum.md#check-status)

**Example:**

```js
const CheckStatus = {
  Part: 'part',
  WaitMerge: 'waitMerge',
  Success: 'success',
  None: 'none'
}

const checkFileApi = (hash) => {
  // ...API call to check file
}

// Case 1: Default, no validation
async checkRequest(file, query, headers) {
  const hash = file.hash
  const { data } = await checkFileApi(hash)
  return { status: CheckStatus.None }
}

// Case 2: File fully uploaded
async checkRequest(file, query, headers) {
  const hash = file.hash
  const { data } = await checkFileApi(hash)
  return {
    status: CheckStatus.Success,
    data: 'http://baidu.com'
  }
}

// Case 3: Partial upload completed
async checkRequest(file, query, headers) {
  const hash = file.hash
  const { data } = await checkFileApi(hash)
  return {
    status: CheckStatus.Part,
    data: [0, 2, 4, 6, 8, 10]
  }
}

const uploader = new Uploader({
  checkRequest
})
```

## mergeRequest

Function to notify backend to merge file after all chunks are uploaded. If it returns `false` or a rejected `Promise`, the merge is considered failed.

- **Type:** [`MergeRequest`](/en/interface.md#merge-request)
- **Default:** `const mergeRequest = (file) => true`

**Example:**

```ts
const mergeRequest = async (file, query, headers) => {
  const { data } = await mergeFileApi(file)
  file.path = 'http://baidu.com' // 2.2.0+ will set `url` by default
  return data.url
}

const uploader = new Uploader({
  mergeRequest
})
```

## customRequest

Custom upload request function. If `null`, uses the built-in [`request`](/en/interface.md#request) function.

- **Type:** `null | Request`
- **Default:** `null`

> [!WARNING]  
> When using `customRequest`, you must return an `abort` method to support cancellation.

**Example:** See [RequestOptions](/en/interface.md#request)

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
