import { PrismaClient, Transaccion } from "@prisma/client";
import path from "path";
import { generateTransactionPDF, generateTransactionPDF2, TransactionData } from "./pdfGenerator";
import { getUsuarioByEmail, getUsusaurioById } from "./userService";
import { UserToken } from "../models/usuario";
import { crearTransaccion, obtenerTransaccionesPorIdCuenta, TransaccionModel } from "../repository/transaccionRepository";
import { TipoTransaccionType } from "../enums/tipoTransaccionType";
import { EstadoTransaccionType } from "../enums/estadoTransaccionType";
import { restarSaldoCuenta, sumarSaldoCuenta } from "../repository/cuentaRepository";
import { log } from "console";
import { EntidadFinancieraType } from "../enums/entidadFinancieraType";
import { ReponseMenajoBancario, solicitarAcreditamientoPB, solicitarAcreditamientoPC, solicitarCreditoPB, solicitarDebitoPC } from "./bancosService";

const prisma = new PrismaClient()

export interface RealizarPago {
    cantidad: number;
    correoReceptor: string;
    concepto: string;
    nombreTienda: string;
    identificadorTienda: string;
}

export interface Retiro {
    monto: number;
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
        const usuario_receptor = await getUsuarioByEmail(payload.correoReceptor, true);
        if (!usuario_receptor) {
            throw new Error('Usuario receptor no encontrado');
        }
        const cuenta_receptor = usuario_receptor?.cuenta;
        if (!cuenta_receptor) {
            throw new Error('Cuenta receptor no encontrada');
        }
        //Verificamos que la cuenta tenga saldo suficiente
        let respuesta_bancaria: ReponseMenajoBancario | null = null;

        if (cuenta_emisor.saldo < payload.cantidad) {
            console.log(`Saldo insuficiente`);
            //Realizamos una solicitud de credito a la entidad bancaria correspondiente
            const entidad = cuenta_emisor.id_entidad_financiera;
            if (entidad === EntidadFinancieraType.FINANCIERA_PB) {
                if (cuenta_emisor.pin) {
                    respuesta_bancaria = await solicitarCreditoPB(usuario_emisor.email, cuenta_emisor.pin, Number(payload.cantidad));
                } else {
                    respuesta_bancaria = { success: false, message: 'El cliente no tiene saldo suficiente y no se puede solicitar credito' };
                }
            } else if (entidad === EntidadFinancieraType.FINANCIERA_PC) {
                if (cuenta_emisor.pin) {
                    respuesta_bancaria = await solicitarDebitoPC(usuario_emisor.email, cuenta_emisor.pin, Number(payload.cantidad));
                } else {
                    respuesta_bancaria = { success: false, message: 'El cliente no tiene saldo suficiente y no se puede solicitar credito' };
                }
            } else {
                respuesta_bancaria = { success: false, message: 'El cliente no tiene saldo suficiente y no se puede solicitar credito' };
            }
        }

        let payloadTransaccion: TransaccionModel | null = null;
        let payloadTransaccion2: TransaccionModel | null = null;

        let afectar_saldo = false;

        if (respuesta_bancaria && !respuesta_bancaria.success) {
            payloadTransaccion = {
                monto: -Number(payload.cantidad),
                descripcion: payload.concepto,
                id_tipo_transaccion: TipoTransaccionType.DEBITO,
                id_cuenta_origen: cuenta_emisor.id_cuenta,
                id_cuenta_destino: cuenta_receptor.id_cuenta,
                id_estado_transaccion: EstadoTransaccionType.FALLIDO,
            }
            payloadTransaccion2 = {
                monto: payload.cantidad,
                descripcion: payload.concepto,
                id_tipo_transaccion: TipoTransaccionType.CREDITO,
                id_cuenta_origen: cuenta_emisor.id_cuenta,
                id_cuenta_destino: cuenta_receptor.id_cuenta,
                id_estado_transaccion: EstadoTransaccionType.FALLIDO,
            }
            afectar_saldo = false;
        } else {
            payloadTransaccion = {
                monto: -Number(payload.cantidad),
                descripcion: payload.concepto,
                id_tipo_transaccion: TipoTransaccionType.DEBITO,
                id_cuenta_origen: cuenta_emisor.id_cuenta,
                id_cuenta_destino: cuenta_receptor.id_cuenta,
                id_estado_transaccion: EstadoTransaccionType.EXITOSO,
            }

            payloadTransaccion2 = {
                monto: payload.cantidad,
                descripcion: payload.concepto,
                id_tipo_transaccion: TipoTransaccionType.CREDITO,
                id_cuenta_origen: cuenta_emisor.id_cuenta,
                id_cuenta_destino: cuenta_receptor.id_cuenta,
                id_estado_transaccion: EstadoTransaccionType.EXITOSO,
            }
            afectar_saldo = true;
        }

        await crearTransaccion(payloadTransaccion, cuenta_emisor.id_cuenta, prismaTransaction);
        await crearTransaccion(payloadTransaccion2, cuenta_receptor.id_cuenta, prismaTransaction);

        if (afectar_saldo) {
            await restarSaldoCuenta(cuenta_emisor.id_cuenta, payload.cantidad, prismaTransaction);
            await sumarSaldoCuenta(cuenta_receptor.id_cuenta, payload.cantidad, prismaTransaction);
        }

        const transactionData: TransactionData = {
            storeName: payload.nombreTienda,
            amount: payload.cantidad,
            description: payload.concepto,
            receiverEmail: usuario_receptor.email,
            senderEmail: usuario_emisor.email,
            currency: 'Q',
            transactionDate: new Date(),
            message: respuesta_bancaria ? respuesta_bancaria.message : 'Transaccion exitosa',
        };

        const pdfBuffer = await generateTransactionPDF2(transactionData);
        return pdfBuffer;
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


export const makeRetiro = async (payload: Retiro, user: UserToken) => {
    return await prisma.$transaction(async (prismaTransaction) => {

        const usuario = await getUsusaurioById(parseInt(user.id), true);
        //Verificamos que el usuario exista y tenga una cuenta por errores separados
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        const cuenta_usuario = usuario?.cuenta;
        if (!cuenta_usuario) {
            throw new Error('Cuenta emisor no encontrada');
        }
        //Validamos que la cuenta tenga saldo suficiente
        if (cuenta_usuario.saldo < payload.monto) {
            throw new Error('Saldo insuficiente');
        }
        //Aplicamos el cobro por movilizacion de dinero que es de %1.3
        const monto_cobro = (payload.monto * (1 - 0.013)).toFixed(2);
        console.log(`Cobro por movilizacion de dinero: GTQ${monto_cobro}`);
        //Realizamos una transaccion de retiro del a cuenta del usuario
        let respuesta_bancaria: ReponseMenajoBancario | null = null;
        let afectar_saldo = false;
        //Debemos de enviar la peticion a la entidad bancaria correspondiente
        if (cuenta_usuario.id_entidad_financiera === EntidadFinancieraType.FINANCIERA_PB) {
            if (cuenta_usuario.pin) {
                respuesta_bancaria = await solicitarAcreditamientoPB(usuario.email, cuenta_usuario.pin, Number(payload.monto));
            } else {
                respuesta_bancaria = { success: false, message: 'No esta configurada la cuenta para realizar debitos' };
            }
        } else if (cuenta_usuario.id_entidad_financiera === EntidadFinancieraType.FINANCIERA_PC) {
            if (cuenta_usuario.pin) {
                respuesta_bancaria = await solicitarAcreditamientoPC(usuario.email, cuenta_usuario.pin, Number(payload.monto));
            } else {
                respuesta_bancaria = { success: false, message: 'No esta configurada la cuenta para realizar debitos' };
            }
        } else {
            respuesta_bancaria = { success: false, message: 'Entidad financiera no soportada' };
        }

        let payloadTransaccion: TransaccionModel | null = null;

        if (respuesta_bancaria && !respuesta_bancaria.success) {
            payloadTransaccion = {
                monto: -Number(payload.monto),
                descripcion: `Retiro de saldo por GTQ${payload.monto} a la cuenta ${cuenta_usuario.numero_cuenta}`,
                id_tipo_transaccion: TipoTransaccionType.RETIRO,
                id_cuenta_origen: cuenta_usuario.id_cuenta,
                id_estado_transaccion: EstadoTransaccionType.FALLIDO,
            }
            afectar_saldo = false;
        } else {
            payloadTransaccion = {
                monto: -Number(payload.monto),
                descripcion: `Retiro de saldo por GTQ${payload.monto} a la cuenta ${cuenta_usuario.numero_cuenta}`,
                id_tipo_transaccion: TipoTransaccionType.RETIRO,
                id_cuenta_origen: cuenta_usuario.id_cuenta,
                id_estado_transaccion: EstadoTransaccionType.EXITOSO,
            }
            afectar_saldo = true;
        }

        if (afectar_saldo) {
            await restarSaldoCuenta(cuenta_usuario.id_cuenta, payload.monto, prismaTransaction);
        }

        await crearTransaccion(payloadTransaccion, cuenta_usuario.id_cuenta, prismaTransaction);

        return true;
    });
}
