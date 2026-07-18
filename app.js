import express from 'express';
import cors from 'cors';

// Importar modelos (esto registra las asociaciones en Sequelize)
import './src/models/alumno.js';
import './src/models/proyecto.js';
import './src/models/tarea.js';
import './src/models/recurso.js';
import './src/models/alumnoProyecto.js';

// Importar rutas
import alumnoRoutes from './src/routes/alumno.js';
import proyectoRoutes from './src/routes/proyectos.js';
import tareaRoutes from './src/routes/tareas.js';
import recursoRoutes from './src/routes/recursos.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Endpoints
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/recursos', recursoRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        exito: false,
        mensaje: err.message || 'Ha ocurrido un error en el servidor.'
    });
});

export default app;