import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep pdfjs-dist in its own chunk — loaded only when needed
          'pdf-worker': ['pdfjs-dist'],
          // Vendor chunk for React ecosystem
          'vendor-react': ['react', 'react-dom'],
          // Framer Motion is big — isolate it
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    // Exclude pdfjs-dist from eager pre-bundling
    exclude: ['pdfjs-dist'],
  },
})
