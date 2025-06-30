# Interface Types

## UserFile {#user-file}

```typescript
type UserFile = {
  /** File ID */
  id: string | number;
  /** File name */
  name: string;
  /** File URL */
  url: string;
} & File;
```

## RequestData Default Upload Parameters {#request-data}

```ts
type RequestData = {
  [name]: blob // Chunk binary data; the key `name` comes from configuration, defaults to `file`
  hash: string // File hash
  id: string // Chunk ID
  fileId: string // File ID
  index: number // Starting from 0
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
  /** HTTP method type */
  method?: 'POST' | 'GET' | 'PUT';
  /** Whether to include credentials such as cookies or Authorization headers */
  withCredentials?: boolean;
  /** Expected response type */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text' | '';
  /** Upload API endpoint */
  action: string;
  /** Custom upload parameters */
  data: Record<string, any>;
  /** Upload request headers */
  headers: Record<string, string>;
  /** Backend field name to receive the file */
  name: string;
  /** Custom query data, including user-defined file data */
  query: Record<string, any>;
  /** Success callback */
  onSuccess?: (e: any, request: any) => void;
  /** Failure callback */
  onFail?: (e: any, request: any) => void;
  /** Upload progress callback */
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
 * Check file upload status
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
 * Custom file merge request
 */
type MergeRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<MergeRequestResult> | MergeRequestResult
```
