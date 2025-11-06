import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { expensesChartOptions } from '../../data/expenses-category-options';
import { makeExpensesByCategoryData } from '../../utils/chart-data-factory';
import { useAuth } from '../../context/AuthContext';  // Ajuste conforme sua estrutura
import axios from 'axios';

// Função para agrupar as transações por categoria e somar os valores
const groupTransactionsByCategory = (transactions) => {
  const grouped = {};

  transactions.forEach((transaction) => {
    console.log("Transação sendo processada:", transaction);

    // Verifique se o tipoTransacao.id é 2 (Despesas) e o status é "PENDENTE"
    if (transaction.tipoTransacao.id === 2 && transaction.status === 'PENDENTE' && transaction.valor > 0) {
      const categoryId = transaction.categoria.id;

      // Agrupar as transações por categoria
      if (grouped[categoryId]) {
        grouped[categoryId].valor += transaction.valor;
      } else {
        grouped[categoryId] = {
          nome: transaction.categoria.nome,
          valor: transaction.valor,
        };
      }
    }
  });

  // Converte o objeto para um array de categorias
  const result = Object.keys(grouped).map((categoryId) => ({
    nome: grouped[categoryId].nome,
    valor: grouped[categoryId].valor,
  }));

  console.log("Dados agrupados:", result);  // Verifique o que foi agrupado

  return result;
};

const processChartData = (groupedData) => {
  console.log("Dados agrupados recebidos para processamento:", groupedData);

  const labels = groupedData.map(item => item.nome);  // Nomes das categorias
  const data = groupedData.map(item => item.valor);   // Valores das categorias

  console.log("Labels processados:", labels);   // Verifique se os labels estão corretos
  console.log("Data processados:", data);       // Verifique se os dados estão corretos

  return { labels, data };
};

export default function ChartExpenses() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:8080/api/transacoes/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Transações recebidas:", response.data);  // Verificando a resposta da API

        // Filtra e agrupa as transações de "Despesas"
        const groupedData = groupTransactionsByCategory(response.data);

        // Processa os dados para o gráfico
        const processedData = processChartData(groupedData);

        setTransactions(processedData);
      } catch (err) {
        setError('Erro ao carregar as transações');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  console.log("Transactions após processamento:", transactions);  // Verificando os dados finais

  const { labels, data } = transactions;

  const expensesChartData = makeExpensesByCategoryData(labels, data);

  return <Bar data={expensesChartData} options={expensesChartOptions} />;
}
