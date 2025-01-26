import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // if you're using a traditional HTML file
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Correct way to include Flowbite's content in the content array
  ],
  plugins: [
    flowbite.plugin(), // Correct usage of Flowbite plugin
  ],
};
