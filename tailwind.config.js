/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Gray: "#575757",
        Cyan: "#1F8394",
      },
    },
  },
  plugins: [],
};
