/*
 * Factory de dados para os gráficos
 */
export const makeExpensesByCategoryData = (labels, data) => ({
  labels,
  datasets: [
    {
      data,
      backgroundColor: (context) => {
        const middleColor = 0.5;
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

        gradient.addColorStop(0, '#2979FF');
        gradient.addColorStop(middleColor, '#619BFF');
        gradient.addColorStop(1, '#ADCBFF');

        return gradient;
      },
      hoverBackgroundColor: (context) => {
        const middleColor = 0.5;
        const { ctx, chartArea } = context.chart;
        if (!chartArea) {
          return '#1e5bcc';
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );

        gradient.addColorStop(0, '#1e5bcc');
        gradient.addColorStop(middleColor, '#4a8cff');
        gradient.addColorStop(1, '#90b9ff');

        return gradient;
      },
      borderRadius: 7,
      borderSkipped: false,
    },
  ],
});

export const makeCategoryDoughnutData = (labels, values) => ({
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: ['#2979FF', '#FF6B6B', '#FFD166', '#4CAF50', '#9C27B0'],
      hoverOffset: 4,
    },
  ],
});

export const makeIncomeVsSpendingData = (totalSalary, totalSpending) => ({
  labels: ['Gasto Total', 'Restante da Renda'],
  datasets: [
    {
      data: [
        totalSpending,
        totalSalary - totalSpending > 0 ? totalSalary - totalSpending : 0,
      ],
      backgroundColor: ['#2979FF', '#E0E0E0'],
      circumference: 180,
      rotation: -90,
      cutout: '80%',
    },
  ],
});

export const makeYearlyExpense = (labels, recentMonths) => ({
  labels,
  datasets: [
    {
      label: 'Gastos Totais',
      data: recentMonths.map((i) => Number(i.totalExpense) || 0),
      borderColor: '#2979FF',
      pointStyle: 'circle',
      pointBackgroundColor: 'rgb(85,145,248)',
      pointBorderColor: 'rgba(33, 97, 229, 0.7)',
      pointHoverBackgroundColor: 'rgb(4,102,200)',
      pointHoverBorderColor: 'rgba(33, 97, 229, 0.5)',
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return null;
        }
        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, 'rgba(66, 165, 245, 0.2)');
        gradient.addColorStop(1, 'rgba(66, 165, 245, 0.6)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
});

export const makeMonthlyIncomeExpense = (labels, recentMonths) => ({
  labels,
  datasets: [
    {
      label: 'Renda Total',
      data: recentMonths.map((i) => Number(i.totalIncome) || 0),
      borderRadius: 7,
      barPercentage: 1,
      categoryPercentage: 0.4,
      borderSkipped: false,
      backgroundColor: (context) => {
        const middleColor = 0.5;
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

        gradient.addColorStop(0, '#2979FF');
        gradient.addColorStop(middleColor, '#619BFF');
        gradient.addColorStop(1, '#ADCBFF');

        return gradient;
      },
      hoverBackgroundColor: (context) => {
        const middleColor = 0.5;
        const { ctx, chartArea } = context.chart;
        if (!chartArea) {
          return '#1e5bcc';
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );

        gradient.addColorStop(0, '#1e5bcc');
        gradient.addColorStop(middleColor, '#4a8cff');
        gradient.addColorStop(1, '#90b9ff');

        return gradient;
      },
    },
    {
      label: 'Gastos Totais',
      data: recentMonths.map((i) => Number(i.totalExpense) || 0),
      borderRadius: 7,
      barPercentage: 0.8,
      categoryPercentage: 0.5,
      borderSkipped: false,
      backgroundColor: (context) => {
        const middleColor = 0.5;
        const { ctx, chartArea } = context.chart;
        if (!chartArea) {
          return '#7b2cbf';
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );

        gradient.addColorStop(0, '#7b2cbf');
        gradient.addColorStop(middleColor, '#9d4edd');
        gradient.addColorStop(1, '#e0aaff');

        return gradient;
      },
      hoverBackgroundColor: (context) => {
        const middleColor = 0.5;
        const { ctx, chartArea } = context.chart;
        if (!chartArea) {
          return '#5a189a';
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );

        gradient.addColorStop(0, '#5a189a');
        gradient.addColorStop(middleColor, '#8338ec');
        gradient.addColorStop(1, '#c77dff');

        return gradient;
      },
    },
  ],
});
