import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    host: '127.0.0.1',
    open: true,
    strictPort: true,
  },
  preview: {
    port: 5173,
    host: '127.0.0.1',
  },
})
