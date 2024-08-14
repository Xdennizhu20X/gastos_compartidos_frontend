/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
import animations from '@midudev/tailwind-animations'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui(),
    animations
  ],
}