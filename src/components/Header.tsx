import React from 'react';
import { GiBookPile } from "react-icons/gi";
import { useTranslation } from '../hooks/useTranslation';
import { DEFAULT_ORGANIZATION } from '../config/firebase';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onEnterSystem: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEnterSystem }) => {
  const { t } = useTranslation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <GiBookPile className="w-10 h-10 text-white" />
          <div>
            <h1 className="text-xl font-bold text-white">{DEFAULT_ORGANIZATION || "BIBLIO ENSPY"} Admin</h1>
            <p className="text-xs text-white/80">{t('components.header.library_management_system')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <span className="hidden md:inline text-white/80 text-sm">{currentDate}</span>
          <button
            onClick={onEnterSystem}
            className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
          >
            {t('components.header.admin_login')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
