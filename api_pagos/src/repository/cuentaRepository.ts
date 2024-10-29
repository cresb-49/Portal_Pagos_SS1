import { Cuenta } from "@prisma/client";
import { CrearCuenta } from "../models/cuenta";

export const crearCuenta = async (cuenta: CrearCuenta, prisma: any): Promise<any> => {
    return await prisma.cuenta.create({
        data: {
            ...cuenta,
            create_at: new Date(),
            update_at: new Date(),
        },
    });
}

export const updateCuenta = async (id_cuenta: number, cuenta: any, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.update({
        where: {
            id_cuenta: id_cuenta
        },
        data: {
            ...cuenta,
            update_at: new Date()
        }
    });
}

export const obtenerCuentaPorIdCliente = async (id_usuario: number, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.findFirst({
        where: {
            id_usuario
        },
    });
}

export const obtenerCuentaById = async (id_cuenta: number, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.findUnique({
        where: {
            id_cuenta,
            delete_at: null
        },
    });
}


export const eliminarCuentaById = async (id_cuenta: number, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.update({
        where: {
            id_cuenta: id_cuenta
        },
        data: {
            delete_at: new Date()
        }
    });
}

export const sumarSaldoCuenta = async (id_cuenta: number, monto: number, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.update({
        where: {
            id_cuenta: id_cuenta
        },
        data: {
            saldo: {
                increment: monto
            },
            update_at: new Date()
        }
    });
}

export const restarSaldoCuenta = async (id_cuenta: number, monto: number, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.update({
        where: {
            id_cuenta: id_cuenta
        },
        data: {
            saldo: {
                decrement: monto
            },
            update_at: new Date()
        }
    });
}
