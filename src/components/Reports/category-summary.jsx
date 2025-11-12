import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useTransactions } from "../../hooks/useTransactions";
import { makeIncomeVsSpendingData } from "../../utils/chart-data-factory";
import { centerCircleOptions } from "../../data/percentage-chart-options";

export default function CategorySummary() {
  const { transactions, loading, error } = useTransactions();
  const currentMonth = new Date().toISOString().slice(0, 7); // formato YYYY-MM
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const percent = 100;

  // 🔹 Lista de meses únicos com despesas
  const availableMonths = useMemo(() => {
    if (!transactions?.length) return [];

    const expenseMonths = Array.from(
      new Set(
        transactions
          .filter((t) => t.tipoTransacao?.id === 2) // apenas despesas
          .map((t) => new Date(t.dataVencimento).toISOString().slice(0, 7))
      )
    );

    // Ordena do mais recente pro mais antigo
    return expenseMonths.sort((a, b) => (a < b ? 1 : -1));
  }, [transactions]);

  // 🔹 Filtra transações pelo mês selecionado
  const filteredTransactions = useMemo(() => {
    if (!transactions?.length) return [];
    return transactions.filter(
      (t) =>
        t.tipoTransacao?.id === 2 && // só despesas
        new Date(t.dataVencimento).toISOString().slice(0, 7) === selectedMonth
    );
  }, [transactions, selectedMonth]);

  // 🔹 Calcula renda e despesa total (apenas despesas afetam o gráfico)
  const { totalIncome, totalExpense } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.tipoTransacao?.id === 1) income += t.valor;
      else if (t.tipoTransacao?.id === 2) expense += t.valor;
    });

    return { totalIncome: income, totalExpense: expense };
  }, [transactions]);

  // 🔹 Agrupa despesas do mês por categoria
  const categoryData = useMemo(() => {
    const categoryMap = {};

    filteredTransactions.forEach((t) => {
      const catName = t.categoria?.nome || "Outros";
      if (!categoryMap[catName]) categoryMap[catName] = 0;
      categoryMap[catName] += t.valor;
    });

    const entries = Object.entries(categoryMap);
    const total = entries.reduce((acc, [, value]) => acc + value, 0);

    return entries.map(([name, value], index) => ({
      id: index,
      name,
      value,
      percentage: total > 0 ? (value / total) * percent : 0,
    }));
  }, [filteredTransactions]);

  // 🔹 Dados do gráfico
  const centerCircleData = makeIncomeVsSpendingData(totalIncome, totalExpense);
  const overallSpendingPercentage =
    totalIncome > 0 ? (totalExpense / totalIncome) * percent : 0;

  const colors = [
    "#2979FF",
    "#FF6B6B",
    "#FFD166",
    "#4CAF50",
    "#9C27B0",
    "#6A1B9A",
  ];

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro ao carregar transações: {error.message}</p>;

  // 🔹 Nome do mês atual
  const currentMonthLabel = new Date(`${currentMonth}-01`).toLocaleString(
    "pt-BR",
    { month: "long", year: "numeric" }
  );



  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 🔹 Dropdown de seleção de mês */}
      <div className="w-full text-center">
        <select
          className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {/* Sempre mostra o mês atual primeiro */}
          <option value={currentMonth}>
            🌙 Mês Atual —{" "}
            {currentMonthLabel.charAt(0).toUpperCase() +
              currentMonthLabel.slice(1)}
          </option>

          {/* 🔹 Mostra apenas meses com despesas */}
          {availableMonths.map((month) => {
            // Evita duplicar o mês atual
            if (month === currentMonth) return null;

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

      

      <div className="flex flex-col gap-6 lg:flex-row w-full">
        {/* 🔹 Gráfico de despesas */}
        <div className="flex flex-col items-center lg:w-1/2">
          <div className="relative z-0 mb-4 h-48 w-52">
            <Doughnut data={centerCircleData} options={centerCircleOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-gray-500 text-sm">Gastos em</p>
              <p className="text-gray-600 text-sm mb-1 capitalize">
                {new Date(`${selectedMonth}-01`).toLocaleString("pt-BR", {
                  month: "long",
                })}
              </p>
              <p className="font-bold text-2xl text-gray-800">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  categoryData.reduce((acc, item) => acc + item.value, 0)
                )}
              </p>
            </div>
          </div>

          {/* 🔹 Barra de porcentagem */}
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

        {/* 🔹 Resumo de categorias */}
        <div className="lg:w-1/2 flex flex-col ms-1 space-y-4">
          {categoryData.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              Nenhuma despesa registrada neste mês.
            </p>
          ) : (
            categoryData.map((item, i) => (
              <div
                className="flex items-center justify-between"
                key={item.id}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{
                      backgroundColor: colors[i % colors.length],
                    }}
                  />
                  <span className="font-medium text-gray-700 text-sm">
                    {item.name}
                  </span>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.value)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    }).format(item.percentage / percent)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
