import RepositoryBase from './RepositoryBase.js';
import Proyecto from '../models/proyecto.js';

class ProyectoRepository extends RepositoryBase {
    constructor() {
        super(Proyecto);
    }

    async getByTitulo(titulo) {
        try {
            return await this.model.findOne({ where: { titulo } });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const repository = new ProyectoRepository();

export default repository;