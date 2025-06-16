import type { FileContext, RequestOptions, UserUploaderOptions } from '../src'
import { request } from './request'

const BASE_URL = 'http://localhost:3000/file'
// const BASE_URL = 'https://tiny-uploader-server.vercel.app/file'

export const actionList = [
  'http://localhost:3000/file/upload',
  'https://tiny-uploader-server.vercel.app/file'
]

export const requestSucceed = (response: any) => {
  const { status } = response
  if (status >= 200 && status < 300) {
    return true
  }
  return false
}

export const userOptions: UserUploaderOptions & { drag: boolean } = {
  drag: true,
  // input相关
  accept: '*',
  multiple: true,
  // 文件相关
  limit: 10,
  autoUpload: true,
  addFailToRemove: true,
  chunkSize: 2,
  fakeProgress: true,
  withHash: true,
  // useWebWoker: true,
  // 上传相关
  name: 'file',
  action: 'http://localhost:3000/file/upload',
  withCredentials: true,
  data: {
    bucket: 'test-public',
    filePath: 'files/test01/'
  },
  headers: {
    userauth: 'xxxxx-xxxx-xxxxx'
  },
  maxConcurrency: 6,
  maxRetries: 3,
  retryInterval: 1000,
  requestSucceed
}

export const customRequest = (options: RequestOptions) => {
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
    // status_error: '1',
    // code_error: '1',
    ...query
  }
  const formData = new FormData()

  Object.keys(realData).forEach((key) => {
    formData.append(key, realData[key])
  })
  // @ts-ignore
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  request({
    url: `${BASE_URL}/upload`,
    method: 'POST',
    data: formData,
    headers: headers,
    cancelToken: source.token,
    withCredentials: withCredentials,
    onUploadProgress: onProgress,
    rawResponse: true
  })
    .then((res: any) => {
      onSuccess && onSuccess(action, res)
    })
    .catch((e: any) => {
      onFail && onFail(e, null)
    })

  return {
    abort() {
      source.cancel('Operation canceled by the user.')
    }
  }
}

export const checkRequest = async (
  file: FileContext,
  query: Record<string, any>,
  headers: Record<string, string>
) => {
  const { data } = await request.get(`${BASE_URL}/check`, {
    params: {
      // status_error: '1',
      // code_error: '1',
      hash: file.hash,
      filename: file.name,
      status: 'none',
      ...query
    },
    headers
  })
  return data
}

export const mergeRequest = async (
  file: FileContext,
  query: Record<string, any>,
  headers: Record<string, string>
) => {
  const { data } = await request.get(`${BASE_URL}/merge`, {
    params: {
      // status_error: '1',
      // code_error: '1',
      hash: file.hash,
      filename: file.name,
      ...query
    },
    headers
  })
  return data
}
