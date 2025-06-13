// @ts-ignore
const { createApp, ref, reactive, onMounted, watch } = Vue
import { Uploader } from '../src/index'

const app = createApp({
  setup() {
    const a = ref(1)
    const uploader = ref()
    uploader.value = new Uploader()

    uploader.value.upload()

    return { a }
  },
})

// @ts-ignore
app.use(ElementPlus)
app.mount('#app')
