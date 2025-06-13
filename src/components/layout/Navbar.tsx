import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiSearch, BiUserCircle, BiMessageDetail } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { getCurrentUserLogin } from "../../utils/dateUtils";
import LanguageSwitcher from '../common/LanguageSwitcher';
import useI18n from '../../hooks/useI18n';

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { t } = useI18n();
	// const [currentDateTime, setCurrentDateTime] = useState(getCurrentFormattedDateTime());
	const userLogin = getCurrentUserLogin();
	const [searchWord, setSearchWord] = useState("");
	const unreadMessagesCount = 2; // Example count, replace with actual logic

	// Example theme toggle - integrate with your actual theme system
	//const [isDarkMode, setIsDarkMode] = useState(false);
	//const toggleTheme = () => setIsDarkMode(!isDarkMode);

	// Get the current section name from the URL
	const getCurrentSectionName = () => {
		const path = location.pathname;

		if (path === '/dashboard') return t('pages:dashboard.overview');

		// Extract the section name from the path and translate it
		const section = path.split('/').pop() || '';
		return t(`pages:dashboard.${section}`, { defaultValue: section.charAt(0).toUpperCase() + section.slice(1) });
	};

	// Determine if the page should have search functionality
	const shouldShowSearch = () => {
		const path = location.pathname;
		return path.includes('/books') || path.includes('/users');
	};

	// Should show back button?
	const shouldShowBackButton = () => {
		return location.pathname !== '/dashboard';
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<header className="bg-white shadow-sm sticky top-0 z-10">
			<div className="px-6 py-3 flex items-center justify-between flex-wrap">
				{/* Left section with back button and title */}
				<div className="flex items-center">
					{shouldShowBackButton() && (
						<button
							onClick={goBack}
							className="mr-3 p-2 rounded-full hover:bg-secondary-100 transition-colors"
							title={t('components:navbar.back')}
						>
							<IoIosArrowBack className="text-primary-800 text-xl" />
						</button>
					)}
					<h1 className="text-xl font-semibold text-gray-800">
						{getCurrentSectionName()}
					</h1>
				</div>

				{/* Center section with search */}
				{shouldShowSearch() && (
					<div className="flex-grow max-w-lg mx-4 hidden md:block">
						<div className="relative">
							<input
								type="text"
								value={searchWord}
								onChange={(e) => setSearchWord(e.target.value)}
								placeholder={t('components:navbar.search')}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							/>
							<BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
						</div>
					</div>
				)}

				{/* Right section with user controls */}
				<div className="flex items-center space-x-2">
					<LanguageSwitcher />

					<button
						className="relative p-2 rounded-full hover:bg-secondary-100 transition-colors"
						title={t('components:navbar.messages')}
					>
						<BiMessageDetail className="text-primary-800 text-xl" />
						{unreadMessagesCount > 0 && (
							<span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {unreadMessagesCount}
              </span>
						)}
					</button>

					

					<button
						className="flex items-center space-x-2 ml-2 p-1 rounded-full hover:bg-secondary-100 transition-colors"
						title={t('components:navbar.profile')}
					>
						<BiUserCircle className="text-primary-800 text-2xl" />
						<span className="text-sm font-medium hidden md:inline">{userLogin}</span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;