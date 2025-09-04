import styles from '../../css/Transaction/TransactionList.module.css';

function TransactionList({ transacoes, loading }) {
  if (loading) return <p>Carregando transações...</p>;

  return (
    <div className={styles.container}>
      <h3>Transações</h3>
      {transacoes.length === 0 ? (
        <p>Nenhuma transação encontrada... Execute "npm run serverTest" no terminal para visualizar</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.tipo}</td>
                <td>{transacao.descricao}</td>
                <td>R$ {transacao.valor}</td>
                <td>{transacao.categoria}</td>
                <td>{new Date(transacao.data).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;