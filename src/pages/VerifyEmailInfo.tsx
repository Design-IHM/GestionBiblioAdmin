// src/pages/VerifyEmailInfoPage.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

const VerifyEmailInfoPage: React.FC = () => {
	const location = useLocation();
	const email = location.state?.email;

	return (
		<div className="w-full max-w-lg p-8 text-center bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in">
			<FiMail className="mx-auto text-primary-400 text-6xl mb-4" />
			<h1 className="text-3xl font-bold text-white">Vérifiez votre boîte de réception</h1>
			{email ? (
				<p className="text-secondary-300 mt-4">
					Un e-mail de vérification a été envoyé à <strong className="text-white">{email}</strong>.
				</p>
			) : (
				<p className="text-secondary-300 mt-4">Un e-mail de vérification vous a été envoyé.</p>
			)}
			<p className="text-secondary-300 mt-2">
				Cliquez sur le lien dans cet e-mail pour activer votre compte.
			</p>
			<div className="mt-8">
				<Link to="/authentication" className="py-3 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-600 transition-all">
					Retour à la connexion
				</Link>
			</div>
		</div>
	);
};

export default VerifyEmailInfoPage;