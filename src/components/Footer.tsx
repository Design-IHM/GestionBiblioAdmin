import React from 'react';
import { GiBookPile } from "react-icons/gi";
import { useTranslation } from '../hooks/useTranslation';
import { DEFAULT_ORGANIZATION } from '../config/firebase';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <GiBookPile className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-lg font-bold text-white">Campus Library</h1>
              <p className="text-xs text-white/70">{t('powered_by')}</p>
            </div>
          </div>
          <div className="text-white/70 text-sm">
            &copy; {currentYear} {DEFAULT_ORGANIZATION || "BIBLIO ENSPY"} {t('library_admin')}. {t('all_rights_reserved')}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
