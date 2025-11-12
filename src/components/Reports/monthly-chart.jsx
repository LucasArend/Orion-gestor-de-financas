import { Bar } from "react-chartjs-2";
import { useTransactions } from "../../hooks/useTransactions";
import { getRecentMonthsData, getChartLabels } from "../../utils/chart-formatting";
import { makeMonthlyIncomeExpense } from "../../utils/chart-data-factory";
import { monthlyChartOptions } from "../../data/monthly-chart-options";

export default function MonthlyIncomeExpenseChart() {
  const { transactions, loading, error } = useTransactions();

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro ao carregar dados: {error}</p>;

  const processTransactions = (transactions) => {
    const incomeMap = {};
    const expenseMap = {};

    transactions.forEach((t) => {
      const { tipoTransacao, valor, dataVencimento } = t;
      const monthYear = new Date(dataVencimento).toISOString().substring(0, 7);

      if (tipoTransacao.id === 1) {
        // Renda
        if (!incomeMap[monthYear]) incomeMap[monthYear] = 0;
        incomeMap[monthYear] += valor;
      } else if (tipoTransacao.id === 2) {
        // Despesa
        if (!expenseMap[monthYear]) expenseMap[monthYear] = 0;
        expenseMap[monthYear] += valor;
      }
    });

    const allMonths = [...new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)])];
    allMonths.sort();

    return allMonths.map((month) => ({
      month,
      totalIncome: incomeMap[month] || 0,
      totalExpense: expenseMap[month] || 0,
    }));
  };

  const monthlyData = processTransactions(transactions);
  const recentMonths = getRecentMonthsData(monthlyData, 5);
  const labels = getChartLabels(recentMonths);
  const chartData = makeMonthlyIncomeExpense(labels, recentMonths);

      if (!labels.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-medium">
        Nenhuma transação encontrada
      </div>
    );
  }

  return <Bar data={chartData} options={monthlyChartOptions} />;
}
