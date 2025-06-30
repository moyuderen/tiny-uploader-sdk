# 实例

## Uploader {#uploader}

```typescript
class Uploader {
  /** 挂载事件容器实例 */
  private container;
  /** 事件派发监听 */
  private event;
  /** 配置项 */
  options: UploaderOptions;
  /** 计算hash方法实例 */
  hasher: Hashion | null;
  /** 文件列表 */
  fileList: Array<FileContext>;
  constructor(options?: UserUploaderOptions);
  on(name: string, fn: Function): void;
  emit(name: string, ...args: any[]): void;
  emitCallback(name: string, ...args: any[]): void;
  updateData(data: Record<string, any>): void;
  updateHeaders(headers: Record<string, string>): void;
  setOption(options: UserUploaderOptions): void;
  use(plugin: Plugin_2): void;
  formatAccept(accept?: string | string[]): string | string[] | undefined;
  assignBrowse(domNode: HTMLElement, userAttributes?: UserAttributes): void;
  assignDrop(domNode: HTMLElement): void;
  _setupFileListeners(): void;
  setDefaultFileList(fileList: UserFile[]): void;
  addFiles(arrayLike: File[]): Promise<void>;
  _handleFileAdd(file: FileContext, beforeAdd: BeforeAdd): Promise<void>;
  upload(): Promise<void>;
  submit(): void;
  remove(file: FileContext): void;
  clear(): void;
  doRemove(file: FileContext): void;
  pause(file: FileContext): void;
  resume(file: FileContext): void;
  retry(file: FileContext): void;
  destroy(): void;
}
```

## FileContext {#file-context}

```typescript
class FileContext {
  /** uploader实例 */
  uploader: Uploader;
  /** uploader配置项 */
  options: UploaderOptions;
  /** 计算hash的方法 */
  hasher: Hashion;
  /** 文件ID */
  id?: string;
  /** 文件唯一ID */
  uid: string;
  /** 文件状态 */
  status: FileStatus | '';
  /** 文件状态变更记录 */
  prevStatusLastRecord: string[];
  /** 文件二进制 */
  rawFile: File;
  /** 文件名称 */
  name: string;
  /** 文件大小 */
  size: number;
  /** 文件类型 */
  type: string;
  /** 文件hash值 */
  hash: string;
  /** 文件http地址 */
  url: string;
  /** 文件上传进度 */
  progress: number;
  /** 分片大小 */
  chunkSize: number;
  /** 分块chunk集合 */
  chunks: Chunk[];
  /** 分片总数 */
  totalChunks: number;
  /** 上传中chunk集合 */
  uploadingChunks: Set<Chunk>;
  /** 文件读取进度（hash计算进度） */
  readProgress: number;
  /** 错误信息 */
  errorMessage: string;
  /** 文件自定义data */
  data: Record<string, any>;
  /** abortRead */
  abortRead: any;
  constructor(file: File, uploader: Uploader, defaults: UserFile | null);
  generateId(): string;
  setErrorMessage(message: string): this;
  setData(data: Record<string, any>): this;
  get renderSize(): string;
  changeStatus(newStatus: FileStatus): void;
  isInit(): boolean;
  isAddFail(): boolean;
  isReading(): boolean;
  isReady(): boolean;
  isCheckFail(): boolean;
  isUploading(): boolean;
  isUploadSuccess(): boolean;
  isUploadFail(): boolean;
  isSuccess(): boolean;
  isFail(): boolean;
  isPause(): boolean;
  isResume(): boolean;
  createChunks(): void;
  read(): Promise<void>;
  _computeHash(): Promise<Required<HashCallbackData>>;
  _processData(processType: ProcessType): {
      [x: string]: any;
  };
  checkRequest(): Promise<void>;
  addUploadingChunk(chunk: Chunk): void;
  removeUploadingChunk(chunk: Chunk): void;
  upload(): Promise<void>;
  setProgress(): void;
  uploadFail(): void;
  uploadSuccess(): void;
  merge(): Promise<void>;
  mergeFail(): void;
  success(): void;
  _continueUpload(): void;
  cancel(): void;
  remove(): Promise<void>;
  pause(): void;
  resume(): void;
  retry(): void;
}
```

> [!NOTE]
> 枚举[`FileStatus`](enum.md#file-status)

## Chunk {#chunk}

```typescript
class Chunk {
  /** Uploader实例 */
  uploader: Uploader;
  /** Uploader配置 */
  options: UploaderOptions;
  /** FileContext实例 */
  file: FileContext;
  /** 文件唯一ID */
  fileId: string;
  /** 文件二进制数据 */
  rawFile: File;
  /** 文件hash值 */
  fileHash: string;
  /** 文件名称 */
  filename: string;
  /** 文件大小 */
  totalSize: number;
  /** 分片大小 */
  chunkSize: number;
  /** 分片总数 */
  totalChunks: number;
  /** chunk唯一id */
  uid: string;
  /** chunk在索引值 */
  chunkIndex: number;
  /** chunk状态 */
  status: ChunkStatus;
  /** chunk bit 起始位置 */
  startByte: number;
  /** chunk bit 结束位置 */
  endByte: number;
  /** chunk 大小 */
  size: number;
  /** chunk最大重试次数 */
  maxRetries: number;
  /** chunk 真实上传进度 */
  progress: number;
  /** chunk fake进度 */
  fakeProgress: number;
  /** timer */
  timer: any;
  /** 上传请求 */
  request: RequestResult | null;
  /** 自定义上传请求 */
  customRequest: Request_2;
  constructor(file: FileContext, index: number);
  onSuccess(e: any, response: any, resolve: Function, reject: Function): void;
  onFail(e: any, reject: Function): void;
  onProgress(e: ProgressEvent): void;
  prepare(): {
      [x: string]: any;
      hash: string;
      id: string;
      fileId: string;
      index: number;
      filename: string;
      size: number;
      totalSize: number;
      totalChunks: number;
  };
  send(): Promise<unknown>;
  abort(): void;
}
```

> [!NOTE]
> 枚举[`ChunkStatus`](enum.md#chunk-status)
