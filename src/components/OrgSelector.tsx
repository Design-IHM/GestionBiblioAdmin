import React, { useState } from 'react';

interface OrgSelectorProps {
	onOrgSelect: (orgName: string) => void;
	selectedOrg: string;
}

const OrgSelector: React.FC<OrgSelectorProps> = ({ onOrgSelect, selectedOrg }) => {
	const [inputValue, setInputValue] = useState(selectedOrg);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onOrgSelect(inputValue.trim());
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mb-6">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">Select Organization</h2>
			<form onSubmit={handleSubmit} className="flex gap-4">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter organization name..."
					className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				<button
					type="submit"
					className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
				>
					Load Configuration
				</button>
			</form>
		</div>
	);
};

export default OrgSelector;
