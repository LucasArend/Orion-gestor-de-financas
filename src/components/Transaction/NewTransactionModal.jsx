import { useState, useEffect } from "react";
import Calendario from "../Common/Calendario";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

async function adicionarCategoria(nome) {
  try {
    const response = await fetch("http://localhost:8080/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    if (!response.ok) throw new Error("Erro ao adicionar categoria");
    toast.success("Categoria adicionada com sucesso!");
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar categoria.");
    return null;
  }
}

async function editarCategoria(id, novoNome) {
  try {
    const response = await fetch(`http://localhost:8080/categorias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoNome }),
    });
    if (!response.ok) throw new Error("Erro ao editar categoria");
    toast.success("Categoria editada com sucesso!");
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Erro ao editar categoria.");
    return null;
  }
}

async function deletarCategoria(id) {
  try {
    const response = await fetch(`http://localhost:8080/categorias/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar categoria");
    toast.success("Categoria removida com sucesso!");
    return true;
  } catch (error) {
    console.error(error);
    alert("Erro ao deletar categoria.");
    return false;
  }
}

async function deletarTransacoesPorCategoria(categoria) {
  try {
    const response = await fetch(
      `http://localhost:8080/transacoes?categoria=${encodeURIComponent(categoria)}`
    );
    if (!response.ok) throw new Error("Erro ao buscar transações por categoria");
    const transacoes = await response.json();

    for (const t of transacoes) {
      const res = await fetch(`http://localhost:8080/transacoes/${t.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar transação vinculada");
    }
    return true;
  } catch (error) {
    console.error(error);
    alert("Erro ao deletar transações da categoria.");
    return false;
  }
}

function NewTransactionModal({ open, onClose, onAdd, onUpdateTransactions }) {
  const [tipoSelecionado, setTipoSelecionado] = useState("renda");
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [valor, setValor] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [descricao, setDescricao] = useState("");
  const [parcelas, setParcelas] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [adicionandoCategoria, setAdicionandoCategoria] = useState(false);
  const [novaCategoriaNome, setNovaCategoriaNome] = useState("");

  const [editandoCategoria, setEditandoCategoria] = useState(null);
  const [novoNomeCategoria, setNovoNomeCategoria] = useState("");

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [categoriaParaDeletar, setCategoriaParaDeletar] = useState(null);
  const [confirmDeleteChecked, setConfirmDeleteChecked] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("http://localhost:8080/categorias");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    fetchCategorias();
  }, []);

  const prefixo = adicionandoCategoria ? "Nova categoria: " : "Novo nome: ";

  function handleNovaCategoriaChange(e) {
    const valorInput = e.target.value;
    if (!valorInput.startsWith(prefixo)) return;
    const nome = valorInput.slice(prefixo.length);

    if (adicionandoCategoria) {
      setNovaCategoriaNome(nome);
    } else if (editandoCategoria) {
      setNovoNomeCategoria(nome);
    }
  }

  async function handleAdicionarCategoria() {
    if (!novaCategoriaNome.trim()) {
      alert("Digite o nome da nova categoria.");
      return;
    }

    const novaCat = await adicionarCategoria(novaCategoriaNome.trim());
    if (!novaCat) return;

    setCategorias((prev) => [...prev, novaCat]);
    setCategoriaSelecionada(novaCat.nome);
    setNovaCategoriaNome("");
    setAdicionandoCategoria(false);
  }

  async function handleEditarCategoria() {
    if (!novoNomeCategoria.trim()) {
      alert("Digite o novo nome da categoria.");
      return;
    }

    const categoriaAtualizada = await editarCategoria(editandoCategoria.id, novoNomeCategoria.trim());
    if (!categoriaAtualizada) return;

    setCategorias((prev) =>
      prev.map((c) => (c.id === categoriaAtualizada.id ? categoriaAtualizada : c))
    );

    if (categoriaSelecionada === editandoCategoria.nome) {
      setCategoriaSelecionada(categoriaAtualizada.nome);
    }

    setEditandoCategoria(null);
    setNovoNomeCategoria("");
  }

  function abrirModalDeleteCategoria(categoria) {
    setCategoriaParaDeletar(categoria);
    setConfirmDeleteChecked(false);
    setModalDeleteOpen(true);
  }

  async function confirmarDeleteCategoria() {
    if (!confirmDeleteChecked) return;

    const transacoesOk = await deletarTransacoesPorCategoria(categoriaParaDeletar.nome);
    if (!transacoesOk) return;

    const sucesso = await deletarCategoria(categoriaParaDeletar.id);

    if (sucesso) {
      setCategorias((prev) =>
        prev.filter((c) => c.id !== categoriaParaDeletar.id)
      );
      if (categoriaSelecionada === categoriaParaDeletar.nome) {
        setCategoriaSelecionada("");
      }
      setModalDeleteOpen(false);

      if (onUpdateTransactions) {
        onUpdateTransactions();
      }
    }
  }

  function handleAdicionarTransacao() {
    if (adicionandoCategoria || editandoCategoria) return;

    if (!valor || !categoriaSelecionada || !descricao || !dataSelecionada) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novaTransacao = {
      tipo: tipoSelecionado,
      valor: Number(valor),
      categoria: categoriaSelecionada,
      descricao,
      parcelas: parcelas ? Number(parcelas) : 1,
      data: dataSelecionada.toISOString(),
    };

    fetch("http://localhost:8080/transacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTransacao),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data);
        onClose();
        resetForm();
      })
      .catch((error) => {
        console.error("Erro ao enviar transação:", error);
        alert("Erro ao enviar transação.");
      });
  }

  function resetForm() {
    setValor("");
    setCategoriaSelecionada("");
    setDescricao("");
    setParcelas("");
    setDataSelecionada(null);
    setTipoSelecionado("renda");
    setAdicionandoCategoria(false);
    setNovaCategoriaNome("");
    setEditandoCategoria(null);
    setNovoNomeCategoria("");
    setConfirmDeleteChecked(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center overflow-y-auto p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg w-full max-w-[50%] shadow-lg flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Nova Transação</h2>

        {!adicionandoCategoria && !editandoCategoria && (
          <div>
            <p className="mb-1">Tipo da transação</p>
            <div className="flex gap-4">
              {["renda", "despesa"].map((tipo) => (
                <label
                  key={tipo}
                  className={`flex items-center gap-2 px-3 py-1 border rounded cursor-pointer ${
                    tipoSelecionado === tipo
                      ? tipo === "renda"
                        ? "border-green-500 text-green-600"
                        : "border-red-500 text-red-600"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    checked={tipoSelecionado === tipo}
                    onChange={() => setTipoSelecionado(tipo)}
                  />
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>

          {!adicionandoCategoria && !editandoCategoria ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full text-left border border-gray-300 rounded px-3 py-2"
              >
                {categoriaSelecionada || "Selecione uma categoria"}
              </button>

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-40 overflow-y-auto">
                  {categorias.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex justify-between items-center hover:bg-gray-100 px-3 py-1 cursor-pointer"
                      onClick={() => {
                        setCategoriaSelecionada(cat.nome);
                        setShowDropdown(false);
                      }}
                    >
                      <span>{cat.nome}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditandoCategoria(cat);
                            setNovoNomeCategoria(cat.nome);
                            setShowDropdown(false);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModalDeleteCategoria(cat);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setAdicionandoCategoria(true);
                      setShowDropdown(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer px-3 py-2 text-sm"
                  >
                    + Adicionar categoria
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={`${prefixo}${adicionandoCategoria ? novaCategoriaNome : novoNomeCategoria}`}
                onChange={handleNovaCategoriaChange}
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    setAdicionandoCategoria(false);
                    setEditandoCategoria(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (adicionandoCategoria) handleAdicionarCategoria();
                    if (editandoCategoria) handleEditarCategoria();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </>
          )}
        </div>

        {!adicionandoCategoria && !editandoCategoria && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Valor</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Parcelas</label>
                <input
                  type="number"
                  min={1}
                  value={parcelas}
                  onChange={(e) => setParcelas(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <Calendario
                  value={dataSelecionada}
                  onChange={setDataSelecionada}
                  label="Data da transação"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdicionarTransacao}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </>
        )}

        {modalDeleteOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Confirmar exclusão</h3>
              <p className="mb-4">
                Tem certeza que deseja excluir a categoria{" "}
                <strong>{categoriaParaDeletar?.nome}</strong>?<br />
                Isso também irá remover todas as transações vinculadas a ela.
              </p>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={confirmDeleteChecked}
                  onChange={(e) => setConfirmDeleteChecked(e.target.checked)}
                />
                Confirmo que desejo excluir
              </label>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModalDeleteOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarDeleteCategoria}
                  disabled={!confirmDeleteChecked}
                  className={`px-4 py-2 rounded text-white ${
                    confirmDeleteChecked
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-300 cursor-not-allowed"
                  }`}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewTransactionModal;
