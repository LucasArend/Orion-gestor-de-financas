import {
  LayoutDashboard,
  LineChart,
  ReceiptText,
  Settings,
} from 'lucide-react';

//Itens do menu lateral

export const navItems = [
  { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 2, name: 'Transações', icon: ReceiptText, path: '/transacoes' },
  { id: 3, name: 'Relatórios', icon: LineChart, path: '/relatorios' },
  { id: 4, name: 'Configurações', icon: Settings, path: '/configuracoes' },
];