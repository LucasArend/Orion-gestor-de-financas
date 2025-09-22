/*
 * Configurações para o gráfico de -Balanço Financeiro Mensal- da página de RELATÓRIOS
 */
export const monthlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: { size: 12 },
      },
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
      grid: { display: false },
      ticks: { display: true, font: { size: 12 } },
      border: { display: true },
    },
    y: {
      beginAtZero: true,
      ticks: {
        font: { size: 12 },
        callback(value) {
          if (value === 0) {
            return '';
          }
          return `R$${Number(value).toFixed(0).replace('.', ',')}`;
        },
      },
      grid: { display: true, border: { display: false } },
    },
  },
};
