import { ChevronDown, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../Avatar/avatar';

export default function Header({ pageTitle, toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => logout();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-zinc-200 border-b bg-white px-4 md:px-8">
      {/* HAMBURGER BUTTON - MOBILE ONLY */}
      <button className="text-gray-700 md:hidden" onClick={toggleSidebar}>
        <Menu className="h-7 w-7" />
      </button>

      {/* Título */}
      <div className="flex-1 overflow-hidden">
        <h1 className="truncate font-bold text-gray-900 text-lg md:text-xl">
          {pageTitle}
        </h1>
      </div>

      {/* Avatar e Menu */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-gray-200"
            onClick={() => setOpen(!open)}
            ref={buttonRef}
            type="button"
          >
            <Avatar
              key="user-avatar"
              name={user.name}
              style={'h-8 w-8 text-sm'}
            />

            <span className="hidden font-medium text-gray-700 text-sm sm:block">
              {user.name}
            </span>

            <ChevronDown className="h-5 w-5" />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-1 shadow-card"
              ref={menuRef}
            >
              <button
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => navigate('/configuracoes')}
                type="button"
              >
                Configurações
              </button>
              <button
                className="w-full rounded-lg px-3 py-2 text-left text-red-600 text-sm hover:bg-gray-50"
                onClick={handleLogout}
                type="button"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
