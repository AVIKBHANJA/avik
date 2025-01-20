/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          dark: 'var(--background-dark)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          dark: 'var(--foreground-dark)',
        },
      },
    },
  },
  plugins: [],
};