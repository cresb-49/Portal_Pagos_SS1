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

export interface responseLoginPortalFinanciero extends PortalResponse {
    a2f?: boolean;
    token?: string;
}

//Generar credito a una tarjeta de credito aumentar saldo
//POST: tarjeta-credito/v1/tarjeta/generar-credito
//Enviar JWT
export interface payloadGenerarCredito {
    "saldo_a_acreditar": number;
}

export interface responseGenerarCredito extends PortalResponse { }

//Generar debido a una tarjeta de credito disminuir saldo (recargar pasarela de pago)
//POST: tarjeta-credito/v1/tarjeta/generar-credito
//Enviar JWT
export interface payloadGenerarDebito {
    "saldo_a_comprar": number;
}

export interface responseGenerarDebito extends PortalResponse { }

//Obtener informacion del usuario y su tarjeta de credito
//GET: tarjeta-credito/v1/usuario/obtener-usuario
//Enviar JWT

export interface responseObtenerUsuario extends PortalResponse {
    usuario?: any;
}


export const login = async (url: string, data: loginPortalFinanciero): Promise<responseLoginPortalFinanciero> => {
    return POST(`${url}/tarjeta-credito/v1/auth/login`, data);
}

export const generarCredito = async (url: string, data: payloadGenerarCredito, token: string): Promise<responseGenerarCredito> => {
    return POST(`${url}/tarjeta-credito/v1/tarjeta/generar-credito`, data, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const generarDebito = async (url: string, data: payloadGenerarDebito, token: string): Promise<responseGenerarDebito> => {
    return POST(`${url}/tarjeta-credito/v1/tarjeta/generar-debito`, data, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const obtenerUsuario = async (url: string, token: string): Promise<responseObtenerUsuario> => {
    return GET(`${url}/tarjeta-credito/v1/usuario/obtener-usuario`, { headers: { 'Authorization': `Bearer ${token}` } });
}
