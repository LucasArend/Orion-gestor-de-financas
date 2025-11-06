import { useEffect, useState, useCallback } from "react";
import TransactionList from "./TransactionList";
import NewTransactionModal from "./NewTransactionModal";
import ConfirmModal from "../Common/ConfirmModal";
import { toast, Toaster } from "react-hot-toast";
import { IoFunnelOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";

function Transaction() {
  const { token } = useAuth(); 
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [transacaoParaRemover, setTransacaoParaRemover] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  // 🔹 Busca todas as transações do usuário logado
  const fetchTransacoes = useCallback(async () => {
    if (!token) return; // 🔹 evita requisição sem token
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/transacoes/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar transações");
      const data = await response.json();
      setTransacoes(data ?? []);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      toast.error("Erro ao carregar transações");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTransacoes();
  }, [fetchTransacoes]);

  const categories = Array.from(
    new Set(transacoes.map((t) => t.categoria?.nome ?? "Sem categoria"))
  ).sort();


  async function handleAddTransacao(novaTransacao) {
  if (!token) return;

  try {
    const response = await fetch("http://localhost:8080/api/transacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(novaTransacao),
    });

    if (!response.ok) throw new Error("Erro ao adicionar transação");

    const data = await response.json();


    setTransacoes((prev) => [...prev, data]);


    toast.success("Transação adicionada!");


    setNewModalOpen(false);
  } catch (error) {
    console.error(error);
    toast.error("Erro ao adicionar transação");
  }
}


  async function handleConfirmarRemocao(id) {
    if (!token) return;
    const toastId = toast.loading("Removendo transação...");
    try {
      const response = await fetch(`http://localhost:8080/api/transacoes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error();
      setTransacoes((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação removida!", { id: toastId });
    } catch {
      toast.error("Erro ao remover transação", { id: toastId });
    } finally {
      setConfirmModalOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center px-6">
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl">
        {/* 🔹 Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full mb-5">
          <div className="flex items-center mb-5">
            <IoFunnelOutline className="text-2xl mr-1" />
            <span className="text-lg font-semibold">Filtros</span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                <HiMagnifyingGlass className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Buscar descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 rounded p-2 flex-1 py-1.5 pl-7 pr-3"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded p-2 flex-1 cursor-pointer"
            >
              <option value="">Todas as categorias</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-200 rounded p-2 flex-1 cursor-pointer"
            >
              <option value="">Todos os tipos</option>
              <option value="RENDA">Renda</option>
              <option value="DESPESA">Despesa</option>
            </select>
          </div>
        </div>


        <TransactionList
          transacoes={transacoes}
          loading={loading}
          search={search}
          category={category}
          type={type}
          onRemove={(id) => {
            setTransacaoParaRemover(id);
            setConfirmModalOpen(true);
          }}
          onOpen={() => setNewModalOpen(true)}
        />
      </div>

      {/* 🔹 Modal de nova transação */}
      <NewTransactionModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onAdd={handleAddTransacao}
      />

      {/* 🔹 Modal de confirmação */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => handleConfirmarRemocao(transacaoParaRemover)}
        title="Remover transação"
        message="Tem certeza que deseja remover esta transação?"
      />
    </div>
  );
}

export default Transaction;
