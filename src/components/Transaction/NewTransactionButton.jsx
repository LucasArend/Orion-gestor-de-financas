import { Plus } from 'lucide-react';
import { useState } from 'react';
import styles from '../../css/Transaction/NewTransactionButton.module.css';
import Calendario from '../Common/Calendario';

async function enviarTransacaoParaBackend(transacao) {
  try {
    const response = await fetch('http://localhost:8080/api/transacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transacao),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar transação');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar transação:', error);
    alert('Erro ao enviar transação para o servidor.');
    return null;
  }
}

function NewTransactionButton({ onAdd, categorias, tipos, usuarioLogado }) {
  const [open, setOpen] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [valor, setValor] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [descricao, setDescricao] = useState('');
  const [parcelas, setParcelas] = useState('');

  async function handleAdicionarTransacao() {
    if (!(valor && categoriaSelecionada && descricao && dataSelecionada && tipoSelecionado)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaTransacao = {
      descricao,
      valor: Number(valor),
      dataVencimento: dataSelecionada.toISOString(),
      quantidadeParcelas: parcelas ? Number(parcelas) : 1,
      status: 'PENDENTE',
      usuarioId: usuarioLogado.id,
      categoriaId: Number(categoriaSelecionada),
      tipoTransacaoId: Number(tipoSelecionado),
    };

    const resposta = await enviarTransacaoParaBackend(novaTransacao);
    if (resposta) {
      onAdd(resposta);
      setOpen(false);
      resetForm();
    }
  }

  function resetForm() {
    setValor('');
    setCategoriaSelecionada('');
    setDescricao('');
    setParcelas('');
    setDataSelecionada(null);
    setTipoSelecionado('');
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} flex items-center space-x-2 shadow-[#2161E5]/50 shadow-lg`}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Plus className="h-4 w-4" />
        <span>Add Transação</span>
      </button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Nova Transação</h2>
            <div className={styles.innerCard}>
              <div className={styles.title}>
                <p>Tipo da transação</p>
                <div className={styles.options}>
                  {tipos.map((tipo) => (
                    <label
                      key={tipo.id}
                      className={`${styles.option} ${tipoSelecionado === tipo.id ? styles.renda : ''}`}
                    >
                      <input
                        checked={tipoSelecionado === tipo.id}
                        name="tipo"
                        onChange={() => setTipoSelecionado(tipo.id)}
                        type="radio"
                        value={tipo.id}
                      />
                      <span className={styles.labelText}>{tipo.nome}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="valor">Valor</label>
                <input
                  id="valor"
                  name="valor"
                  onChange={(event) => setValor(event.target.value)}
                  type="number"
                  value={valor}
                />
              </div>

              <div>
                <label htmlFor="categoria">Categoria</label>
                <select
                  className={styles.selectCategory}
                  id="categoria"
                  name="categoria"
                  onChange={(event) => setCategoriaSelecionada(event.target.value)}
                  value={categoriaSelecionada}
                >
                  <option disabled value="">
                    Selecione a categoria
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="descricao">Descrição</label>
                <input
                  id="descricao"
                  name="descricao"
                  onChange={(event) => setDescricao(event.target.value)}
                  type="text"
                  value={descricao}
                />
              </div>

              <div className={styles.parcelasEcalendario}>
                <div>
                  <p>Parcelas</p>
                  <label htmlFor="parcelas" />
                  <input
                    id="parcelas"
                    min={1}
                    name="parcelas"
                    onChange={(event) => setParcelas(event.target.value)}
                    type="number"
                    value={parcelas}
                  />
                </div>

                <div>
                  <Calendario
                    label="Data da transação"
                    onChange={setDataSelecionada}
                    value={dataSelecionada}
                  />
                </div>
              </div>

              <div className={styles.buttons}>
                <button
                  className={`${styles.btn} ${styles.close}`}
                  onClick={() => setOpen(false)}
                >
                  cancelar
                </button>
                <button
                  className={styles.btn}
                  onClick={handleAdicionarTransacao}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewTransactionButton;
