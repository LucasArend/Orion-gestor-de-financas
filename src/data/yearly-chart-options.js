/*
 * Configurações para o gráfico de -Evolução dos Gastos- da página de RELATÓRIOS
 */
export const yearlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
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
};
