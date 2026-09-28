import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Jardines-del-Cerro-Cochabamba-React/',
  plugins: [react()],
})
