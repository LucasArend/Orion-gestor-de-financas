import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/outline";

function TransactionList({ transacoes, loading, search, category, type, onRemove, onOpen }) {
  if (loading) return <p>Carregando transações...</p>;

  const filtered = transacoes.filter((t) => {
    const matchesSearch = (t.descricao ?? "").toLowerCase().includes((search ?? "").toLowerCase());
    const matchesCategory = category ? t.categoria === category : true;
    const matchesType = type ? t.tipo === type : true;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Transações</h3>
        <button
          onClick={onOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          + Add Transação
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Nenhuma transação encontrada...
        </p>
      ) : (
        <table className="w-full text-sm border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Tipo</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Data</th>
              <th className="p-2 text-center w-[80px]">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((transacao) => {
                const isRenda = transacao.tipo === "renda";

                return (
                 <motion.tr
                    key={transacao.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50 hover:shadow-md hover:scale-[1.01] transform transition-transform"
                    
                  >
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          isRenda
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transacao.tipo}
                      </span>
                    </td>
                    <td className="p-2">{transacao.descricao}</td>
                    <td
                      className={`p-2 font-medium ${
                        isRenda ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valor)}
                    </td>
                    <td className="p-2">{transacao.categoria}</td>
                    <td className="p-2">
                      {new Date(transacao.data).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-center w-[80px] align-middle">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => onRemove(transacao.id)}
                          className="text-red-600 hover:text-red-800 text-base cursor-pointer"
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
