import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import {useConfig} from "../theme/ConfigProvider.tsx";

const Dashboard: React.FC = () => {
	const { loading } = useConfig();

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

	return (
		<div className="min-h-screen bg-secondary-100 flex flex-col">
			{/* Main content */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<Sidebar />

				{/* Main Content */}
				<div className="ml-64 flex-1 flex flex-col">
					{/* Header */}
					<Navbar />

					{/* Content */}
					<main className="p-6 flex-grow">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;