import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Calendario from '../Common/Calendario';
import { useAuth } from '../../context/AuthContext' 


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
    toast.success('Categoria editada com sucesso!');
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

    if (!response.ok)
      throw new Error('Erro ao buscar transações por categoria');

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


function NewTransactionModal({ open, onClose, onAdd, onUpdateTransactions }) {
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
  const [novoNomeCategoria, setNovoNomeCategoria] = useState('');

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [categoriaParaDeletar, setCategoriaParaDeletar] = useState(null);
  const [confirmDeleteChecked, setConfirmDeleteChecked] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
  if (!token) return;

  async function fetchCategorias() {
    try {
      const response = await fetch('http://localhost:8080/categorias', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


  const prefixo = adicionandoCategoria ? 'Nova categoria: ' : 'Novo nome: ';

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
      alert('Digite o nome da nova categoria.');
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
    if (!novoNomeCategoria.trim()) {
      alert('Digite o novo nome da categoria.');
      return;
    }

    const categoriaAtualizada = await editarCategoria(
      editandoCategoria.id,
      novoNomeCategoria.trim(),
      token
    );

    if (!categoriaAtualizada) return;

    setCategorias((prev) =>
      prev.map((c) =>
        c.id === categoriaAtualizada.id ? categoriaAtualizada : c
      )
    );

    if (categoriaSelecionada === editandoCategoria.nome) {
      setCategoriaSelecionada(categoriaAtualizada.nome);
    }

    setEditandoCategoria(null);
    setNovoNomeCategoria('');
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
      setCategorias((prev) =>
        prev.filter((c) => c.id !== categoriaParaDeletar.id)
      );
      if (categoriaSelecionada === categoriaParaDeletar.nome) {
        setCategoriaSelecionada('');
      }
      setModalDeleteOpen(false);

      if (onUpdateTransactions) {
        onUpdateTransactions();
      }
    }
  }

async function handleAdicionarTransacao() {
  if (adicionandoCategoria || editandoCategoria) return;

  if (!(valor && categoriaSelecionada && descricao && dataSelecionada)) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const categoriaObj = categorias.find((c) => c.nome === categoriaSelecionada);
  if (!categoriaObj) {
    alert('Categoria inválida. Selecione uma categoria existente.');
    return;
  }

  if (!token || !user) {
    alert('Você precisa estar logado para adicionar uma transação.');
    return;
  }

  const novaTransacao = {
    descricao,
    valor: Number(valor),
    dataVencimento: dataSelecionada.toISOString(),
    quantidadeParcelas: parcelas ? Number(parcelas) : 1,
    status: 'PENDENTE',
    usuarioId: user.id,
    categoriaId: categoriaObj.id,
    tipoTransacaoId: tipoSelecionado === 'renda' ? 1 : 2,
  };

  try {
    const res = await fetch('http://localhost:8080/api/transacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // vem direto do contexto
      },
      body: JSON.stringify(novaTransacao),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao salvar transação: ${errorText}`);
    }

    const data = await res.json();

    toast.success('Transação adicionada com sucesso!');
    onAdd(data);
    onClose();
    resetForm();
  } catch (error) {
    console.error('Erro ao enviar transação:', error);
    alert('Erro ao enviar transação.');
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
    setNovoNomeCategoria('');
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
                onChange={handleNovaCategoriaChange}
                type="text"
                value={`${prefixo}${adicionandoCategoria ? novaCategoriaNome : novoNomeCategoria}`}
              />
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  onClick={() => {
                    setAdicionandoCategoria(false);
                    setEditandoCategoria(null);
                  }}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={() => {
                    if (adicionandoCategoria) {
                      handleAdicionarCategoria();
                    }
                    if (editandoCategoria) {
                      handleEditarCategoria();
                    }
                  }}
                  type="button"
                >
                  Salvar
                </button>
              </div>
            </>
          ) : (
            <div className="relative">
              <button
                className="w-full rounded border border-gray-300 px-3 py-2 text-left"
                onClick={() => setShowDropdown(!showDropdown)}
                type="button"
              >
                {categoriaSelecionada || 'Selecione uma categoria'}
              </button>

              {showDropdown && (
                <div className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow">
                  {categorias.map((cat) => (
                    <div
                      className="flex cursor-pointer items-center justify-between px-3 py-1 hover:bg-gray-100"
                      key={cat.id}
                      onClick={() => {
                        setCategoriaSelecionada(cat.nome);
                        setShowDropdown(false);
                      }}
                    >
                      <span>{cat.nome}</span>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditandoCategoria(cat);
                            setNovoNomeCategoria(cat.nome);
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
                  <div
                    className="cursor-pointer px-3 py-2 text-blue-600 text-sm hover:text-blue-800"
                    onClick={() => {
                      setAdicionandoCategoria(true);
                      setShowDropdown(false);
                    }}
                  >
                    + Adicionar categoria
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!(adicionandoCategoria || editandoCategoria) && (
          <>
            <div>
              <label
                className="mb-1 block font-medium text-sm"
                htmlFor="transaction-value"
              >
                Valor
              </label>
              <input
                className="w-full rounded border border-gray-300 px-3 py-2"
                id="transaction-value"
                onChange={(e) => setValor(e.target.value)}
                type="number"
                value={valor}
              />
            </div>

            <div>
              <label
                className="mb-1 block font-medium text-sm"
                htmlFor="description"
              >
                Descrição
              </label>
              <input
                className="w-full rounded border border-gray-300 px-3 py-2"
                id="description"
                onChange={(e) => setDescricao(e.target.value)}
                type="text"
                value={descricao}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="mb-1 block font-medium text-sm"
                  htmlFor="installments"
                >
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
              <div className="flex-1">
                <Calendario
                  label="Data da transação"
                  onChange={setDataSelecionada}
                  value={dataSelecionada}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                className="rounded-lg bg-red-500 px-4 py-2 text-white shadow-lg shadow-red-600/50 transition-colors hover:bg-red-600"
                onClick={onClose}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="rounded-lg bg-[#2979FF] px-4 py-2 text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]"
                onClick={handleAdicionarTransacao}
                type="button"
              >
                Salvar
              </button>
            </div>
          </>
        )}

        {modalDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 font-semibold text-lg">Confirmar exclusão</h3>
              <p className="mb-4">
                Tem certeza que deseja excluir a categoria{' '}
                <strong>{categoriaParaDeletar?.nome}</strong>?<br />
                Isso também irá remover todas as transações vinculadas a ela.
              </p>
              <label className="mb-4 flex items-center gap-2">
                <input
                  checked={confirmDeleteChecked}
                  onChange={(e) => setConfirmDeleteChecked(e.target.checked)}
                  type="checkbox"
                />
                Confirmo que desejo excluir
              </label>
              <div className="flex justify-end gap-4">
                <button
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  onClick={() => setModalDeleteOpen(false)}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className={`rounded px-4 py-2 text-white ${
                    confirmDeleteChecked
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'cursor-not-allowed bg-red-300'
                  }`}
                  disabled={!confirmDeleteChecked}
                  onClick={confirmarDeleteCategoria}
                  type="button"
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
