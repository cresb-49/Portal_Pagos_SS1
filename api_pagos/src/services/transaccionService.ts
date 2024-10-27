import { PrismaClient, Transaccion } from "@prisma/client";
import path from "path";
import { generateTransactionPDF, TransactionData } from "./pdfGenerator";
import { getUsuarioByEmail, getUsusaurioById } from "./userService";
import { UserToken } from "../models/usuario";
import { crearTransaccion, obtenerTransaccionesPorIdCuenta, TransaccionModel } from "../repository/transaccionRepository";
import { TipoTransaccionType } from "../enums/tipoTransaccionType";
import { EstadoTransaccionType } from "../enums/estadoTransaccionType";

const prisma = new PrismaClient()

export interface RealizarPago {
    cantidad: number;
    correoReceptor: string;
    concepto: string;
    nombreTienda: string;
    identificadorTienda: string;
}

export const makePayment = async (payload: RealizarPago, usuario_creador: UserToken) => {
    return await prisma.$transaction(async (prismaTransaction) => {
        const identificador_tienda = payload.identificadorTienda;
        //Si es a tienda de Elvis y b tienda de Alex
        if (identificador_tienda === 'a') {
            console.log("Tienda de Elvis");
        } else if (identificador_tienda === 'b') {
            console.log("Tienda de Alex");
        } else {
            throw new Error('Identificador de tienda inválido');
        }

        const usuario_emisor = await getUsusaurioById(parseInt(usuario_creador.id), true);
        //Verificamos que el usuario exista y tenga una cuenta por errores separados
        if (!usuario_emisor) {
            throw new Error('Usuario emisor no encontrado');
        }
        const cuenta_emisor = usuario_emisor?.cuenta;
        if (!cuenta_emisor) {
            throw new Error('Cuenta emisor no encontrada');
        }
        const usuario_receptor = await getUsuarioByEmail(payload.correoReceptor);
        if (!usuario_receptor) {
            throw new Error('Usuario receptor no encontrado');
        }
        const cuenta_receptor = usuario_receptor?.cuenta;
        if (!cuenta_receptor) {
            throw new Error('Cuenta receptor no encontrada');
        }

        //Generamos una transacción de debito para el emisor
        //Generamos una transacción de credito para el receptor

        const payloadTransaccion: TransaccionModel = {
            monto: -Number(payload.cantidad),
            descripcion: payload.concepto,
            id_tipo_transaccion: TipoTransaccionType.DEBITO,
            id_cuenta_origen: cuenta_emisor.id_cuenta,
            id_cuenta_destino: cuenta_receptor.id_cuenta,
            id_estado_transaccion: EstadoTransaccionType.EXITOSO,
        }

        const payloadTransaccion2: TransaccionModel = {
            monto: payload.cantidad,
            descripcion: payload.concepto,
            id_tipo_transaccion: TipoTransaccionType.CREDITO,
            id_cuenta_origen: cuenta_emisor.id_cuenta,
            id_cuenta_destino: cuenta_receptor.id_cuenta,
            id_estado_transaccion: EstadoTransaccionType.EXITOSO,
        }

        await crearTransaccion(payloadTransaccion, prismaTransaction);
        await crearTransaccion(payloadTransaccion2, prismaTransaction);

        const transactionData: TransactionData = {
            storeName: payload.nombreTienda,
            amount: payload.cantidad,
            description: payload.concepto,
            receiverEmail: usuario_receptor.email,
            senderEmail: usuario_emisor.email,
            currency: 'Q',
        };

        //Generamos un timestamp para el nombre del archivo
        const timestamp = new Date().getTime();
        const outputPath = path.join(__dirname, '../output', `${timestamp}.pdf`);

        await generateTransactionPDF(transactionData, outputPath);
        return outputPath;
    });
}

export const obtenerTransaccionesUsuario = async (id_usuario: number) => {
    const usuario = await getUsusaurioById(id_usuario, true);
    const cuenta = usuario?.cuenta;
    if (!cuenta) {
        throw new Error('Cuenta no encontrada');
    }
    return await obtenerTransaccionesPorIdCuenta(cuenta.id_cuenta, prisma);
}

export const obtenerCuentaPorIdCliente = async (id_usuario: number) => {
    const usuario = await getUsusaurioById(id_usuario, true);
    const cuenta = usuario?.cuenta;
    if (!cuenta) {
        throw new Error('Cuenta no encontrada');
    }
    return cuenta;
}
