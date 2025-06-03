import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
            <p className="text-gray-600">{t('components.stats.books_managed')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">1,200+</p>
            <p className="text-gray-600">{t('components.stats.active_users')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">15+</p>
            <p className="text-gray-600">{t('components.stats.subject_categories')}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">24/7</p>
            <p className="text-gray-600">{t('components.stats.system_availability')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
