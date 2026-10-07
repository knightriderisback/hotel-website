/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Hotel palette — opacity modifiers work (text-cream/80 etc.) */
        navy: {
          DEFAULT: "#101f31",
          deep: "#0b1624",
        },
        gold: {
          DEFAULT: "#af915f",
          light: "#d8bc85",
        },
        cream: {
          DEFAULT: "#f6f1e7",
          soft: "#efe8d9",
        },
        ink: "#1d2733",
        steel: {
          100: "#e8ecef",
          200: "#c5cdd4",
          300: "#9aa7b2",
          400: "#6e7f8d",
          500: "#4a5a68",
          600: "#3a4754",
          700: "#2c3844",
          800: "#1f2a34",
          900: "#141c24",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "steel-shine": {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
        "steel-pulse": {
          "0%, 100%": { boxShadow: "0 4px 0 #1a2229, 0 8px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)" },
          "50%": { boxShadow: "0 4px 0 #1a2229, 0 10px 22px rgba(175,145,95,0.25), inset 0 1px 0 rgba(255,255,255,0.4)" },
        },
      },
      animation: {
        "steel-shine": "steel-shine 1.1s ease-in-out",
        "steel-pulse": "steel-pulse 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
