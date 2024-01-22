import type { Config } from 'tailwindcss'
const plugin = require("tailwindcss/plugin");
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
        yellow_color: '#B2DB46',
        linear_gradient_50 : "#CFE8A9"
        
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }:any) {
      const newUtilities = {
        ".text-muted": {
          opacity: 0.8,
        },
        ".transition-a": {
          transition: "all 0.3s ease-in-out",
        },
        ".card-shadow": {
          boxShadow: " 0 0 0.375rem 0.25rem rgb(161 172 184 / 15%)",
        },
        ".shadow-light": {
          boxShadow: "0 0.3rem 0.6rem .2rem rgba(0, 0, 0, 0.1)",
        },
        ".border-light": {
          border: "1px solid rgba(46, 46, 46, 0.1)",
        },
        ".input-shadow": {
          boxShadow: "0 0 0 1000px #f5f5f9 inset !important",
        },
        ".input-dark-shadow": {
          boxShadow: "0 0 0 1000px #13131A inset !important",
        },
        ".inputAutofillColor": {
          "-webkit-text-fill-color": "#ccc",
        },
        ".flex-center-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".flex-align-center": {
          display: "flex",
          alignItems: "center",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
}
export default config
