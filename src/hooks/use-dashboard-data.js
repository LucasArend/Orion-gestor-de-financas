import { useIncome, useSavings, useTransactionsMe } from '../hooks/use-api';

export function useDashboardData() {
  const { data: saving } = useSavings();
  const { data: income } = useIncome();
  const { data: transaction } = useTransactionsMe();

  const data = Array.isArray(transaction)
    ? transaction
    : transaction
      ? [transaction]
      : [];

  const totalExpenses = data
    .filter((t) => t.tipoTransacao?.nome?.toLowerCase() === 'despesa')
    .reduce((soma, t) => soma + (t?.valor || 0), 0);

  const monthlySummary = income - totalExpenses

  const cardData = [
    { id: 1, categoria: 'monthlySummary', valor: monthlySummary ?? 0 },
    { id: 2, categoria: 'income', valor: income ?? 0 },
    { id: 3, categoria: 'totalExpenses', valor: totalExpenses ?? 0 },
    { id: 4, categoria: 'savings', valor: saving ?? 0 },
  ];

  return { cardData };
}
