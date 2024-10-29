import { Router } from 'express';
import { actualizarUsuarioPlataforma, cambiarPassword, eliminarUsuarioPlataforma, getUsers, login, loginAPI, obtenerAdministradores, obtenerClientesPlataforma, obtenerInformacionPersonal, registrarAdmin, signup } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateAdmin } from '../middlewares/isAdminMiddleware';
import { existeEmail } from '../services/userService';

const router = Router();
//Rutas de login y registro
router.post('/signup', signup);
router.post('/login', login);

//Ruta de actualizacion del password
router.post('/user/update/password/cliente/:id', authenticateJWT, cambiarPassword);

//Obtener Admins
router.get('/user/admins', authenticateJWT, validateAdmin, obtenerAdministradores);
//Crear Admin
router.post('/user/create/admin', authenticateJWT, validateAdmin, registrarAdmin);
///Eliminar Admin
router.delete('/user/delete/admin/:id', authenticateJWT, validateAdmin, eliminarUsuarioPlataforma);
//Actualizar Admin
router.patch('/user/update/admin/:id', authenticateJWT, validateAdmin, actualizarUsuarioPlataforma);

//Acciones de los usuarios cliente
//Obtener Clientes
router.get('/user/clientes', authenticateJWT, obtenerClientesPlataforma);
//Obtener Info Cliente by Token
router.get('/user/my-information', authenticateJWT, obtenerInformacionPersonal);
//Crear Cliente
router.post('/user/create/cliente', authenticateJWT, signup);
//Eliminar Cliente
router.delete('/user/delete/cliente/:id', eliminarUsuarioPlataforma);
//Actualizar Cliente
router.patch('/user/update/cliente/:id', actualizarUsuarioPlataforma);



//Rutas estandarizadas
router.get('/usuario/public/existeEmail/:email', async (req, res) => {
    try {
        const email = req.params.email;
        if (email === undefined || email === null || email === "") {
            res.status(400).json("Solicitud incorrecta - EI email no puede ser nulo");
            return;
        }
        const existe = await existeEmail(email);
        res.json({ existe });
    } catch (error: Error | any) {
        res.status(500).json('Error inesperado');
    }
});

router.post("/usuario/public/login", loginAPI);

export default router;
