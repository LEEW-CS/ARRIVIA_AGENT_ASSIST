import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        arrivia: {
          blue: {
            DEFAULT: '#0B3D6B',
            50: '#EAF1F8',
            100: '#D2E0EE',
            200: '#A6C2DD',
            300: '#79A4CC',
            400: '#3F77AB',
            500: '#0E4D8A',
            600: '#0B3D6B',
            700: '#0A3358',
            800: '#082945',
            900: '#061E33',
          },
          coral: {
            DEFAULT: '#F26B3A',
            50: '#FFF1EB',
            100: '#FFE0D2',
            200: '#FFC2A6',
            300: '#FFA37A',
            400: '#FF854D',
            500: '#F26B3A',
            600: '#D75829',
            700: '#B14620',
            800: '#8C3618',
            900: '#5F2410',
          },
          slate: {
            DEFAULT: '#4A5568',
            50: '#F7F8FA',
            100: '#EDEFF3',
            200: '#D9DDE5',
            300: '#B7BFCD',
            400: '#8893A6',
            500: '#5E6B82',
            600: '#4A5568',
            700: '#39424F',
            800: '#2A323D',
            900: '#1B2028',
          },
          cream: {
            DEFAULT: '#FAF6F0',
            50: '#FEFCFA',
            100: '#FAF6F0',
            200: '#F2EADC',
            300: '#E8DAC2',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
