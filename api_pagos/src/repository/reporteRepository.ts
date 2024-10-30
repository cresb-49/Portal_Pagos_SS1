import { EstadoTransaccionType } from "../enums/estadoTransaccionType";
import { TipoTransaccionType } from "../enums/tipoTransaccionType";

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


export async function getUserTransactionHistory(userId: number, startDate: string, endDate: string, prisma: any): Promise<any> {
    const transactionHistory = await prisma.transaccion.findMany({
        where: {
            cuenta_owner: {
                id_usuario: userId
            },
            create_at: {
                gte: startDate, // Mayor o igual que la fecha de inicio
                lte: endDate    // Menor o igual que la fecha de fin
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

export async function getIncomeExpenseReport(startDate: string, endDate: string, prisma: any): Promise<any> {
    const report = await prisma.transaccion.groupBy({
        by: [],
        _sum: {
            monto: true
        },
        where: {
            create_at: {
                gte: startDate, // Mayor o igual que la fecha de inicio
                lte: endDate    // Menor o igual que la fecha de fin
            }
        }
    });

    const totalIngresos = report._sum.monto.filter(
        (t:any) => t.id_tipo_transaccion === TipoTransaccionType.CREDITO
    );
    const totalEgresos = report._sum.monto.filter(
        (t:any) => t.id_tipo_transaccion === TipoTransaccionType.DEBITO || t.id_tipo_transaccion === TipoTransaccionType.RETIRO
    );

    return {
        total_ingresos: totalIngresos,
        total_egresos: totalEgresos,
    };
}

export async function getTotalEarningsReport(startDate: string, endDate: string, prisma: any): Promise<any> {
    const earningsReport = await prisma.transaccion.groupBy({
        by: [],
        _sum: {
            monto: true
        },
        where: {
            create_at: {
                gte: startDate, // Mayor o igual que la fecha de inicio
                lte: endDate    // Menor o igual que la fecha de fin
            }
        }
    });

    const totalIngresos = earningsReport._sum.monto.filter(
        (t: any) => t.id_tipo_transaccion === TipoTransaccionType.CREDITO
    );
    const totalEgresos = earningsReport._sum.monto.filter(
        (t: any) => t.id_tipo_transaccion === TipoTransaccionType.DEBITO || t.id_tipo_transaccion === TipoTransaccionType.RETIRO
    );

    return {
        total_ganancias: totalIngresos - totalEgresos
    };
}
