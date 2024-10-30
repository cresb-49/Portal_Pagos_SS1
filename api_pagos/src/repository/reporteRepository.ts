import { EstadoTransaccionType } from "../enums/estadoTransaccionType";
import { TipoTransaccionType } from "../enums/tipoTransaccionType";

export interface UserStatusReport {
    fecha_generacion: string; // Fecha en la que se generó el reporte
    total_estados: number; // Total de tipos de estado diferentes en el reporte
    data: Array<EstadoUsuarioData>; // Lista de estados con el conteo de usuarios en cada uno
}

interface EstadoUsuarioData {
    estado_usuario: string; // Nombre del estado del usuario (e.g., "Activo", "Inactivo")
    total_usuarios: number; // Número total de usuarios en ese estado
}

interface Cuenta {
    numero_cuenta: string;
}

interface Transaccion {
    id_transaccion: number;
    descripcion: string;
    monto: number;
    create_at: string;
    cuenta_origen: Cuenta;
    cuenta_destino: Cuenta;
}

export interface TransaccionReport {
    fecha_generacion: string;
    data: Transaccion[];
}

export async function getUsersByStatusReport(prisma: any): Promise<any> {
    // Obtener el conteo de usuarios por id_estado_usuario
    const report = await prisma.usuario.groupBy({
        by: ['id_estado_usuario'],
        _count: {
            id_usuario: true,
        }
    });

    // Obtener los nombres de los estados
    const estados = await prisma.estadoUsuario.findMany({
        where: {
            id_estado_usuario: {
                in: report.map((item: any) => item.id_estado_usuario),
            },
        },
        select: {
            id_estado_usuario: true,
            nombre: true,
        },
    });

    // Combinar ambos resultados
    return report.map((item: any) => {
        const estado = estados.find((e:any) => e.id_estado_usuario === item.id_estado_usuario);
        return {
            estado_usuario: estado ? estado.nombre : 'Desconocido',
            total_usuarios: item._count.id_usuario,
        };
    });
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
