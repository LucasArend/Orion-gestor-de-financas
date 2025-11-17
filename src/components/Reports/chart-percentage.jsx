import { useCurrency } from '../../context/currency-provider';
import { centerCircleOptions } from '../../data/percentage-chart-options';
import { useTransactionsMe } from '../../hooks/use-api';
import { makeIncomeVsSpendingData } from '../../utils/chart-data-factory';
import DoughnutChart from './doughnut-chart';

export default function ChartPercentage() {
  const { data: transactions } = useTransactionsMe();
  const { currency } = useCurrency();
  const percent = 100;

  if (!transactions) {
    return null;
  }

  const now = new Date();
  const currentKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, '0')}`;

  const monthly = transactions.filter((t) => {
    if (!t.dataVencimento) {
      return false;
    }

    const date = new Date(t.dataVencimento);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}`;

    return key === currentKey;
  });

  const totalMonthlyIncome = monthly
    .filter((t) => t.tipoTransacao?.nome?.toUpperCase() === 'RENDA')
    .reduce((acc, t) => acc + Number(t.valor || 0), 0);

  const totalMonthlySpending = monthly
    .filter((t) => t.tipoTransacao?.nome?.toUpperCase() === 'DESPESA')
    .reduce((acc, t) => acc + Number(t.valor || 0), 0);

  const overallSpendingPercentage =
    totalMonthlyIncome > 0
      ? (totalMonthlySpending / totalMonthlyIncome) * percent
      : 0;

  const centerCircleData = makeIncomeVsSpendingData(
    totalMonthlyIncome,
    totalMonthlySpending
  );

  return (
    <div className="flex flex-col items-center">
      {/* Donut */}
      <div className="relative z-0 mb-4 h-48 w-48">
        <DoughnutChart data={centerCircleData} options={centerCircleOptions} />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Total</p>

          <p className="font-bold text-2xl text-gray-800">
            {new Intl.NumberFormat(currency.locale, {
              style: 'currency',
              currency: currency.code,
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(totalMonthlySpending)}
          </p>
        </div>
      </div>

      {/* Porcentagem + Barra */}
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
