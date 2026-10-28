import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  cacheDir: 'node_modules/.vite',
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Tách three.js ra chunk riêng để trình duyệt cache lâu dài.
        manualChunks: { three: ['three'] },
      },
    },
  },
})
