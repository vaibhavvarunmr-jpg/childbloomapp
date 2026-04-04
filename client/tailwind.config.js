/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        background: '#F8FAFB',
        surface: '#FFFFFF',
        accent: {
          peach: '#FED7AA',
          lavender: '#E9D5FF',
          sky: '#BAE6FD',
          rose: '#FECDD3',
          mint: '#A7F3D0',
          amber: '#FDE68A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
        'soft-md': '0 4px 20px -4px rgba(0, 0, 0, 0.06), 0 8px 16px -8px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 30px -6px rgba(0, 0, 0, 0.08), 0 16px 24px -12px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 40px -10px rgba(16, 185, 129, 0.4)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 25%, #F8FAFB 50%, #EFF6FF 75%, #F5F3FF 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
        'mesh-1': 'radial-gradient(at 40% 20%, #A7F3D0 0px, transparent 50%), radial-gradient(at 80% 0%, #BAE6FD 0px, transparent 50%), radial-gradient(at 0% 50%, #E9D5FF 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
