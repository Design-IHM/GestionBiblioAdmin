// src/services/authService.ts
import { db } from '../config/firebase';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';

export interface AdminData {
	uid: string;
	email: string;
	password?: string;
	name: string;
	role: string;
	createdAt: Date;
	isVerified: boolean;
	verificationToken?: string;
	[key: string]: any;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const CLOUD_FUNCTION_VERIFY_URL = import.meta.env.VITE_CLOUD_FUNCTION_VERIFY_URL;

export const registerAdmin = async (name: string, email: string, password: string): Promise<void> => {
	const q = query(collection(db, 'BiblioAdmin'), where('email', '==', email));
	const querySnapshot = await getDocs(q);
	if (!querySnapshot.empty) {
		throw new Error('Cette adresse e-mail est déjà utilisée.');
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const verificationToken = uuidv4();
	const adminDocRef = doc(db, 'BiblioAdmin', email);

	await setDoc(adminDocRef, {
		name, email, password: hashedPassword, role: 'bibliothecaire', createdAt: new Date(), isVerified: false, verificationToken,
	});

	if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID || !CLOUD_FUNCTION_VERIFY_URL) {
		console.error("Configuration EmailJS ou Cloud Function manquante !");
		throw new Error("Erreur de configuration du service.");
	}

	const templateParams = {
		to_email: email,
		to_name: name,
		verification_link: `${CLOUD_FUNCTION_VERIFY_URL}?token=${verificationToken}`,
	};

	try {
		await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID);
	} catch (error) {
		console.error("Erreur d'envoi d'email:", error);
		throw new Error("Impossible d'envoyer l'e-mail de vérification.");
	}
};

export const loginAdmin = async (email: string, password: string): Promise<AdminData> => {
	const q = query(collection(db, 'BiblioAdmin'), where('email', '==', email));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		throw new Error("L'email ou le mot de passe est incorrect.");
	}

	const adminDocSnap = querySnapshot.docs[0];
	const adminData = adminDocSnap.data();

	if (!adminData.isVerified) {
		throw new Error("Veuillez vérifier votre adresse e-mail avant de vous connecter.");
	}

	const isMatch = await bcrypt.compare(password, adminData.password);

	if (!isMatch) {
		throw new Error("L'email ou le mot de passe est incorrect.");
	}

	const { password: _, ...adminInfo } = adminData;
	return { uid: adminDocSnap.id, ...adminInfo } as AdminData;
};
