# Quick Start

## Install

```bash
npm i @tinyuploader/sdk -S
```

## Create Instance

Use class to create instance

```typescript
import { Uploader } from '@tinyuploader/sdk'

const uploader = new Uploader({
  action: 'https://tiny-uploader-server.vercel.app/file/upload'
})

uploader.assignBrowse(document.querySelector('.uploader-btn'))
```

Or, Use `create` function to create instance

```typescript
import { create } from '@tinyuploader/sdk'

const uploader = create({
  action: 'https://tiny-uploader-server.vercel.app/file/upload'
})

uploader.assignBrowse(document.querySelector('.uploader-btn'))
```

## Example

<!-- TODO: yiqi demo  -->
- [Online Demo](https://codepen.io/moyuderen/pen/KKjaqJK)
