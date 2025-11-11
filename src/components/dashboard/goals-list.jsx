//import { useGoals } from '../../hooks/use-api';

export default function GoalsList({ goals }) {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date)) {
        return dateString;
      }
      return date.toLocaleDateString('pt-BR');
    } catch (_) {
      return dateString;
    }
  };

  //const { data: goals } = useGoals();

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
          {goals.map((goal) => (
            <tr className="hover:bg-zinc-100" key={goal.id}>
              <td className="px-6 py-4 text-gray-900 text-sm">
                {goal.objective}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(goal.target)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(goal.saved)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(goal.contribution)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(goal.forecast)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(goal.dueDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
