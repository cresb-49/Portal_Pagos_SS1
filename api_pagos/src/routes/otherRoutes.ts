import { Router } from 'express';
import { actualizarEmpresa, createEmpresa, deleteEmpresa, findAllEmpresas } from '../controllers/otherController';

const router = Router();

router.get('/empresa/empresas', findAllEmpresas);
router.post('/empresa', createEmpresa);
router.delete('/empresa/:id', deleteEmpresa);
router.patch('/empresa/:id', actualizarEmpresa);

export default router;
