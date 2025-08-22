import {
  LayoutDashboard,
  LineChart,
  ReceiptText,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Transações', icon: ReceiptText, path: '/transacoes' },
  { name: 'Relatórios', icon: LineChart, path: '/relatorios' },
  { name: 'Configurações', icon: Settings, path: '/configuracoes' },
];

export default navItems;
