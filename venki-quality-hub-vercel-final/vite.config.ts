import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel-ready configuration
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000
  }
});