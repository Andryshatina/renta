/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],

  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}

