export default function GoalsList({ goals }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Objetivo
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Meta
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Poupado
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Contribuição
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Previsão
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 text-xs uppercase tracking-wider">
              Data Almejada
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {goals.map((goal) => (
            <tr className="hover:bg-zinc-100" key={goal.id}>
              <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-gray-900 text-sm">
                {goal.objective}
              </td>
              <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                R${goal.target.toFixed(2).replace('.', ',')}
              </td>
              <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                R${goal.saved.toFixed(2).replace('.', ',')}
              </td>
              <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                R${goal.contribution.toFixed(2).replace('.', ',')}
              </td>
              <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                {goal.forecast}
              </td>
              <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                {goal.dueDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
