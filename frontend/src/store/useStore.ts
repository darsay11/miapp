// Estado global con Zustand
import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
}

interface Project {
  id: string;
  name: string;
}

interface AppState {
  // Tareas
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Task>) => void;

  // Notas
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;

  // Proyectos
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;

  // Usuario
  user: any | null;
  setUser: (user: any) => void;
}

export const useStore = create<AppState>((set) => ({
  // Tareas
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)),
    })),

  // Notas
  notes: [],
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

  // Proyectos
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),

  // Usuario
  user: null,
  setUser: (user) => set({ user }),
}));
