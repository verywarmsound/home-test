import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy CNB API requests to avoid CORS issues
      '/api/cnb': {
        target: 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cnb/, ''),
        headers: {
          'Accept': 'text/plain',
          'User-Agent': 'Mozilla/5.0 (compatible; ExchangeRateApp/1.0)'
        }
      }
    }
  }
})
