import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 中转服务器
    proxy: {
      // 通过代理实现跨域
      '/api': {
        target: 'http://127.0.0.1:8081', // 替换的服务端地址
        changeOrigin: true, // 开启代理，允许跨域
        rewrite: (path) => path.replace(/\/api/, ''), // 设置重写路径
      },
    },
  },
})
