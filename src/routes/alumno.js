import express from 'express';
import alumnoController from '../controllers/alumno.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, alumnoController.getAlumnos);
router.get('/:id', authMiddleware, alumnoController.getAlumnoById);
router.put('/:id/estado', authMiddleware, alumnoController.toggleEstado);
router.put('/:id/password', authMiddleware, alumnoController.cambiarPassword);
router.post('/', alumnoController.registrar);
router.post('/login', alumnoController.login);

export default router;
