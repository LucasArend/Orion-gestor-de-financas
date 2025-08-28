import { useEffect, useState } from "react";
import styles from "../../css/Transaction/Transaction.module.css"
import NewTransactionButton from "./NewTransactionButton";
import TransactionList from "./TransactionList";

function Transaction() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransacoes() {
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
    }

    fetchTransacoes();
  }, []);

  function handleAddTransacao(novaTransacao) {
    setTransacoes((prev) => [...prev, novaTransacao]);
  }

  return (
    <div className={styles.container}>
        <div className={styles.filterCard}></div>
        <div className={styles.transactionCard}>
            <NewTransactionButton onAdd={handleAddTransacao} />
            <div className={styles.transactionListCard}>
                <TransactionList transacoes={transacoes} loading={loading} />
            </div>
        </div>
    </div>
  );
}

export default Transaction;
