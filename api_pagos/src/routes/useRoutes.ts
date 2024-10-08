import { Router } from 'express';
import { getUsers, login, signup } from '../controllers/userController';

const router = Router();

router.get('/user/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);
// router.get('/user/:id', getUserById);
// router.post('/user', createUser);
// router.patch('/user/:id', updateUser);
// router.delete('/user/:id', deleteUser);

export default router;
