# Enums

## Status {#status}

```typescript
/** Before v2.1.1, file and chunk shared the same status enum */

enum Status {
  /** File initial state */
  Init = 'init',

  /** Calculating hash (reading the file) */
  Reading = 'reading',

  /**
   * 1. File hash calculation completed
   * 2. Initial state for chunk is Ready
   */
  Ready = 'ready',

  /** 1. Chunk request has been initiated, Promise is in Pending state */
  Pending = 'pending',

  /**
   * 1. File is uploading
   * 2. Chunk is uploading
   */
  Uploading = 'uploading',

  /** All chunks of the file have been uploaded, ready to merge */
  UploadSuccess = 'uploadSuccess',

  /** All chunks have been requested, but after retries some still failed */
  UploadFail = 'uploadFail',

  /**
   * 1. File merge successful
   * 2. Chunk upload successful
   */
  Success = 'success',

  /**
   * 1. File merge failed
   * 2. Chunk upload failed after all retries
   */
  Fail = 'fail',

  /** Paused state */
  Pause = 'pause',

  /** Resumed state */
  Resume = 'resume'
}
```

> [!WARNING]
> After version `2.2.0`, this enum is split into [`FileStatus`](#file-status) and [`ChunkStatus`](#chunk-status)

## Events {#events}

```typescript
export const Events = {
  Exceed: 'exceed',
  FilesAdded: 'filesAdded',
  FileChange: 'fileChange',
  FileRemove: 'fileRemove',
  FileProgress: 'fileProgress',
  FileFail: 'fileFail',
  FileUploadFail: 'fileUploadFail',
  FileUploadSuccess: 'fileUploadSuccess',
  FileSuccess: 'fileSuccess',
  // FileMergeFail: 'fileMergeFail', // Removed in 2.x // [!code --]
  AllFileSuccess: 'allFilesSuccess',
  Change: 'change'
}
```

> [!WARNING]
> From version `2.2.0`, `Events` has been abstracted as [`Callbacks`](#callbacks)

## FileStatus {#file-status}

```typescript
enum FileStatus {
  /** File initial state */
  Init = 'init',

  /** File failed to add. If beforeAdd allows failed files, they'll appear with AddFail status */
  AddFail = 'addFail',

  /** File is being read (calculating hash) */
  Reading = 'reading',

  /** File hash calculation completed; ready for upload */
  Ready = 'ready',

  /** `checkRequest` exists but failed */
  CheckFail = 'checkFail',

  /** File is uploading */
  Uploading = 'uploading',

  /** All chunks uploaded; ready to merge file */
  UploadSuccess = 'uploadSuccess',

  /** File upload failed; some chunks failed */
  UploadFail = 'uploadFail',

  /** File upload and merge both succeeded */
  Success = 'success',

  /** File merge failed */
  Fail = 'fail',

  /** File upload paused */
  Pause = 'pause',

  /** File upload resumed */
  Resume = 'resume'
}
```

## ChunkStatus {#chunk-status}

```typescript
enum ChunkStatus {
  /** Initial state of chunk is Ready */
  Ready = 'ready',

  /** Chunk request created successfully, Promise is pending */
  Pending = 'pending',

  /** Chunk is uploading */
  Uploading = 'uploading',

  /** Chunk uploaded successfully */
  Success = 'success',

  /** Chunk upload failed after all retries */
  Fail = 'fail'
}
```

## Callbacks {#callbacks}

```typescript
// Callback function names
enum Callbacks {
  /** File count exceeds limit */
  Exceed = 'exceed',

  /** Single file added successfully */
  FileAdded = 'fileAdded',

  /** File failed to add */
  FileAddFail = 'fileAddFail',

  /** All files added successfully */
  FilesAdded = 'filesAdded',

  /** File status changed */
  FileChange = 'fileChange',

  /** File removed */
  FileRemove = 'fileRemove',

  /** File hash calculation started */
  FileReadStart = 'fileReadStart',

  /** File hash calculation progress */
  FileReadProgress = 'fileReadProgress',

  /** File hash calculation completed */
  FileReadEnd = 'fileReadEnd',

  /** File hash calculation failed */
  FileReadFail = 'fileReadFail',

  /** File upload progress */
  FileProgress = 'fileProgress',

  /** File uploaded successfully */
  FileUploadSuccess = 'fileUploadSuccess',

  /** File upload failed */
  FileUploadFail = 'fileUploadFail',

  /** File merged successfully */
  FileSuccess = 'fileSuccess',

  /** File merge failed */
  FileFail = 'fileFail',

  /** All files uploaded successfully */
  AllFileSuccess = 'allFileSuccess'
}
```

## CheckStatus {#check-status}

```typescript
// File upload check status
enum CheckStatus {
  /** File has not been uploaded */
  None = 'none',

  /**
   * 1. Partial chunks uploaded
   * 2. Returned with indices of uploaded chunks
   */
  Part = 'part',

  /** Ready to merge; can proceed with merge operation */
  WaitMerge = 'waitMerge',

  /** Upload successful, returns OBS URL */
  Success = 'success'
}
```

## ProcessType {#process-type}

```typescript
// File upload process type
enum ProcessType {
  /** From check API */
  Check = 'check',

  /** From upload API */
  Upload = 'upload',

  /** From merge API */
  Merge = 'merge'
}
```

## UserAttributes {#user-attributes}

```typescript
type UserAttributes = {
  accept: string | string[]
  multiple: boolean
  [key: string]: any
}
```
