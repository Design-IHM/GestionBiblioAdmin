import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatMessages } from '../../hooks/useChatMessages';
import { sendMessage } from '../../services/chatService';
import { FiSend, FiMessageSquare } from 'react-icons/fi';
import Spinner from '../common/Spinner';
import { useAuth } from '../../context/AuthContext';
import { MessageBubble } from './MessageBubble';

export const ChatWindow: React.FC = () => {
	const { conversationId } = useParams<{ conversationId: string }>();
	const { messages, loading } = useChatMessages(conversationId);
	const { admin } = useAuth();
	const [newMessage, setNewMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (conversationId && newMessage.trim() && admin) {
			await sendMessage(conversationId, newMessage, 'admin');
			setNewMessage('');
		}
	};

	if (!conversationId) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 bg-secondary-50">
				<FiMessageSquare className="w-16 h-16 mb-4 text-secondary-400" />
				<h2 className="text-xl font-semibold">Sélectionnez une conversation</h2>
				<p>Choisissez un contact dans la liste pour commencer à discuter.</p>
			</div>
		);
	}

	if (loading) return <div className="flex-1 flex items-center justify-center"><Spinner /></div>;

	return (
		<div className="flex flex-col h-full bg-white">
			<div className="flex-1 p-4 overflow-y-auto space-y-4">
				{messages.map((msg) => (
					<MessageBubble key={msg.id} message={msg} isSender={msg.senderId === 'admin'} />
				))}
				<div ref={messagesEndRef} />
			</div>

			<div className="p-4 border-t border-secondary-200 bg-white">
				<form onSubmit={handleSendMessage} className="flex items-center space-x-3">
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Rédigez un message..."
						className="form-input flex-1"
						autoComplete="off"
					/>
					<button
						type="submit"
						className="p-3 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50"
						disabled={!newMessage.trim()}
					>
						<FiSend />
					</button>
				</form>
			</div>
		</div>
	);
};