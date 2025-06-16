// src/components/chat/ChatWindow.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate
import { useChatMessages } from '../../hooks/useChatMessages';
import { sendMessage } from '../../services/chatService';
import { MessageBubble } from './MessageBubble';
import { FiSend, FiArrowLeft } from 'react-icons/fi'; // Add FiArrowLeft
import Spinner from '../common/Spinner';
import type { Message } from '../../types/chat';
import { isSameDay, format, isToday, isYesterday } from 'date-fns';

// Helper function for date segmentation
const getMessagesWithDateDividers = (messages: Message[]) => {
	const itemsWithDividers: (Message | { type: 'date_divider'; date: string })[] = [];
	let lastDate: Date | null = null;

	messages.forEach(message => {
		if (message.timestamp) { // Ensure timestamp exists
			const messageDate = message.timestamp.toDate();
			if (!lastDate || !isSameDay(messageDate, lastDate)) {
				let dividerText: string;
				if (isToday(messageDate)) {
					dividerText = 'Today';
				} else if (isYesterday(messageDate)) {
					dividerText = 'Yesterday';
				} else {
					dividerText = format(messageDate, 'MMMM d, yyyy');
				}
				itemsWithDividers.push({ type: 'date_divider', date: dividerText });
			}
			itemsWithDividers.push(message);
			lastDate = messageDate;
		} else {
			// Handle messages without timestamps if necessary, or filter them out earlier
			itemsWithDividers.push(message);
		}
	});
	return itemsWithDividers;
};


export const ChatWindow: React.FC = () => {
	const { conversationId } = useParams<{ conversationId: string }>();
	const navigate = useNavigate(); // Initialize navigate
	const { messages, loading } = useChatMessages(conversationId);
	const [newMessage, setNewMessage] = useState('');
	const [sendError, setSendError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [messages]);

	const handleSendMessage = async (e: React.FormEvent) => { // Made async
		e.preventDefault();
		setSendError(null); // Clear previous error

		if (conversationId && newMessage.trim()) {
			try {
				await sendMessage(conversationId, newMessage, 'admin');
				setNewMessage('');
			} catch (error) {
				console.error("Failed to send message from ChatWindow:", error);
				setSendError("Failed to send message. Please check your connection or try again.");
			}
		}
	};

	if (loading) return <div className="flex-1 flex items-center justify-center"><Spinner /></div>;
	if (!conversationId) return null;

	const messagesWithDividers = getMessagesWithDateDividers(messages);

	return (
		<div className="flex flex-col h-full bg-white">
			<header className="p-4 border-b border-secondary-200 flex items-center">
				<button
					onClick={() => navigate('/dashboard/messages')}
					className="mr-3 p-2 rounded-full hover:bg-secondary-200 transition-colors"
					title="Back to conversations"
				>
					<FiArrowLeft className="text-xl text-gray-700" />
				</button>
				<h2 className="font-semibold text-lg">Conversation</h2>
			</header>

			<div className="flex-1 p-4 overflow-y-auto space-y-2"> {/* Reduced space-y-4 to space-y-2 for tighter packing with dividers */}
				{messagesWithDividers.map((item, index) => {
					if ('type' in item && item.type === 'date_divider') {
						return (
							<div key={`divider-${index}`} className="text-center my-3"> {/* Adjusted margin for divider */}
								<span className="text-xs text-gray-500 bg-secondary-100 px-3 py-1 rounded-full">
									{item.date}
								</span>
							</div>
						);
					}
					// It's a Message object
					const msg = item as Message;
					return (
						<MessageBubble key={msg.id || `msg-${index}`} message={msg} isSender={msg.senderId === 'admin'} />
					);
				})}
				<div ref={messagesEndRef} />
			</div>

			<div className="p-4 border-t border-secondary-200">
				<form onSubmit={handleSendMessage} className="flex items-center space-x-3">
					<input
						type="text"
						value={newMessage}
						onChange={(e) => {
							setNewMessage(e.target.value);
							if (sendError) { // Clear error on new input
								setSendError(null);
							}
						}}
						placeholder="Type a message..."
						className="form-input flex-1"
						autoComplete="off"
					/>
					<button type="submit" className="p-3 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors">
						<FiSend />
					</button>
				</form>
				{sendError && ( // Display error message
					<p style={{ color: 'red', textAlign: 'center', marginTop: '8px' }}>{sendError}</p>
				)}
			</div>
		</div>
	);
};