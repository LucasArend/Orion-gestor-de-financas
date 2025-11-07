import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { expensesChartOptions } from '../../data/expenses-category-options';
import { makeExpensesByCategoryData } from '../../utils/chart-data-factory';
import { useAuth } from '../../context/AuthContext';  
import axios from 'axios';


const groupTransactionsByCategory = (transactions) => {
  const grouped = {};

  transactions.forEach((transaction) => {
    console.log("Transação sendo processada:", transaction);

    
    if (transaction.tipoTransacao.id === 2 && transaction.status === 'PENDENTE' && transaction.valor > 0) {
      const categoryId = transaction.categoria.id;

      
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

  
  const result = Object.keys(grouped).map((categoryId) => ({
    nome: grouped[categoryId].nome,
    valor: grouped[categoryId].valor,
  }));

  console.log("Dados agrupados:", result);  

  return result;
};

const processChartData = (groupedData) => {
  console.log("Dados agrupados recebidos para processamento:", groupedData);

  const labels = groupedData.map(item => item.nome);  
  const data = groupedData.map(item => item.valor);   

  console.log("Labels processados:", labels);   
  console.log("Data processados:", data);       

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

        const groupedData = groupTransactionsByCategory(response.data);

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
