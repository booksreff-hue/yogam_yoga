/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        // White, Azure Blue, Aqua Blue, Midnight Blue
        aqua: {
          50: "#F0FBFB",
          100: "#D9F2F3",
          200: "#BDE7E9",
          300: "#96D9DB",
          400: "#63C7CA",
          500: "#3BB2B7",
          600: "#2A8F95",
          700: "#227378",
        },
        azure: {
          50: "#EAF4FF",
          100: "#D6EBFF",
          200: "#A9D5FF",
          300: "#79BCFF",
          400: "#3EA0FF",
          500: "#0077FF",
          600: "#005FCC",
          700: "#004799",
        },
        midnight: {
          600: "#315087",
          700: "#273F6B",
          800: "#1F3358",
          900: "#0F223D",
        },
        // Backward-compatible alias (existing classes still work)
        ocean: {
          600: "#315087",
          700: "#273F6B",
          800: "#1F3358",
          900: "#0F223D",
        },
      },
      fontFamily: {
        title: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sanskrit: ['"Noto Sans Devanagari"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(47, 93, 80, 0.10)",
        lift: "0 12px 40px rgba(47, 93, 80, 0.14)",
      },
    },
  },
  plugins: [],
}
