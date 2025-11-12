import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { makeCategoryDoughnutData } from "../../utils/chart-data-factory";
import { useTransactions } from "../../hooks/useTransactions";

export default function DoughnutChart() {
  const { transactions, loading, error } = useTransactions();

  const { labels, values, counts } = useMemo(() => {
    if (!transactions?.length) return { labels: [], values: [], counts: {} };

    const categoryMap = {};
    const categoryCount = {};

    transactions.forEach((t) => {
      if (t.tipoTransacao?.id === 2) { 
        const categoryName = t.categoria?.nome || "Outros";
        categoryMap[categoryName] = (categoryMap[categoryName] || 0) + t.valor;
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(categoryMap),
      values: Object.values(categoryMap),
      counts: categoryCount,
    };
  }, [transactions]);

  if (loading) return <p>Carregando gráfico...</p>;
  if (error) return <p>Erro ao carregar dados: {error.message}</p>;

  const chartData = makeCategoryDoughnutData(labels, values);

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 16,      
          padding: 20,       
          font: {
            size: 14,        
            weight: "600",   
          },
          color: "#333",     
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ccc",
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const count = counts[label] || 0;

            const formattedValue = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value);

            return `${label}: ${formattedValue} (${count} transação${count > 1 ? "s" : ""})`;
          },
        },
      },
    },
  };

    if (!labels.length || !values.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-medium">
        Nenhuma despesa encontrada
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Doughnut data={chartData} options={doughnutChartOptions} />
    </div>
  );
}
