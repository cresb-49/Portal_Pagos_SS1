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

