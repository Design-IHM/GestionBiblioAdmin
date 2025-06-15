// src/pages/Chat.tsx
import React from 'react';
import { useConversations } from '../hooks/useConversations';
import { ConversationList } from '../components/chat/ConversationList';
import { ChatWindow } from '../components/chat/ChatWindow';
import useI18n from '../hooks/useI18n';

export const Chat: React.FC = () => {
	const { conversations, loading } = useConversations();
	const { t } = useI18n();

	return (
		<div className="flex h-[calc(100vh-100px)] border border-secondary-200 rounded-lg shadow-lg overflow-hidden">
			{/* Volet gauche : Liste des conversations */}
			<aside className="w-full md:w-1/3 border-r border-secondary-200 flex flex-col bg-secondary-50">
				<header className="p-4 border-b border-secondary-200">
					<h1 className="font-bold text-xl text-gray-800">{t('components.navbar.messages', {defaultValue: "Messages"})}</h1>
				</header>
				<div className="flex-1 overflow-y-auto p-2">
					<ConversationList conversations={conversations} loading={loading} />
				</div>
			</aside>

			{/* Volet droit : Fenêtre de chat */}
			<main className="w-full md:w-2/3 flex flex-col">
				<ChatWindow />
			</main>
		</div>
	);
};