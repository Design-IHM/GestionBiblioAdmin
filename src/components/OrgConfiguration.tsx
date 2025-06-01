import React from 'react';
import { useOrgConfiguration } from '../hooks/useOrgConfiguration';
import LoadingSpinner from "./LoadingSpinner.tsx";

interface OrgConfigurationProps {
	orgName: string;
}

const OrgConfiguration: React.FC<OrgConfigurationProps> = ({ orgName }) => {
	const { data: config, isLoading, error } = useOrgConfiguration(orgName);

	if (isLoading) return <LoadingSpinner />;
	if (error) return "Fail";
	if (!config) return null;

	const parseOpeningHours = (hoursString: string) => {
		try {
			return JSON.parse(hoursString);
		} catch {
			return { open: 'closed', close: 'closed' };
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
			{/* Organization Header */}
			<div className="flex items-center mb-8 pb-6 border-b">
				{config.Logo && (
					<img
						src={config.Logo}
						alt={`${config.Name} Logo`}
						className="w-16 h-16 mr-4 rounded-lg object-cover"
					/>
				)}
				<div>
					<h1 className="text-3xl font-bold text-gray-800">
						{config.Name || 'Organization Name'}
					</h1>
					{config.Address && (
						<p className="text-gray-600 mt-1">{config.Address}</p>
					)}
				</div>
			</div>

			{/* Contact Information */}
			<div className="grid md:grid-cols-2 gap-8 mb-8">
				<div className="bg-gray-50 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
					<div className="space-y-3">
						{config.Contact.Phone && (
							<div className="flex items-center">
								<span className="font-medium text-gray-600 w-24">Phone:</span>
								<span>{config.Contact.Phone}</span>
							</div>
						)}
						{config.Contact.WhatsApp && (
							<div className="flex items-center">
								<span className="font-medium text-gray-600 w-24">WhatsApp:</span>
								<span>{config.Contact.WhatsApp}</span>
							</div>
						)}
						{config.Contact.Email && (
							<div className="flex items-center">
								<span className="font-medium text-gray-600 w-24">Email:</span>
								<span>{config.Contact.Email}</span>
							</div>
						)}
						{config.Contact.Facebook && (
							<div className="flex items-center">
								<span className="font-medium text-gray-600 w-24">Facebook:</span>
								<a href={config.Contact.Facebook} className="text-blue-600 hover:underline">
									Facebook Page
								</a>
							</div>
						)}
						{config.Contact.Instagram && (
							<div className="flex items-center">
								<span className="font-medium text-gray-600 w-24">Instagram:</span>
								<a href={config.Contact.Instagram} className="text-blue-600 hover:underline">
									Instagram Page
								</a>
							</div>
						)}
					</div>
				</div>

				{/* Opening Hours */}
				<div className="bg-gray-50 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Opening Hours</h2>
					<div className="space-y-2">
						{Object.entries(config.OpeningHours).map(([day, hours]) => {
							const parsedHours = parseOpeningHours(hours);
							return (
								<div key={day} className="flex justify-between">
									<span className="font-medium text-gray-600">{day}:</span>
									<span>
                    {parsedHours.open === 'closed'
	                    ? 'Closed'
	                    : `${parsedHours.open} - ${parsedHours.close}`
                    }
                  </span>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Rules and Policies */}
			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-blue-50 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Borrowing Rules</h2>
					<div className="mb-4">
						<span className="font-medium text-gray-600">Maximum Simultaneous Loans: </span>
						<span className="font-semibold">{config.MaximumSimultaneousLoans}</span>
					</div>
					{config.SpecificBorrowingRules.filter(rule => rule.trim()).length > 0 && (
						<div>
							<h3 className="font-medium text-gray-600 mb-2">Specific Rules:</h3>
							<ul className="list-disc list-inside space-y-1">
								{config.SpecificBorrowingRules
									.filter(rule => rule.trim())
									.map((rule, index) => (
										<li key={index} className="text-gray-700">{rule}</li>
									))}
							</ul>
						</div>
					)}
				</div>

				<div className="bg-red-50 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Late Return Penalties</h2>
					{config.LateReturnPenalties.filter(penalty => penalty.trim()).length > 0 ? (
						<ul className="list-disc list-inside space-y-1">
							{config.LateReturnPenalties
								.filter(penalty => penalty.trim())
								.map((penalty, index) => (
									<li key={index} className="text-gray-700">{penalty}</li>
								))}
						</ul>
					) : (
						<p className="text-gray-600">No specific penalties defined</p>
					)}
				</div>
			</div>

			{/* Theme Colors */}
			{(config.Theme.Primary || config.Theme.Secondary) && (
				<div className="mt-8 bg-gray-50 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Theme Colors</h2>
					<div className="flex space-x-6">
						{config.Theme.Primary && (
							<div className="flex items-center space-x-2">
								<div
									className="w-8 h-8 rounded border"
									style={{ backgroundColor: config.Theme.Primary }}
								></div>
								<span>Primary: {config.Theme.Primary}</span>
							</div>
						)}
						{config.Theme.Secondary && (
							<div className="flex items-center space-x-2">
								<div
									className="w-8 h-8 rounded border"
									style={{ backgroundColor: config.Theme.Secondary }}
								></div>
								<span>Secondary: {config.Theme.Secondary}</span>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default OrgConfiguration;
