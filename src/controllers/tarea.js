import tareaService from '../services/tarea.js';

class TareaController {
    async getTareas(req, res, next) {
        try {
            const list = await tareaService.getTareas();
            return res.status(200).json({ exito: true, tareas: list });
        } catch (error) {
            next(error);
        }
    }

    async getTareasByProyecto(req, res, next) {
        try {
            const { proyectoId } = req.params;
            const list = await tareaService.getTareasByProyecto(proyectoId);
            return res.status(200).json({ exito: true, tareas: list });
        } catch (error) {
            next(error);
        }
    }

    async getTareaById(req, res, next) {
        try {
            const { id } = req.params;
            const tarea = await tareaService.getTareaById(id);
            if (!tarea) {
                return res.status(404).json({ exito: false, mensaje: 'Tarea no encontrada' });
            }
            return res.status(200).json({ exito: true, tarea });
        } catch (error) {
            next(error);
        }
    }

    async crearTarea(req, res, next) {
        try {
            const tarea = await tareaService.crearTarea(req.body);
            return res.status(201).json({ exito: true, tarea });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }

    async actualizarTarea(req, res, next) {
        try {
            const { id } = req.params;
            const tarea = await tareaService.actualizarTarea(req.body, id);
            return res.status(200).json({ exito: true, tarea });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }

    async eliminarTarea(req, res, next) {
        try {
            const { id } = req.params;
            await tareaService.eliminarTarea(id);
            return res.status(200).json({ exito: true, mensaje: 'Tarea eliminada con éxito.' });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }

    async toggleCheckTarea(req, res, next) {
        try {
            const { id } = req.params;
            const tarea = await tareaService.toggleCheckTarea(id);
            return res.status(200).json({ exito: true, tarea });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }
}

export default new TareaController();
