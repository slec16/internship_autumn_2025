import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/app/providers/theme'
import ErrorBoundary from '@app/providers/error-boundary'
import App from './app/App.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider defaultTheme='dark'>
                        <App />
                    </ThemeProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>,
)
