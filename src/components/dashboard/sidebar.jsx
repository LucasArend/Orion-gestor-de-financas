import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../../data/nav-items';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 flex h-full w-64 flex-col bg-white p-6">
      <div className="mb-8 font-bold text-2xl text-gray-900">Orion</div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li className="mb-2" key={item.id}>
                <NavLink
                  className={`flex items-center rounded-lg p-3 transition-colors ${isActive ? 'bg-[#2979FF] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  to={item.path}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
