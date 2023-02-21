import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      core: resolve('src/core')
    }
  },
  define: {
    __DEV__: true,
    __TEST__: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: resolve('test/vitest.setup.ts')
  }
})


