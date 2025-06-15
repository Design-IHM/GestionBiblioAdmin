// src/components/chat/ChatWindow.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatMessages } from '../../hooks/useChatMessages';
import { sendMessage } from '../../services/chatService';
import { MessageBubble } from './MessageBubble';
import { FiSend } from 'react-icons/fi';
import Spinner from '../common/Spinner';

export const ChatWindow: React.FC = () => {
	const { conversationId } = useParams<{ conversationId: string }>();
	const { messages, loading } = useChatMessages(conversationId);
	const [newMessage, setNewMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [messages]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (conversationId && newMessage.trim()) {
			await sendMessage(conversationId, newMessage, 'admin');
			setNewMessage('');
		}
	};

	if (loading) return <div className="flex-1 flex items-center justify-center"><Spinner /></div>;
	if (!conversationId) return null;

	return (
		<div className="flex flex-col h-full bg-white">
			<header className="p-4 border-b border-secondary-200">
				<h2 className="font-semibold text-lg">Conversation</h2>
			</header>

			<div className="flex-1 p-4 overflow-y-auto space-y-4">
				{messages.map((msg) => (
					<MessageBubble key={msg.id} message={msg} isSender={msg.senderId === 'admin'} />
				))}
				<div ref={messagesEndRef} />
			</div>

			<div className="p-4 border-t border-secondary-200">
				<form onSubmit={handleSendMessage} className="flex items-center space-x-3">
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Type a message..."
						className="form-input flex-1"
						autoComplete="off"
					/>
					<button type="submit" className="p-3 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors">
						<FiSend />
					</button>
				</form>
			</div>
		</div>
	);
};