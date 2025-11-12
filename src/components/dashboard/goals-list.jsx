import { useGoals } from '../../hooks/use-api';

export default function GoalsList() {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const formatDate = (dateString) => {
    try {
      if (!dateString) {
        return '';
      }
      const date = new Date(`${dateString}T00:00:00`);
      if (Number.isNaN(date)) {
        return dateString;
      }
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const { data: goals = [] } = useGoals();

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-300">
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {goals.map((g) => (
            <tr className="hover:bg-zinc-100" key={g.id}>
              <td className="px-6 py-4 text-gray-900 text-sm">{g.objective}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(g.goal)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(g.saved)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(g.contribution)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(g.expectedData)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(g.goalDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
