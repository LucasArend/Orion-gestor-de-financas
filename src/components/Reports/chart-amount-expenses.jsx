import { doughnutChartOptions } from '../../data/doughnut-chart-options';
import { useTransactionsMe } from '../../hooks/use-api';
import { makeCategoryDoughnutData } from '../../utils/chart-data-factory';
import DoughnutChart from './doughnut-chart';

export default function ChartAmountExpenses() {
  const { data: transactions } = useTransactionsMe();

  if (!transactions) {
    return null;
  }

  const expenses = transactions.filter(
    (t) => t.tipoTransacao?.nome.toUpperCase() === 'DESPESA'
  );

  if (expenses.length === 0) {
    const fallbackLabels = ['Sem dados'];
    const fallbackValues = [1];
    const fallbackColors = ['#E0E0E0'];

    return (
      <DoughnutChart
        data={makeCategoryDoughnutData(
          fallbackLabels,
          fallbackValues,
          fallbackColors
        )}
        options={doughnutChartOptions}
      />
    );
  }

  const grouped = expenses.reduce((acc, item) => {
    const name = item.categoria?.nome || 'Sem categoria';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  let finalEntries = entries;
  const dataSize = 5;

  if (entries.length > dataSize) {
    const topFiveCategories = entries.slice(0, dataSize);
    const others = entries.slice(dataSize);

    const othersTotal = others.reduce((acc, [, value]) => acc + value, 0);

    finalEntries = [...topFiveCategories, ['Outros', othersTotal]];
  }

  const labels = finalEntries.map((e) => e[0]);
  const values = finalEntries.map((e) => e[1]);

  return (
    <DoughnutChart
      data={makeCategoryDoughnutData(labels, values)}
      options={doughnutChartOptions}
    />
  );
}
