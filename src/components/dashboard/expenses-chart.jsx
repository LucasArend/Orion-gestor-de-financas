import { Bar } from 'react-chartjs-2';
import { expensesChartOptions } from '../../data/expenses-category-options';
import { makeExpensesByCategoryData } from '../../utils/chart-data-factory';

const processChartData = (rawCategories) => {
  const maxCategories = 6;

  if (rawCategories.length <= maxCategories) {
    return {
      labels: rawCategories.map((cat) => cat.nome),
      data: rawCategories.map((cat) => cat.valor),
    };
  }

  const sortedCategories = [...rawCategories].sort((a, b) => b.valor - a.valor);
  const topCategories = sortedCategories.slice(0, maxCategories);
  const otherCategories = sortedCategories.slice(maxCategories);
  const othersValue = otherCategories.reduce((sum, cat) => sum + cat.valor, 0);
  const labels = [...topCategories.map((cat) => cat.nome), 'Outros'];
  const data = [...topCategories.map((cat) => cat.valor), othersValue];

  return { labels, data };
};

export default function ChartExpenses({ categories }) {
  const { labels, data } = processChartData(categories);
  const expensesChartData = makeExpensesByCategoryData(labels, data);

  return <Bar data={expensesChartData} options={expensesChartOptions} />;
}
