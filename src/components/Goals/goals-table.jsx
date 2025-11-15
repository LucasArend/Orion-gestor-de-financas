import { TrashIcon, PencilIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const formatCurrency = (value) => {
  const numericValue = value === null || value === undefined ? 0 : Number(value)
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const formatDate = (dateString) => {
  
  if(!dateString || (typeof dateString === 'string' && dateString.trim() === '')) {
    return '-'
  }

  try {
    const date = new Date(dateString)

    if(isNaN(date.getTime())){
      return dateString
    }

    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  } catch (error) {
    return dateString;
  }
};

export default function GoalsTable({ metas, onRemove, onEdit, onContribution }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Valor Alvo
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Acumulado
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Aporte Mensal
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Data Prevista
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Prazo Final
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {metas.map((meta) => (
            <tr
              className="border-gray-200 border-t hover:bg-zinc-100"
              key={meta.id}
            >
              <td className="px-6 py-4 text-gray-900">{meta.objective}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(meta.goal)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(meta.saved)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                <div className='flex gap-1'>
                  {formatCurrency(meta.contribution)}
                  <button className='cursor-pointer text-base text-green-600 hover:text-green-800'
                    onClick={() => onContribution(meta)}
                  >
                    <CurrencyDollarIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(meta.expectedData)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(meta.goalDate)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                <div className='flex items-center justify-center gap-3'>
                  <button className='cursor-pointer text-base text-yellow-600 hover:text-yellow-800'
                  onClick={() => onEdit(meta.id)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className='cursor-pointer text-base text-red-600 hover:text-red-800'
                    onClick={() => onRemove(meta.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
