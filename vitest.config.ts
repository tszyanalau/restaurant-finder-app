import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      enabled: true,
    },
    include: ['./**/__tests__/**/*.test.ts', './**/*.test.tsx'],
  },
})
