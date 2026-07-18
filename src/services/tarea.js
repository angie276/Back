import repository from '../repositories/tareaRepository.js';
import { recalcularEstadisticasProyecto } from './proyecto.js';

const getTareas = async () => {
    return await repository.findAll();
};

const getTareasByProyecto = async (proyectoId) => {
    try {
        return await repository.model.findAll({
            where: { proyectoId: parseInt(proyectoId) }
        });
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getTareaById = async (id) => {
    return await repository.findOne(id);
};

const crearTarea = async (tareaData) => {
    const { titulo, asignado, prioridad, fechaLimite, peso, estado, check, estaTerminada, proyectoId } = tareaData;

    if (!titulo) {
        throw new Error('El título de la tarea es obligatorio.');
    }
    if (!proyectoId) {
        throw new Error('El ID del proyecto es obligatorio.');
    }
    const tarea = await repository.create({
        titulo,
        asignado: asignado || 'Todos',
        prioridad: prioridad || 'Media',
        fechaLimite,
        peso: peso !== undefined ? parseInt(peso) : 0,
        estado: estado || 'PENDIENTE',
        check: check !== undefined ? !!check : false,
        estaTerminada: estaTerminada !== undefined ? !!estaTerminada : false,
        proyectoId: parseInt(proyectoId)
    });

    // Recalcular estadísticas del proyecto
    await recalcularEstadisticasProyecto(proyectoId);

    return tarea;
};

const actualizarTarea = async (tareaData, id) => {
    const tareaExistente = await repository.findOne(id);
    if (!tareaExistente) {
        throw new Error('La tarea no existe.');
    }
    const updateFields = {};
    if (tareaData.titulo !== undefined) updateFields.titulo = tareaData.titulo;
    if (tareaData.asignado !== undefined) updateFields.asignado = tareaData.asignado;
    if (tareaData.prioridad !== undefined) updateFields.prioridad = tareaData.prioridad;
    if (tareaData.fechaLimite !== undefined) updateFields.fechaLimite = tareaData.fechaLimite;
    if (tareaData.peso !== undefined) updateFields.peso = parseInt(tareaData.peso);
    if (tareaData.estado !== undefined) updateFields.estado = tareaData.estado;
    if (tareaData.check !== undefined) updateFields.check = !!tareaData.check;
    if (tareaData.estaTerminada !== undefined) updateFields.estaTerminada = !!tareaData.estaTerminada;
    if (tareaData.proyectoId !== undefined) updateFields.proyectoId = parseInt(tareaData.proyectoId);
    await repository.update(updateFields, id);
    const tarea = await repository.findOne(id);

    // Recalcular estadísticas del proyecto
    await recalcularEstadisticasProyecto(tarea.proyectoId);

    return tarea;
};

const eliminarTarea = async (id) => {
    const tarea = await repository.findOne(id);
    const proyectoId = tarea?.proyectoId;
    const result = await repository.remove(id);

    // Recalcular estadísticas del proyecto
    if (proyectoId) {
        await recalcularEstadisticasProyecto(proyectoId);
    }

    return result;
};

const toggleCheckTarea = async (id) => {
    const tarea = await repository.findOne(id);
    if (!tarea) {
        throw new Error('La tarea no existe.');
    }
    const nuevoEstado = (tarea.estado === 'ENVIADO' || tarea.estado === 'REVISADO') ? 'PENDIENTE' : 'ENVIADO';
    const isCompletada = nuevoEstado === 'ENVIADO' || nuevoEstado === 'REVISADO';
    await repository.update({
        estado: nuevoEstado,
        check: isCompletada,
        estaTerminada: isCompletada
    }, id);
    const tareaActualizada = await repository.findOne(id);

    // Recalcular estadísticas del proyecto
    await recalcularEstadisticasProyecto(tarea.proyectoId);

    return tareaActualizada;
};

const tareaService = {
    getTareas,
    getTareasByProyecto,
    getTareaById,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    toggleCheckTarea
};

export default tareaService;
