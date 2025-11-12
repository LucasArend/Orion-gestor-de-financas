import { useEffect, useState } from 'react';
import CategorySummary from '../components/Reports/category-summary';
import ChartPercentage from '../components/Reports/chart-percentage';
import DoughnutChart from '../components/Reports/doughnut-chart';
import MonthlyIncomeExpenseChart from '../components/Reports/monthly-chart';
import YearlyExpenseChart from '../components/Reports/yearly-chart';
import { useAuth } from '../context/AuthContext';
import { doughnutChartOptions } from '../data/doughnut-chart-options';
import { cardInfoReports } from '../data/reports-card-info';
import { useReportsData } from '../hooks/use-reports-data';
import { aggregateTransactionsByMonth } from '../utils/aggregateTransactions';
import { makeCategoryDoughnutData } from '../utils/chart-data-factory';
import { getTextColor } from '../utils/get-text-color';

export default function Reports() {
  const { token } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const { cardDataReports } = useReportsData();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/transacoes/me',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const transactions = await response.json();
        const aggregated = aggregateTransactionsByMonth(transactions);
        setMonthlyData(aggregated);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransactions();
  }, [token]);

  const percent = 100;
  const labels = ['Transporte', 'Alimentação', 'Lazer', 'Contas', 'Outros'];
  const values = [2, 5, 5, 3, 4];

  return (
    <div className="space-y-5">
      <section>
        <h1 className="font-bold text-3xl text-gray-700">
          Resultado Financeiro
        </h1>
        <p className="mt-1 mb-6 text-gray-500">
          Analise seus padrões de gastos e tendências financeiras
        </p>
      </section>

      {/* Cards principais */}
      <section className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardDataReports.map((data) => {
          const config = cardInfoReports[data.categoria];
          if (!config) return null;
          const { title, Icon } = config;

          return (
            <div
              className="flex flex-col items-start justify-center rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50 transition-all duration-300 hover:scale-95"
              key={data.id}
            >
              <div className="mb-4 rounded-full bg-gray-200 p-3 shadow-lg shadow-zinc-400/50">
                <Icon className="h-8 w-8 text-[#314259]" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="overflow-hidden text-ellipsis font-semibold text-gray-500 text-lg">
                  {title}
                </h3>
                <p
                  className={`mt-2 font-bold text-3xl ${getTextColor(
                    title,
                    data.valor
                  )}`}
                >
                  {title === 'Taxa de Poupança'
                    ? new Intl.NumberFormat('pt-BR', {
                        style: 'percent',
                        minimumFractionDigits: 2,
                      }).format(data.valor / percent)
                    : new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(data.valor)}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Gráficos e resumos */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* Gráfico de Rosca (Categorias) */}
        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-gray-800 text-xl">
            Quantidade de Gastos por Categoria
          </h3>
          <div className="flex min-h-0 flex-1 flex-col rounded-lg">
            <DoughnutChart
              data={makeCategoryDoughnutData(labels, values)}
              options={doughnutChartOptions}
            />
          </div>
        </div>

        {/* Resumo de Gastos */}
        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-gray-800 text-xl">
            Resumo de Gastos
          </h3>
          <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
            <CategorySummary />
          </div>
        </div>
      </section>

      {/* Gráficos de Balanço e Evolução */}
      <section className="grid gap-4 md:grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-xl">
            Balanço Financeiro Mensal
          </h3>
          <div className="flex min-h-0 flex-1 flex-col rounded-lg">
            <MonthlyIncomeExpenseChart
              monthlyData={monthlyData}
              monthPeriod={6}
            />
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-gray-800 text-xl">
            Evolução dos Gastos
          </h3>
          <div className="flex min-h-0 flex-1 flex-col rounded-lg">
            <YearlyExpenseChart monthlyData={monthlyData} />
          </div>
        </div>
      </section>
    </div>
  );
}
