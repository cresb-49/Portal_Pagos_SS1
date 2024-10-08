import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserToken } from '../models/usuario';
import { apiResponse } from '../response/apiResponse';
import { HttpStatusCode } from '../utils/httpStatusCodes';

const secret = process.env.JWT_SECRET || 'defaultsecret';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // El token se envía como "Bearer TOKEN"

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return apiResponse(res, HttpStatusCode.FORBIDDEN, 'Token no válido', null, err.message ?? 'Unknown error');
            }

            req.usuario = decoded as UserToken;  // Agrega la información del usuario decodificada a la solicitud
            return next();  // Continúa con la siguiente función de middleware
        });
    } else {
        return apiResponse(res, HttpStatusCode.UNAUTHORIZED, 'Token no proporcionado');
    }
};

export const generateToken = (user: UserToken) => {
    return jwt.sign(user, secret);
}
