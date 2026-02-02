// Componente de Tarjeta de Tarea
interface TaskCardProps {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({ title, description, priority, status, onEdit, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    pending: 'bg-gray-200 text-gray-700',
    in_progress: 'bg-blue-200 text-blue-700',
    completed: 'bg-green-200 text-green-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      
      {description && (
        <p className="text-gray-600 text-sm mb-3">{description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
        
        <div className="flex space-x-2">
          <button 
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            ✏️
          </button>
          <button 
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 transition"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
