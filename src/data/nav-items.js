import {
  ArrowRightLeft,
  LayoutDashboard,
  LineChart,
  Settings,
} from 'lucide-react';

//Itens do menu lateral
export const navItems = [
  { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 2, name: 'Transações', icon: ArrowRightLeft, path: '/transacao' },
  { id: 3, name: 'Relatórios', icon: LineChart, path: '/relatorios' },
  { id: 4, name: 'Configurações', icon: Settings, path: '/configuracoes' },
];
