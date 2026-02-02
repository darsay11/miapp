import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import authService from './services/auth'

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'tasks' | 'notes' | 'projects' | 'calendar' | 'login' | 'auth-callback'>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Detectar si estamos en la ruta de callback
    if (window.location.pathname === '/auth/callback' || window.location.search.includes('token=')) {
      console.log('🔐 Detectado: Ruta de callback OAuth');
      setCurrentPage('auth-callback')
      setIsLoading(false)
      return
    }

    // Verificar autenticación
    const token = authService.isAuthenticated()
    console.log('🔍 Token autenticación:', token ? '✅ Presente' : '❌ No presente')
    
    setIsAuthenticated(token)
    setIsLoading(false)

    // Chequear URL params por error
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    if (error) {
      console.warn('⚠️ Error en URL:', error)
    }
  }, [])

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800">Cargando...</h2>
          </div>
        </div>
      )
    }

    if (currentPage === 'auth-callback') {
      return <AuthCallback />
    }
    
    if (!isAuthenticated || currentPage === 'login') {
      return <Login setIsAuthenticated={setIsAuthenticated} />
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'tasks':
        return <Tasks />
      case 'notes':
        return <div className="text-center p-12 bg-white rounded-lg shadow"><h2 className="text-2xl font-bold">📒 Notas - En desarrollo</h2></div>
      case 'projects':
        return <div className="text-center p-12 bg-white rounded-lg shadow"><h2 className="text-2xl font-bold">🗂️ Proyectos - En desarrollo</h2></div>
      case 'calendar':
        return <div className="text-center p-12 bg-white rounded-lg shadow"><h2 className="text-2xl font-bold">🗓️ Calendario - En desarrollo</h2></div>
      default:
        return <Dashboard />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800">Cargando...</h2>
        </div>
      </div>
    )
  }

  if (currentPage === 'auth-callback') {
    return <AuthCallback />
  }

  if (!isAuthenticated || currentPage === 'login') {
    return <Login setIsAuthenticated={setIsAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onLogout={() => {
          authService.logout()
          setIsAuthenticated(false)
          setCurrentPage('login')
        }} 
      />
      
      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                currentPage === 'dashboard' 
                  ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('tasks')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                currentPage === 'tasks' 
                  ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📝 Tareas
            </button>
            <button
              onClick={() => setCurrentPage('notes')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                currentPage === 'notes' 
                  ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📒 Notas
            </button>
            <button
              onClick={() => setCurrentPage('projects')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                currentPage === 'projects' 
                  ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🗂️ Proyectos
            </button>
            <button
              onClick={() => setCurrentPage('calendar')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                currentPage === 'calendar' 
                  ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🗓️ Calendario
            </button>
          </nav>

          {/* Info del Proyecto */}
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-2">🚀 MiEspacio v1.0</h3>
            <p className="text-sm text-indigo-700">Tu espacio de productividad</p>
            <div className="mt-3 text-xs text-indigo-600">
              <div>✅ Backend: Activo</div>
              <div>✅ Frontend: Activo</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App

