import { UserToken } from '.././src/models/user';

// Extiende la interfaz Request para incluir la propiedad 'user'
declare global {
    namespace Express {
        interface Request {
            usuario?: UserToken;  // Define el tipo de la propiedad 'user'
        }
    }
}
