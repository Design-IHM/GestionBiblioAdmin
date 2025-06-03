import React from 'react';

const Overview: React.FC = () => {
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
				<div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
					<h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
					<div className="space-y-4">
						{[
							{ user: 'Sarah Johnson', action: 'borrowed', book: 'Principles of Physics', time: '2 hours ago' },
							{ user: 'Mike Chen', action: 'returned', book: 'Database Systems', time: '4 hours ago' },
							{ user: 'Emma Davis', action: 'borrowed', book: 'Modern Web Development', time: 'Yesterday' },
							{ user: 'Alex Kim', action: 'borrowed', book: 'Artificial Intelligence', time: 'Yesterday' },
							{ user: 'Chris Lee', action: 'returned', book: 'Calculus II', time: '2 days ago' },
						].map((item, index) => (
							<div key={index} className="flex items-start">
								<div className="w-10 h-10 rounded-full bg-secondary-200 flex-shrink-0 flex items-center justify-center">
									{item.user.split(' ').map(n => n[0]).join('')}
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
};

export default Overview;