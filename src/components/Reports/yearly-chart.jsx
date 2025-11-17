import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Line } from 'react-chartjs-2';
import { useCurrency } from '../../context/currency-provider';
import { yearlyChartOptions } from '../../data/yearly-chart-options';
import { useTransactionsMe } from '../../hooks/use-api';
import { makeYearlyExpense } from '../../utils/chart-data-factory';

function buildYearlyExpenses(transactions) {
  const monthsPeriod = -12;
  const expenses = transactions.filter(
    (t) => t.tipoTransacao?.nome.toUpperCase() === 'DESPESA'
  );

  if (expenses.length === 0) {
    return [];
  }

  const map = new Map();

  for (const e of expenses) {
    const date = parseISO(e.dataVencimento);
    const key = format(date, 'yyyy-MM-01');

    const current = map.get(key) || 0;
    map.set(key, current + Number(e.valor));
  }

  const months = [...map.entries()]
    .map(([month, totalExpense]) => ({ month, totalExpense }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  return months.slice(monthsPeriod);
}

const getRecentMonthsData = (data, months) =>
  data
    .slice()
    .sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime())
    .slice(0, months)
    .reverse();

const getChartLabels = (recentMonths) => {
  const years = new Set(
    recentMonths.map((item) => parseISO(item.month).getFullYear())
  );
  const showYear = years.size > 1;

  return recentMonths.map((item) => {
    const date = parseISO(item.month);
    const pattern = showYear ? 'MMM/yy' : 'MMM';
    const raw = format(date, pattern, { locale: ptBR });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  });
};

export default function YearlyExpenseChart() {
  const { currency } = useCurrency();
  const { data: transactions } = useTransactionsMe();
  if (!transactions) {
    return null;
  }
  const monthlyData = buildYearlyExpenses(transactions);
  const monthPeriod = 12;
  const recentMonths = getRecentMonthsData(monthlyData, monthPeriod);
  const labels = getChartLabels(recentMonths);

  const yearlyData = makeYearlyExpense(labels, recentMonths);

  return (
    <Line
      data={yearlyData}
      options={yearlyChartOptions(currency.code, currency.locale)}
    />
  );
}
