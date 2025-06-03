import React from 'react';

const Users: React.FC = () => {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-6">Users Management</h2>
			<div className="bg-white rounded-lg shadow p-6">
				<p className="text-gray-600 mb-4">
					Manage library users, add new accounts, update profiles, and adjust permissions.
				</p>

				<div className="flex flex-wrap gap-4 mb-6">
					<button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors">
						Add New User
					</button>
					<button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary-50 transition-colors">
						Import Users
					</button>
					<button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
						Export User List
					</button>
				</div>

				{/* Placeholder for user listing */}
				<div className="border rounded-lg p-8 bg-secondary-50 text-center">
					<p className="text-gray-500">User listing component will be implemented here</p>
				</div>
			</div>
		</div>
	);
};

export default Users;