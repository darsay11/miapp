# 🎓 Guía de Desarrollo - Próximos Pasos

## 🔥 Próximas Tareas Inmediatas

### 1. Base de Datos SQLite Local

Crear configuración de base de datos:

```typescript
// backend/src/config/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './miapp.db',
    driver: sqlite3.Database
  });
}
```

Crear tablas:

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  due_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2. Implementar Autenticación JWT

```typescript
// backend/src/modules/auth/service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(email: string, password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  // Guardar en BD
  // Retornar token
}

export async function login(email: string, password: string) {
  // Buscar usuario
  // Verificar password
  // Generar token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return { token, user };
}
```

Middleware de autenticación:

```typescript
// backend/src/middleware/auth.ts
export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}
```

### 3. CRUD de Tareas Completo

```typescript
// backend/src/modules/tasks/service.ts
export async function getTasks(userId: string) {
  const db = await openDb();
  return db.all('SELECT * FROM tasks WHERE user_id = ?', [userId]);
}

export async function createTask(userId: string, data: CreateTaskDTO) {
  const db = await openDb();
  const id = generateId();
  await db.run(
    'INSERT INTO tasks (id, user_id, title, description, priority) VALUES (?, ?, ?, ?, ?)',
    [id, userId, data.title, data.description, data.priority]
  );
  return { id, ...data };
}
```

### 4. Integrar Frontend con Backend

```typescript
// frontend/src/pages/Tasks.tsx
import { useEffect, useState } from 'react';
import { getTasks, createTask } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    loadTasks();
  }, []);
  
  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }
  
  async function handleCreate(taskData) {
    await createTask(taskData);
    loadTasks();
  }
  
  // ...render
}
```

### 5. Formulario de Creación de Tareas

```typescript
// frontend/src/components/TaskForm.tsx
export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="w-full px-4 py-2 border rounded"
      />
      {/* Más campos... */}
      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded">
        Crear Tarea
      </button>
    </form>
  );
}
```

## 📚 Recursos de Aprendizaje

- **Express + TypeScript**: https://expressjs.com/
- **JWT Authentication**: https://jwt.io/
- **SQLite**: https://www.sqlite.org/
- **React Hooks**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/

## 🐛 Debugging Tips

- Usar `console.log` para debug
- Ver Network tab en DevTools
- Revisar logs del backend en terminal
- Usar Postman para probar API

## 🚀 Deployment

Cuando esté listo:

1. **Backend**: Railway, Heroku, DigitalOcean
2. **Frontend**: Vercel, Netlify
3. **DB**: PostgreSQL en Railway/Supabase

---

**¡Éxito con el desarrollo!** 🎉
