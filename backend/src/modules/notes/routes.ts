// Rutas de Notas
import { Router } from 'express';

const router = Router();

// TODO: Implementar controladores
// GET /notes - Obtener todas las notas
router.get('/', (req, res) => {
  res.json({ message: 'GET /notes - En desarrollo' });
});

// POST /notes - Crear nueva nota
router.post('/', (req, res) => {
  res.json({ message: 'POST /notes - En desarrollo' });
});

// GET /notes/:id - Obtener nota específica
router.get('/:id', (req, res) => {
  res.json({ message: 'GET /notes/:id - En desarrollo' });
});

// PUT /notes/:id - Actualizar nota
router.put('/:id', (req, res) => {
  res.json({ message: 'PUT /notes/:id - En desarrollo' });
});

// DELETE /notes/:id - Eliminar nota
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE /notes/:id - En desarrollo' });
});

// GET /notes/search/:query - Buscar notas
router.get('/search/:query', (req, res) => {
  res.json({ message: 'GET /notes/search/:query - En desarrollo' });
});

export default router;
