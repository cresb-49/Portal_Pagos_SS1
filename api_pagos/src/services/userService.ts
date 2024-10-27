import { compare } from 'bcrypt';
import { encrypt } from '../utils/encryptUtil';
import { CrearUsuario, UserRegister, UserToken, UsuarioResponse } from '../models/usuario';
import { RolType } from '../enums/rolType';
import { CrearCuenta } from '../models/cuenta';
import { PrismaClient } from '@prisma/client'
import { crearUsuarioCliente, obtenerUsuarioPorEmail, obtenerUsuarioPorId, obtenerUsuarios, obtenerUsuariosPorNombreUsuario } from '../repository/usuarioRepository';
import { crearCuenta } from '../repository/cuentaRepository';
import { generateToken } from '../middlewares/authMiddleware';
const prisma = new PrismaClient()

export const getAllUsers = async () => {
    return await obtenerUsuarios(prisma);
}

export const getUsusaurioById = async (id: number, include_cuenta: boolean = false) => {
    return await obtenerUsuarioPorId(id, prisma, include_cuenta);
}

export const getUsuarioByEmail = async (email: string, include_cuenta: boolean = false) => {
    return await obtenerUsuarioPorEmail(email, prisma, include_cuenta);
}

export const register = async (user: UserRegister) => {
    try {
        const hashedPassword = await encrypt(user.password);
        // Iniciar una transacción
        const result = await prisma.$transaction(async (prismaTransaction) => {
            // Crear el nuevo usuario dentro de la transacción
            const newUser: CrearUsuario = {
                nombre_usuario: user.nombreUsuario,
                email: user.email,
                apellidos: user.apellidos,
                nombres: user.nombres,
                id_rol: RolType.CLIENTE,
                password: hashedPassword,
                id_estado_usuario: null,
            };
            const usuarioCreado = await crearUsuarioCliente(newUser, prismaTransaction);
            // Crear la cuenta del usuario dentro de la transacción
            const cuenta: CrearCuenta = {
                id_usuario: usuarioCreado.id_usuario,
                numero_cuenta: user.numeroCuenta,
                id_entidad_financiera: user.idEntidadFinanciera,
                id_empresa: user.idEmpresa,
                saldo: 0,
            };
            await crearCuenta(cuenta, prismaTransaction);
            const responseUser: UsuarioResponse = {
                id_usuario: usuarioCreado.id_usuario,
                nombres: usuarioCreado.nombres,
                apellidos: usuarioCreado.apellidos,
                nombre_usuario: usuarioCreado.nombre_usuario,
                email: usuarioCreado.email,
                id_rol: usuarioCreado.id_rol,
                id_estado_usuario: usuarioCreado.id_estado_usuario,
            }
            return responseUser; // Devolver el usuario creado al final de la transacción
        });
        return result; // Devuelve el resultado de la transacción
    } catch (error) {
        throw error;
    }
};

export const registrarUsuarioAdmin = async (user: UserRegister) => {
    try {
        const hashedPassword = await encrypt(user.password);
        // Iniciar una transacción
        const result = await prisma.$transaction(async (prismaTransaction) => {
            // Crear el nuevo usuario dentro de la transacción
            const newUser: CrearUsuario = {
                nombre_usuario: user.nombreUsuario,
                email: user.email,
                apellidos: user.apellidos,
                nombres: user.nombres,
                id_rol: RolType.ADMINISTRADOR,
                password: hashedPassword,
                id_estado_usuario: null,
            };
            const usuarioCreado = await crearUsuarioCliente(newUser, prismaTransaction);
            const responseUser: UsuarioResponse = {
                id_usuario: usuarioCreado.id_usuario,
                nombres: usuarioCreado.nombres,
                apellidos: usuarioCreado.apellidos,
                nombre_usuario: usuarioCreado.nombre_usuario,
                email: usuarioCreado.email,
                id_rol: usuarioCreado.id_rol,
                id_estado_usuario: usuarioCreado.id_estado_usuario,
            }
            return responseUser; // Devolver el usuario creado al final de la transacción
        });
        return result; // Devuelve el resultado de la transacción
    } catch (error) {
        throw error;
    }
}

export const IniciarSession = async (email: string, password: string) => {
    const usuario = await obtenerUsuarioPorEmail(email, prisma);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordCorrect = await compare(password, usuario.password);
    if (!isPasswordCorrect) {
        throw new Error('Contraseña incorrecta');
    }
    // Generar un token para el usuario
    const userToken = {
        id: usuario.id_usuario.toString(),
        nombreUsuario: usuario.nombre_usuario,
        email: usuario.email,
        idRol: usuario.id_rol?.toString() ?? '',
    } as UserToken;

    const token = generateToken(userToken);
    const userResponse: UsuarioResponse = {
        id_usuario: usuario.id_usuario,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        nombre_usuario: usuario.nombre_usuario,
        email: usuario.email,
        id_rol: usuario.id_rol,
        id_estado_usuario: usuario.id_estado_usuario,
        token: token,  // Incluir el token generado
    };
    return userResponse;
}

export const existeEmail = async (email: string) => {
    const usuario = await obtenerUsuarioPorEmail(email, prisma);
    return { tieneCuenta: usuario !== null };
}

export const LoginApi = async (nombreUsuario: string, password: string) => {
    const usuario = await obtenerUsuariosPorNombreUsuario(nombreUsuario, prisma);
    //Validamos que hayan credenciales
    if (nombreUsuario === '' || password === '') {
        throw new Error('Debe ingresar credenciales');
    }
    //Validamos que el usuario exista
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordCorrect = await compare(password, usuario.password);
    if (!isPasswordCorrect) {
        throw new Error('Contraseña incorrecta');
    }
    // Generar un token para el usuario
    const userToken = {
        id: usuario.id_usuario.toString(),
        nombreUsuario: usuario.nombre_usuario,
        email: usuario.email,
        idRol: usuario.id_rol?.toString() ?? '',
    } as UserToken;

    const token = generateToken(userToken);
    const userResponse = {
        usuario: {
            id: usuario.id_usuario,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            nombre_usuario: usuario.nombre_usuario,
            email: usuario.email,
            rol: {
                id: usuario.id_rol,
            },
            id_estado_usuario: usuario.id_estado_usuario,
        },
        jwt: token,  // Incluir el token generado
    };
    return userResponse;
}
