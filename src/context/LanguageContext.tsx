import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageContextType = {
	language: string;
	changeLanguage: (lang: string) => void;
	toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language || 'fr');

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setLanguage(lang);
		localStorage.setItem('i18nextLng', lang);
	};

	const toggleLanguage = () => {
		const newLang = language === 'fr' ? 'en' : 'fr';
		changeLanguage(newLang);
	};

	return (
		<LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};