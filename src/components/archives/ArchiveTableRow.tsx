// components/archives/ArchiveTableRow.tsx
import type { ArchiveItem } from '../../types/archives';

interface ArchiveTableRowProps {
  item: ArchiveItem;
  index: number;
  translations: {
    returned: string;
  };
}

export const ArchiveTableRow = ({ item, index, translations }: ArchiveTableRowProps) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-3">
      <div className="flex justify-between items-center">
        <span className="font-medium">{item.nomEtudiant}</span>
        <span className="text-xs text-gray-500">{index}</span>
      </div>
    </td>
    <td className="p-3">{item.nomDoc}</td>
    <td className="p-3">{new Date(item.heure).toLocaleString()}</td>
    <td className="p-3">
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
        {translations.returned}
      </span>
    </td>
  </tr>
);