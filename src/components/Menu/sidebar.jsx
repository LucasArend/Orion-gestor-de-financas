import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../../data/nav-items';

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Dim overlay no mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white p-6 shadow-lg transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}md:translate-x-0`}
      >
        <div className="mb-8 font-bold text-2xl text-gray-900">Orion</div>

        <nav className="flex-1">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li className="mb-2" key={item.id}>
                  <NavLink
                    className={`flex items-center rounded-lg p-3 ${
                      isActive
                        ? 'bg-[#2979FF] text-white shadow-[#2161E5]/50 shadow-md'
                        : 'text-gray-600 hover:bg-zinc-100 hover:text-gray-900'
                    }`}
                    onClick={() => setOpen(false)}
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
    </>
  );
}
