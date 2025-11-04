const formatCurrency = (value) => {
  return `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;
};

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

export default function GoalsTable({ metas }) {
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
          </tr>
        </thead>
        <tbody>
          {metas.map((meta) => (
            <tr
              className="border-gray-200 border-t hover:bg-zinc-100"
              key={meta.id}
            >
              <td className="px-6 py-4 text-gray-900">{meta.objetivo}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(meta.meta)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(meta.poupado)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatCurrency(meta.contribuicao)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(meta.previsao)}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {formatDate(meta.dataAlmejada)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
