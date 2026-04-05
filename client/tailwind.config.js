/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy tokens kept for backward compat
        cream: {
          50:  '#FEFDFB',
          100: '#FAF9F6',
          200: '#F3F1EC',
          300: '#E8E4DF',
        },
        forest: {
          50:  '#E9F5EF',
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
        terracotta: {
          50:  '#FEF3EE',
          100: '#FDE2D4',
          200: '#F4A261',
          300: '#E98D4B',
          400: '#E76F51',
          500: '#D35F44',
          600: '#BC4B37',
          700: '#9A3C2C',
        },
        primary: {
          50:  '#FFF1F3',
          100: '#FFE4E8',
          200: '#FFADB8',
          300: '#FF7A8E',
          400: '#FB4E6A',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        // iOS-inspired design tokens
        ios: {
          pink:    '#FF375F',
          rose:    '#F43F5E',
          peach:   '#FF9F7A',
          lavender:'#C4B5FD',
          sky:     '#7DD3FC',
          mint:    '#6EE7B7',
          slate:   '#94A3B8',
          gray: {
            1: '#1C1C1E',
            2: '#3A3A3C',
            3: '#636366',
            4: '#8E8E93',
            5: '#AEAEB2',
            6: '#C7C7CC',
          },
        },
        background: '#FAF9F6',
        surface: 'rgba(255,255,255,0.8)',
        accent: {
          peach:    '#FDE2D4',
          lavender: '#E2D5F1',
          sky:      '#BDE0FE',
          rose:     '#FEC5BB',
          mint:     '#C8E6D5',
          amber:    '#F9DCC4',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'display':  ['2.75rem', { lineHeight: '1.1',  letterSpacing: '-0.03em',  fontWeight: '700' }],
        'h1':       ['2rem',    { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2':       ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.02em',  fontWeight: '600' }],
        'h3':       ['1.25rem', { lineHeight: '1.3',  letterSpacing: '-0.015em', fontWeight: '600' }],
        'body-lg':  ['1.0625rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body':     ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption':  ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'micro':    ['0.6875rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        // Glass surfaces
        'glass':       '0 2px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.7)',
        'glass-sm':    '0 1px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.6)',
        'glass-lg':    '0 8px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.75)',
        // Dock
        'dock':        '0 8px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.8)',
        // Buttons
        'btn-rose':    '0 4px 16px rgba(244,63,94,0.28), 0 1px 4px rgba(244,63,94,0.2)',
        'btn-rose-lg': '0 6px 24px rgba(244,63,94,0.36), 0 2px 8px rgba(244,63,94,0.24)',
        // Cards
        'card':        '0 1px 4px rgba(0,0,0,0.05), 0 2px 12px rgba(0,0,0,0.04)',
        'card-hover':  '0 6px 24px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)',
        // Legacy
        'subtle':      '0 1px 3px 0 rgba(0,0,0,0.04)',
        'elevated':    '0 4px 16px -4px rgba(0,0,0,0.08)',
        'lifted':      '0 8px 30px -8px rgba(0,0,0,0.10)',
        'soft':        '0 1px 4px -1px rgba(0,0,0,0.06)',
        'soft-md':     '0 4px 16px -4px rgba(0,0,0,0.08)',
        'soft-lg':     '0 8px 30px -8px rgba(0,0,0,0.10)',
        'btn':         '0 1px 3px 0 rgba(231,111,81,0.16)',
        'btn-hover':   '0 4px 16px -2px rgba(231,111,81,0.24)',
        'inner-soft':  'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
        'glow':        '0 0 20px -5px rgba(244,63,94,0.25)',
        'glow-lg':     '0 0 40px -10px rgba(244,63,94,0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // App background — soft warm gradient
        'app-bg': 'linear-gradient(160deg, #FFF8F5 0%, #FFF0F5 30%, #F8F0FF 60%, #F0F5FF 85%, #F5FFF8 100%)',
        // Card frosted
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.70))',
        // Auth
        'auth-bg': 'linear-gradient(160deg, #FFF5F7 0%, #FFF0FB 35%, #F5F0FF 65%, #EEF5FF 100%)',
        // Button gradient
        'btn-primary': 'linear-gradient(135deg, #FB7185 0%, #F43F5E 50%, #E11D48 100%)',
        // Mesh blobs
        'mesh-1': 'radial-gradient(at 30% 20%, rgba(255,182,193,0.4) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(196,181,253,0.35) 0px, transparent 50%), radial-gradient(at 10% 70%, rgba(186,230,253,0.35) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(252,211,233,0.3) 0px, transparent 50%)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':    'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'ios':       'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        DEFAULT: '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
