import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      'primeng',
      'primeicons',
      '@angular/core',
      '@angular/common',
      'rxjs'
    ]
  },
  logLevel: 'info'
});
