// src/hooks/useChatMessages.ts
import { useState, useEffect } from 'react';
import { getMessagesListener, markConversationAsRead } from '../services/chatService';
import type { Message } from '../types/chat';

export const useChatMessages = (conversationId: string | undefined) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!conversationId) {
			setMessages([]);
			setLoading(false);
			return;
		}
		setLoading(true);

		markConversationAsRead(conversationId);

		const unsubscribe = getMessagesListener(conversationId, (updatedMessages) => {
			setMessages(updatedMessages);
			if (loading) setLoading(false);
		});

		return () => unsubscribe();
	}, [conversationId, loading]);

	return { messages, loading };
};