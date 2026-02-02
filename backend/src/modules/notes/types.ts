// Tipos para Notas
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
  tags?: string[];
  projectId?: string;
}

export interface UpdateNoteDTO {
  title?: string;
  content?: string;
  tags?: string[];
}
