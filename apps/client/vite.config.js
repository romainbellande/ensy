import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

const path = (value) => resolve(__dirname, value);

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['../../packages/ui']
    }
  },
  resolve: {
    alias: {
      "@": path("src"),
    }
  }
};

export default config;
