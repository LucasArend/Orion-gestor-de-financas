/*
 * Configurações para o gráfico de -Quantidade de Gastos por Categoria- da página de RELATÓRIOS
 */
export const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  radius: '90%',
  offset: 5,
  borderRadius: 7,
  layout: {
    padding: {
      right: 90,
      left: 60,
    },
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 14,
        padding: 16,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#333',
      bodyColor: '#333',
      borderColor: '#ccc',
      borderWidth: 1,
      cornerRadius: 6,
      callbacks: {
        label(context) {
          let label = context.dataset.labels[context.dataIndex] || '';
          if (label) {
            label += ': ';
          }
          label += context.raw;
          return ` ${label}`;
        },
      },
    },
  },
};
