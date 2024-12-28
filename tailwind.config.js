/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			bordeaux: '#6B2737',
  			'terre-cuite': '#B46060',
  			'beige-clair': '#F5E8C7',
  			'or-doux': '#DEB887',
  			'gris-neutre': '#4A4A4A',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			heading: [
  				'var(--font-heading)',
  				'sans-serif'
  			],
  			sans: [
  				'var(--font-body)',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			soft: '0 4px 6px -1px rgba(107, 39, 55, 0.1), 0 2px 4px -1px rgba(107, 39, 55, 0.06)',
  			md: '0 10px 15px -3px rgba(107, 39, 55, 0.1), 0 4px 6px -2px rgba(107, 39, 55, 0.05)'
  		},
  		transitionProperty: {
  			colors: 'color, background-color, border-color, text-decoration-color, fill, stroke'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear',
  			orbit: 'orbit calc(var(--duration)*1s) linear infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
  				}
  			}
  		}
  	}
  },
  plugins: [],
}

