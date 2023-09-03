import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), houdini()],
  resolve: {
    alias: {
        $houdini: './$houdini',
    },
  },
  server: {
    fs: {
      allow: ['../../packages/ui']
    }
  }
};

export default config;
