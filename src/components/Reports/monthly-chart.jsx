import { Bar } from 'react-chartjs-2';
import { monthlyChartOptions } from '../../data/monthly-chart-options';
import { makeMonthlyIncomeExpense } from '../../utils/chart-data-factory';
import {
  getChartLabels,
  getRecentMonthsData,
} from '../../utils/chart-formatting';

export default function MonthlyIncomeExpenseChart({ monthlyData }) {
  const monthPeriod = 4;
  const recentMonths = getRecentMonthsData(monthlyData, monthPeriod);
  const labels = getChartLabels(recentMonths);
  const monthlyDataChart = makeMonthlyIncomeExpense(labels, recentMonths);

  return <Bar data={monthlyDataChart} options={monthlyChartOptions} />;
}
