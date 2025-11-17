import CategorySummary from '../components/Reports/category-summary';
import ChartAmountExpenses from '../components/Reports/chart-amount-expenses';
import ChartPercentage from '../components/Reports/chart-percentage';
import MonthlyIncomeExpenseChart from '../components/Reports/monthly-chart';
import YearlyExpenseChart from '../components/Reports/yearly-chart';
import { useCurrency } from '../context/currency-provider';
import { cardInfoReports } from '../data/reports-card-info';
import { useReportsData } from '../hooks/use-reports-data';
import { getTextColor } from '../utils/get-text-color';

export default function Reports() {
  const { cardDataReports } = useReportsData();
  const { currency } = useCurrency();

  const percent = 100;
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
                    ? new Intl.NumberFormat(currency.locale, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                      }).format(data.valor / percent)
                    : new Intl.NumberFormat(currency.locale, {
                        style: 'currency',
                        currency: currency.code,
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
            <ChartAmountExpenses />
          </div>
        </div>

        {/* Resumo de Gastos */}
        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-gray-800 text-xl">
            Resumo de Gastos
          </h3>
          <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
            <div className="lg:w-1/2">
              <ChartPercentage />
            </div>
            <div className="lg:w-1/2">
              <CategorySummary />
            </div>
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
            <MonthlyIncomeExpenseChart />
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-gray-800 text-xl">
            Evolução do Saldo Anual
          </h3>
          <div className="flex min-h-0 flex-1 flex-col rounded-lg">
            <YearlyExpenseChart />
          </div>
        </div>
      </section>
    </div>
  );
}
