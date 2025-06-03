import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useI18n } from '../hooks/useI18n';

interface I18nContextType {
	t: (key: string, defaultValue?: string) => string;
	changeLanguage: (lang: string) => void;
	language: string;
	loading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
	const i18n = useI18n();

	return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error('useTranslation must be used within an I18nProvider');
	}
	return context;
};