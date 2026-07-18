import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Alumno = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fechaRegistro: {
        type: DataTypes.STRING
    }
});

export default Alumno;
