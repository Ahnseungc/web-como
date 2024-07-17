import type { Config } from "tailwindcss";
import { borderRadius, fontFamily, fontSize } from "tailwindcss/defaultTheme";

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
    },
    fontFamily: { suit: ["SUIT", ...fontFamily.sans] },
    fontSize: {
      ...fontSize,
      "2xs": ["10px", "16px"],
      "xs": ["12px", "18px"],
      "sm": ["14px", "22px"],
      "lg": ["18px", "24px"],
      "3xl": ["28px", "40px"],
    },
    letterSpacing: {
      tightest: "-.0075em",
      tighter: "-.005em",
      tight: "-.0025em",
      normal: "0",
    },
  },
  plugins: [],
};

export default config;
