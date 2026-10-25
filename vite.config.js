import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // En ligne, le site est servi depuis https://db-developpement.github.io/cac-sai/
  // En dev (npm run dev), il reste à la racine : http://localhost:5173/
  // (npm run preview teste le build tel qu'il sera en ligne, donc avec /cac-sai/)
  base: command === 'build' || isPreview ? '/cac-sai/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
