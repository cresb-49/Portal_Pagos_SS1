import { Empresa } from "@prisma/client";

export interface EmpresaModel {
    id_empresa?: number;
    nombre: string;
    create_at?: Date;
    update_at?: Date;
    delete_at?: Date;
}

export const crearEmpresa = async (empresa: EmpresaModel, prisma: any): Promise<any> => {
    return await prisma.empresa.create({
        data: {
            ...empresa,
            create_at: new Date(),
            update_at: new Date(),
        },
    });
}

export const obtenerEmpresaPorId = async (id_empresa: number, prisma: any): Promise<Empresa> => {
    return await prisma.empresa.findUnique({
        where: {
            id_empresa: id_empresa,
            delete_at: null
        }
    });
}

export const updateEmpresa = async (id_empresa: number, empresa: EmpresaModel, prisma: any): Promise<Empresa> => {
    return await prisma.empresa.update({
        where: {
            id_empresa: id_empresa,
            delete_at: null
        },
        data: {
            ...empresa,
            update_at: new Date()
        }
    });
}

export const obtenerEmpresas = async (prisma: any): Promise<Empresa[]> => {
    return await prisma.empresa.findMany({
        where: {
            delete_at: null
        }
    });
}

export const eliminarEmpresa = async (id_empresa: number, prisma: any): Promise<any> => {
    return await prisma.empresa.update({
        where: {
            id_empresa: id_empresa,
            delete_at: null
        },
        data: {
            delete_at: new Date() // Se marca la fecha de eliminación
        }
    });
}
