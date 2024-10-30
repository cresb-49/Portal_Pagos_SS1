import { Router } from 'express';
import { actualizarEmpresa, createEmpresa, deleteEmpresa, findAllEmpresas, getReport1, getReport2, getReport3, getReport4, getReport5, updateDataCuenta } from '../controllers/otherController';
import { validateAdmin } from '../middlewares/isAdminMiddleware';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/empresa/empresas', findAllEmpresas);
router.post('/empresa', createEmpresa);
router.delete('/empresa/:id', deleteEmpresa);
router.patch('/empresa/:id', actualizarEmpresa);

//Actualizacion de los datos de la cuenta
router.patch('/cuenta/:id', updateDataCuenta);

//Obtencion de los reportes
router.post('/reporte1', authenticateJWT, validateAdmin, getReport1);
router.post('/reporte2', authenticateJWT, validateAdmin, getReport2);
router.post('/reporte3', authenticateJWT, validateAdmin, getReport3);
router.post('/reporte4', authenticateJWT, validateAdmin, getReport4);
router.post('/reporte5', authenticateJWT, validateAdmin, getReport5);

export default router;
