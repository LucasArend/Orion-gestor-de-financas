import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const processChartData = (rawCategories) => {
  const maxCategories = 6;

  if (rawCategories.length <= maxCategories) {
    return {
      labels: rawCategories.map((cat) => cat.nome),
      data: rawCategories.map((cat) => cat.valor),
    };
  }

  const sortedCategories = [...rawCategories].sort((a, b) => b.valor - a.valor);
  const topCategories = sortedCategories.slice(0, maxCategories);
  const otherCategories = sortedCategories.slice(maxCategories);

  const othersValue = otherCategories.reduce((sum, cat) => sum + cat.valor, 0);

  const labels = [...topCategories.map((cat) => cat.nome), 'Outros'];
  const data = [...topCategories.map((cat) => cat.valor), othersValue];

  return { labels, data };
};

export default function ChartComponent({ categories }) {
  const { labels, data } = processChartData(categories);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Gastos por Categoria',
        data,
        backgroundColor: (context) => {
          const middleColor = 0.5
          const { ctx, chartArea } = context.chart;
          if (!chartArea) {
            return '#2979FF';
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );

          gradient.addColorStop(0, '#ADCBFF');
          gradient.addColorStop(middleColor, '#619BFF');
          gradient.addColorStop(1, '#2979FF');
          return gradient;
        },
        borderRadius: 7,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
        border: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
          border: {
            display: false,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
      },
    },
    elements: {
      bar: {
        hoverBackgroundColor: '#2161E5',
      },
    },
    barPercentage: 0.5,
  };

  return <Bar data={chartData} options={options} />;
}