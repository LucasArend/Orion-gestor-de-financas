import { useState } from "react";
import styles from '../../css/Transaction/NewTransactionButton.module.css';
import Calendario from '../Common/Calendario';

async function enviarTransacaoParaBackend(transacao) {
  try {
    const response = await fetch('http://localhost:8080/transacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transacao),
    });

    if (!response.ok) throw new Error('Erro ao enviar transação');
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar transação:', error);
    alert('Erro ao enviar transação para o servidor.');
    return null;
  }
}

function NewTransactionButton({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState('renda');
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [valor, setValor] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [descricao, setDescricao] = useState('');
  const [parcelas, setParcelas] = useState('');

  async function handleAdicionarTransacao() {
    if (!valor || !categoriaSelecionada || !descricao || !dataSelecionada) {
      alert("Por favor, preencha todos os campos obrigatórios.");
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
    setTipoSelecionado('renda');
  }

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)} className={styles.btn}>
        + Add Transação
      </button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Nova Transação</h2>
            <div className={styles.innerCard}>
              <div className={styles.title}>
                <p>Tipo da transação</p>
                <div className={styles.options}>
                  <label className={`${styles.option} ${tipoSelecionado === 'renda' ? styles.renda : ''}`}>
                    <input
                      type="radio"
                      name="tipo"
                      value="renda"
                      checked={tipoSelecionado === 'renda'}
                      onChange={() => setTipoSelecionado('renda')}
                    />
                    <span className={styles.labelText}>Renda</span>
                  </label>
                  <label className={`${styles.option} ${tipoSelecionado === 'despesa' ? styles.despesa : ''}`}>
                    <input
                      type="radio"
                      name="tipo"
                      value="despesa"
                      checked={tipoSelecionado === 'despesa'}
                      onChange={() => setTipoSelecionado('despesa')}
                    />
                    <span className={styles.labelText}>Despesa</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="valor">Valor</label>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={valor}
                  onChange={(event) => setValor(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="categoria">Categoria</label>
                <select
                  className={styles.selectCategory}
                  id="categoria"
                  name="categoria"
                  value={categoriaSelecionada}
                  onChange={(event) => setCategoriaSelecionada(event.target.value)}
                >
                  <option value="" disabled>Selecione a categoria</option>
                  <option value="Salário">Salário</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Lazer">Lazer</option>
                </select>
              </div>

              <div>
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  name="descricao"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </div>

              <div className={styles.parcelasEcalendario}>
                <div>
                  <p>Parcelas</p>
                  <label htmlFor="parcelas"></label>
                  <input
                    type="number"
                    id="parcelas"
                    name="parcelas"
                    value={parcelas}
                    onChange={(event) => setParcelas(event.target.value)}
                    min={1}
                  />
                </div>

                <div>
                  <Calendario
                    value={dataSelecionada}
                    onChange={setDataSelecionada}
                    label="Data da transação"
                  />
                </div>
              </div>

              <div className={styles.buttons}>
                <button
                  onClick={() => setOpen(false)}
                  className={`${styles.btn} ${styles.close}`}
                >
                  cancelar
                </button>
                <button
                  onClick={handleAdicionarTransacao}
                  className={styles.btn}
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