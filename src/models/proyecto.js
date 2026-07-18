import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Proyecto = sequelize.define('Proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tasksCompleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tasksTotal: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    membersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    startDate: {
        type: DataTypes.STRING,
        defaultValue: 'Hoy'
    },
    endDate: {
        type: DataTypes.STRING,
        defaultValue: 'Por definir'
    },
    startDateRaw: {
        type: DataTypes.STRING
    },
    endDateRaw: {
        type: DataTypes.STRING
    },
    iconType: {
        type: DataTypes.STRING,
        defaultValue: 'education'
    },
    codigo: {
        type: DataTypes.STRING,
        unique: true
    },
    creadorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Proyecto;
