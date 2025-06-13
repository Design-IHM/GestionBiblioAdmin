import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

import Navbar from './Navbar';
import MobileBottomSidebar from './MobileBottomSidebar';

const Dashboard: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Sidebar Desktop */}
			<Sidebar />
			
			{/* Bottom Navbar Mobile */}
			<MobileBottomSidebar />
			
			{/* Main Content Area */}
			<div className="md:ml-64 mb-16 md:mb-0">
				{/* Top Navbar */}
				<Navbar />
				
				{/* Page Content */}
				<main className="p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;