/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", 
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: { backgroundImage: {
      'header-pattern': "url('/src/assets/top-bg.svg')",
      'line-pattern': "url('/asset/downPattern.svg')",
      'auth-pattern': "url('/asset/LinePattern.svg')",
    },},
  },
  plugins: [],
};
