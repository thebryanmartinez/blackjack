import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': '/src',
      '@adapters': '/src/adapters',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@models': '/src/models',
      '@routes': '/src/routes',
      '@services': '/src/services',
      '@utils': '/src/utils'
    }
  }
})
