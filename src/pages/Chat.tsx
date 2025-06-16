// src/pages/Chat.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useConversations } from '../hooks/useConversations';
import { ConversationItem } from '../components/chat/ConversationItem';
import { ChatWindow } from '../components/chat/ChatWindow';
import Spinner from '../components/common/Spinner';
import { FiMessageSquare } from 'react-icons/fi';

export const Chat: React.FC = () => {
	const { conversationId } = useParams<{ conversationId: string }>();
	const { conversations, loading } = useConversations();

	return (
		<div className="flex h-[calc(100vh-120px)] border border-secondary-200 rounded-lg shadow-lg overflow-hidden">
			<aside className="w-full md:w-1/3 border-r border-secondary-200 flex-col hidden md:flex">
				<header className="p-4 border-b border-secondary-200">
					<h1 className="font-bold text-xl">Messages</h1>
				</header>
				<div className="flex-1 overflow-y-auto p-2">
					{loading ? (
						<Spinner />
					) : (
						<nav>
							<ul>
								{conversations.map(convo => (
									<li key={convo.id}>
										<ConversationItem conversation={convo} />
									</li>
								))}
							</ul>
						</nav>
					)}
				</div>
			</aside>

			<main className="w-full md:w-2/3 flex flex-col">
				{conversationId ? (
					<ChatWindow />
				) : (
					<div className="flex-1 flex-col items-center justify-center text-center text-gray-500 bg-secondary-50 hidden md:flex">
						<FiMessageSquare className="w-16 h-16 mb-4 text-secondary-400" />
						<h2 className="text-xl font-semibold">Select a conversation</h2>
						<p>Choose a conversation from the list to start chatting.</p>
					</div>
				)}
			</main>
		</div>
	);
};