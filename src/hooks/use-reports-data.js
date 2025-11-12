import { useIncome, useTransactionsMe } from '../hooks/use-api';

export function useReportsData() {
  const { data: transaction } = useTransactionsMe();
  const { data: income } = useIncome();

  const data = Array.isArray(transaction)
    ? transaction
    : transaction ? [transaction] : [];

  const today = new Date();

  const currentTransactions = data.filter((t) => {
    if (!t.dataVencimento) {
      return false;
    }
    const dataTransaction = new Date(t.dataVencimento);
    return (
      dataTransaction.getMonth() === today.getMonth() &&
      dataTransaction.getFullYear() === today.getFullYear()
    );
  });

  const yearTransactions = data.filter((t) => {
    if (!t.dataVencimento) {
      return false;
    }
    const dataTransaction = new Date(t.dataVencimento);
    return dataTransaction.getFullYear() === today.getFullYear();
  });

  const totalExpensesYear = yearTransactions
    .filter((t) => t.tipoTransacao?.nome?.toLowerCase() === 'despesa')
    .reduce((soma, t) => soma + (t?.valor || 0), 0);

  const totalExpenses = currentTransactions
    .filter((t) => t.tipoTransacao?.nome?.toLowerCase() === 'despesa')
    .reduce((soma, t) => soma + (t?.valor || 0), 0);

  const totalIncome = currentTransactions
    .filter((t) => t.tipoTransacao?.nome?.toLowerCase() === 'renda')
    .reduce((soma, t) => soma + (t?.valor || 0), 0);

  const monthlySummary = totalIncome - totalExpenses;

  const cardDataReports = [
    {
      id: 1,
      categoria: 'balance',
      valor: income ?? 0,
    },
    {
      id: 2,
      categoria: 'totalExpenses',
      valor: totalExpensesYear || 0,
    },
    {
      id: 3,
      categoria: 'expense',
      valor: monthlySummary || 0,
    },
    {
      id: 4,
      categoria: 'savingsRate',
      valor: 8.5,
    },
  ];

  return { cardDataReports };
}
