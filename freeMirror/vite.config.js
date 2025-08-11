import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,       // Enable polling
      interval: 100           // Optional: how often to poll (ms)
    }
  }
})