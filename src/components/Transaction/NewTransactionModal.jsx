import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Calendario from '../Common/Calendario';
import { useAuth } from '../../context/AuthContext';

async function adicionarCategoria(nome, token) {
  try {
    const response = await fetch('http://localhost:8080/categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome }),
    });

    if (!response.ok) throw new Error('Erro ao adicionar categoria');
    toast.success('Categoria adicionada com sucesso!');
    return await response.json();
  } catch (error) {
    console.error(error);
    toast.error('Erro ao adicionar categoria.');
    return null;
  }
}

async function editarCategoria(id, novoNome, token) {
  try {
    const response = await fetch(`http://localhost:8080/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome: novoNome }),
    });

    if (!response.ok) throw new Error('Erro ao editar categoria');
    return await response.json();
  } catch (error) {
    console.error(error);
    toast.error('Erro ao editar categoria.');
    return null;
  }
}

async function deletarCategoria(id, token) {
  try {
    const response = await fetch(`http://localhost:8080/categorias/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Erro ao deletar categoria');
    toast.success('Categoria removida com sucesso!');
    return true;
  } catch (error) {
    console.error(error);
    toast.error('Erro ao deletar categoria.');
    return false;
  }
}

async function deletarTransacoesPorCategoria(categoria, token) {
  try {
    const response = await fetch(
      `http://localhost:8080/transacoes?categoria=${encodeURIComponent(categoria)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error('Erro ao buscar transações por categoria');

    const transacoes = await response.json();

    for (const t of transacoes) {
      const res = await fetch(`http://localhost:8080/transacoes/${t.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Erro ao deletar transação vinculada');
    }

    return true;
  } catch (error) {
    console.error(error);
    toast.error('Erro ao deletar transações da categoria.');
    return false;
  }
}

function NewTransactionModal({ open, onClose, onAdd, onUpdateTransactions, fetchTransacoes }) {
  const { user, token } = useAuth();
  const [tipoSelecionado, setTipoSelecionado] = useState('renda');
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [valor, setValor] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [descricao, setDescricao] = useState('');
  const [parcelas, setParcelas] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [adicionandoCategoria, setAdicionandoCategoria] = useState(false);
  const [novaCategoriaNome, setNovaCategoriaNome] = useState('');

  const [editandoCategoria, setEditandoCategoria] = useState(null);
  const [nomeCategoriaEditando, setNomeCategoriaEditando] = useState('');

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [categoriaParaDeletar, setCategoriaParaDeletar] = useState(null);
  const [confirmDeleteChecked, setConfirmDeleteChecked] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function fetchCategorias() {
      try {
        const response = await fetch('http://localhost:8080/categorias/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Erro ao carregar categorias');

        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        toast.error('Não foi possível carregar as categorias.');
      }
    }

    fetchCategorias();
  }, [token]);

  async function handleAdicionarCategoria() {
    if (!novaCategoriaNome.trim()) {
      toast.error('Digite o nome da nova categoria.');
      return;
    }

    const novaCat = await adicionarCategoria(novaCategoriaNome.trim(), token);
    if (!novaCat) return;

    setCategorias((prev) => [...prev, novaCat]);
    setCategoriaSelecionada(novaCat.nome);
    setNovaCategoriaNome('');
    setAdicionandoCategoria(false);
  }

  async function handleEditarCategoria() {
    if (!nomeCategoriaEditando.trim()) {
      toast.error('Digite o novo nome da categoria.');
      return;
    }

    const categoriaAtualizada = await editarCategoria(
      editandoCategoria.id,
      nomeCategoriaEditando.trim(),
      token
    );

    if (!categoriaAtualizada) return;

    setCategorias((prev) =>
      prev.map((c) => (c.id === categoriaAtualizada.id ? categoriaAtualizada : c))
    );

    if (categoriaSelecionada === editandoCategoria.nome) {
      setCategoriaSelecionada(categoriaAtualizada.nome);
    }

    setEditandoCategoria(null);
    setNomeCategoriaEditando('');
    toast.success('Categoria editada com sucesso!');
  }

  function abrirModalDeleteCategoria(categoria) {
    setCategoriaParaDeletar(categoria);
    setConfirmDeleteChecked(false);
    setModalDeleteOpen(true);
  }

  async function confirmarDeleteCategoria() {
    if (!confirmDeleteChecked) return;

    const transacoesOk = await deletarTransacoesPorCategoria(
      categoriaParaDeletar.nome,
      token
    );

    if (!transacoesOk) return;

    const sucesso = await deletarCategoria(categoriaParaDeletar.id, token);

    if (sucesso) {
      setCategorias((prev) => prev.filter((c) => c.id !== categoriaParaDeletar.id));
      if (categoriaSelecionada === categoriaParaDeletar.nome) {
        setCategoriaSelecionada('');
      }
      setModalDeleteOpen(false);

      if (onUpdateTransactions) onUpdateTransactions();
    }
  }

  async function handleAdicionarTransacao() {
    if (adicionandoCategoria || editandoCategoria) return;
    if (!(valor && categoriaSelecionada && descricao && dataSelecionada)) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    const categoriaObj = categorias.find((c) => c.nome === categoriaSelecionada);
    if (!categoriaObj) {
      toast.error('Categoria inválida.');
      return;
    }

    if (!token || !user) {
      toast.error('Você precisa estar logado.');
      return;
    }

    const novaTransacao = {
      descricao,
      valor: Number(valor),
      dataVencimento: dataSelecionada.toISOString(),
      quantidadeParcelas: parcelas ? Number(parcelas) : 1,
      status: 'PENDENTE',
      categoriaId: categoriaObj.id,
      tipoTransacaoId: tipoSelecionado === 'renda' ? 1 : 2,
    };

    try {
      const res = await fetch('http://localhost:8080/api/transacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaTransacao),
      });
      console.log("Transação sendo enviada:", novaTransacao);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao salvar transação: ${errorText}`);
      }

      const data = await res.json();
      toast.success('Transação adicionada com sucesso!');
      if (fetchTransacoes) await fetchTransacoes();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Erro ao enviar transação:', error);
      toast.error('Erro ao enviar transação.');
    }
  }

  function resetForm() {
    setValor('');
    setCategoriaSelecionada('');
    setDescricao('');
    setParcelas('');
    setDataSelecionada(null);
    setTipoSelecionado('renda');
    setAdicionandoCategoria(false);
    setNovaCategoriaNome('');
    setEditandoCategoria(null);
    setNomeCategoriaEditando('');
    setConfirmDeleteChecked(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[50%] flex-col space-y-4 rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 font-semibold text-lg">Nova Transação</h2>

        {!(adicionandoCategoria || editandoCategoria) && (
          <div>
            <p className="mb-1">Tipo da transação</p>
            <div className="flex gap-4">
              {['renda', 'despesa'].map((tipo) => (
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded border px-3 py-1 ${
                    tipoSelecionado === tipo
                      ? tipo === 'renda'
                        ? 'border-green-500 text-green-600'
                        : 'border-red-500 text-red-600'
                      : 'border-gray-300'
                  }`}
                  key={tipo}
                >
                  <input
                    checked={tipoSelecionado === tipo}
                    className="hidden"
                    onChange={() => setTipoSelecionado(tipo)}
                    type="radio"
                  />
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="mb-1 block font-medium text-sm" htmlFor="category">
            Categoria
          </label>

          {adicionandoCategoria || editandoCategoria ? (
            <>
              <input
                className="w-full rounded border border-gray-300 px-3 py-2"
                id="category"
                onChange={(e) =>
                  editandoCategoria
                    ? setNomeCategoriaEditando(e.target.value)
                    : setNovaCategoriaNome(e.target.value)
                }
                type="text"
                value={
                  editandoCategoria ? nomeCategoriaEditando : novaCategoriaNome
                }
                placeholder={editandoCategoria ? "Novo Nome" : "Nova Categoria"}
              />

              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  onClick={() => {
                    setAdicionandoCategoria(false);
                    setEditandoCategoria(null);
                    setNovaCategoriaNome('');
                    setNomeCategoriaEditando('');
                  }}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={
                    editandoCategoria
                      ? handleEditarCategoria
                      : handleAdicionarCategoria
                  }
                  type="button"
                >
                  Salvar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative mt-1">
                <input
                  id="category"
                  className="w-full cursor-pointer rounded border border-gray-300 px-3 py-2"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  placeholder="Selecione uma categoria"
                  readOnly
                  value={categoriaSelecionada}
                />

                {showDropdown && (
                  <ul className="absolute top-full z-10 max-h-60 w-full overflow-y-auto rounded border bg-white p-2 shadow-lg">
                    {categorias.map((cat) => (
                      <div
  className="flex cursor-pointer items-center justify-between px-3 py-1 hover:bg-gray-100"
  key={cat.id}
>
  <span
    className="flex-1"
    onClick={() => {
      setCategoriaSelecionada(cat.nome);
      setShowDropdown(false);
    }}
  >
    {cat.nome}
  </span>
  <div className="flex gap-2">
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={(e) => {
        e.stopPropagation();
        setEditandoCategoria(cat);
        setNomeCategoriaEditando(cat.nome);
        setShowDropdown(false);
      }}
      type="button"
    >
      ✏️
    </button>
    <button
      className="text-red-500 hover:text-red-700"
      onClick={(e) => {
        e.stopPropagation();
        abrirModalDeleteCategoria(cat);
      }}
      type="button"
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  </div>
</div>

                    ))}
                    <li
                      className="mt-1 cursor-pointer rounded p-2 hover:bg-gray-100 text-green-600"
                      onClick={() => {
                        setAdicionandoCategoria(true);
                        setShowDropdown(false);
                        setNovaCategoriaNome('');
                      }}
                    >
                      + Adicionar categoria
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium text-sm" htmlFor="valor">
            Valor
          </label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2"
            id="valor"
            type="number"
            onChange={(e) => setValor(e.target.value)}
            value={valor}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-sm" htmlFor="descricao">
            Descrição
          </label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2"
            id="descricao"
            type="text"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
          />
        </div>

        <div className="flex gap-4">
          {/* Parcelas */}
          <div className="flex-1">
            <label className="mb-1 block font-medium text-sm" htmlFor="installments">
              Parcelas
            </label>
            <input
              className="w-full rounded border border-gray-300 px-3 py-2"
              id="installments"
              min={1}
              onChange={(e) => setParcelas(e.target.value)}
              type="number"
              value={parcelas}
            />
          </div>

          {/* Calendário */}
          <div className="flex-1">
            <Calendario
              label="Data da transação"
              value={dataSelecionada}
              onChange={setDataSelecionada}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleAdicionarTransacao}
          >
            Salvar
          </button>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {modalDeleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setModalDeleteOpen(false)}
        >
          <div
            className="flex w-full max-w-md flex-col space-y-4 rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
            <p>
              Tem certeza que deseja deletar a categoria{' '}
              <span className="font-bold">{categoriaParaDeletar?.nome}</span> e
              todas as transações vinculadas?
            </p>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={confirmDeleteChecked}
                onChange={(e) => setConfirmDeleteChecked(e.target.checked)}
              />
              Sim, estou ciente
            </label>

            <div className="flex justify-end gap-4">
              <button
                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                onClick={() => setModalDeleteOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                disabled={!confirmDeleteChecked}
                onClick={confirmarDeleteCategoria}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewTransactionModal;
