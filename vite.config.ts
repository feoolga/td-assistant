import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://твой-бэк:5000'  // или localhost:5000 для разработки
    }
  }
})