import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import repository from '../repositories/alumnoRepository.js';
import AlumnoProyecto from '../models/alumnoProyecto.js';
import Proyecto from '../models/proyecto.js';
import { JWT_SECRET } from '../middleware/auth.js';

const generarToken = (id, nombre, email, rol) => {
    return jwt.sign({ id, nombre, email, rol }, JWT_SECRET, { expiresIn: '7d' });
};

const sanitize = (usuario) => {
    if (!usuario) return null;
    const userObj = usuario.get ? usuario.get({ plain: true }) : usuario;
    const { password, ...rest } = userObj;
    return rest;
};

const registrar = async ({ nombre, apellido, email, password }) => {
    if (!nombre || !email || !password) {
        return { success: false, message: 'Proporcione nombre, email y password.' };
    }

    const exist = await repository.getByEmail(email);
    if (exist) {
        return { success: false, message: 'Ya existe un usuario con ese email.' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await repository.create({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        rol: 'usuario',
        activo: true,
        fechaRegistro: new Date().toISOString()
    });

    const token = generarToken(nuevoUsuario.id, nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.rol);

    return {
        success: true,
        message: 'Usuario creado exitosamente',
        token,
        usuario: sanitize(nuevoUsuario)
    };
};

const login = async ({ email, password }) => {
    if (!email || !password) {
        return { success: false, message: 'Email o password incorrectos.' };
    }

    const usr = await repository.getByEmail(email);
    if (!usr) {
        return { success: false, message: 'Email o password incorrectos.' };
    }

    const isPasswordValid = await bcrypt.compare(password, usr.password);
    if (!isPasswordValid) {
        return { success: false, message: 'Email o password incorrectos.' };
    }

    const token = generarToken(usr.id, usr.nombre, usr.email, usr.rol);

    return {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        usuario: sanitize(usr)
    };
};


const getAlumnos = async () => {
    const list = await repository.findAll();
    if (!list) return [];

    const alumnosConProyectos = await Promise.all(list.map(async (u) => {
        const sanitized = sanitize(u);
        const vinculaciones = await AlumnoProyecto.findAll({
            where: { alumnoId: u.id }
        });
        const proyectosIds = vinculaciones.map(v => v.proyectoId);
        const proyectos = proyectosIds.length > 0 ? await Proyecto.findAll({
            where: { id: proyectosIds }
        }) : [];

        sanitized.proyectos = proyectos;
        return sanitized;
    }));

    return alumnosConProyectos;
};

const getAlumnoById = async (id) => {
    const user = await repository.findOne(id);
    return user ? sanitize(user) : null;
};

const toggleEstado = async (id) => {
    const user = await repository.findOne(id);
    if (!user) return null;
    const nuevoEstado = !user.activo;
    await repository.update({ activo: nuevoEstado }, id);
    const updatedUser = await repository.findOne(id);
    return sanitize(updatedUser);
};

const cambiarPassword = async (id, nuevaPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaPassword, salt);
    await repository.update({
        password: hashedPassword
    }, id);
    const updatedUser = await repository.findOne(id);
    return sanitize(updatedUser);
};

const alumnoService = {
    registrar,
    login,
    getAlumnos,
    getAlumnoById,
    toggleEstado,
    cambiarPassword
};

export default alumnoService;
