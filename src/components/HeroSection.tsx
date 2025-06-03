import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { DEFAULT_ORGANIZATION } from '../config/firebase';

interface HeroSectionProps {
  onEnterSystem: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterSystem }) => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-b from-primary/10 to-white py-16 md:py-2 flex-grow">
      <div className="container mx-auto px-4 h-[85vh]">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('common.welcome')} <span className="text-primary">{DEFAULT_ORGANIZATION || "BIBLIO ENSPY"}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('components.hero.description')}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('components.hero.manage_documents')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onEnterSystem}
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors"
              >
                {t('components.hero.enter_system')}
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary-50 transition-colors">
                {t('components.hero.learn_more')}
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/left.png"
              alt="Library Illustration"
              className="max-w-full h-auto max-h-120"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/500x400?text=Library+Illustration';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
