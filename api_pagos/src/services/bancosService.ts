import { GET, POST } from './httpService';
import config from '../config/config';

interface PortalResponse {
    ok: boolean;
    mensaje?: string;
}

// Generar acceso por medio de JWT
// POST: tarjeta-credito/v1/auth/login
export interface loginPortalFinanciero {
    correo: string;
    pin: string;
}
export interface loginPortalFinancieroCredito {
    correo_electronico: string;
    pin: string;
}

export interface responseLoginPortalFinanciero extends PortalResponse {
    a2f?: boolean;
    token?: string;
}

//Generar credito a una tarjeta de credito aumentar saldo
//POST: tarjeta-credito/v1/tarjeta/generar-credito
//Enviar JWT
export interface payloadGenerarCredito {
    monto: number;
}

export interface responseGenerarCredito extends PortalResponse { }

//Generar debido a una tarjeta de credito disminuir saldo (recargar pasarela de pago)
//POST: tarjeta-credito/v1/tarjeta/generar-credito
//Enviar JWT
export interface payloadGenerarDebito {
    monto: number;
    nombre_pasarela: string;
}

export interface responseGenerarDebito extends PortalResponse { }

//Obtener informacion del usuario y su tarjeta de credito
//GET: tarjeta-credito/v1/usuario/obtener-usuario
//Enviar JWT

export interface responseObtenerUsuario extends PortalResponse {
    usuario?: any;
}


export const loginPC = async (data: loginPortalFinancieroCredito): Promise<responseLoginPortalFinanciero> => {
    return POST(`${config.bancopc}/tarjeta-credito/v1/auth/login`, data);
}

export const generarCreditoPC = async (data: payloadGenerarCredito, token: string): Promise<responseGenerarCredito> => {
    return POST(`${config.bancopc}/tarjeta-credito/v1/tarjeta/generar-credito`, data, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const generarDebitoPC = async (data: payloadGenerarDebito, token: string): Promise<responseGenerarDebito> => {
    return POST(`${config.bancopc}/tarjeta-credito/v1/tarjeta/generar-debito`, data, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const obtenerUsuarioPC = async (token: string): Promise<responseObtenerUsuario> => {
    return GET(`${config.bancopc}/tarjeta-credito/v1/usuario/obtener-usuario`, { headers: { 'Authorization': `Bearer ${token}` } });
}

/////////////////////////////////////////
// PORTAL FINANCIERO CUENTAS BANCARIAS //
/////////////////////////////////////////


export interface loginPortalBancario {
    email: string;
    pin: string;
}

export interface PortalBancarioResponseLogin {
    success: boolean;
    message?: string;
    link_token?: string;
}

export const loginPB = async (data: loginPortalBancario): Promise<PortalBancarioResponseLogin> => {
    return POST(`${config.bancopb}/api/v1.0/auth/link-account`, data);
}

export interface PayloadMovimiento {
    amount: number;
}

export interface ResponseMovimiento {
    success: boolean;
    message: string;
}

export const debitarPB = async (data: PayloadMovimiento, token: string): Promise<ResponseMovimiento> => {
    return POST(`${config.bancopb}/api/v1.0/transaction/debit-link`, data, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const acreditarPB = async (data: PayloadMovimiento, token: string): Promise<ResponseMovimiento> => {
    return POST(`${config.bancopb}/api/v1.0/transaction/credit-link`, data, { headers: { 'Authorization': `Bearer ${token}` } });
}

////////////////////////////////////////////////////////////
// CONSUMO Y MANEJO DE LOS ERRORES DEL CONSUMO DE BANCOS //
//////////////////////////////////////////////////////////

export interface ReponseMenajoBancario {
    success: boolean;
    message: string;
    data?: any;
}

// Consumo de servicios de cuentas bancarias

export const solicitarCreditoPB = async (email: string, pin: string, monto: number): Promise<ReponseMenajoBancario> => {
    try {
        const login = await loginPB({ email, pin });
        if (login.success) {
            const token = login.link_token;
            if (!token) return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Cuentas Bancarias: No se recibio token' }
            const debito = await debitarPB({ amount: monto }, token);
            if (debito.success) {
                return { success: true, message: 'Debito solicitado correctamente', data: debito }
            } else {
                return { success: false, message: 'Error al solicitar debito: ' + debito.message }
            }
        } else {
            return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Cuentas Bancarias: ' + (login.message ?? '') }
        }
    } catch (error: Error | any) {
        console.log(error);

        return { success: false, message: 'Error al solicitar credito' + error.message }
    }
}

export const solicitarAcreditamientoPB = async (email: string, pin: string, monto: number): Promise<ReponseMenajoBancario> => {
    try {
        const login = await loginPB({ email, pin });
        if (login.success) {
            const token = login.link_token;
            if (!token) return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Cuentas Bancarias: No se recibio token' }
            const credito = await acreditarPB({ amount: monto }, token);
            if (credito.success) {
                return { success: true, message: 'Credito solicitado correctamente', data: credito }
            } else {
                return { success: false, message: 'Error al solicitar acreditamiento: ' + credito.message }
            }
        } else {
            return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Cuentas Bancarias: ' + (login.message ?? '') }
        }
    } catch (error: Error | any) {
        console.log(error);

        return { success: false, message: 'Error al solicitar credito' + error.message }
    }
}

// Consumo de servicios de tarjetas de credito
// Aumento Saldo Tarjeta de Credito
export const solicitarAcreditamientoPC = async (email: string, pin: string, monto: number): Promise<ReponseMenajoBancario> => {
    try {
        const login = await loginPC({ correo_electronico: email, pin });
        if (login.ok) {
            const token = login.token;
            if (!token) return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Tarjetas de Credito: No se recibio token' }
            const credito = await generarCreditoPC({ monto: monto }, token);
            if (credito.ok) {
                return { success: true, message: 'Credito solicitado correctamente', data: credito }
            } else {
                return { success: false, message: 'Error al solicitar acreditamiento: ' + credito.mensaje }
            }
        } else {
            return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Tarjetas de Credito: ' + (login.mensaje ?? '') }
        }
    } catch (error: Error | any) {
        console.log(error);
        return { success: false, message: 'Error al solicitar credito' + error.message }
    }
}

// Disminucion Saldo Tarjeta de Credito
export const solicitarDebitoPC = async (email: string, pin: string, nombre_pasarela: string, monto: number): Promise<ReponseMenajoBancario> => {
    try {
        const login = await loginPC({ correo_electronico: email, pin });
        if (login.ok) {
            const token = login.token;
            if (!token) return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Tarjetas de Credito: No se recibio token' }
            const debito = await generarDebitoPC({ monto: monto, nombre_pasarela: nombre_pasarela }, token);
            if (debito.ok) {
                return { success: true, message: 'Debito solicitado correctamente', data: debito }
            } else {
                return { success: false, message: 'Error al solicitar debito: ' + debito.mensaje }
            }
        } else {
            return { success: false, message: 'Error al iniciar sesion en el Portal Financiero Tarjetas de Credito: ' + (login.mensaje ?? '') }
        }
    } catch (error: Error | any) {
        return { success: false, message: 'Error al solicitar debito' + error.message }
    }
}
