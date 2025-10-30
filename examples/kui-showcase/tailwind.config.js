/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@kui-framework/theme/tailwind")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@kui-framework/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}

