import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      models: path.resolve(__dirname, './src/models'),
      config: path.resolve(__dirname, './src/config'),
    },
  },
  plugins: [react(),tsconfigPaths()],
})
