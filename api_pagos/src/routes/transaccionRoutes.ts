import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { realizarPago } from '../controllers/transaccionController';

const router = Router();
router.post('/transaccion/protected/pagarGetComprobante', authenticateJWT, realizarPago);
export default router;
