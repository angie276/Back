import recursoService from '../services/recurso.js';

class RecursoController {
    async getRecursos(req, res, next) {
        try {
            const list = await recursoService.getRecursos();
            return res.status(200).json({ exito: true, recursos: list });
        } catch (error) {
            next(error);
        }
    }

    async getRecursosByProyecto(req, res, next) {
        try {
            const { proyectoId } = req.params;
            const list = await recursoService.getRecursosByProyecto(proyectoId);
            return res.status(200).json({ exito: true, recursos: list });
        } catch (error) {
            next(error);
        }
    }

    async getRecursoById(req, res, next) {
        try {
            const { id } = req.params;
            const recurso = await recursoService.getRecursoById(id);
            if (!recurso) {
                return res.status(404).json({ exito: false, mensaje: 'Recurso no encontrado' });
            }
            return res.status(200).json({ exito: true, recurso });
        } catch (error) {
            next(error);
        }
    }

    async crearRecurso(req, res, next) {
        try {
            const recurso = await recursoService.crearRecurso(req.body);
            return res.status(201).json({ exito: true, recurso });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }

    async eliminarRecurso(req, res, next) {
        try {
            const { id } = req.params;
            await recursoService.eliminarRecurso(id);
            return res.status(200).json({ exito: true, mensaje: 'Recurso eliminado con éxito.' });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }
}

export default new RecursoController();
