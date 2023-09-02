/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    '../../packages/ui/components/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        ensy: {
          primary: '#1E74FD',

          secondary: '#673BB7',

          accent: '#d6427b',

          neutral: '#1d252f',

          'base-100': '#f7f7f7',

          info: '#2754e',

          success: '#10d876',

          warning: '#FE9431',

          error: '#E50202'
        }
      }
    ]
  }
};
