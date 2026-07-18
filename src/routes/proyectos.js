import express from 'express';
import proyectosController from '../controllers/proyecto.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, proyectosController.getProyectos);
router.get('/:id', authMiddleware, proyectosController.getProyectoById);
router.post('/', authMiddleware, proyectosController.crearProyecto);
router.post('/unirse', authMiddleware, proyectosController.unirseProyectoPorCodigo);
router.delete('/:id', authMiddleware, proyectosController.eliminarProyecto);

export default router;