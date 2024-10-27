import { Cuenta, Usuario } from "@prisma/client";
import { CrearUsuario } from "../models/usuario";

export const crearUsuarioCliente = async (usuario: CrearUsuario, prisma: any): Promise<any> => {
    return await prisma.usuario.create({
        data: {
            ...usuario,
            create_at: new Date(),
            update_at: new Date(),
        },
    });
};

export const obtenerUsuarios = async (prisma: any): Promise<any[]> => {
    return await prisma.usuario.findMany({
        where: {
            delete_at: null
        }
    });
};

export const obtenerUsuarioPorId = async (id: number, prisma: any, include_cuenta: boolean = false): Promise<Usuario & { cuenta?: Cuenta | null }> => {
    return await prisma.usuario.findUnique({
        where: {
            id_usuario: id
        },
        include: {
            cuenta: include_cuenta
        }
    });
};

export const obtenerUsuariosPorNombreUsuario = async (nombreUsuario: string, prisma: any): Promise<Usuario & { cuenta?: Cuenta | null }> => {
    return await prisma.usuario.findFirst({
        where: {
            nombre_usuario: nombreUsuario
        }
    });
}

export const obtenerUsuarioPorEmail = async (email: string, prisma: any, include_cuenta: boolean = false): Promise<Usuario & { cuenta?: Cuenta | null }> => {
    return await prisma.usuario.findFirst({
        where: {
            email: email
        },
        include: {
            cuenta: include_cuenta
        }
    });
}
