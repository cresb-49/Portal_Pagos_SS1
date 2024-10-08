import { Router } from 'express';
import { getUsers, login, registrarAdmin, signup } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateAdmin } from '../middlewares/isAdminMiddleware';

const router = Router();

router.get('/user/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/user/create/admin', authenticateJWT, validateAdmin, registrarAdmin);
// router.get('/user/:id', getUserById);
// router.post('/user', createUser);
// router.patch('/user/:id', updateUser);
// router.delete('/user/:id', deleteUser);

export default router;
