import { Request, Response } from 'express';
import { makePayment, RealizarPago } from '../services/transaccionService';
import { UserToken } from '../models/usuario';

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
