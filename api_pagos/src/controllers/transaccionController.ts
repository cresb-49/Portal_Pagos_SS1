import { Request, Response } from 'express';
import { makePayment, obtenerCuentaPorIdCliente, obtenerTransaccionesUsuario, RealizarPago } from '../services/transaccionService';
import { UserToken } from '../models/usuario';
import { apiResponse } from '../response/apiResponse';
import { HttpStatusCode } from '../utils/httpStatusCodes';

export const realizarPago = async (req: Request, res: Response): Promise<any> => {
    try {
        const user: UserToken | undefined = req.usuario;
        if (!user) {
            throw new Error('No se ha proporcionado un token');
        }
        const { cantidad, correoReceptor, concepto, nombreTienda, identificadorTienda } = req.body;
        const payload: RealizarPago = {
            cantidad,
            correoReceptor,
            concepto,
            nombreTienda,
            identificadorTienda
        }
        //El identificado de la tienda solo puede ser a 0 b
        const response = await makePayment(payload, user);
        res.status(200).json(response);
    } catch (error: Error | any) {
        res.status(500).json(error.message ?? 'Error inesperado');
    }
}

export const transaccionesCuenta = async (req: Request, res: Response): Promise<any> => {
    try {
        const user: UserToken | undefined = req.usuario;
        if (!user) {
            throw new Error('No se ha proporcionado un token');
        }
        const data = await obtenerTransaccionesUsuario(parseInt(user.id));
        return apiResponse(res, HttpStatusCode.OK, 'Datos de transacciones', data);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error al obtener las transacciones', null, error.message ?? 'Unknown error');
    }
};

export const obtenerCuenta = async (req: Request, res: Response): Promise<any> => {
    try {
        const user: UserToken | undefined = req.usuario;
        if (!user) {
            throw new Error('No se ha proporcionado un token');
        }
        const cuenta = await obtenerCuentaPorIdCliente(parseInt(user.id));
        return apiResponse(res, HttpStatusCode.OK, 'Datos de cuenta', cuenta);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error al obtener la cuenta', null, error.message ?? 'Unknown error');
    }
}

