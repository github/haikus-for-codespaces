/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    prefix: 'tw-',
    corePlugins: {
      preflight: false, // disable to prevent conflict with dapps css
    },
    theme: {
      extend: {
        colors: {
          'blue-500': '#037DD6',
          'orange-500': '#F66A0A',
          'neutral-500': '#24272A',
          'neutral-400': 'rgba(255, 255, 255, 0.05)',
          'neutral-200': 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: [],
  };