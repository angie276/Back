import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Recurso = sequelize.define('Recurso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        defaultValue: 'url'
    },
    esArchivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    archivoNombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Recurso;
