/**
 * 文件状态
 */
export const FileStatus = {
  /** 文件初始化状态 */
  Init: 'init',

  /** 文件添加失败, 添加文件时允许beforeAdd中失败的文件添加到列表，但是状态为AddFail */
  AddFail: 'addFail',

  /** 文件读取中（计算hash中） */
  Reading: 'reading',

  /** 文件hash计算完成；准备上传 */
  Ready: 'ready',

  /** checkRequest 存在时，切checkRequest失败 */
  CheckFail: 'checkFail',

  /** 文件上传中 */
  Uploading: 'uploading',

  /** 文件上传完成；所有chunk上传完成，准备合并文件 */
  UploadSuccess: 'uploadSuccess',

  /** 文件上传失败；有chunk上传失败 */
  UploadFail: 'uploadFail',

  /** 文件上传成功 且 合并成功 */
  Success: 'success',

  /** 文件合并失败 */
  Fail: 'fail',

  /** 文件暂停上传 */
  Pause: 'pause',

  /** 文件恢复上传 */
  Resume: 'resume',

  /** 文件删除 */
  Removed: 'removed'
} as const

export type FileStatus = (typeof FileStatus)[keyof typeof FileStatus]

/**
 * chunk上传状态
 */
export const ChunkStatus = {
  /** chunk初始化状态是Ready */
  Ready: 'ready',

  /** chunk创建请求成功，Promise处于Pending状态 */
  Pending: 'pending',

  /** chunk上传中 */
  Uploading: 'uploading',

  /** chunk上传成功 */
  Success: 'success',

  /** chunk上传失败（所有重试次数完成后 都不成功） */
  Fail: 'fail'
} as const

export type ChunkStatus = (typeof ChunkStatus)[keyof typeof ChunkStatus]

/**
 * 回调函数名称
 */
export const Callbacks = {
  /** 文件超出limit限制 */
  Exceed: 'exceed',

  /** 单个文件添加成功 */
  FileAdded: 'fileAdded',

  /** 文件添加失败 */
  FileAddFail: 'fileAddFail',

  /** 所有文件添加成功 */
  FilesAdded: 'filesAdded',

  /** 文件状态改变 */
  FileChange: 'fileChange',

  /** 文件删除 */
  FileRemove: 'fileRemove',

  /** 文件开始计算hash */
  FileReadStart: 'fileReadStart',

  /** 文件计算进度 */
  FileReadProgress: 'fileReadProgress',

  /** 文件hash计算完成 */
  FileReadEnd: 'fileReadEnd',

  FileReadFail: 'fileReadFail',

  /** 暂停操作 */
  FilePause: 'filePause',

  /** 重新上传操作 */
  FileResume: 'fileResume',

  /** 文件上传进度 */
  FileProgress: 'fileProgress',

  /** 文件上传成功 */
  FileUploadSuccess: 'fileUploadSuccess',

  /** 文件上传失败 */
  FileUploadFail: 'fileUploadFail',

  /** 文件合并成功 */
  FileSuccess: 'fileSuccess',

  /** 文件上传失败合并失败 */
  FileFail: 'fileFail',

  /** 所有文件上传成功 */
  AllFileSuccess: 'allFileSuccess'
} as const

/**
 * check 文件状态
 */
export const CheckStatus = {
  /** 文件还没上传 */
  None: 'none',

  /** 部分上传成功 */
  Part: 'part',

  /** 准备合并 */
  WaitMerge: 'waitMerge',

  /** 上传成功 */
  Success: 'success'
} as const

export type CheckStatus = (typeof CheckStatus)[keyof typeof CheckStatus]

/**
 * 文件上传 接口调用类型
 */
export const ProcessType = {
  /** check接口 */
  Check: 'check',

  /** upload chunk接口 */
  Upload: 'upload',

  /** merge接口 */
  Merge: 'merge'
} as const

export type ProcessType = (typeof ProcessType)[keyof typeof ProcessType]
