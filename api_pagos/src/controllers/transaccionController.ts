import { Request, Response } from 'express';
import { makePayment, makeRetiro, obtenerCuentaPorIdCliente, obtenerTransaccionesUsuario, RealizarPago, Retiro } from '../services/transaccionService';
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
        const pdfBuffer = await makePayment(payload, user);
        // const timestamp = new Date().getTime();
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', `attachment; filename="transaction-${timestamp}.pdf"`);
        // res.end(pdfBuffer);
        res.status(200).json({ success: pdfBuffer });
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

export const transferirCuenta = async (req: Request, res: Response): Promise<any> => {
    try {
        const user: UserToken | undefined = req.usuario;
        if (!user) {
            throw new Error('No se ha proporcionado un token');
        }
        const { monto } = req.body;
        const payload: Retiro = {
            monto
        }
        const response = await makeRetiro(payload, user);
        return apiResponse(res, HttpStatusCode.OK, 'Transferencia realizada', response);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error al realizar la transferencia', null, error.message ?? 'Unknown error');
    }
}

