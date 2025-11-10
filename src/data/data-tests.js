// Dados que devem vir do backend, dados fictícios

export const reminderData = [
  { id: 1, text: 'Conta de água vence em 3 dias', date: '4 dias atrás' },
  { id: 2, text: 'Conta de internet vence amanhã', date: '3 dias atrás' },
  {
    id: 3,
    text: 'Sua despesas esta semana estão 15% acima do habitual',
    date: '1 dia atrás',
  },
  {
    id: 4,
    text: 'Revisar orçamento mensal para próximo mês',
    date: '15h atrás',
  },
  { id: 5, text: 'Revisar saldo e gastos', date: '2h atrás' },
  { id: 6, text: 'Renovar assinatura de software', date: '1h atrás' },
  { id: 7, text: 'Comprar presente de aniversário', date: '10min atrás' },
];

export const goalData = [
  {
    id: 1,
    objective: 'Viagem',
    target: 4000.0,
    saved: 3200.0,
    contribution: 100.0,
    forecast: '2025-11-09',
    dueDate: '2025-12-31',
  },
  {
    id: 2,
    objective: 'Carro novo',
    target: 15_000.0,
    saved: 8000.0,
    contribution: 500.0,
    forecast: '01/08/2026',
    dueDate: '01/01/2027',
  },
  {
    id: 3,
    objective: 'Fundo de estudos',
    target: 10_000.0,
    saved: 1500.0,
    contribution: 200.0,
    forecast: '01/03/2028',
    dueDate: '01/01/2030',
  },
  {
    id: 4,
    objective: 'Reforma',
    target: 20_000.0,
    saved: 500.0,
    contribution: 100.0,
    forecast: '01/04/2025',
    dueDate: '01/01/2026',
  },
];

export const cardDataReports = [
  {
    id: 1,
    categoria: 'balance',
    valor: 5000.0,
  },
  {
    id: 2,
    categoria: 'totalIncome',
    valor: 541.0,
  },
  {
    id: 3,
    categoria: 'expense',
    valor: -41.0,
  },
  {
    id: 4,
    categoria: 'savingsRate',
    valor: 8.5,
  },
];

export const barChartData = {
  totalSalary: 5000.0,
  categories: [
    { id: 1, name: 'Mercado', value: 150.8 },
    { id: 2, name: 'Transporte', value: 50.0 },
    { id: 3, name: 'Entretenimento', value: 45.99 },
    { id: 4, name: 'Contas', value: 150.0 },
    { id: 5, name: 'Outros', value: 1000.0 },
  ],
};

export const monthlySummary = [
  { month: '2025-09-01', totalIncome: 6500.0, totalExpense: 3200.0 },
  { month: '2025-08-01', totalIncome: 7500.0, totalExpense: 8200.0 },
  { month: '2025-07-01', totalIncome: 6500.0, totalExpense: 2200.0 },
  { month: '2025-05-01', totalIncome: 3200.0, totalExpense: 3000.0 },
  { month: '2025-04-01', totalIncome: 8000.0, totalExpense: 7800.0 },
  { month: '2025-03-01', totalIncome: 5500.0, totalExpense: 3200.0 },
  { month: '2025-02-01', totalIncome: 5200.0, totalExpense: 3000.0 },
  { month: '2025-01-01', totalIncome: 5000.0, totalExpense: 2800.0 },
  { month: '2024-12-01', totalIncome: 4800.0, totalExpense: 4000.0 },
  { month: '2024-11-01', totalIncome: 4500.0, totalExpense: 2200.0 },
  { month: '2024-10-01', totalIncome: 5500.0, totalExpense: 1200.0 },
  { month: '2024-09-01', totalIncome: 3500.0, totalExpense: 2300.0 },
];