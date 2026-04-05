/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 60% — Dominant (backgrounds, surfaces)
        cream: {
          50: '#FEFDFB',
          100: '#FAF9F6',
          200: '#F3F1EC',
          300: '#E8E4DF',
        },
        // 30% — Secondary (text, structure, navigation)
        forest: {
          50: '#E9F5EF',
          100: '#C8E6D5',
          200: '#95D5B2',
          300: '#74C69D',
          400: '#52B788',
          500: '#40916C',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#143328',
          900: '#0D1F18',
        },
        // 10% — Accent (CTAs, highlights, energy)
        terracotta: {
          50: '#FEF3EE',
          100: '#FDE2D4',
          200: '#F4A261',
          300: '#E98D4B',
          400: '#E76F51',
          500: '#D35F44',
          600: '#BC4B37',
          700: '#9A3C2C',
        },
        // Keep primary alias for backward compat in non-redesigned pages
        primary: {
          50: '#E9F5EF',
          100: '#C8E6D5',
          200: '#95D5B2',
          300: '#74C69D',
          400: '#52B788',
          500: '#40916C',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#143328',
          900: '#0D1F18',
        },
        background: '#FAF9F6',
        surface: '#FFFFFF',
        accent: {
          peach: '#FDE2D4',
          lavender: '#E2D5F1',
          sky: '#BDE0FE',
          rose: '#FEC5BB',
          mint: '#C8E6D5',
          amber: '#F9DCC4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 4px -1px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'lifted': '0 8px 30px -8px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
        'btn': '0 1px 3px 0 rgba(231, 111, 81, 0.16), 0 2px 8px -2px rgba(231, 111, 81, 0.12)',
        'btn-hover': '0 4px 16px -2px rgba(231, 111, 81, 0.24), 0 2px 6px -1px rgba(231, 111, 81, 0.16)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        // Keep old names for backward compat
        'soft': '0 1px 4px -1px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 30px -8px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px -5px rgba(45, 106, 79, 0.2)',
        'glow-lg': '0 0 40px -10px rgba(45, 106, 79, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(145deg, #FAF9F6 0%, #E9F5EF 35%, #FAF9F6 60%, #FEF3EE 85%, #FAF9F6 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
        'mesh-1': 'radial-gradient(at 40% 20%, rgba(200,230,213,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(189,224,254,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(226,213,241,0.3) 0px, transparent 50%)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
};
