import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AlumnoProyecto = sequelize.define('AlumnoProyecto', {
    alumnoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'AlumnoProyectos'
});

export default AlumnoProyecto;
