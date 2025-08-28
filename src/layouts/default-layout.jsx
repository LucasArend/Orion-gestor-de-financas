import { useLocation } from 'react-router-dom';
import Header from '../components/dashboard/header';
import Sidebar from '../components/dashboard/sidebar';
import { navItems } from '../data/nav-items';

export default function DefaultLayout({ children }) {
  const location = useLocation();
  const currentPage = navItems.find((item) => item.path === location.pathname);
  const pageTitle = currentPage ? currentPage.name : 'Painel de Controle';

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 flex flex-1 flex-col">
        <Header pageTitle={pageTitle} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
