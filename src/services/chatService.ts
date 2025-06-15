// src/services/chatService.ts
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	serverTimestamp,
	doc,
	updateDoc,
	where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Conversation, Message } from '../types/chat';

const conversationsRef = collection(db, 'Conversations');

/**
 * Écoute les mises à jour en temps réel de toutes les conversations.
 * @param callback - Fonction appelée avec la liste des conversations.
 * @returns Une fonction pour arrêter l'écoute.
 */
export const getConversationsListener = (callback: (conversations: Conversation[]) => void) => {
	const q = query(conversationsRef, orderBy('lastMessageTimestamp', 'desc'));

	return onSnapshot(q, (querySnapshot) => {
		const conversations = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		})) as Conversation[];
		callback(conversations);
	});
};

/**
 * Écoute les mises à jour en temps réel des messages d'une conversation spécifique.
 * @param conversationId - L'ID de la conversation.
 * @param callback - Fonction appelée avec la liste des messages.
 * @returns Une fonction pour arrêter l'écoute.
 */
export const getMessagesListener = (conversationId: string, callback: (messages: Message[]) => void) => {
	const messagesRef = collection(db, 'Conversations', conversationId, 'messages');
	const q = query(messagesRef, orderBy('timestamp', 'asc'));

	return onSnapshot(q, (querySnapshot) => {
		const messages = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		})) as Message[];
		callback(messages);
	});
};

/**
 * Envoie un nouveau message dans une conversation.
 * @param conversationId - L'ID de la conversation.
 * @param text - Le contenu du message.
 * @param senderId - L'ID de l'expéditeur ('admin').
 */
export const sendMessage = async (conversationId: string, text: string, senderId: 'admin') => {
	if (!text.trim()) return;

	const messagesRef = collection(db, 'Conversations', conversationId, 'messages');
	await addDoc(messagesRef, {
		text,
		senderId,
		timestamp: serverTimestamp(),
	});

	const conversationDocRef = doc(db, 'Conversations', conversationId);
	await updateDoc(conversationDocRef, {
		lastMessageText: text,
		lastMessageTimestamp: serverTimestamp(),
		unreadByAdmin: false,
		// Vous pourriez ajouter ici un champ `unreadByUser: true` pour le client
	});
};

/**
 * Marque une conversation comme lue par l'admin.
 * @param conversationId - L'ID de la conversation.
 */
export const markConversationAsRead = async (conversationId: string) => {
	const conversationDocRef = doc(db, 'Conversations', conversationId);
	await updateDoc(conversationDocRef, {
		unreadByAdmin: false,
	});
};

/**
 * Écoute le nombre de conversations non lues par l'admin.
 * @param callback - Fonction appelée avec le nombre de conversations non lues.
 * @returns Une fonction pour arrêter l'écoute.
 */
export const getUnreadConversationsCountListener = (callback: (count: number) => void) => {
	const q = query(collection(db, 'Conversations'), where('unreadByAdmin', '==', true));

	return onSnapshot(q, (querySnapshot) => {
		callback(querySnapshot.size);
	});
};