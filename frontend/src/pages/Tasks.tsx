// Página de Tareas
import { useState } from 'react';
import TaskCard from '../components/TaskCard';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Diseñar mockups', description: 'Crear diseños en Figma', priority: 'high' as const, status: 'in_progress' as const },
    { id: '2', title: 'Revisar código', description: 'Code review del PR #123', priority: 'medium' as const, status: 'pending' as const },
    { id: '3', title: 'Escribir documentación', description: 'Documentar la API', priority: 'low' as const, status: 'pending' as const },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">📝 Mis Tareas</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
          + Nueva Tarea
        </button>
      </div>

      {/* Filtros */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition">
          Todas
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition">
          Pendientes
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition">
          En Progreso
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition">
          Completadas
        </button>
      </div>

      {/* Lista de Tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            status={task.status}
            onEdit={() => console.log('Edit', task.id)}
            onDelete={() => console.log('Delete', task.id)}
          />
        ))}
      </div>
    </div>
  );
}
