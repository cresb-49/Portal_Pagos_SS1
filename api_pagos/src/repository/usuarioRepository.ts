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

export const updateUsuario = async (id_usuario: number, usuario: CrearUsuario, prisma: any): Promise<Usuario> => {
    return await prisma.usuario.update({
        where: {
            id_usuario: id_usuario,
            delete_at: null
        },
        data: {
            ...usuario,
            update_at: new Date()
        }
    });
}

export const eliminarUsuario = async (id_usuario: number, prisma: any): Promise<Usuario> => {
    //Ignoramos el campo password para que no se envie en la respuesta
    return await prisma.usuario.update({
        where: {
            id_usuario: id_usuario,
            delete_at: null
        },
        data: {
            delete_at: new Date()
        }
    });
}

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
            id_usuario: id,
            delete_at: null
        },
        include: {
            cuenta: include_cuenta
        }
    });
};

export const obtenerUsuariosPorNombreUsuario = async (nombreUsuario: string, prisma: any): Promise<Usuario & { cuenta?: Cuenta | null }> => {
    return await prisma.usuario.findFirst({
        where: {
            nombre_usuario: nombreUsuario,
            delete_at: null
        }
    });
}

export const obtenerUsuarioPorEmail = async (email: string, prisma: any, include_cuenta: boolean = false): Promise<Usuario & { cuenta?: Cuenta | null }> => {
    return await prisma.usuario.findFirst({
        where: {
            email: email,
            delete_at: null
        },
        include: {
            cuenta: include_cuenta
        }
    });
}

export const obtenerUsuariosPorRol = async (id_rol: number, prisma: any): Promise<Usuario[]> => {
    return await prisma.usuario.findMany({
        where: {
            id_rol: id_rol,
            delete_at: null
        }
    });
}
