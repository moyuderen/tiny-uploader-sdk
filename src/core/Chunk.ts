import { generateUid, isFunction, parseData } from '../helper'
import { ChunkStatus, FileStatus, ProcessType, type ChunkStatusType } from './constants'
import { request, type Request, type RequestResult } from './request'
import FileContext from './FileContext'
import Uploader from './Uploader'
import type { UploaderOptions } from '../types'

class Chunk {
  /** Uploader实例 */
  uploader: Uploader
  /** Uploader配置 */
  options: UploaderOptions
  /** FileContext实例 */
  file: FileContext
  /** 文件唯一ID */
  fileId: string
  /** 文件二进制数据 */
  rawFile: File
  /** 文件hash值 */
  fileHash: string
  /** 文件名称 */
  filename: string
  /** 文件大小 */
  totalSize: number
  /** 分片大小 */
  chunkSize: number
  /** 分片总数 */
  totalChunks: number
  /** chunk唯一id */
  uid: string
  /** chunk在索引值 */
  chunkIndex: number
  /** chunk状态 */
  status: ChunkStatusType
  /** chunk bit 起始位置 */
  startByte: number
  /** chunk bit 结束位置 */
  endByte: number
  /** chunk 大小 */
  size: number
  /** chunk最大重试次数 */
  maxRetries: number
  /** chunk 真实上传进度 */
  progress: number
  /** chunk fake进度 */
  fakeProgress: number
  /** timer */
  timer: any
  /** 上传请求 */
  request: RequestResult | null
  /** 自定义上传请求 */
  customRequest: Request

  constructor(file: FileContext, index: number) {
    this.uploader = file.uploader
    this.options = file.uploader.options

    this.file = file
    this.rawFile = file.rawFile
    this.fileId = file.uid
    this.fileHash = file.hash
    this.filename = file.name
    this.totalSize = file.size
    this.chunkSize = this.options.chunkSize
    this.totalChunks = file.totalChunks

    this.uid = generateUid()
    this.chunkIndex = index
    this.status = ChunkStatus.Ready
    this.startByte = this.chunkSize * index
    this.endByte = Math.min(this.startByte + this.chunkSize, this.totalSize)
    this.size = this.endByte - this.startByte

    this.maxRetries = this.options.maxRetries

    this.progress = 0
    this.fakeProgress = 0
    this.timer = null

    this.request = null
    this.customRequest = this.options.customRequest || request
  }

  onSuccess(e: any, response: any, resolve: Function, reject: Function) {
    if (this.options.requestSucceed(response)) {
      this.status = ChunkStatus.Success
      this.file.removeUploadingChunk(this)
      if (this.file.isUploading()) {
        this.file.upload()
      }
      resolve(this)
    } else {
      this.onFail(e, reject)
    }
  }

  onFail(e: any, reject: Function) {
    this.progress = 0
    this.file.setProgress()
    if (this.request?.canceled) {
      return
    }
    if (this.maxRetries <= 0) {
      this.file.removeUploadingChunk(this)
      this.status = ChunkStatus.Fail
      if (this.file.isUploading()) {
        this.file.upload()
      }
      reject(e, this)
    } else {
      this.timer = setTimeout(() => {
        this.send()
        this.maxRetries--
        clearTimeout(this.timer)
      }, this.options.retryInterval)
    }
  }

  onProgress(e: ProgressEvent) {
    this.progress = Math.min(1, e.loaded / e.total)
    this.fakeProgress = Math.max(this.progress, this.fakeProgress)

    this.status = ChunkStatus.Uploading
    this.file.changeStatus(FileStatus.Uploading)
    this.file.setProgress()
  }

  prepare() {
    const { name, data, processData } = this.options
    const { data: fileData } = this.file
    const defaults = {
      [name]: this.file.rawFile.slice(this.startByte, this.endByte),
      hash: this.fileHash,
      id: this.uid,
      fileId: this.fileId,
      index: this.chunkIndex,
      filename: this.filename,
      size: this.size,
      totalSize: this.totalSize,
      totalChunks: this.totalChunks,
      ...parseData(data),
      ...fileData
    }
    if (!isFunction(processData)) {
      return defaults
    }
    return processData(defaults, ProcessType.Upload) || defaults
  }

  send() {
    this.status = ChunkStatus.Pending
    const { action, headers, withCredentials, name } = this.options

    return new Promise((resolve, reject) => {
      this.request = this.customRequest({
        action,
        name,
        withCredentials,
        headers: parseData(headers),
        data: this.prepare(),
        query: {
          ...parseData(this.options.data),
          ...this.file.data
        },
        onSuccess: (e, response) => this.onSuccess(e, response, resolve, reject),
        onFail: (e) => this.onFail(e, reject),
        onProgress: (e) => this.onProgress(e)
      })
      this.request.canceled = false
    })
  }

  abort() {
    this.status = ChunkStatus.Ready
    if (this.request) {
      this.request.canceled = true
      this.request.abort()
    }
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}

export default Chunk
