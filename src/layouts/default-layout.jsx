import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/header';
import Sidebar from '../components/Menu/sidebar';
import { navItems } from '../data/nav-items';
import { useState } from 'react';

export default function DefaultLayout() {
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);

  const currentPage = navItems.find((item) => item.path === location.pathname);
  const pageTitle = currentPage ? currentPage.name : 'Painel de Controle';

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar controlada pelo layout */}
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col ml-0 md:ml-64 transition-all duration-300">
        
        {/* Passa a função para o Header */}
        <Header pageTitle={pageTitle} toggleSidebar={() => setOpenSidebar(!openSidebar)} />
        
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
