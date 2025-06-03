import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiSearch, BiUserCircle, BiMessageDetail, BiGlobe } from 'react-icons/bi';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';
import { IoIosArrowBack } from 'react-icons/io';
import { getCurrentFormattedDateTime, getCurrentUserLogin } from "../../utils/dateUtils";

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [currentDateTime, setCurrentDateTime] = useState(getCurrentFormattedDateTime());
	const userLogin = getCurrentUserLogin();
	const [searchWord, setSearchWord] = useState("");
	const [unreadMessagesCount, setUnreadMessagesCount] = useState(2); // Example count, replace with actual logic
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	// Example theme toggle - integrate with your actual theme system
	const [isDarkMode, setIsDarkMode] = useState(false);
	const toggleTheme = () => setIsDarkMode(!isDarkMode);

	// Example language toggle - integrate with your actual i18n system
	const [language, setLanguage] = useState("EN");
	const changeLanguage = (lang: string) => setLanguage(lang);

	// Get the current section name from the URL
	const getCurrentSectionName = () => {
		const path = location.pathname;

		if (path === '/dashboard') return 'Overview';

		// Extract the section name from the path and capitalize the first letter
		const section = path.split('/').pop() || '';
		return section.charAt(0).toUpperCase() + section.slice(1);
	};

	// Determine if the page should have search functionality
	const shouldShowSearch = () => {
		const path = location.pathname;
		return path.includes('/books') || path.includes('/users');
	};

	// Update time every second
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDateTime(getCurrentFormattedDateTime());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Should show back button?
	const shouldShowBackButton = () => {
		return location.pathname !== '/dashboard';
	};

	const goBack = () => {
		navigate(-1);
	};

	// Translations - simplified version
	const translations = {
		search_placeholder: language === "FR" ? "Rechercher..." : "Search...",
		change_language: language === "FR" ? "Changer de langue" : "Change language",
		messages: language === "FR" ? "Messages" : "Messages",
		profile: language === "FR" ? "Profil" : "Profile",
		light_mode: language === "FR" ? "Mode clair" : "Light mode",
		dark_mode: language === "FR" ? "Mode sombre" : "Dark mode",
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
							title="Go back"
						>
							<IoIosArrowBack className="text-primary-800 text-xl" />
						</button>
					)}
					<h1 className="text-xl font-semibold text-primary">
						{getCurrentSectionName()}
					</h1>
				</div>

				{/* Center section with search */}
				{shouldShowSearch() && (
					<div className="mx-4 flex-grow max-w-xl hidden sm:flex relative">
						<div className="w-full relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<BiSearch className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								value={searchWord}
								onChange={(e) => setSearchWord(e.target.value)}
								className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 bg-secondary-50"
								placeholder={translations.search_placeholder}
							/>
						</div>
					</div>
				)}

				{/* Right section with actions */}
				<div className="flex items-center space-x-1">
					{/* Mobile menu toggle */}
					<button
						className="sm:hidden p-2 rounded-md hover:bg-secondary-100"
						onClick={() => setShowMobileMenu(!showMobileMenu)}
					>
						<div className="w-5 h-5 flex flex-col justify-between">
							<span className="h-0.5 w-full bg-primary-800 rounded-full"></span>
							<span className="h-0.5 w-full bg-primary-800 rounded-full"></span>
							<span className="h-0.5 w-full bg-primary-800 rounded-full"></span>
						</div>
					</button>

					{/* Messages button */}
					<button
						className="p-2 rounded-md hover:bg-secondary-100 relative"
						title={translations.messages}
					>
						<BiMessageDetail className="text-primary-800 text-xl" />
						{unreadMessagesCount > 0 && (
							<span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadMessagesCount}
              </span>
						)}
					</button>

					{/* Language toggle */}
					<button
						onClick={() => changeLanguage(language === "FR" ? "EN" : "FR")}
						className="p-2 rounded-md hover:bg-secondary-100 flex items-center"
						title={translations.change_language}
					>
						<BiGlobe className="text-primary-800 text-xl" />
						<span className="ml-1 text-sm font-medium text-primary-800 hidden md:inline">
              {language}
            </span>
					</button>

					{/* Theme toggle */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-md hover:bg-secondary-100"
						title={isDarkMode ? translations.light_mode : translations.dark_mode}
					>
						{isDarkMode ? (
							<RiSunFill className="text-primary-800 text-xl" />
						) : (
							<RiMoonFill className="text-primary-800 text-xl" />
						)}
					</button>

					{/* Profile button */}
					<button
						className="p-2 rounded-md hover:bg-secondary-100 flex items-center"
						title={translations.profile}
					>
						<BiUserCircle className="text-primary-800 text-xl" />
						<span className="ml-1 text-sm font-medium text-primary-800 hidden md:inline">
              {translations.profile}
            </span>
					</button>

				</div>
			</div>

			{/* Mobile search - only shows when menu is expanded */}
			{showMobileMenu && shouldShowSearch() && (
				<div className="sm:hidden px-4 pb-3">
					<div className="relative rounded-md shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<BiSearch className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							value={searchWord}
							onChange={(e) => setSearchWord(e.target.value)}
							className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 bg-secondary-50"
							placeholder={translations.search_placeholder}
						/>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;