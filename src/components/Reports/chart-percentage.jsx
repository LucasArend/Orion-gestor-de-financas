import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { makeIncomeVsSpendingData } from "../../utils/chart-data-factory";
import { centerCircleOptions } from "../../data/percentage-chart-options";
import { useTransactions } from "../../hooks/useTransactions";

export default function ChartPercentage() {
  const { transactions, loading, error } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  ); 

  const percent = 100;

  const availableMonths = useMemo(() => {
    if (!transactions?.length) return [];

    const months = Array.from(
      new Set(
        transactions.map((t) =>
          new Date(t.dataVencimento).toISOString().slice(0, 7)
        )
      )
    );

    return months.sort((a, b) => (a < b ? 1 : -1));
  }, [transactions]);

  const { totalIncome, totalExpense } = useMemo(() => {
    if (!transactions?.length) return { totalIncome: 0, totalExpense: 0 };

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const transactionMonth = new Date(t.dataVencimento)
        .toISOString()
        .slice(0, 7);

      if (transactionMonth === selectedMonth) {
        if (t.tipoTransacao?.id === 1) income += t.valor;
        else if (t.tipoTransacao?.id === 2) expense += t.valor;
      }
    });

    return { totalIncome: income, totalExpense: expense };
  }, [transactions, selectedMonth]);

  const overallSpendingPercentage =
    totalIncome > 0 ? (totalExpense / totalIncome) * percent : 0;

  const centerCircleData = makeIncomeVsSpendingData(totalIncome, totalExpense);

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro ao carregar transações: {error.message}</p>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {availableMonths.length > 1 && (
        <div className="w-full text-center">
          <select
            className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {availableMonths.map((month) => {
              const date = new Date(`${month}-01`);
              const monthName = date.toLocaleString("pt-BR", {
                month: "long",
                year: "numeric",
              });
              return (
                <option key={month} value={month}>
                  {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className="relative z-0 mb-4 h-48 w-52">
        <Doughnut data={centerCircleData} options={centerCircleOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Gastos em</p>
          <p className="text-gray-600 text-sm mb-1">
            {new Date(`${selectedMonth}-01`).toLocaleString("pt-BR", {
              month: "long",
            })}
          </p>
          <p className="font-bold text-2xl text-gray-800">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalExpense)}
          </p>
        </div>
      </div>

      <div className="w-full space-y-2">
        <p className="text-center font-medium text-gray-700 text-sm">
          {overallSpendingPercentage.toFixed(2)}% da renda usada
        </p>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#2979FF] transition-all duration-500"
            style={{
              width: `${Math.min(overallSpendingPercentage, percent)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
