import { isBlob } from '../src/helper'

const logger = (e: any) => {
  console.warn('接口reject', e)
}

const disposeJsonResponse = (response: any, responseData?: any) => {
  const {
    config: { rawResponse },
    data: { code }
  } = response

  const data = responseData || response.data

  if (code === '00000') {
    return rawResponse ? response : data
  }
  logger(data)
  return Promise.reject(data)
}

const disposeBlobResponse = async (response: any) => {
  const {
    config: { rawResponse },
    data
  } = response

  if (!data.text) {
    logger(data)
    return Promise.reject(data)
  }

  try {
    const blobString = await data.text()
    const responseData = JSON.parse(blobString)
    return disposeJsonResponse(response, responseData)
  } catch {
    return rawResponse ? response : data
  }
}
// @ts-ignore
const request = axios.create({
  baseURL: 'http://localhost:3000/file',
  timeout: 10000,
  withCredentials: true
})

request.interceptors.request.use(
  function (config: any) {
    return config
  },
  function (error: any) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response: any) {
    const { data } = response
    return isBlob(data) ? disposeBlobResponse(response) : disposeJsonResponse(response)
  },
  function (error: any) {
    logger(error)
    return Promise.reject(error)
  }
)

export { request }
