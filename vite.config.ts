import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true, // 自动在 package.json 中添加 types 字段
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types', // 声明文件输出目录
      strictOutput: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'TinyUploaderSdk',
      fileName: (format) => `uploader.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    minify: true,
    rollupOptions: {
      external: ['spark-md5'],
      output: {
        exports: 'named',
        globals: {
          'spark-md5': 'SparkMD5',
        },
      },
    },
  },
})
