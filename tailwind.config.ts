import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        animateToLeft: {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(-200px)" },
        },
        animateToBottom: {
          "0%": { transform: "translateY(-200px)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        cloudMove: "animateToLeft 10s linear infinite",
        birdMove: "animateToLeft 20s linear infinite",
        parachuteMove: "animateToBottom 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
