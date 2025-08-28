import styles from '../../css/Transaction/TransactionList.module.css';

function TransactionList({ transacoes, loading }) {
  if (loading) return <p>Carregando transações...</p>;

  return (
    <div className={styles.container}>
      <h3>Transações</h3>
      {transacoes.length === 0 ? (
        <p>Nenhuma transação encontrada... Execute "npm run serverTest" no terminal para visualizar</p>
      ) : (
        <ul className={styles.list}>
          {transacoes.map((transacao) => (
            <li key={transacao.id} className={styles.item}>
              [{transacao.tipo}] {transacao.descricao} - R$ {transacao.valor} (
              {transacao.categoria}) -{" "}
              {new Date(transacao.data).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
