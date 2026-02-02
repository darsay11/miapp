// Rutas de Proyectos (Kanban)
import { Router } from 'express';

const router = Router();

// TODO: Implementar controladores
// GET /projects - Obtener todos los proyectos
router.get('/', (req, res) => {
  res.json({ message: 'GET /projects - En desarrollo' });
});

// POST /projects - Crear nuevo proyecto
router.post('/', (req, res) => {
  res.json({ message: 'POST /projects - En desarrollo' });
});

// GET /projects/:id - Obtener proyecto específico
router.get('/:id', (req, res) => {
  res.json({ message: 'GET /projects/:id - En desarrollo' });
});

// PUT /projects/:id - Actualizar proyecto
router.put('/:id', (req, res) => {
  res.json({ message: 'PUT /projects/:id - En desarrollo' });
});

// DELETE /projects/:id - Eliminar proyecto
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE /projects/:id - En desarrollo' });
});

// Columnas del Kanban
// POST /projects/:id/columns - Crear columna
router.post('/:id/columns', (req, res) => {
  res.json({ message: 'POST /projects/:id/columns - En desarrollo' });
});

// Tarjetas del Kanban
// POST /projects/:id/cards - Crear tarjeta
router.post('/:id/cards', (req, res) => {
  res.json({ message: 'POST /projects/:id/cards - En desarrollo' });
});

// PUT /projects/cards/:cardId - Actualizar tarjeta (drag & drop)
router.put('/cards/:cardId', (req, res) => {
  res.json({ message: 'PUT /projects/cards/:cardId - En desarrollo' });
});

export default router;
