import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token) {
        // lógica para verificar el token
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};
