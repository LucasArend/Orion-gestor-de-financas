import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { name } from '../../data/data-tests';

export default function Header({ pageTitle }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white p-8">
      <div className="flex-1">
        <h1 className="font-bold text-gray-900 text-xl">{pageTitle}</h1>
      </div>
      {/* Ícones */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-2xl border border-gray-200 p-1.5 pr-2 hover:bg-gray-50"
            onClick={() => setOpen(!open)}
            ref={buttonRef}
            type="button"
          >
            <img
              alt="avatar"
              className="h-8 w-8 rounded-full"
              height={32}
              src={'https://i.pravatar.cc/40?img=68'}
              width={32}
            />
            <span className="hidden text-gray-700 text-sm sm:block">
              {name.name}
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
                type="button"
              >
                Perfil
              </button>
              <button
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                type="button"
              >
                Configurações
              </button>
              <button
                className="w-full rounded-lg px-3 py-2 text-left text-red-600 text-sm hover:bg-gray-50"
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
