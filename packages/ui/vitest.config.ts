import { svelte } from '@sveltejs/vite-plugin-svelte'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [svelte({hot: !process.env.VITEST})],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['components/**/*.{test,spec}.ts'],
    setupFiles: ['./vitest.setup.ts']
  },
})
