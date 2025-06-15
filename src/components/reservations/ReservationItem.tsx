import React from 'react';
import { FaBook, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import type { ReservationItemProps } from '../../types';
import useI18n from '../../hooks/useI18n';
import { FormattedDate } from '../common/FormattedDate';
import { reservationService } from '../../services/reservationService';
import { getCurrentFormattedDateTime } from '../../utils/dateUtils';
import { formatReservationDate } from '../../utils/ReservationDateUtils';

const ReservationItem: React.FC<ReservationItemProps> = ({
  reservation,
  isProcessing,
  onValidate
}) => {
  const { t } = useI18n();
 

  return (
    <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
      {/* Document Image */}
      <div className="flex-shrink-0">
        {reservation.document.imageUrl ? (
          <img
            src={reservation.document.imageUrl}
            alt={reservation.document.name}
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
              {reservation.document.name}
            </h5>
            <p className="text-xs text-gray-500 italic">
              {reservation.document.category}
            </p>
          </div>

          {/* Reservation Date */}
          <div className="flex items-center text-xs text-gray-600">
            <FaCalendarAlt className="mr-1" size={10} />
            <span>
              {t('components:reservations.reserved_on')}:{' '}
               {formatReservationDate(reservation.document.reservationDate)}
            </span>
          </div>

          {/* Collection Info */}
          {reservation.document.collection && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">{t('components:reservations.collection')}:</span>{' '}
              {reservation.document.collection}
            </div>
          )}

          {/* Status */}
          <div className="flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></div>
              {t('components:reservations.awaiting_validation')}
            </span>
          </div>
        </div>

        {/* Validate Button */}
        <div className="mt-3">
          <button
            onClick={onValidate}
            disabled={isProcessing}
            className={`
              flex items-center justify-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${
                isProcessing
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1'
              }
            `}
          >
            {isProcessing ? (
              <>
                <FaClock className="animate-spin" size={14} />
                <span>{t('components:reservations.processing')}</span>
              </>
            ) : (
              <>
                <FaCheckCircle size={14} />
                <span>{t('components:reservations.validate_loan')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;