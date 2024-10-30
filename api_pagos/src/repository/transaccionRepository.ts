import { Transaccion } from "@prisma/client";

export interface TransaccionModel {
    monto: number;
    descripcion: string;
    id_tipo_transaccion: number;
    id_cuenta_origen: number;
    id_cuenta_destino?: number | null;
    id_estado_transaccion: number;
    create_at?: Date;
    update_at?: Date;
    delete_at?: Date;
}

export const crearTransaccion = async (transaccion: TransaccionModel,id_cuenta_owner:number, prisma: any): Promise<any> => {
    return await prisma.transaccion.create({
        data: {
            id_tipo_transaccion: transaccion.id_tipo_transaccion,
            id_cuenta_origen: transaccion.id_cuenta_origen,
            id_cuenta_destino: transaccion.id_cuenta_destino,
            id_estado_transaccion: transaccion.id_estado_transaccion,
            id_cuenta_owner: id_cuenta_owner,
            monto: transaccion.monto,
            descripcion: transaccion.descripcion,
            create_at: new Date(),
            update_at: new Date(),
        },
    });
};


export const obtenerTransaccionesPorIdCuenta = async (id_cuenta: number, prisma: any): Promise<Transaccion[]> => {
    //Obtenemos aquellos registros del lado de id_cuenta_origen y id_cuenta_destino
    //Ordenamos por fecha de creación mas reciente primero
    return await prisma.transaccion.findMany({
        where: {
            id_cuenta_owner: id_cuenta
        }
    });
}
