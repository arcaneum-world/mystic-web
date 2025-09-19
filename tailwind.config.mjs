/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        // keep existing sans as Tailwind default
      },
      backgroundImage: {
        galaxy:
          "radial-gradient(1200px 800px at 10% 10%, rgba(147,51,234,.18), transparent 60%), radial-gradient(1000px 700px at 90% 20%, rgba(59,130,246,.18), transparent 60%), radial-gradient(900px 900px at 50% 90%, rgba(236,72,153,.14), transparent 60%), linear-gradient(180deg, #0b1220 0%, #120a2a 50%, #1b0f3b 100%)",
      },
      keyframes: {
        galaxy: {
          "0%":   { backgroundPosition: "0px 0px, 0px 0px, 0px 0px, 0% 0%" },
          "50%":  { backgroundPosition: "20px 30px, -25px 15px, 10px -20px, 0% 50%" },
          "100%": { backgroundPosition: "0px 0px, 0px 0px, 0px 0px, 0% 100%" },
        },
        twinkle: {
          "0%,100%": { opacity: .6 },
          "50%":     { opacity: 1 },
        },
      },
      animation: {
        galaxy: "galaxy 30s linear infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
        "twinkle-slow": "twinkle 4.8s ease-in-out infinite",
      },
      colors: {
        // “sunset” accent used for buttons/links
        sunset: {
          500: "#8B5CF6", // violet
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
        },
      },
    },
  },
  plugins: [],
};
