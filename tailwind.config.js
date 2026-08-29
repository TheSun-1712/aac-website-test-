/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'serif'],
      },
      colors: {
        primary: '#172E7C',
        secondary: '#CCE3FF',
        background: '#0F1E4A',
        accent: '#E5C158',
        clubBlue: '#172E7C',
        clubBlueDark: '#0F1E4A',
        clubBlueLight: '#1D3A94',
        goldText: '#F0D375',
        goldAccent: '#E5C158',
        goldMuted: '#C5A059',
        darkCarbon: '#08080A',
        darkSlate: '#101014',
        crimsonRed: '#DC2626',
        brightRed: '#EF4444',
      },
      borderWidth: {
        '6': '6px',
      },
      transitionProperty: {
        'height': 'height',
      },
      height: {
        '128': '32rem',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px #D2FF00)' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px #D2FF00)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}