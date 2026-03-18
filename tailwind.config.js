/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC',
          400: '#818CF8', 500: '#667EEA', 600: '#5B5BD6', 700: '#4C3BCF',
          800: '#3B1FA5', 900: '#2E1065',
        },
        accent: {
          50: '#FFF1F2', 100: '#FFE4E6', 200: '#FECDD3', 300: '#FDA4AF',
          400: '#F5576C', 500: '#E94560', 600: '#E11D48', 700: '#BE123C',
          800: '#9F1239', 900: '#881337',
        },
        surface: {
          dark: '#0F0C29', mid: '#302B63', light: '#24243E',
          card: 'rgba(255,255,255,0.08)', cardBorder: 'rgba(255,255,255,0.12)',
        },
        success: { 400: '#4FACFE', 500: '#00F2FE', 600: '#10B981' },
        bmi: {
          underweight: '#60A5FA', normal: '#34D399', overweight: '#FBBF24',
          obese1: '#FB923C', obese2: '#F87171', obese3: '#EF4444',
        },
      },
      fontFamily: { sans: ['Inter', 'System'], mono: ['SpaceMono'] },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem' },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
