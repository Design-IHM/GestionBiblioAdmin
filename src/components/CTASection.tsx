import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface CTASectionProps {
  onEnterSystem: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onEnterSystem }) => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{t('components.cta.ready_to_streamline')}</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          {t('components.cta.join_other_institutions')}
        </p>
        <button
          onClick={onEnterSystem}
          className="bg-white text-primary px-8 py-3 rounded-md font-medium text-lg hover:bg-white/90 transition-colors"
        >
          {t('components.cta.get_started_now')}
        </button>
      </div>
    </section>
  );
};

export default CTASection;
