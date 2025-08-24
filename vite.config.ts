import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': process.env.VITE_API_BASE_URL || 'http://localhost:5000',
    },
    hmr: {
      overlay: true, // Keep overlay enabled for error display, or set to false to disable
    },
  },
});