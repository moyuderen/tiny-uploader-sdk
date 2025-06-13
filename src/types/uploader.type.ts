import FileContext from '../core/FileContext'
import type { CheckStatus, ProcessType } from '../core/constants'
import type { UserFile } from './'

export type BeforeAdd = (file: FileContext) => Promise<boolean | any> | boolean | any
export type BeforeRemove = BeforeAdd

type CheckRequestResult = {
  status: CheckStatus
  data?: any
}

/**
 * 校验上传状态请求
 */
type CheckRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<CheckRequestResult> | CheckRequestResult

type MergeRequestResult = boolean | string
/**
 * 文件合并自定义接口
 */
type MergeRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<MergeRequestResult> | MergeRequestResult

/**
 * 上传实例参数配置
 */
export type UploaderOptions = {
  /**
   * input 属性相关
   */
  /** 允许文件上传类型 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept*/
  accept: string

  /** 是否允许上传多个文件 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/multiple */
  multiple: boolean

  /**
   * 文件相关
   */

  /** 文件列表 */
  fileList: UserFile[]

  /** 最大上传数 */
  limit: number

  /** 是否自动上传 */
  autoUpload: boolean

  /** 自定义uid计算方法 */
  customGenerateUid?: (file: FileContext) => string

  /** 添加文件之前校验 */
  beforeAdd: BeforeAdd

  /** 删除文件之前校验 */
  beforeRemove: BeforeRemove

  /** 添加失败时是否删除文件 */
  addFailToRemove: boolean

  /** 分片大小 */
  chunkSize: number

  /** fake进度条 */
  fakeProgress: boolean

  /** 是都计算文件hash */
  withHash: boolean

  /** 是否使用 Web Worker */
  useWebWoker: boolean

  /**
   * 上传逻辑相关
   */

  /** 后端接收文件对象名称 */
  name: string

  /** 上传接口 endPoint */
  action: string

  /** */
  customRequest: null

  /** 是否该使用类似 cookie、Authorization 标头 */
  withCredentials: boolean

  /** 自定义上传参数 */
  data: Record<string, any>

  /** 上传接口headers */
  headers: Record<string, string>

  /** 接口是否成功逻辑 */
  requestSucceed: (xhr: any) => boolean

  /** 最大并发数量 */
  maxConcurrency: 6

  /** 最大重试次数 */
  maxRetries: 3

  /** 重试间隔（单位ms）*/
  retryInterval: 1000

  /** 校验文件上传状态 */
  checkRequest: CheckRequest

  /** 文件merge请求 */
  mergeRequest: MergeRequest

  /** 用户设置自定义data */
  processData: <T>(data: T, processType: ProcessType) => T
}

/**
 * 用户配置参数
 */
export type UserUploaderOptions = Partial<UploaderOptions>

/**
 * Uploader插件
 */

export type Plugin = {
  pluginName: string
}
