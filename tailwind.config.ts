import type { Config } from "tailwindcss";

import tailwindcss_animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "fira-code": ["Fira Code", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          100: "#FFE2F5",
          200: "#FFC6F1",
          300: "#FFAAF2",
          400: "#FF95F8",
          500: "#FC72FF",
          600: "#CC53DB",
          700: "#9F39B7",
          800: "#742493",
          900: "#55157A",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          100: "#EFFBDB",
          200: "#DBF8B7",
          300: "#BDEC8F",
          400: "#9DD96F",
          500: "#72C143",
          600: "#55A530",
          700: "#3C8A21",
          800: "#266F15",
          900: "#175C0C",
        },
        info: {
          100: "#D1FCF4",
          200: "#A4F9F1",
          300: "#75EFED",
          400: "#50D7E0",
          500: "#1EB4CC",
          600: "#158EAF",
          700: "#0F6C92",
          800: "#094D76",
          900: "#053861",
        },
        warning: {
          100: "#FEF5CE",
          200: "#FDEA9E",
          300: "#FBD96D",
          400: "#F8C948",
          500: "#F4AF0E",
          600: "#D18F0A",
          700: "#AF7207",
          800: "#8D5704",
          900: "#754402",
        },
        danger: {
          100: "#F9D4C8",
          200: "#F3A395",
          300: "#DD635C",
          400: "#BB3237",
          500: "#8f0416",
          600: "#7A021D",
          700: "#660221",
          800: "#520122",
          900: "#440022",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcss_animate],
};
export default config;
