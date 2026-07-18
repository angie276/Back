import alumnoService from '../services/alumno.js';

class AlumnoController {
    async getAlumnos(req, res, next) {
        try {
            const list = await alumnoService.getAlumnos();
            return res.status(200).json({ exito: true, usuarios: list });
        } catch (error) {
            next(error);
        }
    }

    async getAlumnoById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await alumnoService.getAlumnoById(id);
            if (!user) {
                return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
            }
            return res.status(200).json({ exito: true, usuario: user });
        } catch (error) {
            next(error);
        }
    }

    async toggleEstado(req, res, next) {
        try {
            const { id } = req.params;
            const updated = await alumnoService.toggleEstado(id);
            return res.status(200).json({ exito: true, usuario: updated });
        } catch (error) {
            next(error);
        }
    }

    async cambiarPassword(req, res, next) {
        try {
            const { id } = req.params;
            const { nuevaPassword } = req.body;
            if (!nuevaPassword) {
                return res.status(400).json({ exito: false, mensaje: 'La nueva contraseña es requerida.' });
            }

            const updated = await alumnoService.cambiarPassword(id, nuevaPassword);
            return res.status(200).json({ exito: true, usuario: updated });
        } catch (error) {
            next(error);
        }
    }
    async registrar(req, res, next) {
        try {
            const resultado = await alumnoService.registrar(req.body);
            if (!resultado.success) {
                return res.status(400).json({ exito: false, mensaje: resultado.message });
            }
            return res.status(201).json({ exito: true, token: resultado.token, usuario: resultado.usuario });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const resultado = await alumnoService.login(req.body);
            if (!resultado.success) {
                return res.status(401).json({ exito: false, mensaje: resultado.message });
            }
            return res.status(200).json({ exito: true, token: resultado.token, usuario: resultado.usuario });
        } catch (error) {
            next(error);
        }
    }
}

export default new AlumnoController();
