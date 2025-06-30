# Callback Functions

## Callback Function Enum

> [!CAUTION]
> Before version `2.2.0`, use [`Events`](enum.md#events)  
> From version `2.2.0` onward, use [`Callbacks`](enum.md#callbacks)

::: info Example for versions before `2.2.0`

```js
const uploader = new Uploader({
  limit: 10
})

uploader.on(Events.Exceed, (files, fileList) => {
  // ...
})
```

:::

## exceed

Triggered when the total number of selected files exceeds the `limit` parameter.  
The `files` parameter contains the newly selected files, and `fileList` contains the existing files.

```js
const uploader = new Uploader({
  limit: 10
})
uploader.on(Callbacks.Exceed, (files, fileList) => {
  // ...
})
```

> [!IMPORTANT]
> Starting from version `2.2.0`, `fileList` is no longer returned.

## fileAdded <Badge type="tip">Added in 2.2.0</Badge> {#fileAdded}

Triggered when a file is successfully selected and added to the `fileList` (before upload starts).

```js
uploader.on(Callbacks.FileAdded, (file) => {
  // ...
})
```

## fileAddFail <Badge type="tip">Added in 2.2.0</Badge>

Triggered when a file fails to be added to the `fileList` (before upload starts).

```js
uploader.on(Callbacks.FileAddFail, (file) => {
  // ...
})
```

## filesAdded

Triggered when multiple files are successfully selected and added to the `fileList` (before upload starts).

```js
uploader.on(Callbacks.FilesAdded, (fileList) => {
  // ...
})
```

## fileChange <Badge type="tip">Added in 2.1.0</Badge>

Triggered when the `status` of a file changes.

```js
uploader.on(Callbacks.FileChange, (file, fileList) => {
  // ...
})
```

## fileRemove

Triggered when a file is removed.

```js
uploader.on(Callbacks.FileRemove, (file, fileList) => {
  // ...
})
```

## fileReadStart

Triggered when file reading starts.

```js
uploader.on(Callbacks.FileReadStart, (file, fileList) => {
  // ...
})
```

## fileReadProgress

Triggered to report progress while calculating the file hash.

```js
uploader.on(Callbacks.FileReadProgress, (file, fileList) => {
  // ...
})
```

## fileReadEnd

Triggered when file hash calculation completes.

```js
uploader.on(Callbacks.FileReadEnd, (file, fileList) => {
  // ...
})
```

## fileReadFail

Triggered when file hash calculation fails.

```js
uploader.on(Callbacks.FileReadFail, (file, fileList) => {
  // ...
})
```

## fileProgress

Triggered during file upload to report progress.

```js
uploader.on(Callbacks.FileProgress, (progress, file, fileList) => {
  // ...
})
```

> [!WARNING]
> From version `2.2.0`, the `progress` parameter is no longer returned.

## FileFail

Triggered when file upload fails (all chunks are uploaded successfully, but file merging fails).

```js
uploader.on(Callbacks.FileFail, (file, fileList) => {
  // ...
})
```

## fileUploadFail

Triggered when file upload fails (some chunks failed to upload).

```js
uploader.on(Callbacks.FileUploadFail, (file, fileList) => {
  // ...
})
```

## fileUploadSuccess

Triggered when file upload completes (all chunks are successfully uploaded and the file is ready for merging).

```js
uploader.on(Callbacks.FileUploadSuccess, (file, fileList) => {
  // ...
})
```

## fileSuccess

Triggered when the file is fully uploaded and the merge API call is also successful.

```js
uploader.on(Callbacks.FileSuccess, (file, fileList) => {
  // ...
})
```

## ~~FileMergeFail~~ <Badge type="danger" text=" Removed in 2.x" />

Triggered when file merging fails.

```js
uploader.on(Events.FileMergeFail, (file, fileList) => {
  // ...
})
```

## fileFail <Badge type="tip" text=" Added in 2.2.0" />

Triggered when file merging fails.

```js
uploader.on(Callbacks.FileFail, (file, fileList) => {
  // ...
})
```

## allFileSuccess

Triggered when all files are uploaded successfully.

```js
uploader.on(Callbacks.AllFileSuccess, (fileList) => {
  // ...
})
```
