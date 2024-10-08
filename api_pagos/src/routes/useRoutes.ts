import { Router } from 'express';
import { getUsers, login, registrarAdmin, signup } from '../controllers/userController';

const router = Router();

router.get('/user/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/user/create/admin', registrarAdmin);
// router.get('/user/:id', getUserById);
// router.post('/user', createUser);
// router.patch('/user/:id', updateUser);
// router.delete('/user/:id', deleteUser);

export default router;
