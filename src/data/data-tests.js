import { HeartHandshake, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

// Davos que devem vir do backend, dados fictícios

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

export const cardData = [
  {
    id: 1,
    titulo: 'Balanço do mês',
    valor: -109.0,
    icone: Wallet,
    cor: 'text-red-500',
  },
  {
    id: 2,
    titulo: 'Renda total',
    valor: 2850.0,
    icone: TrendingUp,
    cor: 'text-green-500',
  },
  {
    id: 3,
    titulo: 'Gastos totais',
    valor: -2959.0,
    icone: TrendingDown,
    cor: 'text-red-500',
  },
  {
    id: 4,
    titulo: 'Reserva de Emergência',
    valor: 25_000.0,
    icone: HeartHandshake,
    cor: 'text-gray-800',
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
