// Componente de Navegación
import { useState } from 'react';
import authService from '../services/auth';

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    setShowMenu(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">🚀 MiEspacio</h1>
            <div className="hidden md:flex space-x-4">
              <a href="#dashboard" className="hover:text-indigo-200 transition">Dashboard</a>
              <a href="#tasks" className="hover:text-indigo-200 transition">Tareas</a>
              <a href="#notes" className="hover:text-indigo-200 transition">Notas</a>
              <a href="#projects" className="hover:text-indigo-200 transition">Proyectos</a>
              <a href="#calendar" className="hover:text-indigo-200 transition">Calendario</a>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative">
            {user && (
              <div className="flex items-center space-x-3">
                <img 
                  src={user.photo || 'https://via.placeholder.com/40'} 
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-indigo-200">{user.email}</p>
                </div>
              </div>
            )}
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg transition"
            >
              ☰
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-16 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <a 
                  href="#profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  👤 Mi Perfil
                </a>
                <a 
                  href="#settings"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  ⚙️ Configuración
                </a>
                <hr className="my-1" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition font-semibold"
                >
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

