
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Tell Vite where to find the browser version of monaco-languageclient
      "monaco-languageclient/lib/browser": "monaco-languageclient/es/browser/index.js",
    },
  },
});
