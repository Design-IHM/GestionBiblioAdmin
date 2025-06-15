// components/loans/DocumentLoanItem.tsx
import React from 'react';
import { FaBook, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import type { DocumentLoanItemProps } from '../../types';
import useI18n from '../../hooks/useI18n';

const DocumentLoanItem: React.FC<DocumentLoanItemProps> = ({
  document,
  isProcessing,
  onReturn
}) => {
  const { t } = useI18n();

  const formatDate = (dateString: string) => {
    try {
      return dateString.slice(0, 16).replace('T', ' ');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
      {/* Document Image */}
      <div className="flex-shrink-0">
        {document.imageUrl ? (
          <img
            src={document.imageUrl}
            alt={document.name}
            className="w-16 h-20 object-cover rounded border shadow-sm"
          />
        ) : (
          <div className="w-16 h-20 bg-gray-200 rounded border flex items-center justify-center">
            <FaBook className="text-gray-400 text-lg" />
          </div>
        )}
      </div>

      {/* Document Info */}
      <div className="flex-1 min-w-0">
        <div className="space-y-2">
          {/* Title and Category */}
          <div>
            <h5 className="font-semibold text-gray-900 text-sm truncate">
              {document.name}
            </h5>
            <p className="text-xs text-gray-500 italic">
              {document.category}
            </p>
          </div>

          {/* Borrow Date */}
          <div className="flex items-center text-xs text-gray-600">
            <FaCalendarAlt className="mr-1" size={10} />
            <span>{t('components:loans.borrowed_on')}: {formatDate(document.borrowDate)}</span>
          </div>

          {/* Collection Info */}
          {document.collection && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">{t('components:loans.collection')}:</span> {document.collection}
            </div>
          )}
        </div>

        {/* Return Button */}
        <div className="mt-3">
          <button
            onClick={onReturn}
            disabled={isProcessing}
            className={`
              flex items-center justify-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${isProcessing
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
              }
            `}
          >
            {isProcessing ? (
              <>
                <FaClock className="animate-spin" size={14} />
                <span>{t('components:loans.processing')}</span>
              </>
            ) : (
              <>
                <FaCheckCircle size={14} />
                <span>{t('components:loans.validate_return')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentLoanItem;