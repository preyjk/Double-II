import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: [
      "@fawmi/vue-google-maps",
      "fast-deep-equal",
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: false,
    },
    host: '0.0.0.0',
  },
})
