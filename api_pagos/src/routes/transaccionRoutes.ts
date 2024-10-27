import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { obtenerCuenta, realizarPago, transaccionesCuenta } from '../controllers/transaccionController';

const router = Router();
router.post('/transaccion/protected/pagarGetComprobante', authenticateJWT, realizarPago);
router.get('/transacciones/usuario', authenticateJWT, transaccionesCuenta);
router.get('/cuenta/cliente', authenticateJWT, obtenerCuenta);
export default router;
