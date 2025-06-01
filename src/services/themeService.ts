import type { OrgSettings } from '../types/OrgSettings';
import Color from 'color';

// Function to generate color shades from a base color
function generateColorShades(baseColor: string): Record<string, string> {
	try {
		const color = Color(baseColor);

		return {
			DEFAULT: baseColor,
			'50': color.lighten(0.4).hex(),
			'100': color.lighten(0.3).hex(),
			'200': color.lighten(0.2).hex(),
			'300': color.lighten(0.1).hex(),
			'400': color.lighten(0.05).hex(),
			'500': color.hex(),
			'600': color.darken(0.1).hex(),
			'700': color.darken(0.2).hex(),
			'800': color.darken(0.3).hex(),
			'900': color.darken(0.4).hex(),
		};
	} catch (error) {
		console.error(`Failed to generate color shades for ${baseColor}:`, error);
		return {
			DEFAULT: baseColor,
			'50': '#f8fafc',
			'100': '#f1f5f9',
			'200': '#e2e8f0',
			'300': '#cbd5e1',
			'400': '#94a3b8',
			'500': baseColor,
			'600': '#475569',
			'700': '#334155',
			'800': '#1e293b',
			'900': '#0f172a',
		};
	}
}

// Apply theme colors to CSS variables
export function applyTheme(theme: OrgSettings['Theme']): void {
	try {
		if (!theme) return;

		if (theme.Primary) {
			const primaryShades = generateColorShades(theme.Primary);
			Object.entries(primaryShades).forEach(([shade, value]) => {
				const variableName = shade === 'DEFAULT' ? '--color-primary' : `--color-primary-${shade}`;
				document.documentElement.style.setProperty(variableName, value);
			});
		}

		if (theme.Secondary) {
			const secondaryShades = generateColorShades(theme.Secondary);
			Object.entries(secondaryShades).forEach(([shade, value]) => {
				const variableName = shade === 'DEFAULT' ? '--color-secondary' : `--color-secondary-${shade}`;
				document.documentElement.style.setProperty(variableName, value);
			});
		}

		console.log('Theme applied:', theme);
	} catch (error) {
		console.error('Error applying theme:', error);
	}
}

// Reset theme to defaults
export function resetTheme(): void {
	const styleSheet = document.createElement('style');
	document.head.appendChild(styleSheet);
	document.head.removeChild(styleSheet);
}