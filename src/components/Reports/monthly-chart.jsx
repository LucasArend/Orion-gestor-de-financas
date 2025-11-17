import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bar } from 'react-chartjs-2';
import { useCurrency } from '../../context/currency-provider';
import { monthlyChartOptions } from '../../data/monthly-chart-options';
import { useTransactionsMe } from '../../hooks/use-api';
import { makeMonthlyIncomeExpense } from '../../utils/chart-data-factory';

const getMonthKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const buildMonthlyAggregates = (transactions) => {
  const map = {};

  for (const t of transactions) {
    if (!t.dataVencimento) {
      continue;
    }

    const monthKey = getMonthKey(t.dataVencimento);

    if (!map[monthKey]) {
      map[monthKey] = {
        month: monthKey,
        totalIncome: 0,
        totalExpense: 0,
      };
    }

    const value = Number(t.valor) || 0;

    if (t.tipoTransacao?.nome.toUpperCase() === 'RENDA') {
      map[monthKey].totalIncome += value;
    }

    if (t.tipoTransacao?.nome.toUpperCase() === 'DESPESA') {
      map[monthKey].totalExpense += value;
    }
  }

  return Object.values(map).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );
};

const getRecentMonths = (list, limit = 4) => {
  const sorted = list
    .slice()
    .sort((a, b) => new Date(b.month) - new Date(a.month));

  return sorted.slice(0, limit).reverse();
};

const getChartLabels = (months) => {
  const years = new Set(months.map((m) => parseISO(m.month).getFullYear()));
  const showYear = years.size > 1;

  return months.map((item) => {
    const date = parseISO(item.month);
    const pattern = showYear ? 'MMM/yy' : 'MMM';
    const raw = format(date, pattern, { locale: ptBR });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  });
};

export default function MonthlyIncomeExpenseChart() {
  const { currency } = useCurrency();
  const { data: transactions } = useTransactionsMe();

  if (!transactions) {
    return null;
  }
  const monthPeriod = 4;
  const aggregated = buildMonthlyAggregates(transactions);
  const recentMonths = getRecentMonths(aggregated, monthPeriod);
  const labels = getChartLabels(recentMonths);
  const chartData = makeMonthlyIncomeExpense(labels, recentMonths);

  return <Bar data={chartData} options={monthlyChartOptions(currency.code, currency.locale)} />;
}
