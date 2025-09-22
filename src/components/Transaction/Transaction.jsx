import { useEffect, useState, useCallback } from "react";
import TransactionList from "./TransactionList";
import NewTransactionModal from "./NewTransactionModal";
import ConfirmModal from "../Common/ConfirmModal";
import { toast, Toaster } from "react-hot-toast";

function Transaction() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [transacaoParaRemover, setTransacaoParaRemover] = useState(null);


  const fetchTransacoes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/transacoes");
      if (!response.ok) throw new Error("Erro ao buscar transações");
      const data = await response.json();
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransacoes();
  }, [fetchTransacoes]);

  function handleAddTransacao(novaTransacao) {
    setTransacoes((prev) => [...prev, novaTransacao]);
  }

  function handleRemoveTransacao(id) {
    setTransacaoParaRemover(id);
    setModalConfirmOpen(true);
  }

  async function handleConfirmarRemocao(id) {
    const toastId = toast.loading("Removendo transação...");

    try {
      const response = await fetch(`http://localhost:8080/transacoes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      setTransacoes((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação removida com sucesso!", { id: toastId });
    } catch {
      toast.error("Erro ao remover transação.", { id: toastId });
    }
  }

  return (
    <div className="flex flex-col items-center px-6">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-4xl">
        <TransactionList
          transacoes={transacoes}
          loading={loading}
          onRemove={handleRemoveTransacao}
          onOpen={() => setOpen(true)}
        />
      </div>

      <NewTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddTransacao}
        onUpdateTransactions={fetchTransacoes} // 🔄 força refresh após excluir categoria
      />

      <ConfirmModal
        open={modalConfirmOpen}
        onClose={() => setModalConfirmOpen(false)}
        onConfirm={() => handleConfirmarRemocao(transacaoParaRemover)}
        title="Remover transação"
        message="Tem certeza que deseja remover esta transação?"
      />
    </div>
  );
}

export default Transaction;
