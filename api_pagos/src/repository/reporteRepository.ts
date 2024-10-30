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
        const estado = estados.find((e: any) => e.id_estado_usuario === item.id_estado_usuario);
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

interface UsuarioInfo {
    nombres: string;
    apellidos: string;
    email: string;
}

interface Transaccion {
    id_transaccion: number;
    tipo_transaccion: {
        nombre: string;
    };
    descripcion: string;
    monto: number;
    create_at: string;
    cuenta_origen: {
        numero_cuenta: string;
    };
    cuenta_destino: {
        numero_cuenta: string;
    };
}

interface TransactionHistoryReport {
    fecha_generacion: string;
    usuario_info: UsuarioInfo;
    data: Transaccion[];
}

export async function getUserTransactionHistory(
    userId: number,
    startDate: string,
    endDate: string,
    prisma: any
): Promise<TransactionHistoryReport> {
    // Convertir startDate y endDate usando split
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

    // Crear objetos Date
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    // Consulta para obtener el historial de transacciones
    const transactionHistory = await prisma.transaccion.findMany({
        where: {
            cuenta_owner: {
                id_usuario: userId
            },
            create_at: {
                gte: start, // Mayor o igual que la fecha de inicio
                lte: end    // Menor o igual que la fecha de fin
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

    // Consulta para obtener la información del usuario
    const userInfo = await prisma.usuario.findUnique({
        where: { id_usuario: userId },
        select: {
            nombres: true,
            apellidos: true,
            email: true
        }
    });

    if (!userInfo) {
        throw new Error("Usuario no encontrado");
    }

    // Construir el reporte
    return {
        fecha_generacion: new Date().toISOString(),
        usuario_info: {
            nombres: userInfo.nombres,
            apellidos: userInfo.apellidos,
            email: userInfo.email
        },
        data: transactionHistory
    };
}

export interface IncomeExpenseReport {
    total_ingresos: number;
    total_egresos: number;
    mensaje_balance: string;
    fecha_generacion: string; // Fecha en que se generó el reporte
}

export async function getIncomeExpenseReport(startDate: string, endDate: string, prisma: any): Promise<any> {
    // Convertir startDate y endDate usando split
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

    // Crear objetos Date
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    // Obtener todas las transacciones en el rango de fechas
    const transactions = await prisma.transaccion.findMany({
        where: {
            create_at: {
                gte: start,
                lte: end
            },
            id_estado_transaccion: EstadoTransaccionType.EXITOSO
        },
        select: {
            monto: true,
            id_tipo_transaccion: true
        }
    });

    // Sumar ingresos y egresos
    const totalIngresos = transactions
        .filter((t: { id_tipo_transaccion: TipoTransaccionType; }) => t.id_tipo_transaccion === TipoTransaccionType.CREDITO)
        .reduce((sum: any, t: { monto: any; }) => sum + t.monto, 0);

    const totalEgresos = transactions
        .filter((t: { id_tipo_transaccion: TipoTransaccionType; }) => t.id_tipo_transaccion === TipoTransaccionType.DEBITO || t.id_tipo_transaccion === TipoTransaccionType.RETIRO)
        .reduce((sum: any, t: { monto: any; }) => sum + t.monto, 0);

    // Verificar si los ingresos y egresos se cancelan mutuamente
    const balance = totalIngresos + totalEgresos;
    const mensajeBalance = balance === 0
        ? "La cantidad de dinero en la plataforma se mantiene estable."
        : "Existe una diferencia neta en los fondos de la plataforma.";

    return {
        total_ingresos: totalIngresos,
        total_egresos: totalEgresos,
        mensaje_balance: mensajeBalance
    };
}

export interface EarningsReport {
    total_earnings: number; // Ganancias calculadas (1.3% del total de retiros)
    total_withdrawals: number; // Total absoluto de los retiros en el rango de fechas
    fecha_generacion: string; // Fecha de generación del reporte
}

export async function getTotalEarningsReport(startDate: string, endDate: string, prisma: any): Promise<any> {
    // Convertir startDate y endDate usando split
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

    // Crear objetos Date
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    // Obtener todas las transacciones de tipo "RETIRO" en el rango de fechas
    const withdrawals = await prisma.transaccion.findMany({
        where: {
            create_at: {
                gte: start,
                lte: end
            },
            id_tipo_transaccion: TipoTransaccionType.RETIRO,
            id_estado_transaccion: EstadoTransaccionType.EXITOSO
        },
        select: {
            monto: true
        }
    });

    // Sumar el valor absoluto de todos los montos de retiro
    const totalWithdrawals = withdrawals.reduce((sum: number, transaction: { monto: number; }) => sum + Math.abs(transaction.monto), 0);

    // Calcular el 1.3% de la suma total de retiros
    const totalEarnings = totalWithdrawals * 0.013;

    return {
        total_earnings: totalEarnings,
        total_withdrawals: totalWithdrawals // Opcional: para verificar el total de retiros absolutos
    };
}
