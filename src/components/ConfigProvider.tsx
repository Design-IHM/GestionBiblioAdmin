import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useOrgConfiguration } from '../hooks/useOrgConfiguration';
import type { OrgSettings } from '../types/OrgSettings';
import { defaultOrgSettings } from '../constants/defaultOrgSettings';

// Create context for organization configuration
interface ConfigContextType {
	config: OrgSettings;
	loading: boolean;
	error: string | null;
}

const ConfigContext = createContext<ConfigContextType>({
	config: defaultOrgSettings,
	loading: false,
	error: null
});

// Hook to use configuration
export const useConfig = () => useContext(ConfigContext);

interface ConfigProviderProps {
	children: ReactNode;
	orgName: string;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, orgName }) => {
	const { config, loading, error } = useOrgConfiguration(orgName);

	// Log config details for debugging
	useEffect(() => {
		console.log('ConfigProvider received config:', config);
		console.log('Loading state:', loading);
		console.log('Error state:', error);
	}, [config, loading, error]);

	// Apply theme from configuration if available
	useEffect(() => {
		try {
			if (config?.Theme?.Primary) {
				document.documentElement.style.setProperty('--color-primary', config.Theme.Primary);
			}
			if (config?.Theme?.Secondary) {
				document.documentElement.style.setProperty('--color-secondary', config.Theme.Secondary);
			}
		} catch (err) {
			console.error('Error applying theme:', err);
		}
	}, [config]);

	// Always provide a valid configuration
	const safeConfig = config || defaultOrgSettings;
	const contextValue = {
		config: safeConfig,
		loading,
		error
	};

	return (
		<ConfigContext.Provider value={contextValue}>
			{children}

			{/* Show error notification if there was a problem */}
			{error && (
				<div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-xs z-50">
					<div className="flex">
						<div className="py-1"><svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg></div>
						<div>
							<p className="font-bold">Configuration Error</p>
							<p className="text-sm">{error}</p>
							<p className="text-sm mt-1">Using default configuration.</p>
						</div>
					</div>
				</div>
			)}
		</ConfigContext.Provider>
	);
};