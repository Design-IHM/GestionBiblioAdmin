import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiBookPile } from "react-icons/gi";
import { useTranslation } from '../hooks/useTranslation';

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="inline-block animate-bounce mr-2">🤔</span>
          {t('components.services.our_services')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/dashboard/books')}
            className="bg-white hover:bg-primary-50 border border-gray-200 rounded-lg p-6 shadow-md text-left transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <GiBookPile className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('components.services.book_management')}</h3>
            <p className="text-gray-600">
              {t('components.services.book_description')}
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard/settings')}
            className="bg-white hover:bg-primary-50 border border-gray-200 rounded-lg p-6 shadow-md text-left transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <GiBookPile className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('components.services.thesis_management')}</h3>
            <p className="text-gray-600">
              {t('components.services.thesis_description')}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
