import { useCallback, useState, useEffect } from 'react';

// Default language
const DEFAULT_LANGUAGE = 'fr';

interface Translations {
	[key: string]: any;
}

const cache: Record<string, Translations> = {};

export const useI18n = () => {
	const [language, setLanguage] = useState<string>(
		localStorage.getItem('language') || DEFAULT_LANGUAGE
	);
	const [translations, setTranslations] = useState<Translations>({});
	const [loading, setLoading] = useState<boolean>(true);

	// Fetch translations for the current language
	useEffect(() => {
		const fetchTranslations = async () => {
			try {
				setLoading(true);

				// Check if translations are cached
				if (cache[language]) {
					setTranslations(cache[language]);
					setLoading(false);
					return;
				}

				// If not cached, fetch from public folder
				const response = await fetch(`/locales/${language}/common.json`);
				if (!response.ok) {
					throw new Error(`Failed to load translations for ${language}`);
				}

				const data = await response.json();

				// Cache the translations
				cache[language] = data;

				setTranslations(data);
			} catch (error) {
				console.error('Error loading translations:', error);

				// Fallback to empty translations
				setTranslations({});
			} finally {
				setLoading(false);
			}
		};

		fetchTranslations();
	}, [language]);

	// Change language
	const changeLanguage = useCallback((newLanguage: string) => {
		localStorage.setItem('language', newLanguage);
		setLanguage(newLanguage);
	}, []);

	// Get translation value by key (supports nested keys like "books.title")
	const t = useCallback((key: string, defaultValue?: string): string => {
		if (loading) return defaultValue || key;

		const keys = key.split('.');
		let value = translations;

		for (const k of keys) {
			value = value?.[k];
			if (value === undefined) break;
		}

		return value !== undefined ? value : (defaultValue || key);
	}, [translations, loading]);

	return {
		t,
		changeLanguage,
		language,
		loading
	};
};