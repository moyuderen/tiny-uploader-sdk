import { CheckStatus } from './constants'
import type { UploaderOptions } from '../types'
import { FileContext } from './FileContext'

export const defaultOptions: UploaderOptions = {
  // input 属性相关
  accept: '*',
  multiple: true,

  // 文件相关
  fileList: [],
  limit: 10,
  autoUpload: true,
  customGenerateUid: undefined,
  beforeAdd: (_file: FileContext) => true,
  beforeRemove: (_file: FileContext) => true,
  addFailToRemove: true,
  chunkSize: 2 * 1024 * 1024, // 2M
  fakeProgress: true,
  withHash: true,
  useWebWoker: false,

  // 上传逻辑相关
  name: 'file',
  action: '',
  customRequest: null,
  withCredentials: true,
  headers: {},
  data: {},
  requestSucceed: (xhr) => [200, 201, 202, 206].includes(xhr.status),
  maxConcurrency: 6,
  maxRetries: 3,
  retryInterval: 1000,
  checkRequest: (_file) => ({ status: CheckStatus.None }),
  mergeRequest: (_file) => true,
  processData: (data, _processType) => data
}
