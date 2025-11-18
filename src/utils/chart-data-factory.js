
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
      backgroundColor: [
        '#2979FF',
        '#FF6B6B',
        '#FFD166',
        '#4CAF50',
        '#9C27B0',
        '#ea284b',
      ],
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

export const makeYearlyExpense = (labels, recentMonths) => {
  const balances = recentMonths.map((i) => Number(i.totalBalance) || 0);

  return {
    labels,
    datasets: [
      {
        label: "Saldo Mensal",
        data: balances,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,


        pointBackgroundColor: (ctx) => {
          const value = ctx.raw;
          return value < 0 ? "#FF5252" : "#2979FF";
        },
        pointBorderColor: (ctx) => {
          const value = ctx.raw;
          return value < 0 ? "#FF5252" : "#2979FF";
        },

        segment: {
          borderColor: (ctx) => {
            const y1 = ctx.p0?.parsed?.y;
            const y2 = ctx.p1?.parsed?.y;

            if (typeof y1 !== "number" || typeof y2 !== "number")
              return "#2979FF";

            if (y1 > 0 && y2 > 0) return "#2979FF";


            if (y1 < 0 && y2 < 0) return "#FF5252";


            if (y1 < 0 && y2 > 0) return "#2979FF"; // negativo → positivo
            if (y1 > 0 && y2 < 0) return "#FF5252"; // positivo → negativo

            return "#2979FF";
          },
        },

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, scales } = chart;
          if (!chartArea) return null;

          const { top, bottom } = chartArea;
          const { y } = scales;
          const zeroY = y.getPixelForValue(0);

          let offset = (bottom - zeroY) / (bottom - top);
          offset = Math.min(1, Math.max(0, offset)); // garante intervalo válido

          const gradient = ctx.createLinearGradient(0, bottom, 0, top);
          gradient.addColorStop(0, "rgba(255,82,82,0.3)");
          gradient.addColorStop(offset, "rgba(255,82,82,0.0)");
          gradient.addColorStop(offset, "rgba(66,165,245,0.0)");
          gradient.addColorStop(1, "rgba(66,165,245,0.4)");

          return gradient;
        },
      },
    ],

    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => `R$${value}`,
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },

      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
};



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
