import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { comprarRecarga, obtenerCuenta, realizarPago, transaccionesCuenta, transferirCuenta } from '../controllers/transaccionController';

const router = Router();
router.post('/transaccion/protected/pagarGetComprobante', authenticateJWT, realizarPago);
router.get('/transacciones/usuario', authenticateJWT, transaccionesCuenta);
router.get('/cuenta/cliente', authenticateJWT, obtenerCuenta);
router.post('/transferencia', authenticateJWT, transferirCuenta);
router.post('/comprar-saldo', authenticateJWT, comprarRecarga);
export default router;
