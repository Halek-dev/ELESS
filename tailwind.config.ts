import type { Config } from "tailwindcss";

/**
 * Every colour, radius, shadow and spacing value below maps 1:1 to a token in
 * _design_canvas/outputs/design-tokens.md. Components consume these — never a
 * raw hex. CSS-variable-backed tokens live in app/globals.css.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Solid colours resolve through RGB channel vars so Tailwind alpha
        // modifiers (e.g. `bg-amber/25`) work correctly.
        // Core surfaces
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-deep": "rgb(var(--bg-deep-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-sunken": "var(--surface-sunken)",
        "glass-fill": "var(--glass-fill)",

        // Amber — the only accent
        amber: {
          DEFAULT: "rgb(var(--amber-rgb) / <alpha-value>)",
          hover: "rgb(var(--amber-hover-rgb) / <alpha-value>)",
          pressed: "rgb(var(--amber-pressed-rgb) / <alpha-value>)",
          light: "rgb(var(--amber-light-rgb) / <alpha-value>)",
        },
        "on-amber": "rgb(var(--on-amber-rgb) / <alpha-value>)",

        // Support
        teal: {
          DEFAULT: "rgb(var(--teal-rgb) / <alpha-value>)",
          hover: "rgb(var(--teal-hover-rgb) / <alpha-value>)",
        },
        red: "rgb(var(--red-rgb) / <alpha-value>)",

        // Text on dark
        text: {
          DEFAULT: "rgb(var(--text-rgb) / <alpha-value>)",
          70: "var(--text-70)",
          55: "var(--text-55)",
          50: "var(--text-50)",
          40: "var(--text-40)",
        },

        // Tints
        "amber-tint": "var(--amber-tint)",
        "amber-border": "var(--amber-border)",
        "teal-tint": "var(--teal-tint)",
        "red-tint": "var(--red-tint)",

        // Hairlines
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        "line-strong": "var(--line-strong)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        control: "12px",
        pill: "999px",
        thumb: "8px",
        phone: "44px",
      },
      boxShadow: {
        card: "0 24px 60px rgba(0,0,0,0.50)",
        pop: "0 30px 70px rgba(0,0,0,0.60)",
        "card-hover": "0 24px 50px rgba(0,0,0,0.60)",
        // NB: named "glow*", not "amber*" — a boxShadow key that matches a
        // colour key makes Tailwind emit shadow-<colour> instead, which drops
        // the alpha and renders the glow at full opacity.
        glow: "0 12px 40px rgba(239,159,39,0.35)",
        "glow-strong": "0 12px 40px rgba(239,159,39,0.50)",
        "glow-lg": "0 16px 44px rgba(239,159,39,0.42)",
        "glow-inner": "inset 0 1px 0 rgba(255,255,255,0.14)",
        drawer: "-30px 0 70px rgba(0,0,0,0.55)",
      },
      backdropBlur: {
        chip: "20px",
        panel: "24px",
        modal: "28px",
        drawer: "32px",
      },
      spacing: {
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        section: "56px",
      },
      maxWidth: {
        frame: "1440px",
      },
      letterSpacing: {
        kicker: "0.28em",
        label: "0.14em",
        display: "-0.035em",
        title: "-0.03em",
        heading: "-0.02em",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "els-skel": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        skel: "els-skel 1.4s ease-in-out infinite",
        "spin-fast": "spin 0.8s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
      zIndex: {
        dropdown: "40",
        sticky: "50",
        navbar: "60",
        "modal-backdrop": "70",
        modal: "80",
        toast: "90",
      },
    },
  },
  plugins: [],
};

export default config;
