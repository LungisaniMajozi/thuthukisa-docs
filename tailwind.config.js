// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#6b7280",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6d28d9",
          900: "#5b21b6",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fede81",
          300: "#f59e0b",
          400: "#f59e0b",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        liquid: "liquid 1s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        liquid: {
          "0%": {
            transform: "scale(1) skew(0deg, 0deg)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          "50%": {
            transform: "scale(1.02) skew(2deg, -2deg)",
            clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
          },
          "100%": {
            transform: "scale(1) skew(0deg, 0deg)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(139, 92, 246, 0)" },
          "50%": { boxShadow: "0 0 0 10px rgba(139, 92, 246, 0.3)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};
