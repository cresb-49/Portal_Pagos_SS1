import { Response, Request } from "express";
import { getAllUsers, IniciarSession, makePayment, RealizarPago, register, registrarUsuarioAdmin } from '../services/userService';
import { apiResponse } from '../response/apiResponse';
import { UserRegister } from '../models/usuario';
import { HttpStatusCode } from '../utils/httpStatusCodes';

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getAllUsers();
        return apiResponse(res, HttpStatusCode.OK, 'Users retrieved', users);
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
};

export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        //El body viene en formato JSON con el formato de UserRegister
        const user: UserRegister = req.body;
        //Llamar al servicio de registro de usuario
        const usuario_registrado = await register(user);
        return apiResponse(res, HttpStatusCode.OK, 'User signed up', usuario_registrado);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { nombreUsuario, password } = req.body;
        const usuario = await IniciarSession(nombreUsuario, password);
        return apiResponse(res, HttpStatusCode.OK, 'User signed up', usuario);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

export const registrarAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("UserToken:", req.usuario);
        const user: UserRegister = req.body;
        const usuario_registrado = await registrarUsuarioAdmin(user);
        return apiResponse(res, HttpStatusCode.OK, 'User signed up', usuario_registrado);
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error signing up', null, error.message ?? 'Unknown error');
    }
}

export const loginAPI = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const response = await IniciarSession(email, password);
        res.status(200).json(response);
    } catch (error: Error | any) {
        res.status(500).json(error.message ?? 'Error inesperado');
    }
}

export const realizarPago = async (req: Request, res: Response): Promise<any> => {
    try {
        const { cantidad, correoReceptor, concepto, nombreTienda, identificadorTienda } = req.body;
        const payload: RealizarPago = {
            cantidad,
            correoReceptor,
            concepto,
            nombreTienda,
            identificadorTienda
        }
        //El identificado de la tienda solo puede ser a 0 b
        const response = await makePayment(payload);
        res.status(200).json(response);
    } catch (error: Error | any) {
        res.status(500).json(error.message ?? 'Error inesperado');
    }
}
