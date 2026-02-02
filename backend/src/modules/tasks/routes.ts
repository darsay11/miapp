// Rutas de Tareas
import { Router } from 'express';

const router = Router();

// TODO: Implementar controladores
// GET /tasks - Obtener todas las tareas del usuario
router.get('/', (req, res) => {
  res.json({ message: 'GET /tasks - En desarrollo' });
});

// POST /tasks - Crear nueva tarea
router.post('/', (req, res) => {
  res.json({ message: 'POST /tasks - En desarrollo' });
});

// GET /tasks/:id - Obtener tarea específica
router.get('/:id', (req, res) => {
  res.json({ message: 'GET /tasks/:id - En desarrollo' });
});

// PUT /tasks/:id - Actualizar tarea
router.put('/:id', (req, res) => {
  res.json({ message: 'PUT /tasks/:id - En desarrollo' });
});

// DELETE /tasks/:id - Eliminar tarea
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE /tasks/:id - En desarrollo' });
});

export default router;
