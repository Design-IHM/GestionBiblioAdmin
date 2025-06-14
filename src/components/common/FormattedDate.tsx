// components/common/FormattedDate.tsx
import { useI18n } from '../../hooks/useI18n';

interface FormattedDateProps {
  date: string | Date;
  format?: 'date' | 'datetime';
  className?: string;
}

export const FormattedDate = ({ 
  date, 
  format = 'date',
  className = ''
}: FormattedDateProps) => {
  const {t} = useI18n();
  
  if (!date) return null;

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(format === 'datetime' && {
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  return (
    <span className={className}>
      {dateObj.toLocaleDateString(t('common:language') === 'FR' ? 'fr-FR' : 'en-US', options)}
    </span>
  );
};