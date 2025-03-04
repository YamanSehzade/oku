import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        book: ['Merriweather', 'serif'],
      },
      colors: {
        primary: {
          50: '#fef9e8',
          100: '#fdf3d1',
          200: '#fbe7a3',
          300: '#f9db75',
          400: '#f7cf47',
          500: '#f5c319',
          600: '#c49c14',
          700: '#93750f',
          800: '#624e0a',
          900: '#312705',
        },
        secondary: {
          50: '#eaf4ff',
          100: '#d5e9ff',
          200: '#abd3ff',
          300: '#81bdff',
          400: '#57a7ff',
          500: '#2d91ff',
          600: '#2474cc',
          700: '#1b5799',
          800: '#123a66',
          900: '#091d33',
        },
        accent: {
          50: '#fde8e8',
          100: '#fbd1d1',
          200: '#f7a3a3',
          300: '#f37575',
          400: '#ef4747',
          500: '#eb1919',
          600: '#bc1414',
          700: '#8d0f0f',
          800: '#5e0a0a',
          900: '#2f0505',
        },
        teal: {
          50: '#e6fbfa',
          100: '#ccf7f5',
          200: '#99efeb',
          300: '#66e7e1',
          400: '#33dfd7',
          500: '#00d7cd',
          600: '#00aca4',
          700: '#00817b',
          800: '#005652',
          900: '#002b29',
        },
      },
    },
  },
  plugins: [],
};

export default config;
