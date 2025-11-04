import { Funnel } from 'lucide-react';

export default function ReminderFilter({ onSearch }) {
  return (
    <div className="flex items-center gap-4 bg-white py-4">
      <div className="flex items-center">
        <Funnel className="mr-2 h-7 w-7 text-gray-500" />
        <span className="font-medium text-gray-700">Filtros</span>
      </div>
      <input
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:outline-hidden focus:ring-2 focus:ring-blue-200"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar por descrição..."
        type="text"
      />
    </div>
  );
}
