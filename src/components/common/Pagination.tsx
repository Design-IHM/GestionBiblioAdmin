// src/components/common/Pagination.tsx
import React from 'react';
import useI18n from '../../hooks/useI18n';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const { t } = useI18n();

	if (totalPages <= 1) return null;

	return (
		<nav className="flex items-center justify-center gap-4 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-4 py-2 bg-white border border-secondary-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-100"
			>
				{t('catalogue.previous')}
			</button>
			<span className="text-secondary-600 font-medium">
        {t('catalogue.page')} {currentPage} / {totalPages}
      </span>
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-4 py-2 bg-white border border-secondary-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-100"
			>
				{t('catalogue.next')}
			</button>
		</nav>
	);
};