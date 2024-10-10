const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./contents/**/*.{md,mdx}",
    "./contents/**/**/*.{md,mdx}",
    "./config/**/*.{ts,tsx}"
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    screens: {
      xxxxs: "200px",
      xxxs: "320px",
      xxs: "480px",
      xs: "562px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1700px",
      "4xl": "1920px"
    },
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
          0: "#f5f5ff",
          50: "#e8f4ff",
          100: "#d5eaff",
          200: "#b3d6ff",
          300: "#85b9ff",
          400: "#568cff",
          500: "#2f61ff",
          600: "#0c2fff",
          700: "#1131ff",
          800: "#0624cd",
          900: "#10299f",
          950: "#0a165c",
          1000: "#020522"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#f3f1ff",
          100: "#eae5ff",
          200: "#d7cfff",
          300: "#baa9ff",
          400: "#9878ff",
          500: "#7941ff",
          600: "#6b1bff",
          700: "#6516f8",
          800: "#4d07d0",
          900: "#4108aa",
          950: "#250174"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 3px)`,
        sm: "calc(var(--radius) - 6px)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
        zyflo: ["Zyflo", ...fontFamily.sans]
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        },
        "liquid-slow": {
          "0%": { transform: "translate(-25%, -75%) rotate(0deg)" },
          "100%": { transform: "translate(-25%, -75%) rotate(360deg)" }
        },
        "liquid-fast": {
          "0%": { transform: "translate(-25%, -75%) rotate(0deg)" },
          "100%": { transform: "translate(-25%, -75%) rotate(360deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.4s ease-out",
        "accordion-up": "accordion-up 0.4s ease-out",
        "liquid-slow": "liquid-slow 9s linear infinite",
        "liquid-fast": "liquid-fast 4s linear infinite"
      }
    }
  },
  safelist: ["zyflo-transition"],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-easing"),
    ({ addUtilities }) => {
      addUtilities({
        ".zyflo-transition": {
          "transition-timing-function": "cubic-bezier(0.12, 0, 0.39, 0)",
          "transition-duration": "200ms",
          "transition-property": "all"
        }
      })
    },
    require("daisyui"),
    require("@designbycode/tailwindcss-mask-image")
  ],
  daisyui: {
    themes: []
  }
}
