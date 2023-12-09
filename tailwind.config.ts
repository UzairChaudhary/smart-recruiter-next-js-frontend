import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic' : 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient'  : 'linear-gradient(90deg, #0089B5 0.01%, #B2DB46 100%)',
      },
      
      colors: {
        teal_color: '#1ABBAC', // teal color
        blue_color: '#0089B5', // blue color
        black_color: '#01042D', //black color
        yellow_color: '#B2DB46'
        
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
}
export default config
