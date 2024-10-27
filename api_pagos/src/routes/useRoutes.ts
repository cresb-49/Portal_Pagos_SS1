import { Router } from 'express';
import { getUsers, login, loginAPI, registrarAdmin, signup } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateAdmin } from '../middlewares/isAdminMiddleware';
import { existeEmail } from '../services/userService';

const router = Router();

router.get('/user/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/user/create/admin', authenticateJWT, validateAdmin, registrarAdmin);
// router.get('/user/:id', getUserById);
// router.post('/user', createUser);
// router.patch('/user/:id', updateUser);
// router.delete('/user/:id', deleteUser);
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
