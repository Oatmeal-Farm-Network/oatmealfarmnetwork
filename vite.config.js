import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || 'http://127.0.0.1:8000'
  const saigeTarget = env.VITE_SAIGE_API_URL || apiTarget
  const cropTarget = env.VITE_CROP_API_URL || apiTarget
  const isLocal = (url) => /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(url)

  return {
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: apiTarget,
        changeOrigin: true,
        secure: !isLocal(apiTarget),
      },
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: !isLocal(apiTarget),
      },
      '/saige': {
        target: saigeTarget,
        changeOrigin: true,
        secure: !isLocal(saigeTarget),
        // Local monolith serves Saige under /saige; Cloud Run Saige is at root.
        ...(isLocal(saigeTarget) ? {} : { rewrite: (p) => p.replace(/^\/saige/, '') }),
      },
      '/cm': {
        target: cropTarget,
        changeOrigin: true,
        secure: !isLocal(cropTarget),
        ...(isLocal(cropTarget) ? {} : { rewrite: (p) => p.replace(/^\/cm/, '') }),
      },
      // Yahoo Finance chart API (CORS-safe same-origin proxy for commodity quotes fallback)
      '/yf': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/yf/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; OFN/1.0)',
          Accept: 'application/json',
        },
      },
    },
    // Don't watch the large static images folder — it has 33k+ files and
    // kills dev server startup and HMR performance.
    watch: {
      ignored: [
        '**/public/images/**',
        '**/public/locales/**',
        '**/node_modules/**',
      ],
    },
  },
  }
})
