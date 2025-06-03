/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "fluid-xxxs": "clamp(0.5rem, 0.6vw, 0.625rem)", // 8px ~ 10px
        "fluid-xxs": "clamp(0.625rem, 0.75vw, 0.75rem)", // 10px ~ 12px
        "fluid-xs": "clamp(0.75rem, 0.9vw, 0.875rem)", // 12px ~ 14px
        "fluid-sm": "clamp(0.875rem, 1vw, 1rem)", // 14px ~ 16px
        "fluid-md": "clamp(1rem, 1.2vw, 1.25rem)", // 16px ~ 20px
        "fluid-lg": "clamp(1.25rem, 2vw, 1.75rem)", // 20px ~ 28px
        "fluid-xl": "clamp(1.5rem, 3vw, 2.5rem)", // 24px ~ 40px
        "fluid-2xl": "clamp(2rem, 5vw, 3.5rem)", // 32px ~ 56px
        "fluid-3xl": "clamp(3rem, 8vw, 5rem)", // 48px ~ 80px
      },
      boxShadow: {
        "hover-card": "rgba(0,0,0,0.75) 0px 3px 10px",
      },
      colors: {
        darkgray: "#bcbcbc",
        gray: "#fff",
      },
    },
  },
  plugins: [],
};
