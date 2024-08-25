import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "theme-mecury": "#545e75",
        "theme-venus": "#63ADF2",
        "theme-earth": "#A7CCED",
        "theme-mars": "#304D6D",
        "theme-jupiter": "#82A0BC",
        "theme-saturn": "rgb(171, 159, 242)",
        "theme-neptune": "rgb(34, 34, 34)",
      },
      backgroundColor: {
        "theme-mecury": "#545e75",
        "theme-venus": "#63ADF2",
        "theme-earth": "#A7CCED",
        "theme-mars": "#304D6D",
        "theme-jupiter": "#82A0BC",
        "theme-saturn": "rgb(171, 159, 242)",
        "theme-neptune": "rgb(34, 34, 34)",
      },
      colors: {
        "theme-mecury": "#545e75",
        "theme-venus": "#63ADF2",
        "theme-earth": "#A7CCED",
        "theme-mars": "#304D6D",
        "theme-jupiter": "#82A0BC",
        "theme-saturn": "rgb(171, 159, 242)",
        "theme-neptune": "rgb(34, 34, 34)",
        "theme-uranus": "rgb(88, 88, 88)",
      },
      fontFamily: {
        matemasie: ["Matemasie", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jersey: ["Jersey 10", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      boxShadow: {
        "theme-mecury": "0 0 10px 0 rgba(84, 94, 117, 0.2)",
        "theme-venus": "0 0 10px 0 rgba(99, 173, 242, 0.2)",
        "theme-earth": "0 0 10px 0 rgba(167, 204, 237, 0.2)",
        "theme-mars": "0 0 10px 0 rgba(48, 77, 109, 0.2)",
        "theme-jupiter": "0 0 10px 0 rgba(130, 160, 188, 0.2)",
        "theme-saturn": "0 0 10px 20px rgba(171, 159, 242, 0.2)", // 171, 159, 242
        "theme-neptune": "0 0 10px 0 rgba(34, 34, 34, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
