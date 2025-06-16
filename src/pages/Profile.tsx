import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Common Components
import LoadingSpinner from '../components/common/LoadingSpinner';
import Notification from '../components/common/Notification';

// Profile Components
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileStatsComponent from '../components/profile/ProfileStats';
import SecuritySettings from '../components/profile/SecuritySettings';

// Hooks
import { useProfile } from '../hooks/useProfile';
import useI18n from '../hooks/useI18n';
import { useConfig } from '../components/theme/ConfigProvider';

// Types
import type { ProfileFormData, UserProfile, ProfileStats } from '../types/profile';

const Profile: React.FC = () => {
  const { t } = useI18n();
  const { config } = useConfig();
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id');

  // États par défaut pour utilisateur non connecté
  const [isEditing, setIsEditing] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    type: 'success' as 'success' | 'error',
    message: ''
  });

  // Profil vide par défaut
  const emptyProfile: UserProfile = {
    id: '',
    name: '',
    email: '',
    gender: '',
    phone: '',
    department: '',
    bio: '',
    image: '',
    role: undefined,
    created_at: undefined,
    updated_at: undefined,
    isActive: false,
    lastLoginAt: undefined
  };

  // Stats vides par défaut
  const emptyStats: ProfileStats = {
    totalLogins: 0,
    lastLoginDays: 0,
    documentsManaged: 0,
    accountAge: 0
  };

  // Utiliser le hook seulement si userId existe
  const profileHook = useProfile(userId);

  // Déterminer quelles données utiliser
  const profile = profileHook.profile || emptyProfile;
  const stats = profileHook.stats || emptyStats;
  const loading = userId ? profileHook.loading : false;
  const realIsEditing = userId ? profileHook.isEditing : isEditing;
  const realSetIsEditing = userId ? profileHook.setIsEditing : setIsEditing;
  const realIsImageUploading = userId ? profileHook.isImageUploading : isImageUploading;
  const realNotification = userId ? profileHook.notification : notification;

  // Fonctions de gestion
  const showNotification = (type: 'success' | 'error', message: string) => {
    if (userId && profileHook.showNotification) {
      profileHook.showNotification(type, message);
    } else {
      setNotification({ visible: true, type, message });
      setTimeout(() => {
        setNotification({ visible: false, type: 'success', message: '' });
      }, 3000);
    }
  };

  const handleImageChange = async (file: File) => {
    if (!userId) {
      showNotification('error', t('components:profile.must_be_connected'));
      return;
    }

    if (profileHook.updateProfileImage) {
      await profileHook.updateProfileImage(file, t);
    }
  };

  const handleProfileSave = async (formData: ProfileFormData) => {
    if (!userId) {
      showNotification('error', t('components:profile.must_be_connected'));
      return;
    }

    if (profileHook.updateProfile) {
      await profileHook.updateProfile(formData, t);
    }
  };

  const handleChangePassword = () => {
    if (!userId) {
      showNotification('error', t('components:profile.must_be_connected'));
      return;
    }
    navigate('/change-password');
  };

  const handleDeleteAccount = () => {
    if (!userId) {
      showNotification('error', t('components:profile.must_be_connected'));
      return;
    }
    showNotification('error', 'Fonctionnalité de suppression de compte');
  };

  // Afficher le loading seulement si un utilisateur est connecté et en cours de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Message d'information si pas connecté */}
      {!userId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>{t('components:profile.not_connected')}</strong> - {t('components:profile.not_connected_info')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary via-primary-600 to-primary-800 text-white rounded-xl overflow-hidden">
        <div className="relative p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <ProfileAvatar
                imageUrl={profile.image}
                isUploading={realIsImageUploading}
                onImageChange={handleImageChange}
                size="lg"
                editable={!!userId}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2 drop-shadow-md">
                  {profile.name || t('profile.status.unnamed_user')}
                </h1>
                <p className="text-xl opacity-90 mb-2">
                  {profile.email || 'email@exemple.com'}
                </p>
                {profile.department && (
                  <p className="text-lg opacity-80 italic">
                    {profile.department}
                  </p>
                )}
                {profile.bio && (
                  <p className="text-base opacity-85 mt-3 max-w-2xl leading-relaxed">
                    {profile.bio}
                  </p>
                )}
                {!profile.bio && !userId && (
                  <p className="text-base opacity-60 mt-3 max-w-2xl leading-relaxed italic">
                    {t('profile.messages.no_recent_activity')}
                  </p>
                )}
              </div>

              {/* Role Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 border border-white border-opacity-30">
                {profile.role === 'admin' ? t('profile.status.administrator') : profile.role === 'user' ? t('profile.status.user') : t('profile.info.unknown')}
              </div>
            </div>
          </div>

          {/* Stats in Header */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white border-opacity-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{stats.accountAge}</div>
                <div className="text-sm opacity-80">Jours membre</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.lastLoginDays}</div>
                <div className="text-sm opacity-80">Jours depuis connexion</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.documentsManaged}</div>
                <div className="text-sm opacity-80">Documents gérés</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalLogins}</div>
                <div className="text-sm opacity-80">Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Profile Form */}
        <div className="xl:col-span-2 space-y-6">
          <ProfileForm
            profile={profile}
            isEditing={realIsEditing}
            onToggleEdit={() => realSetIsEditing(!realIsEditing)}
            onSave={handleProfileSave}
          />

          <SecuritySettings
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>

        {/* Right Column - Stats & Additional Info */}
        <div className="space-y-6">
          <ProfileStatsComponent stats={stats} />

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('components:profile.quick_actions')}
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard/books')}
                className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <span>{t('components:profile.view_books')}</span>
                <span className="text-gray-400">→</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/loans')}
                className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <span>{t('components:profile.view_loans')}</span>
                <span className="text-gray-400">→</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/reservations')}
                className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <span>{t('components:profile.view_reservations')}</span>
                <span className="text-gray-400">→</span>
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <span>{t('components:profile.dashboard')}</span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informations du compte
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Membre depuis</span>
                <span className="font-medium">
                  {profile.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'Non disponible'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dernière mise à jour</span>
                <span className="font-medium">
                  {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString('fr-FR') : 'Non disponible'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut du compte</span>
                <span className={`font-medium ${profile.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                  {userId ? (profile.isActive ? 'Actif' : 'Inactif') : 'Non connecté'}
                </span>
              </div>
              {profile.lastLoginAt ? (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière connexion</span>
                  <span className="font-medium">
                    {new Date(profile.lastLoginAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière connexion</span>
                  <span className="font-medium text-gray-500">Non disponible</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      <Notification
        visible={realNotification.visible}
        type={realNotification.type}
        message={realNotification.message}
        onClose={() => {
          if (userId && profileHook.showNotification) {
            profileHook.showNotification('success', '');
          } else {
            setNotification({ ...notification, visible: false });
          }
        }}
      />
    </div>
  );
};

export default Profile;