import express from 'express';
import tareaController from '../controllers/tarea.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, tareaController.getTareas);
router.get('/:id', authMiddleware, tareaController.getTareaById);
router.get('/proyecto/:proyectoId', authMiddleware, tareaController.getTareasByProyecto);
router.post('/', authMiddleware, tareaController.crearTarea);
router.put('/:id', authMiddleware, tareaController.actualizarTarea);
router.delete('/:id', authMiddleware, tareaController.eliminarTarea);
router.put('/:id/check', authMiddleware, tareaController.toggleCheckTarea);

export default router;
