import { Router } from 'express';
import { actualizarUsuarioPlataforma, eliminarUsuarioPlataforma, getUsers, login, loginAPI, obtenerAdministradores, obtenerClientesPlataforma, registrarAdmin, signup } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateAdmin } from '../middlewares/isAdminMiddleware';
import { existeEmail } from '../services/userService';

const router = Router();

router.get('/user/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);

//Obtener Admins
router.get('/user/admins', authenticateJWT, obtenerAdministradores);
//Crear Admin
router.post('/user/create/admin', authenticateJWT, registrarAdmin);
///Eliminar Admin
router.delete('/user/delete/admin/:id', authenticateJWT, eliminarUsuarioPlataforma);
//Actualizar Admin
router.patch('/user/update/admin/:id', authenticateJWT, actualizarUsuarioPlataforma);

//Acciones de los usuarios cliente
//Obtener Clientes
router.get('/user/clientes', authenticateJWT, obtenerClientesPlataforma);
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
