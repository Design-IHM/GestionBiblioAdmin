import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from './theme/ConfigProvider.tsx';
import OrgConfiguration from './theme/OrgConfiguration.tsx';
import ThemePreview from './theme/ThemePreview.tsx';
import {GiBookPile} from "react-icons/gi";
import {getCurrentFormattedDateTime, getCurrentUserLogin} from "../utils/dateUtils.ts";

interface DashboardProps {
	initialSection?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ initialSection = 'overview' }) => {
	const { config, loading } = useConfig();
	const [activeSection, setActiveSection] = useState<string>(initialSection);

	// Use the updated date/time and user login as specified
	const [currentDateTime, setCurrentDateTime] = useState(getCurrentFormattedDateTime());
	const userLogin = getCurrentUserLogin();

	// Update time every second
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDateTime(getCurrentFormattedDateTime());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		// Update active section if initialSection prop changes
		if (initialSection) {
			setActiveSection(initialSection);
		}
	}, [initialSection]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-secondary-100">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-t-primary border-secondary-300 rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-primary-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	const sidebarItems = [
		{ id: 'overview', label: 'Overview', icon: 'chart-pie' },
		{ id: 'books', label: 'Books', icon: 'book-open' },
		{ id: 'users', label: 'Users', icon: 'users' },
		{ id: 'loans', label: 'Loans', icon: 'clipboard-list' },
		{ id: 'returns', label: 'Returns', icon: 'clipboard-check' },
		{ id: 'settings', label: 'Settings', icon: 'cog' },
		{ id: 'theme', label: 'Theme', icon: 'color-swatch' },
	];

	const renderIcon = (iconName: string) => {
		switch (iconName) {
			case 'chart-pie':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
					</svg>
				);
			case 'book-open':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
					</svg>
				);
			case 'users':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				);
			case 'clipboard-list':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
					</svg>
				);
			case 'clipboard-check':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
					</svg>
				);
			case 'cog':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				);
			case 'color-swatch':
				return (
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
					</svg>
				);
			default:
				return null;
		}
	};

	// Function to render the logo or default book icon
	const renderLogo = () => {
		if (config?.Logo && config.Logo !== "") {
			// If a logo URL is provided in the config, use it
			return (
				<img
					src={config.Logo}
					alt={`${config.Name} Logo`}
					className="w-8 h-8 object-contain"
					onError={(e) => {
						// Fallback to default icon if image fails to load
						const target = e.target as HTMLImageElement;
						target.style.display = 'none';
						// Show default icon
						const container = target.parentElement;
						if (container) {
							const svg = document.createElement('svg');
							svg.setAttribute('class', 'w-8 h-8 text-primary');
							svg.setAttribute('fill', 'none');
							svg.setAttribute('stroke', 'currentColor');
							svg.setAttribute('viewBox', '0 0 24 24');
							svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
							svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />';
							container.appendChild(svg);
						}
					}}
				/>
			);
		} else {
			// Default book icon
			return (
				<GiBookPile className="w-8 h-8 text-primary"/>
			);
		}
	};

	const renderContent = () => {
		// Existing render content function...
		// (keeping the existing implementation)
		switch (activeSection) {
			case 'overview':
				// Rest of the overview content...
				return (
					<div>
						<h2 className="text-2xl font-semibold mb-6">Overview</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">Total Books</p>
										<p className="text-2xl font-bold">5,283</p>
									</div>
									<div className="bg-primary-100 p-3 rounded-full">
										<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
								</div>
								<div className="mt-4">
									<p className="text-green-600 text-sm flex items-center">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
										</svg>
										3.2% from last month
									</p>
								</div>
							</div>

							{/* Other cards remain the same */}
							{/* ... */}

							<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">Active Loans</p>
										<p className="text-2xl font-bold">237</p>
									</div>
									<div className="bg-green-100 p-3 rounded-full">
										<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
										</svg>
									</div>
								</div>
								<div className="mt-4">
									<p className="text-red-600 text-sm flex items-center">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
										</svg>
										1.8% from last week
									</p>
								</div>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">Registered Users</p>
										<p className="text-2xl font-bold">1,248</p>
									</div>
									<div className="bg-purple-100 p-3 rounded-full">
										<svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
									</div>
								</div>
								<div className="mt-4">
									<p className="text-green-600 text-sm flex items-center">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
										</svg>
										5.3% from last month
									</p>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Existing content... */}
							{/* ... */}
							<div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
								<h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
								<div className="space-y-4">
									{[
										{ user: 'John Doe', action: 'borrowed', book: 'Introduction to Machine Learning', time: '2 hours ago' },
										{ user: 'Jane Smith', action: 'returned', book: 'Advanced Calculus', time: '5 hours ago' },
										{ user: 'Robert Johnson', action: 'borrowed', book: 'History of Ancient Greece', time: '1 day ago' },
										{ user: 'Emily Wilson', action: 'reserved', book: 'Modern Physics', time: '1 day ago' },
										{ user: 'Michael Brown', action: 'returned', book: 'Organic Chemistry', time: '2 days ago' },
									].map((item, index) => (
										<div key={index} className="flex items-center py-3 border-b last:border-0">
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
												<span className="font-medium text-primary">{item.user.charAt(0)}</span>
											</div>
											<div className="ml-4">
												<p className="text-sm">
													<span className="font-medium text-gray-900">{item.user}</span>
													<span className="text-gray-600"> {item.action} </span>
													<span className="font-medium text-gray-900">{item.book}</span>
												</p>
												<p className="text-xs text-gray-500">{item.time}</p>
											</div>
										</div>
									))}
								</div>
								<div className="mt-4 text-center">
									<button className="text-primary hover:underline text-sm font-medium">
										View All Activity
									</button>
								</div>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6">
								<h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
								<div className="space-y-4">
									{[
										{ name: 'Computer Science', percentage: 30 },
										{ name: 'Engineering', percentage: 25 },
										{ name: 'Mathematics', percentage: 20 },
										{ name: 'Physics', percentage: 15 },
										{ name: 'Biology', percentage: 10 },
									].map((category, index) => (
										<div key={index} className="mb-4">
											<div className="flex justify-between mb-1">
												<span className="text-sm font-medium">{category.name}</span>
												<span className="text-sm font-medium">{category.percentage}%</span>
											</div>
											<div className="w-full bg-secondary-200 rounded-full h-2">
												<div className="bg-primary h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			case 'settings':
				return <OrgConfiguration />;
			case 'theme':
				return <ThemePreview />;
			default:
				return (
					<div className="text-center py-12">
						<svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
						<h3 className="text-xl font-medium text-gray-900 mb-2">Under Development</h3>
						<p className="text-gray-600">
							This section is currently being developed and will be available soon.
						</p>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-secondary-100 flex flex-col">
			{/* Main content */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<div className="bg-secondary w-64 shadow-md fixed h-full">
					<div className="p-6 border-b border-secondary-300 flex justify-between items-center">
						<div className="flex items-center space-x-3">
							{renderLogo()}
							<h1 className="text-lg font-bold text-primary">{config.Name}</h1>
						</div>
					</div>

					<nav className="mt-6">
						<div className="px-6 pb-4">
							<p className="text-xs font-medium text-primary-800 uppercase tracking-wider mb-4">
								Main
							</p>
							<ul className="space-y-2">
								{sidebarItems.map(item => (
									<li key={item.id}>
										<Link
											to={`/dashboard${item.id === 'overview' ? '' : `/${item.id}`}`}
											className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${
												activeSection === item.id
													? 'bg-primary text-white'
													: 'hover:bg-secondary-300 text-primary-800'
											}`}
										>
											<span className="mr-3">{renderIcon(item.icon)}</span>
											<span>{item.label}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</nav>

					<div className="absolute bottom-0 w-full px-6 py-4 border-t border-secondary-300">
						<Link to="/" className="flex items-center space-x-3 text-primary-700 hover:text-primary transition-colors">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							<span>Log Out</span>
						</Link>
					</div>
				</div>

				{/* Main Content */}
				<div className="ml-64 flex-1">
					{/* Header */}
					<header className="bg-white shadow-sm sticky top-0 z-10">
						<div className="px-6 py-4 flex justify-between items-center">
							<h1 className="text-xl font-semibold text-primary">
								{sidebarItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
							</h1>

							<div className="flex items-center space-x-4">
								{/* Date/Time and User Login */}
								<div className="text-gray-600 text-sm hidden md:block">
									<span className="font-mono">{currentDateTime}</span>
								</div>

								<div className="flex items-center space-x-3 bg-secondary-100 px-3 py-1 rounded-full">
									<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
										<span className="text-white text-xs font-medium">{userLogin.charAt(0)}</span>
									</div>
									<span className="text-xs font-medium text-primary-800">{userLogin}</span>
								</div>
							</div>
						</div>
					</header>

					{/* Content */}
					<main className="p-6">
						{renderContent()}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;