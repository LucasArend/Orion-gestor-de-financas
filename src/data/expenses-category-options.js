/*
 * Configurações para o gráfico de -Gastos por Categoria- da página de DASHBOARD
 */
export const expensesChartOptions = (currencyCode, currencyCountry) => ({
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
      ticks: {
        font: {
          size: 12,
        },
        callback(value) {
          if (value === 0) {
            return '';
          }
          return new Intl.NumberFormat(currencyCountry, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value);
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
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw;
          return new Intl.NumberFormat(currencyCountry, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);
        },
      },
    },
  },
  barPercentage: 0.5,
});
