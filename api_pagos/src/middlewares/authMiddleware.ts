import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'defaultsecret';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];  // El token se envía como "Bearer TOKEN"
        jwt.verify(token, secret, (err, user:any) => {
            if (err) {
                return res.sendStatus(403);  // Token no válido
            }
            req.user = user;  // Agrega la información del usuario decodificada a la solicitud
            next();  // Continúa con la siguiente función de middleware
        });
    } else {
        res.sendStatus(401);  // Token no proporcionado
    }
};
