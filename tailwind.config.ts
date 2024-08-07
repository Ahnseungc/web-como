import { borderRadius, fontFamily, fontSize } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "360px",
      md: "580px",
      lg: "1200px",
      xl: "1800px",
    },
    borderRadius: {
      ...borderRadius,
      "3xl": "20px",
      "4xl": "24px",
      "5xl": "28px",
      "6xl": "30px",
      "7xl": "32px",
    },
    boxShadow: {
      DEFAULT: "0 4px 20px 0 rgba(0, 0, 0, 0.08)",
      button: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
      xs: "2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 2px 6px 2px rgba(0, 0, 0, 0.1)",
      md: "0 4px 10px 4px rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
      lg: "0 6px 8px 4px rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.2)",
      xl: "0 6px 8px 6px rgba(0, 0, 0, 0.15), 0 4px 4px 0 rgba(0, 0, 0, 0.3)",
    },
    colors: {
      brand: {
        orange: "#FD7E2D",
        ivory: "#FFFFF9",
        black: "#1A1A1D",
      },
      gray: {
        0: "#FFFFFF",
        50: "#FDFDFD",
        100: "#F6F6F6",
        200: "#F1F1F1",
        300: "#DDDDDD",
        400: "#C6C6C7",
        500: "#989899",
        600: "#6A6A6C",
        700: "#58585A",
        800: "#2C2C2F",
        900: "#1A1A1D",
        1000: "#000000",
      },
      orange: {
        50: "#FFF2EA",
        100: "#FED7BE",
        200: "#FEC49E",
        300: "#FEA972",
        400: "#FD9857",
        500: "#FD7E2D",
        600: "#E67329",
        700: "#B45920",
        800: "#8B4519",
        900: "#6A3513",
      },
      point: {
        red: "#FF3D00",
        brightBlue: "#FD7E2D",
        blue: "#337AF0",
        green: "#1DB714",
      },
      transparent: "rgba(0,0,0,0)",
    },
    fontFamily: {
      suit: ["Suit", ...fontFamily.sans],
      poppins: ["Poppins", ...fontFamily.sans],
      cochin: ["Cochin", ...fontFamily.serif],
    },
    fontSize: {
      "2xs": ["0.625rem", "1rem"],
      "xs": ["0.75rem", "1.125rem"],
      "sm": ["0.875rem", "1.375rem"],
      "base": ["1rem", "1.5rem"],
      "lg": ["1.125rem", "1.5rem"],
      "xl": ["1.25rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.75rem", "2.5rem"],
    },
    letterSpacing: {
      tightest: "-.0075em",
      tighter: "-.005em",
      tight: "-.0025em",
      normal: "0",
    },
    extend: {
      keyframes: {
        "progress-ltr": {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      animation: {
        "loading-progress": "progress-ltr 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
