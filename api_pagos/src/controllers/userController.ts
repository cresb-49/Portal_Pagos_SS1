import { Response, Request } from "express";
import { actualizarUsuario, changePassword, eliminacionUsuario, getAllUsers, getPersonalInformation, IniciarSession, obtenerAdmins, obtenerClientes, register, registrarUsuarioAdmin } from '../services/userService';
import { apiResponse } from '../response/apiResponse';
import { UserRegister, UserToken } from '../models/usuario';
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
        const { email, password } = req.body;
        const usuario = await IniciarSession(email, password);
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
        const usuario = await IniciarSession(email, password);
        const response = {
            usuario: {
                id: usuario.id_usuario,
                email: usuario.email,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                rol: {
                    id: usuario.id_rol,
                },
            },
            jwt: usuario.token,
        }
        res.status(200).json(response);
    } catch (error: Error | any) {
        res.status(500).json(error.message ?? 'Error inesperado');
    }
}

export const obtenerAdministradores = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await obtenerAdmins();
        return apiResponse(res, HttpStatusCode.OK, 'Users retrieved', users);
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
}

export const eliminarUsuarioPlataforma = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const users = await eliminacionUsuario(Number(id));
        return apiResponse(res, HttpStatusCode.OK, 'Users retrieved', users);
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
}

export const obtenerClientesPlataforma = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await obtenerClientes();
        return apiResponse(res, HttpStatusCode.OK, 'Users retrieved', users);
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
}

export const obtenerInformacionPersonal = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("UserToken:", req.usuario);
        const user: UserToken | undefined = req.usuario;
        if (user === undefined) {
            return apiResponse(res, HttpStatusCode.UNAUTHORIZED, 'No user found');
        }
        const data = await getPersonalInformation(Number(user.id));
        console.log("Data:", data);
        return apiResponse(res, HttpStatusCode.OK, 'Users retrieved', data);
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
}

export const actualizarUsuarioPlataforma = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        await actualizarUsuario(Number(id), req.body);
        return apiResponse(res, HttpStatusCode.OK, 'Actualizado correctamente');
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
}

export const cambiarPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        await changePassword(Number(id), req.body);
        return apiResponse(res, HttpStatusCode.OK, 'Actualizado correctamente');
    } catch (error: Error | any) {
        return apiResponse(res, 500, 'Error retrieving users', null, error.message ?? 'Unknown error');
    }
}
