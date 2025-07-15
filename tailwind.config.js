/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Include flowbite-react components
  ],
  darkMode: "class", 
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite core plugin
  ],
};
