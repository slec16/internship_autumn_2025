import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths"
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        tsconfigPaths()
    ],
    resolve: {
        alias: {
            '@app': resolve(__dirname, 'src/app'),
            '@shared': resolve(__dirname, 'src/shared'),
            '@entities': resolve(__dirname, 'src/entities'),
            '@features': resolve(__dirname, 'src/features'),
            '@widgets': resolve(__dirname, 'src/widgets'),
            '@pages': resolve(__dirname, 'src/pages'),
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            }
        }
    }
})
