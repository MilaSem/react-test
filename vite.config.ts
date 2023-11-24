/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./config/tests/setup_tests.ts'],
    exclude: [...configDefaults.exclude, 'src'],
    coverage: {
      provider: 'v8',
      exclude: ['src/redux', 'config'],
    },
  },
});
