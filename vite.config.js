import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  resolve: {
    alias: {
      "@": pathResolve('src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/assets/scss/common.scss';"
      }
    }
  },
  define: {
    'process.env': {
      VUE_APP_BASIC_API: 'http://cosine.ren:8000'
    }
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://cosine.ren:8000',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //   }
    // }
  },
  base: './'
})