import { Transaccion } from "@prisma/client";

export interface TransaccionModel {
    monto: number;
    descripcion: string;
    id_tipo_transaccion: number;
    id_cuenta_origen: number;
    id_cuenta_destino: number;
    id_estado_transaccion: number;
    create_at?: Date;
    update_at?: Date;
    delete_at?: Date;
}

export const crearTransaccion = async (transaccion: TransaccionModel, prisma: any): Promise<any> => {
    return await prisma.transaccion.create({
        data: {
            ...transaccion,
            create_at: new Date(),
            update_at: new Date(),
        },
    });
};
