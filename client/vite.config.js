import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // All /api requests from localhost:5173 are forwarded to Render
      // This bypasses CORS entirely during local development
      '/api': {
        target: 'https://skillmatch-project-pllb.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
