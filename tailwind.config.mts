import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: false,
  },
  theme: {
    screens: {
      xs: '320px',
      '1xs': '390px',
      '2xs': '500px',
      '3xs': '550px',
      sm: '640px',
      md: '768px',
      base: '840px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    animation: {
      reload: 'reload 1s infinite',
      upScale: 'upScale 2s 500ms infinite',
    },
    keyframes: {
      reload: {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      upScale: {
        '0%': {
          scale: '0.8',
          opacity: '1',
        },
        '20%': {
          opacity: '1',
        },
        '55%': {
          scale: '1.8',
          opacity: '0',
        },
        '100%': {
          scale: '1.8',
          opacity: '0',
        },
      },
    },
    extend: {
      width: {
        side: 'calc(100vw - 16rem)',
        sideClose: 'calc(100vw - 4rem)',
      },
      boxShadow: {
        'custom-white-blue': '0 0 0 1px white, 0 0 0 2px #2688AB',
      },
      borderColor: {
        DEFAULT: 'var(--tw-border-opacity, 1) theme("colors.gray.200")',
      },
      transitionProperty: {
        colors: 'background, background-color, color, border-color, fill, stroke',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hover', ['body:not(.disable-hover) &:hover', 'body:not(.disable-hover) &:active'])
    }),
  ],
} satisfies Config