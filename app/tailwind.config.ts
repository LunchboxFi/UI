import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-general)'],
        mono: ['var(--font-mono)'],
      },
      fontWeight: {
        '100': '100',
        '400': '400',
        '700': '700',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'background': "url('/background.png')",
      },
      backgroundSize: {
        '50%': '50%',
        'cover': 'cover',
        'contain': 'contain',
        'auto': 'auto',
      },
    },
  },
  plugins: [],
}
export default config
