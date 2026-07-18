import express from 'express';
import recursoController from '../controllers/recurso.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, recursoController.getRecursos);
router.get('/:id', authMiddleware, recursoController.getRecursoById);
router.get('/proyecto/:proyectoId', authMiddleware, recursoController.getRecursosByProyecto);
router.post('/', authMiddleware, recursoController.crearRecurso);
router.delete('/:id', authMiddleware, recursoController.eliminarRecurso);

export default router;
