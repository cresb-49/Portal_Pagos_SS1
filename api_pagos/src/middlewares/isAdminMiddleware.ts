import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../response/apiResponse";
import { RolType } from "../enums/rolType";
import { UserToken } from "../models/usuario";
import { HttpStatusCode } from "../utils/httpStatusCodes";

export const validateAdmin = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const user: UserToken | undefined = req.usuario;
        if (!user) {
            return apiResponse(res, HttpStatusCode.UNAUTHORIZED, 'No se ha proporcionado un token');
        }
        if (user.idRol === RolType.ADMINISTRADOR.toString()) {
            return next();
        } else {
            return apiResponse(res, HttpStatusCode.FORBIDDEN, 'No tienes permisos para realizar esta acción');
        }
    } catch (error: Error | any) {
        return apiResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error validando el rol del usuario', null, error.message ?? 'Unknown error');
    }
}
