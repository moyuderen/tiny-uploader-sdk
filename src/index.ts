import { Uploader } from './core/Uploader'
import * as Utils from './helper'
export { FileContext } from './core/FileContext'
export { Chunk } from './core/Chunk'
export { Callbacks, FileStatus, ChunkStatus, CheckStatus, ProcessType } from './core/constants'
export { defaultOptions } from './core/defaults'
export type { Request, RequestOptions, RequestResult } from './core/request'
export * from './types'
import type { UploaderOptions } from './types'

const create = (options?: UploaderOptions) => new Uploader(options)

export { Uploader, Utils, create }
