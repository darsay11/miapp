// Tipos para Proyectos (Kanban)
export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectColumn {
  id: string;
  projectId: string;
  title: string;
  order: number;
}

export interface ProjectCard {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  order: number;
  dueDate?: Date;
  assignedTo?: string;
  checklist?: { id: string; text: string; completed: boolean }[];
}

export interface CreateProjectDTO {
  name: string;
  description?: string;
}

export interface CreateColumnDTO {
  projectId: string;
  title: string;
}

export interface CreateCardDTO {
  columnId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  assignedTo?: string;
}
