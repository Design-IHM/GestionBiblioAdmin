import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentFormattedDateTime, getCurrentUserLogin } from '../utils/dateUtils';

interface AppHeaderProps {
	title: string;
	showDateTime?: boolean;
	showUserLogin?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
	                                             title,
	                                             showDateTime = true,
	                                             showUserLogin = true
                                             }) => {
	const [dateTime, setDateTime] = useState(getCurrentFormattedDateTime());
	const userLogin = getCurrentUserLogin();

	// Update the date/time every second
	useEffect(() => {
		const interval = setInterval(() => {
			setDateTime(getCurrentFormattedDateTime());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<header className="bg-primary shadow-md">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-3">
					<Link to="/" className="flex items-center space-x-2">
						<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
						<div>
							<h1 className="text-xl font-bold text-white">{title}</h1>
							<p className="text-xs text-white/80">Book Management System</p>
						</div>
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					{showDateTime && (
						<div className="text-white/90 text-sm hidden md:block">
							<span className="font-mono">{dateTime}</span>
						</div>
					)}
					{showUserLogin && (
						<div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">
                {userLogin}
              </span>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default AppHeader;