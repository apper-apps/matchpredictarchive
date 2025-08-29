/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E8F4FD',
          100: '#D1E9FB',
          200: '#A3D3F7',
          300: '#74BDF3',
          400: '#46A7EF',
          500: '#1890EB',
          600: '#1B4F72',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0A3B80',
        },
        secondary: {
          500: '#2E86AB',
          600: '#236B8A',
        },
        accent: {
          500: '#F39C12',
          600: '#D68910',
        },
        surface: '#1A2332',
        background: '#0F1419',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
      },
    },
  },
  plugins: [],
}