/*
 * Configurações para o gráfico de -Gastos por Categoria- da página de DASHBOARD
 */
export const expensesChartOptions = {
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
          return `R$${value.toFixed(0).replace('.', ',')}`;
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
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);
        },
      },
    },
  },
  elements: {
    bar: {
      hoverBackgroundColor: '#2161E5',
    },
  },
  barPercentage: 0.5,
};