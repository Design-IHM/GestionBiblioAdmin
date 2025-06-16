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
	where,
	Timestamp,
	arrayUnion,
	getDocs
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Conversation, Message } from '../types/chat';

const biblioUserCollectionRef = collection(db, 'BiblioUser');

/**
 * Écoute les mises à jour en temps réel de toutes les conversations.
 * @param callback - Fonction appelée avec la liste des conversations.
 * @returns Une fonction pour arrêter l'écoute.
 */
export const getConversationsListener = (callback: (conversations: Conversation[]) => void) => {
	// Query BiblioUser collection, order by name for now, as lastMessageTimestamp is dynamic
	const q = query(biblioUserCollectionRef, orderBy('name', 'asc'));

	return onSnapshot(q, (querySnapshot) => {
		const conversations: Conversation[] = querySnapshot.docs
			.map(docSnapshot => { // First, map to a preliminary structure
				const userData = docSnapshot.data();
				const messages = userData.messages || [];
				const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

				return {
					docId: docSnapshot.id, // Keep original ID for filtering if needed
					userData,
					messages,
					lastMessage
				};
			})
			.filter(tempConvo => tempConvo.messages && tempConvo.messages.length > 0) // Filter here
			.map(filteredConvo => { // Now map to the final Conversation type
				const { docId, userData, lastMessage } = filteredConvo;
				// At this point, lastMessage is guaranteed to exist due to the filter
				return {
					id: docId,
					userName: userData.name,
					userImage: userData.image || '',
					lastMessageText: lastMessage!.texte,
					lastMessageTimestamp: lastMessage!.heure,
					unreadByAdmin: lastMessage!.recue === 'E',
					participants: [docId, 'admin'],
				};
			})
			.sort((a, b) => { // Sort after final mapping
				// lastMessageTimestamp is guaranteed to exist here
				return b.lastMessageTimestamp.toMillis() - a.lastMessageTimestamp.toMillis();
			});
		callback(conversations);
	});
};

/**
 * Écoute les mises à jour en temps réel des messages d'une conversation spécifique.
 * @param conversationId - L'ID de la conversation.
 * @param callback - Fonction appelée avec la liste des messages.
 * @returns Une fonction pour arrêter l'écoute.
 */
export const getMessagesListener = (userId: string, callback: (messages: Message[]) => void) => {
	const userDocRef = doc(db, 'BiblioUser', userId);

	return onSnapshot(userDocRef, (docSnapshot) => {
		if (docSnapshot.exists()) {
			const userData = docSnapshot.data();
			const messagesData = userData.messages || [];

			// Map to application's Message type if necessary, for now assuming direct compatibility
			// or that the component consuming this will adapt.
			// The old structure is { texte: string, heure: Timestamp, recue: "R" | "E" }
			// The current Message type is { id: string, text: string, senderId: string, timestamp: Timestamp }
			// We need to map these fields.
			const messages: Message[] = messagesData.map((msg: any, index: number) => ({
				id: `${userId}-${index}-${msg.heure.toMillis()}`, // Construct a unique ID
				text: msg.texte,
				senderId: msg.recue === 'E' ? userId : 'admin', // 'E' (Envoyé by user), 'R' (Reçu by user from admin)
				timestamp: msg.heure,
			}));
			callback(messages);
		} else {
			// Handle case where user document doesn't exist or has no messages
			callback([]);
		}
	});
};

/**
 * Envoie un nouveau message dans une conversation.
 * @param conversationId - L'ID de la conversation.
 * @param text - Le contenu du message.
 * @param senderType - 'admin' ou 'user'.
 */
export const sendMessage = async (userId: string, text: string, senderType: 'admin' | 'user') => {
	console.log(`Attempting to send message to userId: ${userId}`, text); // Added for debugging
	if (!text.trim()) return;

	if (senderType === 'admin') {
		try {
			const newMessage = {
				texte: text,
				heure: Timestamp.now(), // Changed from serverTimestamp()
				recue: 'R', // 'R' pour Reçu par l'utilisateur (envoyé par l'admin)
			};

			const userDocRef = doc(db, 'BiblioUser', userId);
			await updateDoc(userDocRef, {
				messages: arrayUnion(newMessage),
			});

			// Mirror to MessagesRecue collection
			const messagesRecueCollectionRef = collection(db, 'MessagesRecue');
			await addDoc(messagesRecueCollectionRef, {
				email: userId,
				messages: text, // Storing the raw text, as per old structure
				lue: false,
				heure: serverTimestamp(),
			});
		} catch (error) {
			console.error("Error in sendMessage:", error);
			throw error; // Re-throw the error
		}
	}
	// Note: Logic for senderType === 'user' is typically handled client-side by the user's application
	// They would write to their own messages array with recue: 'E'
};

/**
 * Marque une conversation comme lue par l'admin.
 * @param userId - L'ID de l'utilisateur (qui est l'ID de la conversation).
 */
export const markConversationAsRead = async (userId: string) => {
	const messagesRecueQuery = query(
		collection(db, 'MessagesRecue'),
		where('email', '==', userId),
		where('lue', '==', false)
	);

	const querySnapshot = await getDocs(messagesRecueQuery); // Need to import getDocs
	querySnapshot.forEach(async (docSnapshot) => {
		await updateDoc(doc(db, 'MessagesRecue', docSnapshot.id), {
			lue: true,
		});
	});
	// Depending on the exact definition of "read" for the admin,
	// this might be sufficient. If unreadByAdmin in Conversation
	// type needs to be updated, that would require re-fetching and updating
	// the specific conversation in the main listener, or a more complex state management.
	// For now, focusing on MessagesRecue as per instructions.
};

/**
 * Écoute le nombre de conversations non lues par l'admin.
 * @param callback - Fonction appelée avec le nombre de conversations non lues.
 * @returns Une fonction pour arrêter l'écoute.
 */
export const getUnreadConversationsCountListener = (callback: (count: number) => void) => {
	// biblioUserCollectionRef is collection(db, 'BiblioUser')
	return onSnapshot(biblioUserCollectionRef, (querySnapshot) => {
		let unreadCount = 0;
		querySnapshot.forEach((docSnapshot) => {
			const userData = docSnapshot.data();
			const messages = userData.messages || [];
			if (messages.length > 0) {
				const lastMessage = messages[messages.length - 1];
				if (lastMessage.recue === 'E') { // Message emitted by user, thus unread by admin
					unreadCount++;
				}
			}
		});
		callback(unreadCount);
	});
};