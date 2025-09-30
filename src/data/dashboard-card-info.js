import { HeartHandshake, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export const cardInfoDashboard = {
  monthlySummary: {
    title: 'Balanço do Mês',
    Icon: Wallet,
  },
  income: {
    title: 'Renda Total',
    Icon: TrendingUp,
  },
  totalExpenses: {
    title: 'Gastos Totais',
    Icon: TrendingDown,
  },
  savings: {
    title: 'Reserva de Emergência',
    Icon: HeartHandshake,
  },
};
