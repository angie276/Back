import ProyectosService from '../services/proyecto.js';

class ProyectosController {
    async getProyectos(req, res, next) {
        try {
            const list = await ProyectosService.getProyectos(req.usuario?.id);
            return res.status(200).json({ exito: true, proyectos: list });
        } catch (error) {
            next(error);
        }
    }

    async getProyectoById(req, res, next) {
        try {
            const { id } = req.params;
            const project = await ProyectosService.getProyectoById(id);
            if (!project) {
                return res.status(404).json({ exito: false, mensaje: 'Proyecto no encontrado' });
            }
            return res.status(200).json({ exito: true, proyecto: project });
        } catch (error) {
            next(error);
        }
    }

    async crearProyecto(req, res, next) {
        try {
            const project = await ProyectosService.crearProyecto(req.body);
            return res.status(201).json({ exito: true, proyecto: project });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }

    async unirseProyectoPorCodigo(req, res, next) {
        try {
            const { codigo } = req.body;
            const alumnoId = req.usuario?.id;
            const project = await ProyectosService.unirseProyectoPorCodigo(codigo, alumnoId);
            return res.status(200).json({ exito: true, proyecto: project });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }

    async eliminarProyecto(req, res, next) {
        try {
            const { id } = req.params;
            await ProyectosService.eliminarProyecto(id);
            return res.status(200).json({ exito: true, mensaje: 'Proyecto eliminado con éxito.' });
        } catch (error) {
            return res.status(400).json({ exito: false, mensaje: error.message });
        }
    }
}

export default new ProyectosController();
