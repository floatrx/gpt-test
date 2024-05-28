import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy:
      process.env.NODE_ENV === 'development'
        ? {
            '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
            },
          }
        : {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
