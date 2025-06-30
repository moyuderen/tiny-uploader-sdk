# 快速上手

## 安装

```bash
npm i @tinyuploader/sdk -S
```

## 创建实例

创建实例的方式有两种：

1. 使用类创建实例

```typescript
import { Uploader } from '@tinyuploader/sdk'

const uploader = new Uploader({
  action: 'https://tiny-uploader-server.vercel.app/file/upload'
})

uploader.assignBrowse(document.querySelector('.uploader-btn'))
```

2. 使用函数`create`创建实例

```typescript
import { create } from '@tinyuploader/sdk'

const uploader = create({
  action: 'https://tiny-uploader-server.vercel.app/file/upload'
})

uploader.assignBrowse(document.querySelector('.uploader-btn'))
```

## 预览示例

- [预览](https://codepen.io/moyuderen/pen/KKjaqJK)
