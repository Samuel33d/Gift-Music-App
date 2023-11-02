/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F0817",
        secondary: "#FFE24B",
      },
      backgroundImage: {
        "primary-light":
          "linear-gradient(98deg, #886AE2 43.66%, #A284F6 116.16%)",
        "primary-dark":
          "linear-gradient(98deg, rgba(61, 46, 149, 0.35) 0%, #3D2E95 100%)",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
}

