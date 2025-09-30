// Dados que devem vir do backend, dados fictícios

export const chartCategoriesData = [
  { nome: 'Contas', valor: 789 },
  { nome: 'Transporte', valor: 238 },
  { nome: 'Mercado', valor: 544 },
  { nome: 'Aluguel', valor: 1500 },
  { nome: 'Lazer', valor: 250 },
  { nome: 'Natação', valor: 100 },
  { nome: 'Academia', valor: 150 },
  { nome: 'Pet', valor: 80 },
  { nome: 'Carro', valor: 2000 },
];

export const transactionsData = [
  { id: 1, type: 'Transferência', description: 'Mercado', value: -1200.99 },
  { id: 2, type: 'Freelance', description: 'Trabalho', value: 859.99 },
  { id: 3, type: 'Amazon', description: 'Compras Online', value: -59.99 },
  { id: 4, type: 'Sushi', description: 'Comida', value: -87.25 },
  { id: 5, type: 'Padaria', description: 'Comida', value: -15.99 },
  { id: 6, type: 'Salário', description: 'Receita', value: 2500.0 },
  { id: 7, type: 'Uber', description: 'Transporte', value: -35.0 },
];

export const name = { name: 'Pedro Avila' };

// cada item pode ser uma coluna do BD
export const cardData = [
  {
    id: 1,
    categoria: 'monthlySummary',
    valor: -109.0,
  },
  {
    id: 2,
    categoria: 'income',
    valor: 2850.0,
  },
  {
    id: 3,
    categoria: 'totalExpenses',
    valor: -2959.0,
  },
  {
    id: 4,
    categoria: 'savings',
    valor: 25_000.0,
  },
];

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
    forecast: '01/09/2025',
    dueDate: '01/02/2026',
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