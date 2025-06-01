import React from 'react';
import { useConfig } from './ConfigProvider';

// These color shades will be explicitly defined to ensure Tailwind generates them
const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const ThemePreview: React.FC = () => {
	const { config } = useConfig();

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mt-8">
			<h2 className="text-2xl font-bold mb-6">Theme Preview</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Primary Colors */}
				<div>
					<h3 className="text-lg font-semibold mb-4">Primary Color</h3>
					<div className="space-y-2">
						{/* Primary Default */}
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 rounded bg-primary"></div>
							<span>Primary (Default)</span>
							<span className="ml-auto font-mono text-xs">{config?.Theme?.Primary || '#3B82F6'}</span>
						</div>

						{/* Primary Shades */}
						{colorShades.map(shade => (
							<div key={`primary-${shade}`} className="flex items-center space-x-2">
								{/* Explicitly using inline style as backup in case Tailwind classes aren't generated */}
								<div
									className={`w-8 h-8 rounded`}
									style={{ backgroundColor: `var(--color-primary-${shade})` }}
								></div>
								<span>Primary-{shade}</span>
							</div>
						))}
					</div>
				</div>

				{/* Secondary Colors */}
				<div>
					<h3 className="text-lg font-semibold mb-4">Secondary Color</h3>
					<div className="space-y-2">
						{/* Secondary Default */}
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 rounded bg-secondary"></div>
							<span>Secondary (Default)</span>
							<span className="ml-auto font-mono text-xs">{config?.Theme?.Secondary || '#64748B'}</span>
						</div>

						{/* Secondary Shades */}
						{colorShades.map(shade => (
							<div key={`secondary-${shade}`} className="flex items-center space-x-2">
								{/* Explicitly using inline style as backup in case Tailwind classes aren't generated */}
								<div
									className={`w-8 h-8 rounded`}
									style={{ backgroundColor: `var(--color-secondary-${shade})` }}
								></div>
								<span>Secondary-{shade}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* UI Elements with Theme Colors */}
			<div className="mt-8">
				<h3 className="text-lg font-semibold mb-4">UI Elements</h3>
				<div className="flex flex-wrap gap-4">
					<button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-600">
						Primary Button
					</button>
					<button className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-600">
						Secondary Button
					</button>
					<button className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary-50">
						Outline Button
					</button>
					<div className="px-4 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
						Badge
					</div>
				</div>
				<div className="mt-4 p-4 border-l-4 border-primary bg-primary-50">
					Alert message with primary color
				</div>
			</div>

			{/* CSS Variables Debug */}
			<div className="mt-8 p-4 bg-gray-50 rounded-lg">
				<h3 className="text-lg font-semibold mb-2">CSS Variables</h3>
				<button
					className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
					onClick={() => {
						// Output all CSS variables to console for debugging
						console.log('CSS Variables:');
						const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
						console.log('--color-primary:', primary);
						colorShades.forEach(shade => {
							const pValue = getComputedStyle(document.documentElement).getPropertyValue(`--color-primary-${shade}`);
							const sValue = getComputedStyle(document.documentElement).getPropertyValue(`--color-secondary-${shade}`);
							console.log(`--color-primary-${shade}:`, pValue);
							console.log(`--color-secondary-${shade}:`, sValue);
						});
					}}
				>
					Debug CSS Variables
				</button>
			</div>

			{/* Current Theme Configuration */}
			<div className="mt-4 p-4 bg-gray-50 rounded-lg">
				<h3 className="text-lg font-semibold mb-2">Current Theme Configuration</h3>
				<pre className="text-sm overflow-auto p-2 bg-gray-100 rounded">
          {JSON.stringify(config?.Theme || {}, null, 2)}
        </pre>
			</div>
		</div>
	);
};

export default ThemePreview;