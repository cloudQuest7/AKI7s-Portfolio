/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
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
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-200% 0'
          },
          '100%': {
            'background-position': '200% 0'
          },
        },
        scan: {
          '0%': {
            'background-position': '0% -100%'
          },
          '100%': {
            'background-position': '0% 100%'
          }
        }
      },
      colors: {
        'github-purple': {
          DEFAULT: '#6e40c9',
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#dcceff',
          300: '#c4acff',
          400: '#a37dff',
          500: '#6e40c9',
          600: '#5c2fb3',
          700: '#4a237d',
          800: '#381c66',
          900: '#2b1650',
        }
      },
    },
  },
  plugins: [],
}