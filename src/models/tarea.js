import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tarea = sequelize.define('Tarea', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    asignado: {
        type: DataTypes.STRING,
        defaultValue: 'Todos'
    },
    prioridad: {
        type: DataTypes.STRING,
        defaultValue: 'Media'
    },
    fechaLimite: {
        type: DataTypes.STRING
    },
    peso: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'PENDIENTE'
    },
    check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    estaTerminada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Tarea;