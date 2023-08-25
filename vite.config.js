import { fileURLToPath } from 'node:url'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    laravel(['resources/css/app.css']),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
      '@css': fileURLToPath(new URL('./resources/css', import.meta.url)),
    },
  },
})
