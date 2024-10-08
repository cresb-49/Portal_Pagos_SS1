import { compare } from 'bcrypt';
import { encrypt } from '../utils/encryptUtil';
import { CrearUsuario, UserRegister } from '../models/usuario';
import { RolType } from '../enums/rolType';
import { CrearCuenta } from '../models/cuenta';
import { PrismaClient } from '@prisma/client'
import { crearUsuarioCliente, obtenerUsuarioPorId, obtenerUsuarios, obtenerUsuariosPorNombreUsuario } from '../repository/usuarioRepository';
import { crearCuenta } from '../repository/cuentaRepository';
const prisma = new PrismaClient()

export const getAllUsers = async () => {
    return await obtenerUsuarios(prisma);
}

export const getUsusaurioById = async (id: number) => {
    return await obtenerUsuarioPorId(id, prisma);
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
            return usuarioCreado; // Devolver el usuario creado al final de la transacción
        });
        return result; // Devuelve el resultado de la transacción
    } catch (error) {
        throw error;
    }
};

export const IniciarSession = async (nombreUsuario: string, password: string) => {
    const usuario = await obtenerUsuariosPorNombreUsuario(nombreUsuario, prisma);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordCorrect = await compare(password, usuario.password);
    if (!isPasswordCorrect) {
        throw new Error('Contraseña incorrecta');
    }
    return usuario;
}
