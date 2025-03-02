import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
