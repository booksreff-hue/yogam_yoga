import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: We proxy /api/* to the local Node server in dev.
// In production, deploy the /server endpoints as serverless functions (or run the server).
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['unyouthful-robbin-tendentially.ngrok-free.dev'],
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})