import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ data, options }) {
  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      labels: data.labels,
    })),
  };

  return <Doughnut data={chartData} options={options} />;
}