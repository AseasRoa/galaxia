import { defineConfig } from 'vitest/config'

export default defineConfig({
  // https://vitest.dev/config/
  test: {
    environment: 'node',
    coverage: {
      reporter: ['text', 'html'],
    },
    globals: true,
  },
})
