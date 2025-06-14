// components/archives/ArchiveTableHeader.tsx
interface ArchiveTableHeaderProps {
  translations: {
    client_info: string;
    document_name: string;
    return_date: string;
    status: string;
  };
}

export const ArchiveTableHeader = ({ translations }: ArchiveTableHeaderProps) => (
  <thead className="bg-amber-50">
    <tr>
      <th className="p-3 text-left min-w-[250px]">
        {translations.client_info}
      </th>
      <th className="p-3 text-left min-w-[200px]">
        {translations.document_name}
      </th>
      <th className="p-3 text-left min-w-[150px]">
        {translations.return_date}
      </th>
      <th className="p-3 text-left min-w-[100px]">
        {translations.status}
      </th>
    </tr>
  </thead>
);