import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Conversation } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { FaUserCircle } from 'react-icons/fa';
import Spinner from '../common/Spinner';
import useI18n from '../../hooks/useI18n';

interface ConversationListProps {
	conversations: Conversation[];
	loading: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({ conversations, loading }) => {
	const { t } = useI18n();

	if (loading) {
		return <div className="flex items-center justify-center h-full"><Spinner /></div>;
	}

	if (conversations.length === 0) {
		return <div className="p-4 text-center text-gray-500">{t('chat.no_conversations', {defaultValue: 'No active conversations.'})}</div>;
	}

	return (
		<nav>
			<ul>
				{conversations.map(convo => (
					<li key={convo.id}>
						<NavLink
							to={`/dashboard/messages/${convo.id}`}
							className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
								isActive ? 'bg-primary-100' : 'hover:bg-secondary-100'
							}`}
						>
							<div className="relative mr-3 shrink-0">
								{convo.userImage ? (
									<img src={convo.userImage} alt={convo.userName} className="w-12 h-12 rounded-full object-cover" />
								) : (
									<FaUserCircle className="w-12 h-12 text-secondary-400" />
								)}
								{convo.unreadByAdmin && (
									<span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex justify-between items-center">
									<p className="font-semibold text-gray-800 truncate">{convo.userName}</p>
									<p className="text-xs text-gray-500 shrink-0 ml-2">
										{convo.lastMessageTimestamp && formatDistanceToNow(convo.lastMessageTimestamp.toDate(), { addSuffix: true })}
									</p>
								</div>
								<p className="text-sm text-gray-600 truncate">{convo.lastMessageText}</p>
							</div>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};