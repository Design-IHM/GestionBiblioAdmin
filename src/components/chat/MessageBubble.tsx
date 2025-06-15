// src/components/chat/MessageBubble.tsx
import React from 'react';
import type { Message } from '../../types/chat';

interface MessageBubbleProps {
	message: Message;
	isSender: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
	const bubbleClasses = isSender
		? 'bg-primary text-white self-end rounded-br-none'
		: 'bg-secondary-200 text-gray-800 self-start rounded-bl-none';

	return (
		<div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
			<div className={`max-w-md px-4 py-2 rounded-xl shadow-sm ${bubbleClasses}`}>
				<p>{message.text}</p>
			</div>
		</div>
	);
};

