import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFAF5",
          100: "#F9F3E8",
          200: "#F2E8D5",
          300: "#E8D9BE",
        },
        gold: {
          300: "#E8C97A",
          400: "#D4A843",
          500: "#C8A028",
          600: "#A07A1E",
          700: "#7A5C14",
          800: "#5A4010",
        },
        charcoal: {
          900: "#1A1612",
          800: "#2C2318",
          700: "#3D3020",
          600: "#5A4830",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C8A028 0%, #E8C97A 40%, #D4A843 60%, #C8A028 100%)",
        "cream-gradient":
          "linear-gradient(180deg, #FDFAF5 0%, #F2E8D5 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
