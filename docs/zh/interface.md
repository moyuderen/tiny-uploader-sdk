# 接口类型

## UserFile {#user-file}

```typescript
type UserFile = {
  /** 文件id */
  id: string | number;
  /** 文件名 */
  name: string;
  /** 文件url */
  url: string;
} & File;
```

## RequestData 上传接口默认参数 {request-data}

```ts
type RequestData = {
  [name]: blob // chunk二进制数据， name是配置中的名称，默认是file
  hash: string // 文件hash
  id: string // chunk id
  fileId: string // file id
  index: number // 从0开始
  filename: string
  size: number
  totalSize: number
  totalChunks: number
}
```

## Request {#request}

```ts
function request(options: RequestOptions): RequestResult

type RequestOptions = {
  /** http method类型 */
  method?: 'POST' | 'GET' | 'PUT';
  /** 是否该使用类似 cookie、Authorization 标头 */
  withCredentials?: boolean;
  /** 响应的数据类型 */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text' | '';
  /** 上传接口endpoint */
  action: string;
  /** 自定义上传参数 */
  data: Record<string, any>;
  /** 上传接口headers */
  headers: Record<string, string>;
  /** 文后端接收文件name */
  name: string;
  /** 自定义data 包括file上自定义的data */
  query: Record<string, any>;
  /** 响应成功回调 */
  onSuccess?: (e: any, request: any) => void;
  /** 响应失败回调 */
  onFail?: (e: any, request: any) => void;
  /** 上传进度回调 */
  onProgress?: (e: ProgressEvent) => void;
};

type RequestResult = {
    abort: () => void;
    canceled?: boolean;
};

```

## CheckRequest {#check-request}
```ts
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
```
## MergeRequest {#merge-request}

```ts
type MergeRequestResult = boolean | string
/**
 * 文件合并自定义接口
 */
type MergeRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<MergeRequestResult> | MergeRequestResult

```

