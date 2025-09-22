/*
 * Configurações para o gráfico de -Resumo de Gastos- da página de RELATÓRIOS
 */
export const centerCircleOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      callbacks: {
        label(context) {
          let label = context.dataset.labels[context.dataIndex] || '';
          if (label) {
            label += ': ';
          }
          label += context.raw;
          return label;
        },
      },
    },
  },
  elements: {
    arc: { borderWidth: 0 },
  },
};
