import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Manrope", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "Manrope", "system-ui", "sans-serif"],
        editorial: ["Source Serif 4", "Georgia", "serif"],
        impact: ["Unbounded", "Bricolage Grotesque", "system-ui", "sans-serif"],
        utility: ["Azeret Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        "hard-violet": "10px 10px 0 oklch(0.7 0.12 270 / 0.32)",
        "hard-ink": "8px 8px 0 oklch(0.16 0.02 270)",
      },
    },
  },
  plugins: [],
} satisfies Config;
