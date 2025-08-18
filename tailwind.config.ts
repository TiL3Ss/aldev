// tailwind.config.ts
// This is a Tailwind CSS configuration file that sets up custom themes, colors, and animations
import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Paleta personalizada
        cream: '#F8EDED',
        orange: '#FF8225', 
        burgundy: '#B43F3F',
        navy: '#173B45',
        
        // Variaciones para diferentes estados
        'cream-light': '#FEFCFC',
        'cream-dark': '#F0E5E5',
        'orange-light': '#FF9547',
        'orange-dark': '#E6741F',
        'burgundy-light': '#C54F4F',
        'burgundy-dark': '#9A3333',
        'navy-light': '#1E4550',
        'navy-dark': '#0F2A32',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'system-ui',
          'sans-serif'
        ],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite reverse',
        'gradient': 'gradient 15s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(5deg)',
            opacity: '1'
          },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(255, 130, 37, 0.3)',
        'glow-lg': '0 0 30px -5px rgba(255, 130, 37, 0.4)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 130, 37, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'oriental-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23173B45" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="20"/%3E%3Cpath d="M10 30 Q30 10 50 30 Q30 50 10 30"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#fef7ed',
              100: '#feefd5', 
              200: '#fed7aa',
              300: '#fdba74',
              400: '#fb923c',
              500: '#FF8225', // orange
              600: '#ea580c',
              700: '#c2410c',
              800: '#9a3412',
              900: '#7c2d12',
              DEFAULT: '#FF8225',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#fdf2f8',
              100: '#fce7f3',
              200: '#fbcfe8',
              300: '#f9a8d4',
              400: '#f472b6',
              500: '#B43F3F', // burgundy
              600: '#be185d',
              700: '#be185d',
              800: '#9d174d',
              900: '#831843',
              DEFAULT: '#B43F3F',
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: '#22c55e',
              foreground: '#ffffff',
            },
            warning: {
              DEFAULT: '#FF8225', // orange
              foreground: '#ffffff',
            },
            danger: {
              DEFAULT: '#B43F3F', // burgundy
              foreground: '#ffffff',
            },
            background: '#F8EDED', // cream
            foreground: '#173B45', // navy
            content1: 'rgba(248, 237, 237, 0.8)', // cream with opacity
            content2: 'rgba(248, 237, 237, 0.6)',
            content3: 'rgba(248, 237, 237, 0.4)',
            content4: 'rgba(248, 237, 237, 0.2)',
          },
        },
      },
    }),
  ],
};

export default config;