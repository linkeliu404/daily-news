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
        fill1: "#fcfcfc",
        fill2: "rgba(219, 219, 219, 0.40)",
        fill3: "#ec5a36",
        fill4: "#202020",
        fill5: "#646464",
        fill6: "#21201f",
        fill7: "#f14a00",
        fill8:
          "linear-gradient(180deg, rgba(252, 252, 252, 0.00) 0%, #fcfcfc 100%)",
        fill9:
          "linear-gradient(180deg, #fcfcfc 0%, rgba(252, 252, 252, 0.00) 100%)",
        stroke1: "#dbdbdb",
        stroke2: "#000000",
        stroke3: "#f14a00",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
        heading: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
        "2xl": ["32px", "40px"],
        "3xl": ["40px", "48px"],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        full: "9999px",
      },
      spacing: {
        px: "1px",
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
        40: "160px",
        48: "192px",
        56: "224px",
        64: "256px",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};

export default config;
