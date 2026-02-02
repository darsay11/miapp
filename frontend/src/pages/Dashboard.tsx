// Página de Dashboard
import { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 12,
    completedTasks: 5,
    pendingTasks: 7,
    totalProjects: 3,
  });

  const [backendStatus, setBackendStatus] = useState<string>('Verificando...');

  useEffect(() => {
    checkHealth()
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Backend no disponible'));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
      
      {/* Estado del Backend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Estado del Sistema</h2>
        <p className="text-green-600 font-medium">✅ {backendStatus}</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">📝</div>
          <div className="text-3xl font-bold">{stats.totalTasks}</div>
          <div className="text-blue-100">Total Tareas</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">✅</div>
          <div className="text-3xl font-bold">{stats.completedTasks}</div>
          <div className="text-green-100">Completadas</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">⏳</div>
          <div className="text-3xl font-bold">{stats.pendingTasks}</div>
          <div className="text-yellow-100">Pendientes</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">🗂️</div>
          <div className="text-3xl font-bold">{stats.totalProjects}</div>
          <div className="text-purple-100">Proyectos</div>
        </div>
      </div>

      {/* Tareas Recientes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📌 Tareas Recientes</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Diseñar UI del dashboard</span>
            <span className="text-sm text-gray-500">Hoy</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Implementar autenticación</span>
            <span className="text-sm text-gray-500">Mañana</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Conectar con base de datos</span>
            <span className="text-sm text-gray-500">Esta semana</span>
          </div>
        </div>
      </div>
    </div>
  );
}
