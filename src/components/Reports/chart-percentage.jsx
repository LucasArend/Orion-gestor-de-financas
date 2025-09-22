import { centerCircleOptions } from '../../data/percentage-chart-options';
import { makeIncomeVsSpendingData } from '../../utils/chart-data-factory';
import DoughnutChart from './doughnut-chart';

export default function ChartPercentage({ data, totalSalary }) {
  const totalMonthlySpending = data.categories.reduce(
    (acc, item) => acc + item.value,
    0
  );
  const percent = 100;
  const overallSpendingPercentage =
    totalSalary > 0 ? (totalMonthlySpending / totalSalary) * percent : 0;

  const centerCircleData = makeIncomeVsSpendingData(
    totalSalary,
    totalMonthlySpending
  );

  return (
    <div className="flex flex-col items-center">
      {/* Semicírculo */}
      <div className="relative z-0 mb-4 h-48 w-48">
        <DoughnutChart data={centerCircleData} options={centerCircleOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Texto central */}
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-sm">Total</p>
          </div>
          <p className="font-bold text-2xl text-gray-800">
            R${totalMonthlySpending.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      {/* Porcentagem + Barra */}
      <div className="w-full space-y-2">
        <p className="text-center font-medium text-gray-700 text-sm">
          {overallSpendingPercentage.toFixed(2)}% da renda usada
        </p>

        {/* Barra */}
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
