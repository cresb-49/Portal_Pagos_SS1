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

export const obtenerCuentaPorIdCliente = async (id_usuario: number, prisma: any): Promise<Cuenta> => {
    return await prisma.cuenta.findFirst({
        where: {
            id_usuario
        },
    });
}

