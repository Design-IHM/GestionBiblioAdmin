import type { Config } from "tailwindcss";
import * as defaultTheme from "tailwindcss/defaultTheme";
const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				// Add custom font families
				'sans': ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
				'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
				'body': ['Poppins', 'system-ui', 'sans-serif'],
				'title': ['Montserrat', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Default Light Theme
				'primary': 'var(--color-primary)',
				'primary-dark': 'var(--color-primary-dark)',
				'secondary': 'var(--color-secondary)',
				'secondary-dark': 'var(--color-secondary-dark)',
				'accent': 'var(--color-accent)',
				'accent-dark': 'var(--color-accent-dark)',
				'background': 'var(--color-background)',
				'background-dark': 'var(--color-background-dark)',
				'surface': 'var(--color-surface)',
				'surface-dark': 'var(--color-surface-dark)',
				'text': 'var(--color-text)',
				'text-dark': 'var(--color-text-dark)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-secondary-dark': 'var(--color-text-secondary-dark)',
				'border': 'var(--color-border)',
				'border-dark': 'var(--color-border-dark)',


				// Couleurs secondaires
				success: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					500: '#22c55e',
					700: '#15803d',
				},
				error: {
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					500: '#ef4444',
					700: '#b91c1c',
				},
				warning: {
					50: '#fff7ed',
					100: '#ffedd5',
					500: '#f97316',
					700: '#c2410c',
				},
				info: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					500: '#3b82f6',
					700: '#1d4ed8',
				},
			},

		},
	},

	plugins: [],

	variants: {
		extend: {
			backgroundColor: ['dark', 'neutral'],
			textColor: ['dark', 'neutral'],
		}
	}
};

export default config;