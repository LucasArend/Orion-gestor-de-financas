import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/header';
import Sidebar from '../components/Menu/sidebar';
import { navItems } from '../data/nav-items';

export default function DefaultLayout() {
  const location = useLocation();
  const currentPage = navItems.find((item) => item.path === location.pathname);
  const pageTitle = currentPage ? currentPage.name : 'Painel de Controle';

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 flex flex-1 flex-col">
        <Header pageTitle={pageTitle} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
