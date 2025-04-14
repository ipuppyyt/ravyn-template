import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    watch: {
      cwd: 'src/renderer',
      ignored: ['src/electron/**', 'node_modules/**'],
    },
  },
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: './dist/renderer',
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
