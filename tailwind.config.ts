import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "rgba(var(--accent) / <alpha-value>)",
        background: "rgba(var(--background-primary) / <alpha-value>)",
        foreground: "rgba(var(--background-secondary) / <alpha-value>)",
        accent: "rgba(var(--accent) / <alpha-value>)",
        paid: "rgba(var(--paid) / <alpha-value>)",
        pending: "rgba(var(--pending) / <alpha-value>)",
        alert: "rgba(var(--alert) / <alpha-value>)",
        primary: {
          DEFAULT: "rgba(var(--text) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgba(var(--text-secondary) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
        muted: {
          DEFAULT: "rgba(var(--text-secondary) / 0.3)",
        },
        popover: {
          DEFAULT: "rgba(var(--background-secondary))",
          foreground: "rgba(var(--text))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
