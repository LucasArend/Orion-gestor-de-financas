import { parseISO, format } from "date-fns";

/**
 * Agrupa transações por mês, somando rendas e despesas.
 * tipoTransacao.id = 1 → Renda
 * tipoTransacao.id = 2 → Despesa
 */
export function aggregateTransactionsByMonth(transacoes) {
  const monthlyData = {};

  transacoes.forEach((t) => {
    const date = parseISO(t.dataVencimento);
    const monthKey = format(date, "yyyy-MM");

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: `${monthKey}-01`,
        totalIncome: 0,
        totalExpense: 0,
      };
    }

    if (t.tipoTransacao?.id === 1) {
      monthlyData[monthKey].totalIncome += Number(t.valor) || 0;
    } else if (t.tipoTransacao?.id === 2) {
      monthlyData[monthKey].totalExpense += Number(t.valor) || 0;
    }
  });

  return Object.values(monthlyData).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );
}
