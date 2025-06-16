
// src/pages/VerifyAccount.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyAccount } from '../services/authService';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

const VerifyAccount: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
	const token = searchParams.get('token');

	useEffect(() => {
		if (!token) {
			setStatus('error');
			return;
		}

		const checkToken = async () => {
			const success = await verifyAccount(token);
			setStatus(success ? 'success' : 'error');
		};

		checkToken();
	}, [token]);

	return (
		<div className="w-full max-w-lg p-8 text-center bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in">
			{status === 'loading' && (
				<>
					<FiLoader className="mx-auto text-primary-400 text-6xl mb-4 animate-spin" />
					<h1 className="text-3xl font-bold text-white">Vérification en cours...</h1>
					<p className="text-secondary-300 mt-2">Veuillez patienter.</p>
				</>
			)}
			{status === 'success' && (
				<>
					<FiCheckCircle className="mx-auto text-green-400 text-6xl mb-4" />
					<h1 className="text-3xl font-bold text-white">Compte Vérifié !</h1>
					<p className="text-secondary-300 mt-2">Votre compte a été activé avec succès.</p>
					<div className="mt-8">
						<Link to="/authentication" className="py-3 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-600 transition-all">
							Se connecter
						</Link>
					</div>
				</>
			)}
			{status === 'error' && (
				<>
					<FiXCircle className="mx-auto text-red-400 text-6xl mb-4" />
					<h1 className="text-3xl font-bold text-white">Erreur de Vérification</h1>
					<p className="text-secondary-300 mt-2">Le lien de vérification est invalide ou a expiré.</p>
					<div className="mt-8">
						<Link to="/authentication/register" className="py-3 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-600 transition-all">
							S'inscrire à nouveau
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default VerifyAccount;