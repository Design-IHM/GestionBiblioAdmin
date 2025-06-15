// components/reservations/ReservationCard.tsx
import React from 'react';
import { FaUser, FaBook } from 'react-icons/fa';
import type { ReservationCardProps } from '../../types';

import useI18n from '../../hooks/useI18n';
import ReservationItem from './ReservationItem';


const ReservationCard: React.FC<ReservationCardProps> = ({ user, processingItem, onValidateReservation }) => {
  const { t } = useI18n();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* User Info Section */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="relative">
              {user.imageUri ? (
                <img
                  src={user.imageUri}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <FaUser className="text-primary-600 text-lg" />
                </div>
              )}
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white" title="Réservation en attente"></div>
            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium mr-1">{t('components:reservations.id')}:</span>
                  <span>{user.matricule || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">{t('components:reservations.level')}:</span>
                  <span>{user.niveau || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              {t('components:reservations.pending')}
            </span>
          </div>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {t('components:reservations.reserved_documents')}
          </h4>
          <div className="flex items-center text-primary-600">
            <FaBook className="mr-1" size={14} />
            <span className="text-sm font-medium">
              {user.totalActiveReservations}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {user.reservationSlots.map((reservation) => (
            <ReservationItem
              key={reservation.slotNumber}
              reservation={reservation}
              userEmail={user.email}
              isProcessing={processingItem === `${user.email}-${reservation.slotNumber}`}
              onValidate={() => onValidateReservation(user, reservation.slotNumber)}
            />
          ))}
        </div>

        {/* Message si aucune réservation (normalement ne devrait pas arriver) */}
        {user.reservationSlots.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <FaBook className="mx-auto text-2xl mb-2 opacity-50" />
            <p className="text-sm">{t('components:reservations.no_active_reservations')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;