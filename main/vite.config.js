import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // if backend deployed on internet, forwards to requests to local port for dev purposes
  // needs to have dev env run, npm run dev
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
