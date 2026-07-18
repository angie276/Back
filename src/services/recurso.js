import repository from '../repositories/recursoRepository.js';

const getRecursos = async () => {
    return await repository.findAll();
};

const getRecursosByProyecto = async (proyectoId) => {
    try {
        return await repository.model.findAll({
            where: { proyectoId: parseInt(proyectoId) }
        });
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getRecursoById = async (id) => {
    return await repository.findOne(id);
};

const crearRecurso = async (recursoData) => {
    const { nombre, url, categoria, esArchivo, archivoNombre, proyectoId } = recursoData;

    if (!nombre) {
        throw new Error('El nombre del recurso es obligatorio.');
    }
    if (!url) {
        throw new Error('La URL/Data del recurso es obligatoria.');
    }
    if (!proyectoId) {
        throw new Error('El ID del proyecto es obligatorio.');
    }

    return await repository.create({
        nombre,
        url,
        categoria: categoria || 'url',
        esArchivo: esArchivo !== undefined ? !!esArchivo : false,
        archivoNombre: esArchivo ? archivoNombre : null,
        proyectoId: parseInt(proyectoId)
    });
};

const eliminarRecurso = async (id) => {
    return await repository.remove(id);
};

const recursoService = {
    getRecursos,
    getRecursosByProyecto,
    getRecursoById,
    crearRecurso,
    eliminarRecurso
};

export default recursoService;
