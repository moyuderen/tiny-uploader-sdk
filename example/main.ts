// dist
// import { create, FileStatus, ChunkStatus, CheckStatus, Callbacks } from '../dist/uploader.cjs'
// dev
import { create, FileStatus, Callbacks, CheckStatus, FileContext, Uploader } from '../src'
import {
  actionList,
  userOptions,
  customRequest,
  checkRequest,
  mergeRequest
} from './custom-options'
import { SparkWorker } from 'hashion/sparkWorker'

// @ts-ignore
const { createApp, ref, reactive, onMounted, watch } = Vue

const app = createApp({
  setup() {
    const drawer = ref(false)
    const options = reactive(userOptions)
    const uploader = ref<Uploader>(null)
    const files = ref([])

    onMounted(() => {
      uploader.value.assignBrowse(document.querySelector('.uploader-btn'))
      uploader.value.assignBrowse(document.querySelector('.uploader-drag'))
      uploader.value.assignDrop(document.querySelector('.uploader-drag'))
    })

    uploader.value = create({
      ...options,
      fileList: [
        {
          id: '3',
          name: 'default1.png',
          url: 'http://baidu.com'
        }
      ],
      chunkSize: options.chunkSize * 1024 * 1024,
      customRequest,
      checkRequest,
      mergeRequest
    })

    uploader.value.use(SparkWorker)

    uploader.value.on(Callbacks.Exceed, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`Exceed: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FileChange, (file: FileContext, fileList: FileContext[]) => {
      console.log(`FileChange: ${file.name} - ${file.status}`)
      files.value = fileList
    })

    uploader.value.on(Callbacks.FileAdded, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileAdded: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FilesAdded, (fileList: FileContext[]) => {
      console.log(`FilesAdded: `, fileList)
    })

    uploader.value.on(Callbacks.FileReadStart, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileReadStart: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FileReadProgress, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileReadProgress: ${file.name} - ${file.status} - ${file.readProgress}`)
    })

    uploader.value.on(Callbacks.FileReadEnd, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileReadEnd: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FileRemove, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileRemove:  ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FileProgress, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileProgress: ${file.name} - ${file.status} - ${file.progress}`)
    })

    uploader.value.on(Callbacks.FileFail, (file: FileContext, _fileList: []) => {
      console.log(`FileFail: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FileUploadFail, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileUploadFail: ${file.name} - ${file.status}`)
    })

    uploader.value.on(
      Callbacks.FileUploadSuccess,
      (file: FileContext, _fileList: FileContext[]) => {
        console.log(`FileUploadSuccess: ${file.name} - ${file.status}`)
      }
    )

    uploader.value.on(Callbacks.FileSuccess, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileSuccess:  ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FilePause, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FilePause: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.FileResume, (file: FileContext, _fileList: FileContext[]) => {
      console.log(`FileResume: ${file.name} - ${file.status}`)
    })

    uploader.value.on(Callbacks.AllFileSuccess, (fileList: FileContext[]) => {
      console.log(`AllFileSuccess: `, fileList)
    })

    uploader.value.setDefaultFileList([
      {
        id: '1',
        name: 'default.png',
        url: 'http://baidu.com'
      }
    ])

    watch(
      () => options,
      () => {
        uploader.value.setOption({
          ...options,
          chunkSize: options.chunkSize * 1024 * 1024
        })
      },
      { deep: true }
    )

    const submit = () => {
      uploader.value.submit()
    }

    const clear = () => {
      uploader.value.clear()
    }

    const remove = (file: FileContext) => {
      uploader.value.remove(file)
    }

    const pause = (file: FileContext) => {
      uploader.value.pause(file)
    }

    const resume = (file: FileContext) => {
      uploader.value.resume(file)
    }

    const retry = (file: FileContext) => {
      uploader.value.retry(file)
    }

    return {
      FileStatus,
      CheckStatus,
      actionList,
      drawer,
      options,
      files,
      submit,
      clear,
      remove,
      pause,
      resume,
      retry
    }
  }
})

// @ts-ignore
app.use(ElementPlus)
app.mount('#app')
