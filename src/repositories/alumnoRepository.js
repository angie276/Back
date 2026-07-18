import RepositoryBase from './RepositoryBase.js';
import Alumno from '../models/alumno.js';

class AlumnoRepository extends RepositoryBase {
    constructor() {
        super(Alumno);
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({ where: { email } });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const repository = new AlumnoRepository();

export default repository;