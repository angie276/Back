import repository from '../repositories/proyectoRepository.js';
import AlumnoProyecto from '../models/alumnoProyecto.js';
import Tarea from '../models/tarea.js';

const getProyectos = async (usuarioId) => {
    if (!usuarioId) {
        return await repository.findAll();
    }
    const vinculaciones = await AlumnoProyecto.findAll({ where: { alumnoId: parseInt(usuarioId) } });
    const proyectosIds = vinculaciones.map(v => v.proyectoId);
    if (proyectosIds.length === 0) return [];
    return await repository.model.findAll({ where: { id: proyectosIds } });
};

const getProyectoById = async (id) => {
    return await repository.findOne(id);
};

const crearProyecto = async (proyectoData) => {
    const { title, description, startDate, endDate, startDateRaw, endDateRaw, iconType, creadorId } = proyectoData;
    if (!title || !creadorId) {
        throw new Error('El título del proyecto y el ID del creador son obligatorios.');
    }
    const projectTag = proyectoData.tag || title.split(' ').map(w => w[0]).join('').slice(0, 5).toUpperCase();
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

    const proyecto = await repository.create({
        title,
        tag: projectTag,
        description,
        startDate: startDate || 'Hoy',
        endDate: endDate || 'Por definir',
        startDateRaw,
        endDateRaw,
        iconType: iconType || 'education',
        membersCount: 1,
        codigo,
        creadorId: parseInt(creadorId)
    });

    // Vincular al creador en AlumnoProyectos
    await AlumnoProyecto.findOrCreate({
        where: { alumnoId: parseInt(creadorId), proyectoId: proyecto.id }
    });

    return proyecto;
};

const eliminarProyecto = async (id) => {
    // Eliminar vínculos en AlumnoProyectos
    await AlumnoProyecto.destroy({ where: { proyectoId: parseInt(id) } });
    return await repository.remove(id);
};

const unirseProyectoPorCodigo = async (codigo, alumnoId) => {
    if (!codigo || !alumnoId) {
        throw new Error('El código de invitación y el ID del alumno son obligatorios.');
    }
    const proyecto = await repository.model.findOne({
        where: { codigo: codigo.trim().toUpperCase() }
    });
    if (!proyecto) {
        throw new Error('Código de invitación no válido.');
    }

    // Vincular alumno al proyecto
    await AlumnoProyecto.findOrCreate({
        where: { alumnoId: parseInt(alumnoId), proyectoId: proyecto.id }
    });

    // Actualizar cantidad de miembros del proyecto
    const vinculaciones = await AlumnoProyecto.count({ where: { proyectoId: proyecto.id } });
    await repository.update({ membersCount: vinculaciones }, proyecto.id);

    return proyecto;
};

export const recalcularEstadisticasProyecto = async (proyectoId) => {
    const tareas = await Tarea.findAll({ where: { proyectoId: parseInt(proyectoId) } });
    const total = tareas.length;
    const completadas = tareas.filter(t => t.estaTerminada || t.check).length;
    const progress = total > 0 ? Math.round((completadas / total) * 100) : 0;

    await repository.update({ tasksTotal: total, tasksCompleted: completadas, progress }, proyectoId);
};

const proyectoService = {
    getProyectos,
    getProyectoById,
    crearProyecto,
    eliminarProyecto,
    unirseProyectoPorCodigo,
    recalcularEstadisticasProyecto
};

export default proyectoService;