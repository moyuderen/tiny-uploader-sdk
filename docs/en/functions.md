# Methods

## assignBrowse

Bind an upload button DOM element.

```ts
uploader.assignBrowse(domNode: HTMLElement, attributes: UserAttributes)
```

`attributes` is an object representing the input element's file-related attributes. It can override `accept` and `multiple`, or add other attributes.

> [!NOTE]  
> See enum [`UserAttributes`](/en/enum.md#user-attributes)

## assignDrop

Bind a DOM element for drag-and-drop file uploads.

```ts
uploader.assignDrop(domNode: HTMLElement)
```

## submit

Manually trigger upload when `autoUpload` is set to `false`.

```js
uploader.submit()
```

## clear

Remove all files and cancel all ongoing upload requests.

```js
uploader.clear()
```

## remove

Remove a specific file. If no argument is passed, this behaves the same as `clear`.

```js
uploader.remove(file)
```

## pause

Pause the upload of a specific file.

```js
uploader.pause(file)
```

## resume

Resume uploading a specific paused file.

```js
uploader.resume(file)
```

## retry

Manually retry uploading a specific file.

```js
uploader.retry(file)
```
