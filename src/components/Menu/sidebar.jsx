import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../../data/nav-items';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 flex h-full w-20 flex-col bg-white p-4 transition-all duration-300 md:w-64 md:p-6">
      <div className="mb-8 hidden font-bold text-2xl text-gray-900 md:block">
        Orion
      </div>
      <div className="mb-8 items-center justify-start p-1 font-bold text-gray-900 text-xl md:hidden">
        <img alt="Ícone Orion" height={35} src="orion-logo.png" width={35} />
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li className="mb-2" key={item.id}>
                <NavLink
                  className={`flex items-center justify-center rounded-lg p-3 transition-all duration-200 md:justify-start ${
                    isActive
                      ? 'bg-[#2979FF] text-white shadow-[#2161E5]/50 shadow-md'
                      : 'text-gray-600 hover:bg-zinc-100 hover:text-gray-900'
                  }`}
                  to={item.path}
                >
                  <Icon className="h-5 w-5" />
                  {/* Nome só aparece em telas médias pra cima */}
                  <span className="ml-3 hidden md:inline">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
