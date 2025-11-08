/*
* Arquivo de icones, rotas e nome dos itens de menu
*/
import {
  ArrowRightLeft,
  Goal,
  LayoutDashboard,
  LineChart,
  Settings,
} from 'lucide-react';

//Itens do menu lateral
export const navItems = [
  { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 2, name: 'Transações', icon: ArrowRightLeft, path: '/transacao' },
  { id: 3, name: 'Relatórios', icon: LineChart, path: '/relatorios' },
  { id: 4, name: 'Metas', icon: Goal, path: '/metas' },
  { id: 6, name: 'Configurações', icon: Settings, path: '/configuracoes' },
];
