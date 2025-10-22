import { TrashIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

function TransactionList({
  transacoes,
  loading,
  search,
  category,
  type,
  onRemove,
  onOpen,
}) {
  if (loading) return <p>Carregando transações...</p>;

  const filtered = transacoes.filter((t) => {
    const matchesSearch = (t.descricao ?? '')
      .toLowerCase()
      .includes((search ?? '').toLowerCase());
    const matchesCategory = category ? t.categoria === category : true;
    const matchesType = type ? t.tipo === type : true;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Transações</h3>
        <button
          className="flex items-center rounded-lg bg-[#2979FF] px-4 py-2 text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]"
          onClick={onOpen}
          type="button"
        >
          <Plus className="mr-1 h-4 w-4" />
          <span>Add Transação</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhuma transação encontrada...</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Tipo</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Data</th>
              <th className="w-[80px] p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((transacao) => {
                const isRenda = transacao.tipo === 'renda';

                return (
                  <motion.tr
                    animate={{ opacity: 1, y: 0 }}
                    className="transform transition-transform hover:scale-[1.01] hover:bg-gray-50 hover:shadow-md"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key={transacao.id}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="p-2">
                      <span
                        className={`rounded px-2 py-1 font-semibold text-xs ${
                          isRenda
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transacao.tipo}
                      </span>
                    </td>
                    <td className="p-2">{transacao.descricao}</td>
                    <td
                      className={`p-2 font-medium ${
                        isRenda ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(transacao.valor)}
                    </td>
                    <td className="p-2">{transacao.categoria}</td>
                    <td className="p-2">
                      {new Date(transacao.data).toLocaleDateString()}
                    </td>
                    <td className="w-[80px] p-2 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <button
                          className="cursor-pointer text-base text-red-600 hover:text-red-800"
                          onClick={() => onRemove(transacao.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;
