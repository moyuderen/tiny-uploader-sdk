# Quick Start

## Install

```bash
npm i @tinyuploader/sdk -S
```

## Usage

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

## [Documentation](https://moyuderen.github.io/tiny-uploader-sdk/en/)

## Example

- [Online Demo](https://codepen.io/moyuderen/pen/KKjaqJK)
