import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ORGANIZATION } from '../config/firebase.ts';

const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const currentYear = new Date().getFullYear();
	const currentDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const handleEnterSystem = () => {
		navigate('/dashboard');
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="bg-primary shadow-md">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="flex items-center space-x-3">
						<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
						<div>
							<h1 className="text-xl font-bold text-white">Campus Library Admin</h1>
							<p className="text-xs text-white/80">Book Management System</p>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<span className="hidden md:inline text-white/80 text-sm">{currentDate}</span>
						<button
							onClick={handleEnterSystem}
							className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
						>
							Admin Login
						</button>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="bg-gradient-to-b from-primary/10 to-white py-16 md:py-24 flex-grow">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row items-center">
						<div className="md:w-1/2 mb-8 md:mb-0">
							<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
								Campus Library Management System
							</h1>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								Streamline your campus library operations with our comprehensive
								administration platform. Manage books, track loans, and provide
								an exceptional experience for students and teachers.
							</p>
							<div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
								<button
									onClick={handleEnterSystem}
									className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors"
								>
									Enter System
								</button>
								<button className="border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary-50 transition-colors">
									Learn More
								</button>
							</div>
						</div>
						<div className="md:w-1/2 flex justify-center md:justify-end">
							<img
								src="/library-illustration.svg"
								alt="Library Illustration"
								className="max-w-full h-auto max-h-96"
								onError={(e) => {
									// Fallback if image doesn't load
									e.currentTarget.style.display = 'none';
								}}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Platform Features</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
								<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2 text-gray-800">Book Management</h3>
							<p className="text-gray-600">
								Easily add, update, and categorize books in your library's collection with comprehensive metadata.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
								<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2 text-gray-800">User Management</h3>
							<p className="text-gray-600">
								Track students and teachers with customizable profiles, borrowing history, and access permissions.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
								<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2 text-gray-800">Loan Management</h3>
							<p className="text-gray-600">
								Effortlessly manage book loans, returns, and track due dates with automated reminders.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div>
							<p className="text-4xl font-bold text-primary mb-2">5,000+</p>
							<p className="text-gray-600">Books Managed</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-primary mb-2">1,200+</p>
							<p className="text-gray-600">Active Users</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-primary mb-2">15+</p>
							<p className="text-gray-600">Subject Categories</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-primary mb-2">24/7</p>
							<p className="text-gray-600">System Availability</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-primary">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold text-white mb-6">Ready to Streamline Your Library Management?</h2>
					<p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
						Join other educational institutions that have transformed their library operations
						with our comprehensive administration platform.
					</p>
					<button
						onClick={handleEnterSystem}
						className="bg-white text-primary px-8 py-3 rounded-md font-medium text-lg hover:bg-white/90 transition-colors"
					>
						Get Started Now
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center space-x-3 mb-4 md:mb-0">
							<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
							</svg>
							<div>
								<h2 className="font-semibold">{DEFAULT_ORGANIZATION}</h2>
								<p className="text-xs text-white/70">Powered by GestionBiblioAdmin</p>
							</div>
						</div>
						<div className="text-white/70 text-sm">
							&copy; {currentYear} Campus Library Administration. All rights reserved.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;