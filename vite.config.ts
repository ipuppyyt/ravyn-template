import { logger } from './src/electron/modules'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  logLevel: 'silent',
  customLogger: logger,
  server: {
    port: 8181,
  },
  // DO NOT TOUCH ANYTHING ABOVE THIS LINE
  plugins: [react(), tailwindcss()],

  base: './',
  build: {
    outDir: 'electron/renderer',
    emptyOutDir: true,
    target: 'esnext',
    minify: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/renderer"),
    },
  },
})
