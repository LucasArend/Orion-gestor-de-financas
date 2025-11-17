import { Bar } from 'react-chartjs-2';
import { useCurrency } from '../../context/currency-provider';
import { expensesChartOptions } from '../../data/expenses-category-options';
import { useTransactionsMe } from '../../hooks/use-api';
import { makeExpensesByCategoryData } from '../../utils/chart-data-factory';

const aggregateByCategory = (transactions) => {
  const map = new Map();

  for (const t of transactions) {
    const nome = t.categoria?.nome || 'Sem categoria';
    const valor = Number(t.valor) || 0;

    if (map.has(nome)) {
      map.set(nome, {
        nome,
        valor: map.get(nome).valor + valor,
      });
    } else {
      map.set(nome, { nome, valor });
    }
  }

  return Array.from(map.values());
};

const processChartData = (rawCategories) => {
  const MAX = 4;
  const sorted = [...rawCategories].sort((a, b) => b.valor - a.valor);

  if (sorted.length <= MAX) {
    return {
      labels: sorted.map((c) => c.nome),
      data: sorted.map((c) => c.valor),
    };
  }

  const top = sorted.slice(0, MAX);
  const others = sorted.slice(MAX);
  const othersTotal = others.reduce((sum, item) => sum + item.valor, 0);

  return {
    labels: [...top.map((c) => c.nome), 'Outros'],
    data: [...top.map((c) => c.valor), othersTotal],
  };
};

export default function ChartExpenses() {
  const { data: transactions = [], isLoading } = useTransactionsMe();
  const { currency } = useCurrency();

  if (isLoading) {
    return (
      <p className="mt-4 text-center text-gray-500">
        Carregando suas transações...
      </p>
    );
  }

  const expenses = transactions.filter(
    (t) => t.tipoTransacao?.nome?.toUpperCase() === 'DESPESA'
  );

  const aggregated = aggregateByCategory(expenses);
  const { labels, data } = processChartData(aggregated);
  const expensesChartData = makeExpensesByCategoryData(labels, data);

  return (
    <Bar
      data={expensesChartData}
      options={expensesChartOptions(currency.code, currency.locale)}
    />
  );
}
