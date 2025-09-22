import { Line } from 'react-chartjs-2';
import { yearlyChartOptions } from '../../data/yearly-chart-options';
import { makeYearlyExpense } from '../../utils/chart-data-factory';
import {
  getChartLabels,
  getRecentMonthsData,
} from '../../utils/chart-formatting';

export default function YearlyExpenseChart({ monthlyData }) {
  const monthPeriod = 12;
  const recentMonths = getRecentMonthsData(monthlyData, monthPeriod);
  const labels = getChartLabels(recentMonths);
  const yearlyData = makeYearlyExpense(labels, recentMonths);

  return <Line data={yearlyData} options={yearlyChartOptions} />;
}
