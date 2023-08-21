import { homedir } from 'node:os'
import { resolve } from 'node:path'
import fs from 'node:fs'
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
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        '@scss': fileURLToPath(new URL('./resources/scss', import.meta.url)),
      },
    },
});
