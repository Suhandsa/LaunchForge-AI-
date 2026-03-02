/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        bg: "#07090F",
        surface: "#0D1117",
        card: "#111827",
        primary: "#6366F1",
        accent: "#22D3EE",
      },
      animation: {
        "spin-slow": "spin 1s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-up": "fadeInUp 0.4s ease forwards",
        "wave": "wave 1.2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 20px rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(99,102,241,0.6)" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        wave: {
          "0%,100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      backdropBlur: { xl: "20px" },
    },
  },
  plugins: [],
};
