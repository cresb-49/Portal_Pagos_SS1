import { EstadoTransaccionType } from "../enums/estadoTransaccionType";

export async function getUsersByStatusReport(prisma: any): Promise<any> {
    const report = await prisma.usuario.groupBy({
        by: ['id_estado_usuario'],
        _count: { id_usuario: true },
        include: {
            estado_usuario: { select: { nombre: true } }
        }
    });

    return report.map((item: any) => ({
        estado_usuario: item.estado_usuario.nombre,
        total_usuarios: item._count.id_usuario
    }));
}

export async function getFailedTransactionsReport(prisma: any): Promise<any> {
    const failedTransactions = await prisma.transaccion.findMany({
        where: {
            id_estado_transaccion: EstadoTransaccionType.FALLIDO
        },
        select: {
            id_transaccion: true,
            descripcion: true,
            monto: true,
            create_at: true,
            cuenta_origen: { select: { numero_cuenta: true } },
            cuenta_destino: { select: { numero_cuenta: true } }
        }
    });

    return failedTransactions;
}


export async function getUserTransactionHistory(userId: number, prisma: any): Promise<any> {
    const transactionHistory = await prisma.transaccion.findMany({
        where: {
            cuenta_owner: {
                id_usuario: userId
            }
        },
        select: {
            id_transaccion: true,
            tipo_transaccion: { select: { nombre: true } },
            descripcion: true,
            monto: true,
            create_at: true,
            cuenta_origen: { select: { numero_cuenta: true } },
            cuenta_destino: { select: { numero_cuenta: true } }
        },
        orderBy: {
            create_at: 'desc'
        }
    });

    return transactionHistory;
}
