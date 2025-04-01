import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource/press-start-2p'
import 'nes.css/css/nes.min.css'
import { TableThemeProvider } from '@/contexts'
import './i18n.ts'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TableThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </TableThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
