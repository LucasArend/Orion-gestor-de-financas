import { Funnel } from 'lucide-react';
import SortDropdown from '../Goals/sort-dropdown';

export default function GoalsFilters({
  search,
  setSearch,
  field,
  setField,
  order,
  setOrder,
  fieldOptions,
  valueOptions,
}) {
  return (
    <div className="space-y-4 bg-white py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Funnel className="mr-2 h-7 w-7 text-gray-500" />
          <span className="font-medium text-gray-700">Filtros</span>
        </div>

        <input
          className="ml-4 w-full flex-1 rounded-lg border border-gray-300 p-2 focus:border-indigo-600 focus:outline-hidden focus:ring-2 focus:ring-blue-200"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por descrição..."
          type="text"
          value={search}
        />

        {/* Campo */}
        <div className="flex items-center gap-2">
          <label className="text-sm uppercase" htmlFor="filterField">
            Campo
          </label>
          <SortDropdown
            id="filterField"
            onChange={setField}
            options={fieldOptions}
            placeholder="Selecione"
            value={field}
          />
        </div>

        {/* Ordenar por */}
        <div className="flex items-center gap-2">
          <label className="text-sm uppercase" htmlFor="orderBy">
            Ordenar por
          </label>
          <SortDropdown
            disabled={!field}
            id="orderBy"
            onChange={setOrder}
            options={field ? valueOptions[field] : []}
            placeholder="Selecione"
            value={order}
          />
        </div>
      </div>
    </div>
  );
}
