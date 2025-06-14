// components/archives/ArchiveTable.tsx
import type { ArchiveItem } from '../../types/archives';
import EmptyState from '../common/EmptyState';
import { ArchiveTableHeader } from './ArchiveTableHeader';
import { ArchiveTableRow } from './ArchiveTableRow';



interface ArchiveTableProps {
  items: ArchiveItem[];
  translations: {
    client_info: string;
    document_name: string;
    return_date: string;
    status: string;
    returned: string;
  };
  currentPage: number;
  itemsPerPage: number;
  className?: string;
}

export const ArchiveTable = ({
  items,
  translations,
  currentPage,
  itemsPerPage,
  className = ''
}: ArchiveTableProps) => {
  if (items.length === 0) {
    return <EmptyState 
      title={translations.no_data || "No archives found"} 
      description={translations.no_data_desc || "No archives available"} 
    />;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <ArchiveTableHeader translations={translations} />
        <tbody>
          {items.map((item, index) => (
            <ArchiveTableRow
              key={`${item.nomEtudiant}-${item.heure}`}
              item={item}
              index={items.length - ((currentPage - 1) * itemsPerPage + index)}
              translations={{ returned: translations.returned }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};