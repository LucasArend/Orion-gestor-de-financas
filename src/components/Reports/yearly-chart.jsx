import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Line } from 'react-chartjs-2';
import { useCurrency } from '../../context/currency-provider';
import { yearlyChartOptions } from '../../data/yearly-chart-options';
import { useTransactionsMe } from '../../hooks/use-api';
import { makeYearlyBalance } from '../../utils/chart-data-factory';

function buildMonthlyBalance(transactions) {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const map = new Map();

  for (const t of transactions) {
    if (!t.dataVencimento) {
      continue;
    }

    const date = parseISO(t.dataVencimento);
    const key = format(date, 'yyyy-MM-01');

    const current = map.get(key) || { income: 0, expense: 0 };
    if (t.tipoTransacao?.nome.toUpperCase() === 'RENDA') {
      current.income += Number(t.valor) || 0;
    } else if (t.tipoTransacao?.nome.toUpperCase() === 'DESPESA') {
      current.expense += Number(t.valor) || 0;
    }

    map.set(key, current);
  }

  const monthlyBalances = [...map.entries()].map(([month, data]) => ({
    month,
    balance: data.income - data.expense,
  }));

  monthlyBalances.sort((a, b) => new Date(a.month) - new Date(b.month));

  return monthlyBalances;
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

export default function YearlyBalanceChart() {
  const { currency } = useCurrency();
  const { data: transactions } = useTransactionsMe();

  if (!transactions) {
    return null;
  }

  const monthlyData = buildMonthlyBalance(transactions);
  const monthPeriod = 12;
  const recentMonths = getRecentMonthsData(monthlyData, monthPeriod);

  const fallbackRecentMonths =
    recentMonths.length > 0
      ? recentMonths
      : Array.from({ length: 12 }).map((_, i) => ({
          month: format(
            new Date(new Date().setMonth(new Date().getMonth() - (11 - i))),
            'yyyy-MM-01'
          ),
          balance: 0,
        }));

  const labels = getChartLabels(fallbackRecentMonths);

  const yearlyData = makeYearlyBalance(labels, fallbackRecentMonths);

  return (
    <Line
      data={yearlyData}
      options={yearlyChartOptions(currency.code, currency.locale)}
    />
  );
}
