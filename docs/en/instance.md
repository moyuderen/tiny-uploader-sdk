# Instances

## Uploader {#uploader}

```typescript
class Uploader {
  /** Mounted event container instance */
  private container;
  /** Event dispatcher and listener */
  private event;
  /** Configuration options */
  options: UploaderOptions;
  /** Hashing instance */
  hasher: Hashion | null;
  /** File list */
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
  /** Uploader instance */
  uploader: Uploader;
  /** Uploader configuration */
  options: UploaderOptions;
  /** Hashing method */
  hasher: Hashion;
  /** File ID */
  id?: string;
  /** Unique file ID */
  uid: string;
  /** File status */
  status: FileStatus | '';
  /** File status change history */
  prevStatusLastRecord: string[];
  /** Raw file object */
  rawFile: File;
  /** File name */
  name: string;
  /** File size */
  size: number;
  /** File type */
  type: string;
  /** File hash */
  hash: string;
  /** File HTTP URL */
  url: string;
  /** File upload progress */
  progress: number;
  /** Chunk size */
  chunkSize: number;
  /** Chunk collection */
  chunks: Chunk[];
  /** Total number of chunks */
  totalChunks: number;
  /** Currently uploading chunks */
  uploadingChunks: Set<Chunk>;
  /** File read progress (hash calculation progress) */
  readProgress: number;
  /** Error message */
  errorMessage: string;
  /** Custom file data */
  data: Record<string, any>;
  /** Abort read handler */
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
> See enum [`FileStatus`](enum.md#file-status)

## Chunk {#chunk}

```typescript
class Chunk {
  /** Uploader instance */
  uploader: Uploader;
  /** Uploader configuration */
  options: UploaderOptions;
  /** FileContext instance */
  file: FileContext;
  /** Unique file ID */
  fileId: string;
  /** Raw file object */
  rawFile: File;
  /** File hash */
  fileHash: string;
  /** File name */
  filename: string;
  /** Total file size */
  totalSize: number;
  /** Chunk size */
  chunkSize: number;
  /** Total number of chunks */
  totalChunks: number;
  /** Unique chunk ID */
  uid: string;
  /** Chunk index */
  chunkIndex: number;
  /** Chunk status */
  status: ChunkStatus;
  /** Chunk start byte */
  startByte: number;
  /** Chunk end byte */
  endByte: number;
  /** Chunk size */
  size: number;
  /** Maximum retry attempts for the chunk */
  maxRetries: number;
  /** Actual upload progress */
  progress: number;
  /** Simulated upload progress */
  fakeProgress: number;
  /** Timer */
  timer: any;
  /** Upload request */
  request: RequestResult | null;
  /** Custom upload request */
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
> See enum [`ChunkStatus`](enum.md#chunk-status)
